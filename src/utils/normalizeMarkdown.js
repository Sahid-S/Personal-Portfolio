const BULLET_CHARS = '[•◦▪‣∙·]';

function extractText(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(extractText).join('');
  if (typeof value === 'object' && value.props && value.props.children) {
    return extractText(value.props.children);
  }
  return '';
}

export function normalizeMarkdown(input = '') {
  let text = input || '';

  text = text.replace(/\r\n?/g, '\n');
  text = text.replace(/<br\s*\/?>/gi, '\n');

  if (/<p\b/i.test(text)) {
    text = text.replace(/<\/p>\s*<p[^>]*>/gi, '\n\n');
    text = text.replace(/<\/?p[^>]*>/gi, '');
  }

  text = text.replace(/<\/?span[^>]*>/gi, '');
  text = text.replace(/\sstyle="[^"]*"/gi, '');
  text = text.replace(/&nbsp;/gi, ' ');

  const lines = text.split('\n');
  let inFence = false;

  const normalized = lines.map((rawLine) => {
    let line = rawLine;

    if (line.trim().startsWith('```')) {
      inFence = !inFence;
      return line;
    }

    if (inFence) {
      return line;
    }

    line = line.replace(/\u00a0/g, ' ');
    line = line.replace(/[\u2018\u2019]/g, "'");
    line = line.replace(/[\u201C\u201D]/g, '"');
    line = line.replace(/[\u2013]/g, '-');
    line = line.replace(/[\u2014]/g, '--');

    const bulletRegex = new RegExp(`^(\\s*)${BULLET_CHARS}\\s+`, 'u');
    line = line.replace(bulletRegex, '$1- ');

    line = line.replace(/^(\s*)\\([*+-])\s+/, '$1$2 ');
    line = line.replace(/^(\s*\d+)\\\./, '$1.');

    line = line.replace(/^(#{7,})\s+/, '###### ');
    line = line.replace(/\t/g, '  ');
    const match = line.match(/^(\s*)(.*)$/);
    const indent = match ? match[1] : '';
    let rest = match ? match[2] : line;
    rest = rest.replace(/[ \t]{2,}/g, ' ');
    line = `${indent}${rest}`;
    line = line.replace(/^[ \t]+$/, '');

    return line;
  });

  return normalized
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function getTextContent(value) {
  return extractText(value).trim();
}
