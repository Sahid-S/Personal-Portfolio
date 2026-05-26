/**
 * api/blog/delete.js
 * Deletes a blog post markdown file from the GitHub repo.
 * Requires a valid admin session cookie.
 *
 * POST /api/blog/delete
 * Body: { slug }
 */

import { validateSession } from '../auth/login.js';
import { getFile, deleteFile } from '../_github.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  if (!validateSession(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized. Please log in.' });
  }

  const { slug } = req.body || {};

  if (!slug) {
    return res.status(400).json({ success: false, message: 'slug is required' });
  }

  const safeSlug = slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const filePath = `content/blogs/${safeSlug}.md`;

  try {
    const existing = await getFile(filePath);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Post "${safeSlug}" not found in GitHub repo.`,
      });
    }

    await deleteFile(
      filePath,
      existing.sha,
      `blog: delete "${safeSlug}"`
    );

    return res.status(200).json({
      success: true,
      message: `Post "${safeSlug}" deleted. Vercel is deploying...`,
    });
  } catch (err) {
    console.error('Delete blog error:', err);
    return res.status(500).json({
      success: false,
      message: err.message || 'Failed to delete post.',
    });
  }
}
