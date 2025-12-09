import fs from 'fs';
import path from 'path';
import { requireAdmin } from '../../../lib/auth';
import { asyncHandler, ValidationError } from '../../../lib/errors';

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
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { key, approved } = req.body || {};
  if (!key) throw new ValidationError('Missing key');
  const cache = readCache();
  cache[key] = cache[key] || {};
  cache[key].approved = approved === undefined ? true : !!approved;
  cache[key].approvedAt = new Date().toISOString();
  writeCache(cache);
  return res.status(200).json({ ok: true, key, entry: cache[key] });
}));
