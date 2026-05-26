/**
 * api/blog/create.js
 * Creates a new blog post markdown file in the GitHub repo.
 * Requires a valid admin session cookie.
 *
 * POST /api/blog/create
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

  if (!data.title || !data.slug || !data.body) {
    return res.status(400).json({ success: false, message: 'title, slug, and body are required' });
  }

  // Sanitize slug
  const slug = data.slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const filePath = `content/blogs/${slug}.md`;

  try {
    // Check if file already exists
    const existing = await getFile(filePath);
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `A post with slug "${slug}" already exists. Use the edit endpoint.`,
      });
    }

    const markdown = buildMarkdown({ ...data, slug });

    await putFile(
      filePath,
      markdown,
      `blog: publish "${data.title}"`
    );

    return res.status(200).json({
      success: true,
      message: 'Post published to GitHub. Vercel is deploying...',
      slug,
      path: filePath,
    });
  } catch (err) {
    console.error('Create blog error:', err);
    return res.status(500).json({
      success: false,
      message: err.message || 'Failed to create post. Check GITHUB_TOKEN permissions.',
    });
  }
}
