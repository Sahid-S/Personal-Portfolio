import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'blog-renderer': ['react-markdown', 'remark-gfm', 'remark-breaks',
            'rehype-slug', 'rehype-autolink-headings'],
        }
      }
    }
  },
  // Allow importing markdown files as raw strings
  assetsInclude: ['**/*.md'],
})
