const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

const JOBS_PATH = path.resolve(process.cwd(), 'data', 'pendingJobs.json');

function readJobs() {
  try {
    return JSON.parse(fs.readFileSync(JOBS_PATH, 'utf8') || '[]');
  } catch (e) {
    return [];
  }
}

function writeJobs(jobs) {
  fs.writeFileSync(JOBS_PATH, JSON.stringify(jobs, null, 2));
}

function enqueueJob(type, payload) {
  const jobs = readJobs();
  const job = {
    id: randomUUID(),
    type,
    payload,
    createdAt: new Date().toISOString(),
    status: 'queued'
  };
  jobs.push(job);
  writeJobs(jobs);
  return job.id;
}

function popJob() {
  const jobs = readJobs();
  const nextIdx = jobs.findIndex(j => j.status === 'queued');
  if (nextIdx === -1) return null;
  const job = jobs[nextIdx];
  job.status = 'processing';
  job.startedAt = new Date().toISOString();
  jobs[nextIdx] = job;
  writeJobs(jobs);
  return job;
}

function markJobDone(jobId, result) {
  const jobs = readJobs();
  const idx = jobs.findIndex(j => j.id === jobId);
  if (idx === -1) return false;
  jobs[idx].status = 'done';
  jobs[idx].finishedAt = new Date().toISOString();
  jobs[idx].result = result;
  writeJobs(jobs);
  return true;
}

module.exports = { enqueueJob, popJob, markJobDone, readJobs };
