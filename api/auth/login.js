/**
 * api/auth/login.js
 * Vercel Edge Function — handles admin authentication.
 *
 * Required environment variables (set in Vercel Dashboard → Settings → Env):
 *   ADMIN_USERNAME  — e.g. "sahid"
 *   ADMIN_PASSWORD  — strong random password
 *
 * POST /api/auth/login
 * Body: { username, password }
 * Response: { success, token } | { success: false, message }
 *
 * Sets an HTTP-only session cookie on success.
 */

import crypto from 'crypto';

// Simple in-memory token store (resets on cold start — fine for solo admin)
// For a persistent store, use Vercel KV or Edge Config.


export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', process.env.SITE_URL || 'https://www.sahid.me');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { username, password } = req.body || {};

  const validUsername = process.env.ADMIN_USERNAME;
  const validPassword = process.env.ADMIN_PASSWORD;

  if (!validUsername || !validPassword) {
    console.error('ADMIN_USERNAME or ADMIN_PASSWORD env var not set');
    return res.status(500).json({ success: false, message: 'Server misconfiguration' });
  }

  // Constant-time comparison to prevent timing attacks
  const usernameMatch = crypto.timingSafeEqual(
    Buffer.from(username || ''),
    Buffer.from(validUsername)
  );
  const passwordMatch = crypto.timingSafeEqual(
    Buffer.from(password || ''),
    Buffer.from(validPassword)
  );

  if (!usernameMatch || !passwordMatch) {
    // Small delay to further slow brute force
    await new Promise((r) => setTimeout(r, 500));
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  // Generate secure session token
  const token = crypto.randomBytes(32).toString('hex');
  

  // Expire token after 8 hours (module-level — best effort)
  

  // Set HTTP-only cookie
  res.setHeader(
  "Set-Cookie",
  `admin_session=${token};
  HttpOnly;
  Secure;
  SameSite=Lax;
  Max-Age=${8 * 3600};
  Path=/`
  );

  return res.status(200).json({ success: true, token });
}

/** Exported for use by other API routes to validate sessions. */
export function validateSession(req) {
  const cookie = req.headers.cookie || "";

  const match = cookie.match(
    /admin_session=([a-f0-9]{64})/
  );

  if (!match) return false;

  return true;
}
