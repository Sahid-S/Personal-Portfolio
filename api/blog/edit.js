/**
 * api/blog/edit.js
 * Updates an existing blog post markdown file in the GitHub repo.
 * Requires a valid admin session cookie.
 *
 * POST /api/blog/edit
 * Body: { title, slug, originalSlug, date, tags, published, description, readingTime, body }
 */

import { validateSession } from '../auth/login.js';
import { getFile, putFile, deleteFile, buildMarkdown } from '../_github.js';

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

  const originalSlug = (data.originalSlug || data.slug)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const filePath = `content/blogs/${slug}.md`;
  const originalPath = `content/blogs/${originalSlug}.md`;

  try {
    // Must exist to edit
    const existing = await getFile(originalPath);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Post "${originalSlug}" not found. Use the create endpoint for new posts.`,
      });
    }

    if (slug !== originalSlug) {
      const conflict = await getFile(filePath);
      if (conflict) {
        return res.status(409).json({
          success: false,
          message: `A post with slug "${slug}" already exists. Choose another slug.`,
        });
      }
    }

    const markdown = buildMarkdown({ ...data, slug });

    await putFile(
      filePath,
      markdown,
      `blog: update "${data.title || slug}"`,
      slug === originalSlug ? existing.sha : null
    );

    if (slug !== originalSlug) {
      try {
        await deleteFile(originalPath, existing.sha, `blog: rename "${originalSlug}" → "${slug}"`);
      } catch (err) {
        console.error('Rename cleanup error:', err);
      }
    }

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
