import fs from 'fs';
import path from 'path';
import { requireAdmin } from '../../lib/auth';
import { asyncHandler } from '../../lib/errors';

const CACHE_PATH = path.resolve(process.cwd(), 'data', 'verifiedCitations.json');

function readCache() {
  try {
    return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8') || '{}');
  } catch (e) {
    return {};
  }
}

function writeCache(obj) {
  fs.writeFileSync(CACHE_PATH, JSON.stringify(obj, null, 2));
}

export default requireAdmin(asyncHandler(async function handler(req, res) {
  const cache = readCache();
  if (req.method === 'GET') {
    return res.status(200).json(cache);
  }
  if (req.method === 'DELETE') {
    writeCache({});
    return res.status(200).json({ ok: true });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}));
