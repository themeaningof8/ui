/**
 * @file ボタンコンポーネントのストーリー
 * @description ボタンコンポーネントの使用例を表示します
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '.'

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なボタンの使用例
 */
export const Default: Story = {
  args: {
    children: 'ボタン',
  },
}

/**
 * セカンダリーボタンの使用例
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'セカンダリー',
  },
}

/**
 * アウトラインボタンの使用例
 */
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'アウトライン',
  },
}

/**
 * デストラクティブボタンの使用例
 */
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: '削除',
  },
}

/**
 * ゴーストボタンの使用例
 */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'ゴースト',
  },
}

/**
 * リンクボタンの使用例
 */
export const Link: Story = {
  args: {
    variant: 'link',
    children: 'リンク',
  },
}

/**
 * 大きいサイズのボタンの使用例
 */
export const Large: Story = {
  args: {
    size: 'lg',
    children: '大きいボタン',
  },
}

/**
 * 小さいサイズのボタンの使用例
 */
export const Small: Story = {
  args: {
    size: 'sm',
    children: '小さいボタン',
  },
}

/**
 * アイコン付きボタンの使用例
 */
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
          aria-hidden="true"
          role="presentation"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        ダウンロード
      </>
    ),
  },
}

/**
 * 無効化されたボタンの使用例
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: '無効',
  },
}

/**
 * ローディング状態のボタンの使用例
 */
export const Loading: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          role="presentation"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        読み込み中
      </>
    ),
  },
} 