import React, { useContext, useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';
import SEO from '../components/SEO';
import BlogCard from '../components/blog/BlogCard';
import { getAllBlogs, searchBlogs, getBlogsByTag, getAllTags } from '../services/blogService';
import { FiSearch, FiX, FiTag, FiBookOpen } from 'react-icons/fi';

const Blog = () => {
  const { darkMode } = useContext(ThemeContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [activeTag, setActiveTag] = useState(searchParams.get('tag') || '');

  // Load posts on mount
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [posts, tags] = await Promise.all([getAllBlogs(), getAllTags()]);
      setAllPosts(posts);
      setAllTags(tags);
      setLoading(false);
    };
    load();
  }, []);

  // Filter when search/tag changes
  useEffect(() => {
    const filter = async () => {
      if (!allPosts.length) return;

      let result = allPosts;

      if (activeTag) {
        result = result.filter((p) =>
          p.tags.map((t) => t.toLowerCase()).includes(activeTag.toLowerCase())
        );
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        result = result.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.tags.some((t) => t.toLowerCase().includes(q))
        );
      }

      setFilteredPosts(result);
    };
    filter();
  }, [allPosts, searchQuery, activeTag]);

  // Sync URL params
  useEffect(() => {
    const params = {};
    if (searchQuery) params.q = searchQuery;
    if (activeTag) params.tag = activeTag;
    setSearchParams(params, { replace: true });
  }, [searchQuery, activeTag]);

  const clearFilters = () => {
    setSearchQuery('');
    setActiveTag('');
  };

  const featured = filteredPosts[0];
  const rest = filteredPosts.slice(1);
  const hasFilters = searchQuery || activeTag;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Blog — Sahid | Python, Data Science & Full-Stack"
        description="Articles on Python, data science, machine learning, React, and software engineering by Sahid."
        keywords="sahid blog, python tutorial, data science, machine learning, react, software engineering"
        ogType="blog"
        canonicalUrl="https://www.sahid.me/blog"
      />

      <main className={`min-h-screen pt-20 pb-16 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <FiBookOpen className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-semibold uppercase tracking-widest text-purple-500">
                Blog
              </span>
            </div>
            <h1
              className={`text-4xl md:text-5xl font-bold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Thoughts &{' '}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Tutorials
              </span>
            </h1>
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Writing about Python, data science, machine learning, and building things on the web.
            </p>

          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative max-w-xl mx-auto">
              <FiSearch
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  darkMode ? 'text-gray-500' : 'text-gray-400'
                }`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className={`w-full pl-11 pr-10 py-3 rounded-xl border outline-none transition-colors text-sm ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-purple-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                    darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Tags Filter */}
          {allTags.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-2 mb-10"
            >
              <button
                onClick={() => setActiveTag('')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  !activeTag
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow'
                    : darkMode
                    ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                All Posts
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeTag === tag
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow'
                      : darkMode
                      ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <FiTag className="w-3 h-3" />
                  {tag}
                </button>
              ))}
            </motion.div>
          )}

          {/* Active filters indicator */}
          {hasFilters && (
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''}
                {activeTag && ` in #${activeTag}`}
                {searchQuery && ` for "${searchQuery}"`}
              </span>
              <button
                onClick={clearFilters}
                className="text-xs text-purple-500 hover:text-pink-500 underline transition-colors"
              >
                Clear
              </button>
            </div>
          )}

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className={`text-4xl mb-4`}>🔍</p>
              <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                No posts found
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Try a different search or tag filter.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 text-purple-500 hover:text-pink-500 text-sm underline transition-colors"
              >
                Show all posts
              </button>
            </motion.div>
          )}

          {/* Featured Post */}
          {!hasFilters && featured && (
            <section className="mb-12">
              <h2 className={`text-sm font-semibold uppercase tracking-widest mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Latest Post
              </h2>
              <BlogCard post={featured} featured />
            </section>
          )}

          {/* All Posts Grid */}
          {(hasFilters ? filteredPosts : rest).length > 0 && (
            <section>
              {!hasFilters && (
                <h2 className={`text-sm font-semibold uppercase tracking-widest mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  All Posts
                </h2>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(hasFilters ? filteredPosts : rest).map((post, index) => (
                  <BlogCard key={post.slug} post={post} index={index} />
                ))}
              </div>
            </section>
          )}

          {/* Featured post when filtering - show all */}
          {hasFilters && filteredPosts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* already rendered above */}
            </div>
          )}

        </div>
      </main>
    </>
  );
};

export default Blog;
