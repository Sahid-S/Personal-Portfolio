import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../App';
import { FiClock, FiCalendar, FiTag, FiArrowRight } from 'react-icons/fi';

const BlogCard = ({ post, featured = false, index = 0 }) => {
  const { darkMode } = useContext(ThemeContext);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative rounded-2xl overflow-hidden group ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border shadow-lg hover:shadow-2xl transition-shadow duration-300`}
      >
        <div className="p-6">
          {/* Featured Badge */}
          <div className="mb-4">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Featured
            </span>
          </div>
          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.slice(0, 3).map((tag) => (
                <Link
                  key={tag}
                  to={`/blog?tag=${encodeURIComponent(tag)}`}
                  className={`text-xs px-2 py-1 rounded-full transition-colors ${
                    darkMode
                      ? 'bg-purple-900/50 text-purple-300 hover:bg-purple-800/60'
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h2
            className={`text-xl font-bold mb-2 leading-tight group-hover:text-purple-500 transition-colors ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {post.title}
          </h2>

          {/* Description */}
          <p
            className={`text-sm leading-relaxed mb-4 line-clamp-2 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {post.description}
          </p>

          {/* Meta */}
          <div
            className={`flex items-center justify-between text-xs ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <FiCalendar className="w-3.5 h-3.5" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1">
                <FiClock className="w-3.5 h-3.5" />
                {post.readingTime} min read
              </span>
            </div>
            <Link
              to={`/blog/${post.slug}`}
              className="flex items-center gap-1 text-purple-500 hover:text-pink-500 font-medium transition-colors"
            >
              Read <FiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </motion.article>
    );
  }

  // Standard card
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`rounded-xl overflow-hidden group border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        darkMode
          ? 'bg-gray-800 border-gray-700 hover:border-purple-500/50'
          : 'bg-white border-gray-200 hover:border-purple-300'
      }`}
    >
      <div className="p-5">
        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {post.tags.slice(0, 2).map((tag) => (
              <Link
                key={tag}
                to={`/blog?tag=${encodeURIComponent(tag)}`}
                className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                  darkMode
                    ? 'bg-gray-700 text-purple-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-purple-600 hover:bg-gray-200'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <FiTag className="inline w-2.5 h-2.5 mr-0.5" />
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <Link to={`/blog/${post.slug}`}>
          <h3
            className={`font-bold text-base mb-2 leading-snug group-hover:text-purple-500 transition-colors line-clamp-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {post.title}
          </h3>
        </Link>

        {/* Description */}
        <p
          className={`text-xs leading-relaxed mb-3 line-clamp-2 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          {post.description}
        </p>

        {/* Meta row */}
        <div
          className={`flex items-center justify-between text-xs ${
            darkMode ? 'text-gray-500' : 'text-gray-400'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <FiCalendar className="w-3 h-3" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <FiClock className="w-3 h-3" />
              {post.readingTime}m
            </span>
          </div>
          <Link
            to={`/blog/${post.slug}`}
            className="text-purple-500 hover:text-pink-500 font-semibold transition-colors flex items-center gap-0.5"
          >
            Read <FiArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogCard;
