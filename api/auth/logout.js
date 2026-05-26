/**
 * api/auth/logout.js
 * Clears the admin session cookie.
 */
export default function handler(req, res) {
  res.setHeader(
    'Set-Cookie',
    'admin_session=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/'
  );
  res.status(200).json({ success: true });
}
