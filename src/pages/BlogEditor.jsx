import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../App';
import BlogForm from '../components/blog/BlogForm';
import { getAllBlogs } from '../services/blogService';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiLogOut,
  FiExternalLink,
  FiCheckCircle,
  FiAlertCircle,
  FiBookOpen,
  FiEye,
} from 'react-icons/fi';

const BlogEditor = () => {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [view, setView] = useState('list'); // 'list' | 'new' | 'edit'
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null); // { type, message }

  // Auth guard
  useEffect(() => {
    const token = sessionStorage.getItem('admin_token');
    if (!token) navigate('/admin');
  }, [navigate]);

  // Load posts
  const loadPosts = async () => {
    setLoading(true);
    const all = await getAllBlogs();
    // Admin sees all posts (including drafts once we can detect them)
    setPosts(all);
    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch {}
    sessionStorage.removeItem('admin_token');
    navigate('/admin');
  };

  const handlePublish = async (formData) => {
    setIsSubmitting(true);
    try {
      const endpoint = editingPost ? '/api/blog/edit' : '/api/blog/create';
      const payload = editingPost
        ? { ...formData, originalSlug: editingPost.slug }
        : formData;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showNotification(
          'success',
          `✅ "${formData.title}" published! Vercel will deploy in ~30 seconds.`
        );
        setView('list');
        setEditingPost(null);
        // Reload after short delay to pick up new post
        setTimeout(loadPosts, 2000);
      } else if (res.status === 401) {
        showNotification('error', 'Session expired. Please log in again.');
        sessionStorage.removeItem('admin_token');
        navigate('/admin');
      } else {
        showNotification('error', data.message || 'Failed to publish. Check GitHub token env var.');
      }
    } catch {
      showNotification('error', 'Network error. Check Vercel function logs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (post) => {
    if (!window.confirm(`Delete "${post.title}"? This will commit a deletion to GitHub.`)) return;

    try {
      const res = await fetch('/api/blog/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ slug: post.slug }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showNotification('success', `Deleted "${post.title}". Deploying...`);
        loadPosts();
      } else {
        showNotification('error', data.message || 'Delete failed.');
      }
    } catch {
      showNotification('error', 'Network error during delete.');
    }
  };

  const card = `rounded-xl border p-5 transition-colors ${
    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
  }`;

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      {/* Top bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 border-b px-6 py-3 flex items-center justify-between ${
          darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Sahid
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${darkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
            Admin
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/blog"
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-purple-500 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            <FiEye className="w-4 h-4" /> View Blog
          </Link>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-red-500 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            <FiLogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      {/* Notification toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            className={`fixed top-16 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl shadow-xl text-sm font-medium flex items-center gap-2 max-w-lg ${
              notification.type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {notification.type === 'success' ? (
              <FiCheckCircle className="w-4 h-4 flex-shrink-0" />
            ) : (
              <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
            )}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20 pb-16 container mx-auto px-4 sm:px-6 max-w-5xl">

        {/* View: List */}
        {view === 'list' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Blog Posts
                </h1>
                <p className={`text-sm mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {posts.length} published post{posts.length !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={() => { setEditingPost(null); setView('new'); }}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg hover:shadow-purple-500/25"
              >
                <FiPlus className="w-4 h-4" /> New Post
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : posts.length === 0 ? (
              <div className={`${card} flex flex-col items-center py-16 text-center`}>
                <FiBookOpen className={`w-12 h-12 mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  No posts yet
                </h3>
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Write your first blog post and publish it to GitHub.
                </p>
                <button
                  onClick={() => setView('new')}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-xl"
                >
                  Write First Post
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {posts.map((post) => (
                  <div key={post.slug} className={`${card} flex items-center gap-4`}>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {post.title}
                      </h3>
                      <div className={`flex items-center gap-3 text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        <span>{formatDate(post.date)}</span>
                        <span>·</span>
                        <span>{post.readingTime} min read</span>
                        {post.tags?.slice(0, 2).map((t) => (
                          <span key={t} className={`px-1.5 py-0.5 rounded ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Link
                        to={`/blog/${post.slug}`}
                        target="_blank"
                        className={`p-2 rounded-lg transition-colors hover:text-purple-500 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}
                        title="View live"
                      >
                        <FiExternalLink className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => { setEditingPost(post); setView('edit'); }}
                        className={`p-2 rounded-lg transition-colors hover:text-purple-500 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}
                        title="Edit"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post)}
                        className={`p-2 rounded-lg transition-colors hover:text-red-500 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}
                        title="Delete"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* View: New / Edit */}
        {(view === 'new' || view === 'edit') && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-8">
              <button
                onClick={() => { setView('list'); setEditingPost(null); }}
                className={`text-sm font-medium hover:text-purple-500 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
              >
                ← Back to Posts
              </button>
              <span className={darkMode ? 'text-gray-700' : 'text-gray-300'}>/</span>
              <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {view === 'edit' ? `Edit: ${editingPost?.title}` : 'New Post'}
              </h1>
            </div>

            <div className={card}>
              <BlogForm
                initialData={editingPost || {}}
                onSubmit={handlePublish}
                isSubmitting={isSubmitting}
              />
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default BlogEditor;
