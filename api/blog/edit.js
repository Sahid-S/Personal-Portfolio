/**
 * api/blog/edit.js
 * Updates an existing blog post markdown file in the GitHub repo.
 * Requires a valid admin session cookie.
 *
 * POST /api/blog/edit
 * Body: { title, slug, date, cover, tags, published, description, readingTime, body }
 */

import { validateSession } from '../auth/login.js';
import { getFile, putFile, buildMarkdown } from '../_github.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  if (!validateSession(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized. Please log in.' });
  }

  const data = req.body;

  if (!data.slug || !data.body) {
    return res.status(400).json({ success: false, message: 'slug and body are required' });
  }

  const slug = data.slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const filePath = `content/blogs/${slug}.md`;

  try {
    // Must exist to edit
    const existing = await getFile(filePath);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Post "${slug}" not found. Use the create endpoint for new posts.`,
      });
    }

    const markdown = buildMarkdown({ ...data, slug });

    await putFile(
      filePath,
      markdown,
      `blog: update "${data.title || slug}"`,
      existing.sha
    );

    return res.status(200).json({
      success: true,
      message: 'Post updated on GitHub. Vercel is deploying...',
      slug,
      path: filePath,
    });
  } catch (err) {
    console.error('Edit blog error:', err);
    return res.status(500).json({
      success: false,
      message: err.message || 'Failed to update post.',
    });
  }
}
