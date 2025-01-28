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
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '**/*.d.ts',
        '**/*.test.{js,jsx,ts,tsx}',
        '**/*.stories.{js,jsx,ts,tsx}',
        'dist/**',
        '.storybook/**',
        'vite.config.ts',
        'tailwind.config.ts',
        'scripts/**'
      ]
    },
    server: {
      deps: {
        inline: [/@radix-ui/]
      }
    }
  },
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

          // React DOM - 機能別に分割
          if (id.includes('node_modules/react-dom/')) {
            if (id.includes('/client/')) {
              return 'react-dom-client';
            }
            if (id.includes('/server/')) {
              return 'react-dom-server';
            }
            return 'react-dom-core';
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

          // アイコンライブラリ（動的インポート用）
          if (id.includes('node_modules/lucide-react/')) {
            // 頻繁に使用されるアイコンをコアバンドルに
            const commonIcons = ['menu', 'search', 'user', 'settings', 'home'];
            const match = id.match(/lucide-react\/dist\/esm\/icons\/([^.]+)\.js$/);
            if (match) {
              const iconName = match[1];
              if (commonIcons.includes(iconName)) {
                return 'icons-common';
              }
              return `icon-${iconName}`;
            }
            return 'icons-core';
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

          // ページ単位でのコード分割
          if (id.includes('/src/pages/')) {
            const match = id.match(/\/src\/pages\/([^/]+)\//);
            if (match) {
              return `page-${match[1].toLowerCase()}`;
            }
            return 'pages-other';
          }

          // 共通コンポーネント（よく使用されるもの）
          if (id.includes('/src/components/ui/') &&
            !id.includes('.test.') &&
            !id.includes('.spec.') &&
            !id.includes('/tests/') &&
            !id.includes('/stories/')) {
            const match = id.match(/\/components\/ui\/([^/]+)\//);
            if (match) {
              return `ui-${match[1]}`;
            }
            return 'ui-components';
          }

          // 機能別コンポーネント
          if (id.includes('/src/components/') &&
            !id.includes('/src/components/ui/') &&
            !id.includes('.test.') &&
            !id.includes('.spec.') &&
            !id.includes('/tests/') &&
            !id.includes('/stories/')) {
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
    modulePreload: {
      polyfill: false
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['@radix-ui/react-accordion']
  }
}))