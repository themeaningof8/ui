/**
 * @file Vitestの設定ファイル
 * @description テストの実行環境と設定を定義します
 */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        resources: 'usable',
        url: 'http://localhost/',
      },
    },
    globals: true,
    setupFiles: ['./src/tests/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/*.stories.{ts,tsx}',
        'src/tests/**/*',
      ],
      thresholds: {
        lines: 80,
        branches: 70,
        functions: 75,
        statements: 80,
      },
    },
    deps: {
      inline: [/@radix-ui\/react-.*/, /class-variance-authority/],
    },
    css: true,
    onConsoleLog: (log) => {
      // rechartsの警告を抑制
      if (log.includes('The width(0) and height(0) of chart should be greater than 0')) {
        return false
      }
    },
  }
}) 