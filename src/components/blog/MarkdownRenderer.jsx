import React, { useContext, useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkDirective from 'remark-directive';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import { visit } from 'unist-util-visit';
import 'katex/dist/katex.min.css';
import { ThemeContext } from '../../App';
import { normalizeMarkdown, getTextContent } from '../../utils/normalizeMarkdown';

const CALLOUT_STYLES = {
  info: 'border-blue-500/70 bg-blue-500/10 text-blue-900 dark:text-blue-100',
  note: 'border-purple-500/70 bg-purple-500/10 text-purple-900 dark:text-purple-100',
  tip: 'border-emerald-500/70 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100',
  warning: 'border-amber-500/70 bg-amber-500/10 text-amber-900 dark:text-amber-100',
  danger: 'border-red-500/70 bg-red-500/10 text-red-900 dark:text-red-100',
};

function slugifyHeading(value) {
  return (value || '')
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function extractYouTubeId(text) {
  const value = (text || '').trim();
  if (!value) return '';
  const urlMatch = value.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  if (urlMatch) return urlMatch[1];
  if (/^[A-Za-z0-9_-]{6,}$/.test(value)) return value;
  return '';
}

function stripCalloutPrefix(children, label) {
  const prefix = new RegExp(`^${label}\\s*[:\\-]\\s*`, 'i');
  const nodes = React.Children.toArray(children);
  if (!nodes.length) return children;

  const first = nodes[0];
  if (typeof first === 'string') {
    return [first.replace(prefix, ''), ...nodes.slice(1)];
  }

  if (React.isValidElement(first)) {
    const childNodes = React.Children.toArray(first.props.children);
    if (!childNodes.length) return children;
    const updatedChildren = childNodes.map((child, index) => {
      if (index === 0 && typeof child === 'string') {
        return child.replace(prefix, '');
      }
      return child;
    });
    return [React.cloneElement(first, { children: updatedChildren }), ...nodes.slice(1)];
  }

  return children;
}

function remarkDirectiveToHtml() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        const data = node.data || (node.data = {});
        data.hName = node.name;
        data.hProperties = node.attributes || {};
      }
    });
  };
}

const Heading = ({ level, id, children, ...props }) => {
  const Tag = `h${level}`;
  return (
    <Tag id={id} className="group scroll-mt-28" {...props}>
      <span className="inline-flex items-center gap-2">
        {children}
        {id && (
          <a
            href={`#${id}`}
            className="opacity-0 group-hover:opacity-100 text-purple-500 text-lg transition-opacity"
            aria-label={`Link to ${id}`}
          >
            #
          </a>
        )}
      </span>
    </Tag>
  );
};

const Callout = ({ variant = 'info', title, children }) => {
  const variantKey = variant.toLowerCase();
  const style = CALLOUT_STYLES[variantKey] || CALLOUT_STYLES.info;

  return (
    <div className={`my-6 border-l-4 rounded-xl p-4 ${style}`}>
      {title && <p className="text-sm font-semibold mb-2 uppercase tracking-wide">{title}</p>}
      <div className="text-base leading-relaxed">{children}</div>
    </div>
  );
};

const ArchitectureBlock = ({ content }) => (
  <div className="my-6 rounded-xl border border-dashed border-purple-400/60 bg-purple-500/5 px-5 py-4 font-mono text-sm text-purple-900 dark:text-purple-100">
    <pre className="whitespace-pre-wrap leading-7">{content}</pre>
  </div>
);

