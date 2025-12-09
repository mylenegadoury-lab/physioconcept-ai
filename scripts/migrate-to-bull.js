// Migrate existing file-backed pending jobs into BullMQ queue.
const fs = require('fs');
const path = require('path');
const { enqueueJob } = require('../lib/bullQueue');

async function migrate() {
  const p = path.resolve(process.cwd(), 'data', 'pendingJobs.json');
  if (!fs.existsSync(p)) {
    console.log('No pendingJobs.json found; nothing to migrate');
    return;
  }
  const raw = fs.readFileSync(p, 'utf8');
  const jobs = JSON.parse(raw || '[]');
  if (!Array.isArray(jobs) || jobs.length === 0) {
    console.log('No jobs to migrate');
    return;
  }

  for (const j of jobs) {
    if (j.status === 'queued') {
      try {
        const newId = await enqueueJob(j.type, j.payload);
        console.log('Migrated', j.id, '->', newId);
      } catch (e) {
        console.error('Failed migrating job', j.id, e?.message || e);
      }
    } else {
      console.log('Skipping non-queued job', j.id, j.status);
    }
  }

  console.log('Migration complete');
}

migrate().catch((e) => { console.error(e); process.exit(1); });
