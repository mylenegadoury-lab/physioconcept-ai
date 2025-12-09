const fs = require('fs');
const path = require('path');
const { popJob, markJobDone } = require('../lib/jobQueue');
const { findStockImage, generateExerciseImage, getCachedImage, setCachedImage } = require('../lib/media');
const { verifyCitationsList } = require('../lib/evidence');

const POLL_INTERVAL = Number(process.env.WORKER_POLL_MS || 3000);

async function processProgramJob(job) {
  const { id, payload } = job;
  const program = payload.programData;

  try {
    if (program && Array.isArray(program.exercises)) {
      for (const ex of program.exercises) {
        // media
        const prompt = ex.imagePrompt || ex.description || ex.name || 'exercise';
        const cacheKey = prompt;
        try {
          const cached = getCachedImage(cacheKey);
          if (cached) {
            ex.media = { ...(ex.media || {}), image: cached, source: 'cache' };
          } else {
            const stock = await findStockImage(ex.name || prompt, prompt);
            if (stock) {
              setCachedImage(cacheKey, stock, process.env.PEXELS_API_KEY ? 'pexels' : 'unsplash');
              ex.media = { ...(ex.media || {}), image: stock, source: process.env.PEXELS_API_KEY ? 'pexels' : 'unsplash' };
            } else if (process.env.GENERATE_IMAGES === 'true') {
              try {
                const dalle = await generateExerciseImage(ex.name || 'exercise', prompt);
                if (dalle) {
                  setCachedImage(cacheKey, dalle, 'dalle');
                  ex.media = { ...(ex.media || {}), image: dalle, source: 'dalle' };
                }
              } catch (e) {
                console.warn('DALL·E failed in worker:', e?.message || e);
              }
            }
          }
        } catch (e) {
          console.warn('Worker media error:', e?.message || e);
        }

        // verify generatedEvidence
        if (ex.generatedEvidence && ex.generatedEvidence.length > 0) {
          try {
            const toVerify = ex.generatedEvidence.filter(i => i.doi || i.pmid);
            if (toVerify.length > 0) {
              const verified = await verifyCitationsList(toVerify);
              ex.generatedEvidenceVerified = verified;
            }
          } catch (e) {
            console.warn('Worker verification error:', e?.message || e);
          }
        }
      }
    }

    // write processed program to disk so API can serve it
    const outDir = path.resolve(process.cwd(), 'data', 'processedPrograms');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const outPath = path.join(outDir, `${id}.json`);
    fs.writeFileSync(outPath, JSON.stringify(program, null, 2));

    markJobDone(id, { outPath });
    console.log(`Job ${id} processed and written to ${outPath}`);
  } catch (e) {
    console.error('Failed processing job', id, e);
  }
}

async function pollLoop() {
  console.log('Worker started, polling for jobs...');
  while (true) {
    try {
      const job = popJob();
      if (job) {
        console.log('Picked job', job.id, 'type', job.type);
        if (job.type === 'processProgram') {
          await processProgramJob(job);
        } else {
          console.log('Unknown job type', job.type, 'marking done');
          markJobDone(job.id, { note: 'unknown job type' });
        }
      }
    } catch (e) {
      console.error('Worker loop error', e);
    }
    await new Promise((r) => setTimeout(r, POLL_INTERVAL));
  }
}

pollLoop().catch((e) => {
  console.error('Worker crashed', e);
  process.exit(1);
});
