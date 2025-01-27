/**
 * Storybookプレビュー設定
 * @see https://storybook.js.org/docs/configure/preview
 */
import type { Preview } from '@storybook/react'
import '../src/styles/globals.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'モバイル',
          styles: {
            width: '360px',
            height: '640px',
          },
        },
        tablet: {
          name: 'タブレット',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'デスクトップ',
          styles: {
            width: '1280px',
            height: '800px',
          },
        },
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
      ],
    },
  },
}

export default preview 