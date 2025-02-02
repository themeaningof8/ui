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
import react from '@vitejs/plugin-react'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => ({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    react(),
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
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@lib': resolve(__dirname, './src/lib'),
      '@tests': resolve(__dirname, './src/tests')
    }
  },
  build: {
    outDir: 'dist',
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: mode === 'development',
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@themeaningof8/ui',
      formats: ['es'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime'
        }
      }
    },
    modulePreload: {
      polyfill: false
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['@radix-ui/react-accordion']
  }
}))