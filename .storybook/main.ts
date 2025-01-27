/**
 * Storybookメイン設定ファイル
 * @see https://storybook.js.org/docs/configure/main-config
 */
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  typescript: {
    check: false
  },
  async viteFinal(config) {
    return {
      ...config,
      optimizeDeps: {
        exclude: ['node_modules/.cache/storybook']
      }
    };
  }
}

export default config 