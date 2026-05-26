import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../App';
import { FiEye, FiEdit2, FiTag, FiX, FiPlus } from 'react-icons/fi';
import MarkdownRenderer from './MarkdownRenderer';
import { generateSlug, estimateReadingTime } from '../../services/blogService';

const BlogForm = ({ initialData = {}, onSubmit, isSubmitting = false }) => {
  const { darkMode } = useContext(ThemeContext);
  const [preview, setPreview] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const [form, setForm] = useState({
    title: initialData.title || '',
    slug: initialData.slug || '',
    description: initialData.description || '',
    cover: initialData.cover || '',
    tags: initialData.tags || [],
    published: initialData.published ?? true,
    body: initialData.body || '# Write your post here\n\nStart writing...',
  });

  const handleChange = (field, value) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      // Auto-generate slug from title
      if (field === 'title' && !initialData.slug) {
        updated.slug = generateSlug(value);
      }
      return updated;
    });
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !form.tags.includes(tag)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    }
    setTagInput('');
  };

  const removeTag = (tag) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      readingTime: estimateReadingTime(form.body),
    });
  };

  const inputClass = `w-full rounded-lg px-4 py-2.5 text-sm outline-none border transition-colors ${
    darkMode
      ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-purple-500'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500'
  }`;

  const labelClass = `block text-xs font-semibold uppercase tracking-wider mb-1 ${
    darkMode ? 'text-gray-400' : 'text-gray-500'
  }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className={labelClass}>Title *</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="My Awesome Blog Post"
          className={inputClass}
          required
        />
      </div>

      {/* Slug + Cover (2-col) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Slug *</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => handleChange('slug', e.target.value)}
            placeholder="my-awesome-blog-post"
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Cover Image URL</label>
          <input
            type="text"
            value={form.cover}
            onChange={(e) => handleChange('cover', e.target.value)}
            placeholder="/assets/blog-covers/my-post.jpg"
            className={inputClass}
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Description / Excerpt *</label>
        <textarea
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="A short description for SEO and blog cards..."
          rows={2}
          className={`${inputClass} resize-none`}
          required
        />
      </div>

      {/* Tags */}
      <div>
        <label className={labelClass}>Tags</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {form.tags.map((tag) => (
            <span
              key={tag}
              className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                darkMode
                  ? 'bg-purple-900/60 text-purple-300'
                  : 'bg-purple-100 text-purple-700'
              }`}
            >
              <FiTag className="w-3 h-3" />
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-red-400 ml-1"
              >
                <FiX className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="python, data-science... (Enter to add)"
            className={`${inputClass} flex-1`}
          />
          <button
            type="button"
            onClick={addTag}
            className="px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
          >
            <FiPlus />
          </button>
        </div>
      </div>

      {/* Published toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => handleChange('published', !form.published)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            form.published ? 'bg-purple-600' : darkMode ? 'bg-gray-700' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 rounded-full bg-white transition-transform shadow ${
              form.published ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {form.published ? 'Published' : 'Draft'}
        </span>
      </div>

      {/* Markdown Editor / Preview */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className={labelClass}>Content (Markdown) *</label>
          <button
            type="button"
            onClick={() => setPreview(!preview)}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            {preview ? (
              <>
                <FiEdit2 className="w-3.5 h-3.5" /> Edit
              </>
            ) : (
              <>
                <FiEye className="w-3.5 h-3.5" /> Preview
              </>
            )}
          </button>
        </div>

        {preview ? (
          <div
            className={`min-h-64 rounded-xl border p-6 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}
          >
            <MarkdownRenderer content={form.body} />
          </div>
        ) : (
          <textarea
            value={form.body}
            onChange={(e) => handleChange('body', e.target.value)}
            rows={20}
            className={`${inputClass} font-mono text-sm resize-y`}
            placeholder="# Post Title&#10;&#10;Start writing your post in Markdown..."
            required
          />
        )}
      </div>

      {/* Reading time estimate */}
      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
        Estimated reading time: ~{estimateReadingTime(form.body)} min
        &nbsp;·&nbsp; {form.body.trim().split(/\s+/).length} words
      </p>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/25"
        >
          {isSubmitting ? 'Publishing...' : 'Publish to GitHub →'}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
