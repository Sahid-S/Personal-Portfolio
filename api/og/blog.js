/**
 * api/og/blog.js
 * Social share OG tags for blog posts.
 */

import fs from 'fs/promises';
import path from 'path';

const SITE_URL = 'https://www.sahid.me';

function normalizeSlug(value) {
  return (value || '')
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return {};

  const frontmatter = {};
  match[1].split('\n').forEach((line) => {
    const idx = line.indexOf(':');
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (!key) return;

    if (val === 'true') { frontmatter[key] = true; return; }
    if (val === 'false') { frontmatter[key] = false; return; }

    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }

    frontmatter[key] = val;
  });

  return frontmatter;
}

function escapeHtml(value) {
  return (value || '')
    .toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req, res) {
  const { searchParams } = new URL(req.url, 'http://localhost');
  const slug = normalizeSlug(searchParams.get('slug'));

  if (!slug) {
    res.status(400).send('Missing slug');
    return;
  }

  const filePath = path.join(process.cwd(), 'content', 'blogs', `${slug}.md`);
  let raw;

  try {
    raw = await fs.readFile(filePath, 'utf8');
  } catch {
    res.status(404).send('Not found');
    return;
  }

  const frontmatter = parseFrontmatter(raw);
  if (frontmatter.published === false) {
    res.status(404).send('Not found');
    return;
  }

  const title = escapeHtml(frontmatter.title || slug);
  const description = escapeHtml(frontmatter.description || 'Read the latest article from Sahid.');
  const canonical = `${SITE_URL}/blog/${slug}`;
  const ogImage = `${SITE_URL}/og.png`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="robots" content="noindex, nofollow" />
    <link rel="canonical" href="${canonical}" />

    <meta property="og:type" content="article" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:site_name" content="Sahid Blog" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${ogImage}" />

    <meta http-equiv="refresh" content="0; url=${canonical}" />
  </head>
  <body>
    <p>Redirecting to <a href="${canonical}">${canonical}</a>...</p>
    <script>window.location.replace('${canonical}');</script>
  </body>
</html>`);
}
