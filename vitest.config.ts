/**
 * @file Vitestのメイン設定ファイル
 * @description Vite設定と統合されたテスト設定
 */
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@lib': resolve(__dirname, './src/lib'),
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{js,jsx,ts,tsx}'],
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
  }
}) 