const YoutubeEmbed = ({ id, title }) => {
  if (!id) return null;
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="aspect-video w-full">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={title || 'YouTube video'}
          className="h-full w-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

const CodeBlock = ({ code, language, children, darkMode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className={`relative my-6 rounded-2xl border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'} shadow-lg`}>
      <div className="flex items-center justify-between px-4 py-2 text-xs uppercase tracking-wider text-gray-400">
        <span>{language || 'code'}</span>
        <button
          type="button"
          onClick={handleCopy}
          className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
            copied
              ? 'text-emerald-400'
              : darkMode
              ? 'text-gray-300 hover:text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 pb-4 text-sm leading-relaxed">
        <code className={language ? `language-${language}` : undefined}>{children}</code>
      </pre>
    </div>
  );
};

const MarkdownRenderer = ({ content }) => {
  const { darkMode } = useContext(ThemeContext);
  const normalized = useMemo(() => normalizeMarkdown(content || ''), [content]);
  const toc = useMemo(() => {
    const entries = [];
    const seen = new Map();

    normalized.split('\n').forEach((line) => {
      const match = /^(#{1,6})\s+(.+)/.exec(line);
      if (!match) return;
      const level = match[1].length;
      const text = match[2].trim();
      if (!text) return;
      const base = slugifyHeading(text);
      const count = seen.get(base) || 0;
      seen.set(base, count + 1);
      const id = count ? `${base}-${count}` : base;
      entries.push({ level, text, id });
    });

    return entries;
  }, [normalized]);

  useEffect(() => {
    // Load highlight.js theme stylesheet
    const existingLink = document.getElementById('hljs-theme');
    const href = darkMode
      ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css'
      : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';

    if (existingLink) {
      existingLink.href = href;
    } else {
      const link = document.createElement('link');
      link.id = 'hljs-theme';
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }

  }, [darkMode, content]);

  return (
    <section
      className={`prose max-w-[760px] mx-auto ${
        darkMode ? 'prose-invert text-gray-100' : 'text-gray-800'
      }
      prose-headings:font-bold prose-headings:tracking-tight
      prose-h1:text-[56px] prose-h1:leading-[1.1] prose-h1:mt-0 prose-h1:mb-6
      prose-h2:text-[40px] prose-h2:leading-[1.2] prose-h2:mt-12 prose-h2:mb-4
      prose-h3:text-[30px] prose-h3:leading-[1.3] prose-h3:mt-10 prose-h3:mb-3
      prose-h4:text-[24px] prose-h4:leading-[1.4] prose-h4:mt-8 prose-h4:mb-3
      prose-p:text-[20px] prose-p:leading-[1.9] prose-p:my-7
      prose-a:text-purple-500 prose-a:no-underline hover:prose-a:underline
      prose-code:text-pink-500 prose-code:bg-transparent prose-code:font-mono prose-code:text-sm
      prose-code:before:content-[''] prose-code:after:content-['']
      prose-pre:rounded-xl prose-pre:p-0 prose-pre:bg-transparent prose-pre:shadow-lg prose-pre:my-6
      prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-8
      prose-ul:list-disc prose-ol:list-decimal prose-ul:my-6 prose-ol:my-6 prose-li:my-2
      prose-hr:my-10 prose-hr:border-gray-200 dark:prose-hr:border-gray-700
      prose-img:rounded-xl prose-img:shadow-md
      prose-table:w-full prose-table:my-8 prose-th:text-left prose-th:border-b
      `}
    >
      {toc.length > 2 && (
        <nav aria-label="Table of contents" className="mb-10 rounded-2xl border border-gray-200/70 bg-gray-50/70 p-6 text-sm dark:border-gray-700/70 dark:bg-gray-900/40">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">On this page</p>
          <ul className="mt-3 space-y-2">
            {toc.filter((item) => item.level <= 3).map((item) => (
              <li key={item.id} className={item.level === 3 ? 'ml-4' : ''}>
                <a
                  href={`#${item.id}`}
                  className="text-gray-600 transition-colors hover:text-purple-600 dark:text-gray-300"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <ReactMarkdown
        remarkPlugins={[remarkFrontmatter, remarkGfm, remarkBreaks, remarkMath, remarkDirective, remarkDirectiveToHtml]}
        rehypePlugins={[rehypeRaw, rehypeSlug, rehypeAutolinkHeadings, rehypeHighlight, rehypeKatex]}
        skipHtml={false}
        remarkRehypeOptions={{ allowDangerousHtml: true }}
        components={{
          pre({ children }) {
            const codeElement = React.Children.toArray(children)[0];
            if (!React.isValidElement(codeElement)) return <pre>{children}</pre>;

            const className = codeElement.props.className || '';
            const match = /language-([^\s]+)/.exec(className);
            const language = match ? match[1] : '';
            const rawCode = getTextContent(codeElement.props.children);

            if (language === 'architecture') {
              return <ArchitectureBlock content={rawCode} />;
            }

            if (['warning', 'note', 'info', 'tip', 'danger'].includes(language)) {
              return (
                <Callout variant={language} title={language}>
                  <p>{rawCode}</p>
                </Callout>
              );
            }

            if (language === 'youtube') {
              return <YoutubeEmbed id={extractYouTubeId(rawCode)} title="YouTube video" />;
            }

            return (
              <CodeBlock
                code={rawCode}
                language={language}
                darkMode={darkMode}
              >
                {codeElement.props.children}
              </CodeBlock>
            );
          },
          code({ inline, children, ...props }) {
            if (!inline) {
              return <code {...props}>{children}</code>;
            }
            return (
              <code
                className={`px-2 py-0.5 rounded text-[15px] font-mono ${
                  darkMode
                    ? 'bg-gray-800 text-pink-300'
                    : 'bg-gray-100 text-pink-600'
                }`}
                {...props}
              >
                {children}
              </code>
            );
          },
          h1(props) { return <Heading level={1} {...props} />; },
          h2(props) { return <Heading level={2} {...props} />; },
          h3(props) { return <Heading level={3} {...props} />; },
          h4(props) { return <Heading level={4} {...props} />; },
          // External links open in new tab
          a({ href, children, ...props }) {
            const isExternal = href?.startsWith('http');
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="text-purple-500 hover:text-pink-500 transition-colors"
                {...props}
              >
                {children}
              </a>
            );
          },
          img({ src, alt, ...props }) {
            return (
              <figure className="my-8">
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  className="rounded-2xl shadow-md max-w-full mx-auto cursor-zoom-in"
                  onClick={() => src && window.open(src, '_blank', 'noopener,noreferrer')}
                  {...props}
                />
                {alt && <figcaption className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">{alt}</figcaption>}
              </figure>
            );
          },
          blockquote({ children, ...props }) {
            const text = getTextContent(children);
            const match = /^(note|info|tip|warning|danger)\s*[:\-]\s*/i.exec(text);
            if (match) {
              return (
                <Callout variant={match[1]} title={match[1]}>
                  {stripCalloutPrefix(children, match[1])}
                </Callout>
              );
            }

            return (
              <blockquote
                className={`border-l-4 border-purple-500 pl-4 py-1 my-6 italic rounded-r-lg ${
                  darkMode ? 'bg-purple-900/20 text-gray-300' : 'bg-purple-50 text-gray-700'
                }`}
                {...props}
              >
                {children}
              </blockquote>
            );
          },
          // Table with dark mode
          table({ children, ...props }) {
            return (
              <div className="overflow-x-auto my-6">
                <table
                  className={`min-w-full divide-y rounded-lg overflow-hidden ${
                    darkMode ? 'divide-gray-700' : 'divide-gray-200'
                  }`}
                  {...props}
                >
                  {children}
                </table>
              </div>
            );
          },
          th({ children, ...props }) {
            return (
              <th
                className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                  darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}
                {...props}
              >
                {children}
              </th>
            );
          },
          td({ children, ...props }) {
            return (
              <td
                className={`px-4 py-3 text-sm ${
                  darkMode
                    ? 'text-gray-300 border-gray-700'
                    : 'text-gray-700 border-gray-200'
                } border-b`}
                {...props}
              >
                {children}
              </td>
            );
          },
          input({ checked, ...props }) {
            return (
              <input
                type="checkbox"
                checked={checked}
                readOnly
                className="mr-2 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                {...props}
              />
            );
          },
          callout({ children, ...props }) {
            return (
              <Callout variant={props.type || 'info'} title={props.title || props.type}>
                {children}
              </Callout>
            );
          },
          youtube({ children, ...props }) {
            const id = props.id || extractYouTubeId(getTextContent(children));
            return <YoutubeEmbed id={id} title={props.title} />;
          },
          iframe({ ...props }) {
            return (
              <div className="my-6 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="aspect-video w-full">
                  <iframe {...props} className="h-full w-full" />
                </div>
              </div>
            );
          },
        }}
      >
        {normalized}
      </ReactMarkdown>
    </section>
  );
};

export default MarkdownRenderer;
