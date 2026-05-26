/**
 * api/blog/upload-image.js
 * Uploads a blog cover image to the GitHub repo.
 * Requires a valid admin session cookie.
 *
 * POST /api/blog/upload-image
 * Body: { dataUrl, fileName, contentType, slug }
 * Response: { success, url } | { success: false, message }
 */

import crypto from 'crypto';
import { validateSession } from '../auth/login.js';
import { putFileBase64 } from '../_github.js';

const MAX_IMAGE_BYTES = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const TYPE_EXT = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

function sanitizeBaseName(value) {
  return (value || '')
    .toString()
    .toLowerCase()
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractBase64(dataUrl) {
  if (!dataUrl) return '';
  return dataUrl.toString().replace(/^data:[^;]+;base64,/, '').trim();
}

function getExtension(contentType, fileName) {
  if (TYPE_EXT[contentType]) return TYPE_EXT[contentType];
  const fallback = (fileName || '').split('.').pop().toLowerCase();
  if (fallback === 'jpeg') return 'jpg';
  return fallback || '';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  if (!validateSession(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized. Please log in.' });
  }

  const { dataUrl, fileName, contentType, slug } = req.body || {};

  if (!dataUrl || !contentType) {
    return res.status(400).json({ success: false, message: 'dataUrl and contentType are required' });
  }

  if (!ALLOWED_TYPES.has(contentType)) {
    return res.status(415).json({ success: false, message: 'Unsupported image type' });
  }

  const base64 = extractBase64(dataUrl);
  if (!base64) {
    return res.status(400).json({ success: false, message: 'Invalid image data' });
  }

  let buffer;
  try {
    buffer = Buffer.from(base64, 'base64');
  } catch {
    return res.status(400).json({ success: false, message: 'Invalid base64 payload' });
  }

  if (buffer.length > MAX_IMAGE_BYTES) {
    return res.status(413).json({ success: false, message: 'Image too large (max 2MB)' });
  }

  const baseName = sanitizeBaseName(slug || fileName || 'cover') || 'cover';
  const ext = getExtension(contentType, fileName) || 'jpg';
  const uniqueId = `${baseName}-${Date.now().toString(36)}-${crypto.randomBytes(3).toString('hex')}`;
  const filePath = `public/assets/blog-covers/${uniqueId}.${ext}`;

  try {
    await putFileBase64(filePath, base64, `blog: upload cover ${uniqueId}`);
    return res.status(200).json({
      success: true,
      url: `/assets/blog-covers/${uniqueId}.${ext}`,
    });
  } catch (err) {
    console.error('Upload image error:', err);
    return res.status(500).json({
      success: false,
      message: err.message || 'Failed to upload image. Check GITHUB_TOKEN permissions.',
    });
  }
}
