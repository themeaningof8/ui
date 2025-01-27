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
        manualChunks(id) {
          // React Core
          if (id.includes('node_modules/react/') && !id.includes('node_modules/react/jsx-runtime')) {
            return 'react-core';
          }

          // React JSX Runtime
          if (id.includes('node_modules/react/jsx-runtime')) {
            return 'react-jsx';
          }

          // React DOM
          if (id.includes('node_modules/react-dom/')) {
            return 'react-dom';
          }

          // UIコンポーネントライブラリのチャンク
          if (id.includes('node_modules/@radix-ui/')) {
            // Radix UIの基本機能
            if (id.includes('/core/') || id.includes('/primitive/')) {
              return 'radix-core';
            }
            // Accordionコンポーネント
            if (id.includes('/react-accordion/')) {
              return 'radix-accordion';
            }
            // その他のRadixコンポーネント
            return 'radix-other';
          }

          // アイコンライブラリ
          if (id.includes('node_modules/lucide-react/')) {
            return 'icons';
          }

          // Tailwind関連
          if (id.includes('node_modules/tailwind-variants/') || 
              id.includes('node_modules/tailwind-merge/')) {
            return 'tailwind-utils';
          }

          // アニメーション
          if (id.includes('node_modules/tailwindcss-animate/')) {
            return 'animations';
          }

          // 共通コンポーネント（よく使用されるもの）
          if (id.includes('/src/components/ui/') && 
              !id.includes('.test.') && 
              !id.includes('.spec.') && 
              !id.includes('/tests/') &&
              !id.includes('/stories/')) {
            return 'ui-components';
          }

          // 機能別コンポーネント
          if (id.includes('/src/components/') && 
              !id.includes('/src/components/ui/') &&
              !id.includes('.test.') && 
              !id.includes('.spec.') && 
              !id.includes('/tests/') &&
              !id.includes('/stories/')) {
            // コンポーネントのパスから適切なチャンク名を生成
            const match = id.match(/\/src\/components\/([^/]+)\//);
            if (match) {
              return `component-${match[1]}`;
            }
            return 'components-other';
          }

          // フックのチャンク
          if (id.includes('/src/hooks/') && 
              !id.includes('.test.') && 
              !id.includes('.spec.') && 
              !id.includes('/tests/')) {
            return 'hooks';
          }
        }
      }
    },
    chunkSizeWarningLimit: 500, // 500kb
    minify: 'esbuild',
    sourcemap: true
  }
}))