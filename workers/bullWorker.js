// BullMQ worker that processes 'processProgram' jobs.
const path = require('path');
const fs = require('fs');
const { Worker } = require('bullmq');
const IORedis = require('ioredis');
const { findStockImage, generateExerciseImage, getCachedImage, setCachedImage } = require('../lib/media');
const { verifyCitationsList } = require('../lib/evidence');

const redisUrl = process.env.REDIS_URL || process.env.REDIS || 'redis://127.0.0.1:6379';
const connection = new IORedis(redisUrl);

const worker = new Worker('physio-jobs', async (job) => {
  try {
    console.log('Processing job', job.id, 'name', job.name);
    if (job.name !== 'processProgram') {
      return { ok: false, reason: 'unsupported job type' };
    }

    const program = job.data.payload.programData;

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
    const outPath = path.join(outDir, `${job.id}.json`);
    fs.writeFileSync(outPath, JSON.stringify(program, null, 2));

    console.log(`Job ${job.id} processed and written to ${outPath}`);
    return { ok: true, outPath };
  } catch (e) {
    console.error('Worker job failed', e);
    throw e;
  }
}, { connection });

worker.on('failed', (job, err) => {
  console.error('Job failed', job?.id, err?.message || err);
});

process.on('SIGINT', async () => {
  console.log('Shutting down worker...');
  await worker.close();
  process.exit(0);
});

console.log('Bull worker started');
