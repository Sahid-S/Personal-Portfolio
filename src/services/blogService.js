/**
 * blogService.js
 * Zero-database blog content engine.
 * Reads markdown files from content/blogs/ at build time via Vite's import.meta.glob.
 * Frontmatter is parsed by gray-matter (already a dep of remark ecosystem).
 *
 * Functions exported:
 *  getAllBlogs()        → sorted published posts
 *  getBlogBySlug(slug) → single post with body
 *  searchBlogs(query)  → filtered posts
 *  getFeaturedBlog()   → most recent published post
 *  getBlogsByTag(tag)  → posts with matching tag
 *  generateSlug(title) → URL-safe slug
 *  estimateReadingTime(text) → minutes
 */

// Vite glob import — returns { './path': () => Promise<string> }
// We import as raw strings so gray-matter can parse frontmatter
const markdownModules = import.meta.glob('/content/blogs/*.md', {
  query: '?raw',
  import: 'default',
  eager: false,
});

/**
 * Parse frontmatter from raw markdown.
 * gray-matter is not available in browser builds without bundler — so we
 * implement a lightweight YAML frontmatter parser that handles the subset
 * this project uses (string, array, boolean, number values).
 */
function parseFrontmatter(raw) {
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!fmMatch) {
    return { frontmatter: {}, body: raw };
  }

  const yamlStr = fmMatch[1];
  const body = fmMatch[2];
  const frontmatter = {};

  yamlStr.split('\n').forEach((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();

    if (!key) return;

    // Array value: tags: ["a", "b"]
    if (val.startsWith('[') && val.endsWith(']')) {
      frontmatter[key] = val
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''));
      return;
    }

    // Boolean
    if (val === 'true') { frontmatter[key] = true; return; }
    if (val === 'false') { frontmatter[key] = false; return; }

    // Number
    if (!isNaN(val) && val !== '') { frontmatter[key] = Number(val); return; }

    // Quoted string
    frontmatter[key] = val.replace(/^["']|["']$/g, '');
  });

  return { frontmatter, body };
}

/**
 * Load + parse a single markdown module.
 */
async function loadPost(importFn, filePath) {
  const raw = await importFn();
  const { frontmatter, body } = parseFrontmatter(raw);

  // Derive slug from filename if not in frontmatter
  const fileSlug = filePath
    .replace('/content/blogs/', '')
    .replace('.md', '');

  return {
    slug: frontmatter.slug || fileSlug,
    title: frontmatter.title || fileSlug,
    date: frontmatter.date || '',
    cover: frontmatter.cover || null,
    tags: frontmatter.tags || [],
    published: frontmatter.published !== false,
    description: frontmatter.description || '',
    readingTime: frontmatter.readingTime || estimateReadingTime(body),
    body,
  };
}

/** Load all posts (lazy), sorted newest first, published only. */
export async function getAllBlogs() {
  const posts = await Promise.all(
    Object.entries(markdownModules).map(([path, importFn]) =>
      loadPost(importFn, path)
    )
  );

  return posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

/** Get single post by slug, returns null if not found. */
export async function getBlogBySlug(slug) {
  for (const [path, importFn] of Object.entries(markdownModules)) {
    const fileSlug = path.replace('/content/blogs/', '').replace('.md', '');
    if (fileSlug === slug) {
      const post = await loadPost(importFn, path);
      if (post.published || post.slug === slug) return post;
    }
  }
  return null;
}

/** Simple full-text search across title, description, tags, body. */
export async function searchBlogs(query) {
  if (!query) return getAllBlogs();
  const q = query.toLowerCase();
  const all = await getAllBlogs();
  return all.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.body.toLowerCase().includes(q)
  );
}

/** Return the most recent published post. */
export async function getFeaturedBlog() {
  const all = await getAllBlogs();
  return all[0] || null;
}

/** Filter posts by tag. */
export async function getBlogsByTag(tag) {
  const all = await getAllBlogs();
  return all.filter((p) =>
    p.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

/** All unique tags across published posts. */
export async function getAllTags() {
  const all = await getAllBlogs();
  const tagSet = new Set();
  all.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

/** URL-safe slug from title. */
export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/** Estimate reading time in minutes (avg 200 wpm). */
export function estimateReadingTime(text) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Get related posts (same tags, excluding current slug).
 * Returns up to `limit` posts.
 */
export async function getRelatedPosts(currentSlug, tags, limit = 3) {
  const all = await getAllBlogs();
  return all
    .filter(
      (p) =>
        p.slug !== currentSlug &&
        p.tags.some((t) => tags.includes(t))
    )
    .slice(0, limit);
}
