// Simple BullMQ enqueue helper. Requires `bullmq` + `ioredis` only when actually used.
let Queue = null;
let IORedis = null;
let queue = null;

function ensureQueue() {
  if (queue) return queue;
  try {
    ({ Queue } = require('bullmq'));
    IORedis = require('ioredis');
  } catch (e) {
    throw new Error('BullMQ not installed. Run: npm install bullmq ioredis');
  }
  const redisUrl = process.env.REDIS_URL || process.env.REDIS || 'redis://127.0.0.1:6379';
  const connection = new IORedis(redisUrl);
  queue = new Queue('physio-jobs', { connection });
  return queue;
}

async function enqueueJob(type, payload) {
  const q = ensureQueue();
  const job = await q.add(type, { payload }, { removeOnComplete: 1000, removeOnFail: 1000 });
  return job.id;
}

module.exports = { enqueueJob, ensureQueue };
