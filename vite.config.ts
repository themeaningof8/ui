/**
 * Vite設定ファイル（Tailwind統合用）
 * @see https://vitejs.dev/config/
 */
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => ({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    mode === 'analyze' && visualizer({
      filename: 'dist/stats.html',
      template: 'network',
      gzipSize: true,
      brotliSize: true,
      sourcemap: true,
      open: true,
      title: 'Bundle Analysis'
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-accordion', 'lucide-react'],
          'utils': ['tailwind-variants', 'tailwind-merge']
        }
      }
    },
    chunkSizeWarningLimit: 500, // 500kb
    minify: 'esbuild',
    sourcemap: true
  }
}))