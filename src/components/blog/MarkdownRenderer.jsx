import React, { useContext, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { ThemeContext } from '../../App';

// Highlight.js styles loaded dynamically based on theme
let hlLoaded = false;
async function loadHl() {
  if (hlLoaded) return;
  hlLoaded = true;
  // Vite-safe dynamic import
  const hljs = (await import('highlight.js')).default;
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightElement(block);
  });
}

const MarkdownRenderer = ({ content }) => {
  const { darkMode } = useContext(ThemeContext);

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

    // Run highlighter after render
    setTimeout(loadHl, 100);
  }, [darkMode, content]);

  return (
    <div
      className={`prose prose-lg max-w-none ${
        darkMode ? 'prose-invert text-gray-100' : 'text-gray-800'
      }
      prose-headings:font-bold
      prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
      prose-h2:text-2xl prose-h2:mt-6 prose-h2:mb-3
      prose-h3:text-xl prose-h3:mt-5 prose-h3:mb-2
      prose-p:leading-relaxed prose-p:mb-4
      prose-a:text-purple-500 prose-a:no-underline hover:prose-a:underline
      prose-code:text-pink-500 prose-code:bg-transparent prose-code:font-mono prose-code:text-sm
      prose-pre:rounded-xl prose-pre:p-0 prose-pre:bg-transparent prose-pre:shadow-lg
      prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:pl-4 prose-blockquote:italic
      prose-ul:list-disc prose-ol:list-decimal
      prose-img:rounded-xl prose-img:shadow-md
      prose-table:w-full prose-th:text-left prose-th:border-b
      `}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
        components={{
          // Code block with filename support
          pre({ children, ...props }) {
            return (
              <div
                className={`relative rounded-xl overflow-hidden my-6 shadow-lg ${
                  darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <pre {...props} className="overflow-x-auto p-4 text-sm">
                  {children}
                </pre>
              </div>
            );
          },
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            if (!inline && match) {
              return (
                <code className={`${className} block`} {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code
                className={`px-1.5 py-0.5 rounded text-sm font-mono ${
                  darkMode
                    ? 'bg-gray-800 text-pink-400'
                    : 'bg-gray-100 text-pink-600'
                }`}
                {...props}
              >
                {children}
              </code>
            );
          },
          // Heading anchor links
          h2({ children, id, ...props }) {
            return (
              <h2 id={id} className="group flex items-center gap-2" {...props}>
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
              </h2>
            );
          },
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
          // Responsive images
          img({ src, alt, ...props }) {
            return (
              <img
                src={src}
                alt={alt}
                loading="lazy"
                className="rounded-xl shadow-md max-w-full mx-auto"
                {...props}
              />
            );
          },
          // Blockquote with portfolio styling
          blockquote({ children, ...props }) {
            return (
              <blockquote
                className={`border-l-4 border-purple-500 pl-4 py-1 my-4 italic rounded-r-lg ${
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
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
