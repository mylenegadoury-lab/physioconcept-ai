// Simple BullMQ enqueue helper. Requires `bullmq` + `ioredis` when used.
const { Queue } = require('bullmq');
const IORedis = require('ioredis');

const redisUrl = process.env.REDIS_URL || process.env.REDIS || 'redis://127.0.0.1:6379';
const connection = new IORedis(redisUrl);

const queue = new Queue('physio-jobs', { connection });

async function enqueueJob(type, payload) {
  // job name is type; data payload contains the actual payload
  const job = await queue.add(type, { payload }, { removeOnComplete: 1000, removeOnFail: 1000 });
  return job.id;
}

module.exports = { enqueueJob, queue };
