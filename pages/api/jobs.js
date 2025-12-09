import { readJobs, enqueueJob } from '../../lib/jobQueue';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const jobs = readJobs();
    return res.status(200).json(jobs);
  }

  if (req.method === 'POST') {
    // re-enqueue a job by copying its payload
    const { jobId } = req.body || {};
    if (!jobId) return res.status(400).json({ error: 'Missing jobId' });
    const jobs = readJobs();
    const existing = jobs.find(j => j.id === jobId);
    if (!existing) return res.status(404).json({ error: 'Job not found' });
    const newId = enqueueJob(existing.type, existing.payload);
    return res.status(200).json({ ok: true, newId });
  }

  if (req.method === 'DELETE') {
    // delete a pending job by id
    const { jobId } = req.body || {};
    if (!jobId) return res.status(400).json({ error: 'Missing jobId' });
    const jobs = readJobs();
    const filtered = jobs.filter(j => j.id !== jobId);
    const p = path.resolve(process.cwd(), 'data', 'pendingJobs.json');
    fs.writeFileSync(p, JSON.stringify(filtered, null, 2));
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
