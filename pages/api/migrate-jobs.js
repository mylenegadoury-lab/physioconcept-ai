import fs from 'fs';
import path from 'path';
import { requireAdmin } from '../../lib/auth';
import { asyncHandler, ValidationError } from '../../lib/errors';

export default requireAdmin(asyncHandler(async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Only allow migrate when USE_BULL is enabled
  if (process.env.USE_BULL !== 'true') return res.status(400).json({ error: 'USE_BULL not enabled' });

  // try to require bull enqueue helper
  let bullEnqueue = null;
  try {
    bullEnqueue = require('../../lib/bullQueue').enqueueJob;
  } catch (e) {
    return res.status(500).json({ error: 'Bull enqueue helper not available', details: String(e) });
  }

  const p = path.resolve(process.cwd(), 'data', 'pendingJobs.json');
  if (!fs.existsSync(p)) return res.status(200).json({ migrated: 0, message: 'No pendingJobs.json' });
  const raw = fs.readFileSync(p, 'utf8');
  const jobs = JSON.parse(raw || '[]');
  const queued = jobs.filter(j => j.status === 'queued');
  const migrated = [];
  for (const j of queued) {
    try {
      const newId = await bullEnqueue(j.type, j.payload);
      migrated.push({ oldId: j.id, newId });
    } catch (e) {
      console.error('Failed migrating job', j.id, e);
    }
  }

  return res.status(200).json({ migrated: migrated.length, details: migrated });
}));
