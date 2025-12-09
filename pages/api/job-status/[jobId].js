import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { jobId } = req.query;
  if (!jobId) return res.status(400).json({ error: 'Missing jobId' });
  const outPath = path.resolve(process.cwd(), 'data', 'processedPrograms', `${jobId}.json`);
  if (!fs.existsSync(outPath)) return res.status(404).json({ status: 'pending' });
  const data = JSON.parse(fs.readFileSync(outPath, 'utf8'));
  return res.status(200).json({ status: 'done', data });
}
