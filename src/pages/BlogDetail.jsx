import React, { useContext, useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';
import SEO from '../components/SEO';
import MarkdownRenderer from '../components/blog/MarkdownRenderer';
import BlogCard from '../components/blog/BlogCard';
import { getBlogBySlug, getRelatedPosts } from '../services/blogService';
import {
  FiArrowLeft,
  FiClock,
  FiCalendar,
  FiTag,
  FiShare2,
  FiTwitter,
  FiLinkedin,
  FiLink,
} from 'react-icons/fi';

const BlogDetail = () => {
  const { slug } = useParams();
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const articleRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setNotFound(false);
      const found = await getBlogBySlug(slug);
      if (!found) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setPost(found);
      const rel = await getRelatedPosts(found.slug, found.tags);
      setRelated(rel);
      setLoading(false);
    };
    load();
  }, [slug]);

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const el = articleRef.current;
      const totalHeight = el.offsetHeight;
      const scrolled = window.scrollY - el.offsetTop + window.innerHeight;
      const pct = Math.min(100, Math.max(0, (scrolled / totalHeight) * 100));
      setReadProgress(pct);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : '';

  const shareUrl = `https://www.sahid.me/blog/${slug}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-5xl">📭</p>
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Post not found
        </h1>
        <Link to="/blog" className="text-purple-500 hover:underline">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${post.title} — Sahid Blog`}
        description={post.description}
        keywords={post.tags.join(', ')}
        ogType="article"
        ogImage="/og.png"
        canonicalUrl={shareUrl}
      />

      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50 transition-all duration-100"
        style={{ width: `${readProgress}%` }}
      />

      <main
        className={`min-h-screen pt-20 pb-16 transition-colors duration-300 ${
          darkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

          {/* Back */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              to="/blog"
              className={`inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-purple-500 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              <FiArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </motion.div>

          <article ref={articleRef}>
            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/blog?tag=${encodeURIComponent(tag)}`}
                      className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                        darkMode
                          ? 'bg-purple-900/50 text-purple-300 hover:bg-purple-800/70'
                          : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                      }`}
                    >
                      <FiTag className="w-3 h-3" />
                      {tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1
                className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {post.title}
              </h1>

              {/* Meta row */}
              <div
                className={`flex flex-wrap items-center gap-4 text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <FiCalendar className="w-4 h-4" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiClock className="w-4 h-4" />
                  {post.readingTime} min read
                </span>

                {/* Share buttons */}
                <div className="flex items-center gap-2 ml-auto">
                  <span className="flex items-center gap-1 text-xs font-medium">
                    <FiShare2 className="w-3.5 h-3.5" /> Share:
                  </span>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg hover:text-blue-400 transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <FiTwitter className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg hover:text-blue-600 transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <FiLinkedin className="w-4 h-4" />
                  </a>
                  <button
                    onClick={copyLink}
                    className={`p-1.5 rounded-lg transition-colors ${
                      copied ? 'text-green-500' : 'hover:text-purple-500'
                    }`}
                    aria-label="Copy link"
                  >
                    <FiLink className="w-4 h-4" />
                  </button>
                  {copied && (
                    <span className="text-xs text-green-500 font-medium">Copied!</span>
                  )}
                </div>
              </div>

            </motion.header>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className={`rounded-2xl p-6 md:p-10 shadow-sm border ${
                darkMode
                  ? 'bg-gray-800/50 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              <MarkdownRenderer content={post.body} />
            </motion.div>

            {/* Footer share strip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`mt-8 p-5 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
                darkMode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div>
                <p className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Found this useful?
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Share it with someone who'd benefit.
                </p>
              </div>
              <div className="flex gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  <FiTwitter className="w-4 h-4" /> Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  <FiLinkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </motion.div>
          </article>

          {/* Related Posts */}
          {related.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-14"
            >
              <h2
                className={`text-xl font-bold mb-6 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Related Articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((p, i) => (
                  <BlogCard key={p.slug} post={p} index={i} />
                ))}
              </div>
            </motion.section>
          )}

          {/* Back link */}
          <div className="mt-12 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-purple-500 hover:text-pink-500 font-medium transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" /> All Posts
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default BlogDetail;
