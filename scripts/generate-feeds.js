/**
 * scripts/generate-feeds.js
 * Run at build time: node scripts/generate-feeds.js
 * Reads content/blogs/*.md, generates:
 *   public/sitemap.xml
 *   public/rss.xml
 *
 * Called automatically via "prebuild" npm script.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BLOGS_DIR = path.join(ROOT, 'content', 'blogs');
const PUBLIC_DIR = path.join(ROOT, 'public');
const SITE = 'https://www.sahid.me';

// ── Parse frontmatter ──────────────────────────────────────────────
function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const fm = {};
  m[1].split('\n').forEach((line) => {
    const idx = line.indexOf(':');
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    if (val === 'true') val = true;
    else if (val === 'false') val = false;
    fm[key] = val;
  });
  return fm;
}

// ── Load all blog posts ────────────────────────────────────────────
function loadPosts() {
  if (!fs.existsSync(BLOGS_DIR)) return [];
  return fs
    .readdirSync(BLOGS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOGS_DIR, file), 'utf8');
      const fm = parseFrontmatter(raw);
      return {
        slug: fm.slug || file.replace('.md', ''),
        title: fm.title || file.replace('.md', ''),
        date: fm.date || new Date().toISOString().split('T')[0],
        description: fm.description || '',
        tags: fm.tags || '',
        published: fm.published !== false,
      };
    })
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// ── Static site pages ──────────────────────────────────────────────
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'monthly' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/skills', priority: '0.7', changefreq: 'monthly' },
  { url: '/projects', priority: '0.9', changefreq: 'weekly' },
  { url: '/resume', priority: '0.7', changefreq: 'monthly' },
  { url: '/contact', priority: '0.6', changefreq: 'yearly' },
  { url: '/blog', priority: '0.9', changefreq: 'weekly' },
];

// ── Generate sitemap.xml ───────────────────────────────────────────
function generateSitemap(posts) {
  const today = new Date().toISOString().split('T')[0];

  const staticEntries = staticPages
    .map(
      (p) => `
  <url>
    <loc>${SITE}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    )
    .join('');

  const blogEntries = posts
    .map(
      (p) => `
  <url>
    <loc>${SITE}/blog/${p.slug}</loc>
    <lastmod>${p.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${blogEntries}
</urlset>`.trim();
}

// ── Generate rss.xml ──────────────────────────────────────────────
function generateRSS(posts) {
  const items = posts
    .slice(0, 20)
    .map(
      (p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${SITE}/blog/${p.slug}</link>
      <guid>${SITE}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description><![CDATA[${p.description}]]></description>
    </item>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sahid — Blog</title>
    <link>${SITE}/blog</link>
    <description>Python, data science, machine learning, and full-stack development.</description>
    <language>en-us</language>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`.trim();
}

// ── Generate JSON-LD structured data ──────────────────────────────
function generateStructuredData(posts) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Sahid Blog',
    url: `${SITE}/blog`,
    description: 'Python, data science, machine learning, and full-stack development.',
    author: {
      '@type': 'Person',
      name: 'Sahid',
      url: SITE,
    },
    blogPost: posts.slice(0, 10).map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE}/blog/${p.slug}`,
      datePublished: p.date,
      description: p.description,
    })),
  };
  return JSON.stringify(data, null, 2);
}

// ── Main ───────────────────────────────────────────────────────────
function main() {
  const posts = loadPosts();
  console.log(`📝 Found ${posts.length} published blog posts`);

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), generateSitemap(posts));
  console.log('✅ Generated public/sitemap.xml');

  fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), generateRSS(posts));
  console.log('✅ Generated public/rss.xml');

  fs.writeFileSync(
    path.join(PUBLIC_DIR, 'blog-structured-data.json'),
    generateStructuredData(posts)
  );
  console.log('✅ Generated public/blog-structured-data.json');
}

main();
