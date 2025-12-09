/**
 * Admin authentication middleware
 */
import { UnauthorizedError } from './errors';

export function requireAdmin(handler) {
  return async (req, res) => {
    const adminSecret = process.env.ADMIN_SECRET;
    
    // If no secret configured, allow (dev mode)
    if (!adminSecret) {
      console.warn('[SECURITY] ADMIN_SECRET not set - admin endpoints are unprotected!');
      return handler(req, res);
    }

    // Check x-admin-auth header
    const authHeader = req.headers['x-admin-auth'];
    if (!authHeader || authHeader !== adminSecret) {
      throw new UnauthorizedError('Admin authentication required');
    }

    return handler(req, res);
  };
}

export function getAdminSecret() {
  return process.env.ADMIN_SECRET || null;
}
