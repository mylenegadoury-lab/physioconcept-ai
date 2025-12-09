import fs from 'fs';
import path from 'path';
import { requireAdmin } from '../../lib/auth';
import { asyncHandler, ValidationError } from '../../lib/errors';

export default requireAdmin(asyncHandler(async function handler(req, res) {
  const dir = path.resolve(process.cwd(), 'data', 'processedPrograms');
  if (req.method === 'GET') {
    if (!fs.existsSync(dir)) return res.status(200).json([]);
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    const items = files.map(f => ({ id: f.replace(/\.json$/, ''), file: f }));
    return res.status(200).json(items);
  }

  if (req.method === 'DELETE') {
    const { id } = req.body || {};
    if (!id) throw new ValidationError('Missing id');
    const p = path.join(dir, `${id}.json`);
    if (fs.existsSync(p)) {
      fs.unlinkSync(p);
      return res.status(200).json({ ok: true });
    }
    return res.status(404).json({ error: 'Not found' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}));
