/**
 * api/_github.js
 * Shared GitHub REST API helper for blog management serverless functions.
 *
 * Required env vars:
 *   GITHUB_TOKEN  — Personal Access Token with repo write scope
 *   GITHUB_OWNER  — your GitHub username (e.g. "Sahid-S")
 *   GITHUB_REPO   — your portfolio repo name (e.g. "Personal-Portfolio")
 */

const BASE = 'https://api.github.com';

function headers() {
  return {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
    'User-Agent': 'sahid-blog-cms/1.0',
  };
}

const OWNER = () => process.env.GITHUB_OWNER;
const REPO = () => process.env.GITHUB_REPO;

/**
 * Get file info (sha + content) for a path in the repo.
 * Returns null if file doesn't exist.
 */
export async function getFile(path) {
  const url = `${BASE}/repos/${OWNER()}/${REPO()}/contents/${path}`;
  const res = await fetch(url, { headers: headers() });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub getFile failed: ${res.status}`);
  return res.json();
}

/**
 * Create or update a file in the repo.
 * If sha is provided it's an update; omit for new files.
 */
export async function putFile(path, content, message, sha = null) {
  const url = `${BASE}/repos/${OWNER()}/${REPO()}/contents/${path}`;
  const body = {
    message,
    content: Buffer.from(content, 'utf8').toString('base64'),
    branch: process.env.GITHUB_BRANCH || 'main',
  };
  if (sha) body.sha = sha;

  const res = await fetch(url, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`GitHub putFile failed: ${res.status} — ${err.message || ''}`);
  }
  return res.json();
}

/**
 * Delete a file from the repo.
 */
export async function deleteFile(path, sha, message) {
  const url = `${BASE}/repos/${OWNER()}/${REPO()}/contents/${path}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: headers(),
    body: JSON.stringify({
      message,
      sha,
      branch: process.env.GITHUB_BRANCH || 'main',
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`GitHub deleteFile failed: ${res.status} — ${err.message || ''}`);
  }
  return res.json();
}

/**
 * Build frontmatter + body markdown string.
 */
export function buildMarkdown(data) {
  const {
    title,
    slug,
    date,
    cover,
    tags,
    published,
    description,
    readingTime,
    body,
  } = data;

  const tagList = Array.isArray(tags) ? JSON.stringify(tags) : '[]';

  const frontmatter = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `slug: "${slug}"`,
    `date: "${date || new Date().toISOString().split('T')[0]}"`,
    cover ? `cover: "${cover}"` : `cover: ""`,
    `tags: ${tagList}`,
    `published: ${published !== false}`,
    `description: "${(description || '').replace(/"/g, '\\"')}"`,
    `readingTime: ${readingTime || 3}`,
    '---',
    '',
  ].join('\n');

  return frontmatter + (body || '');
}
