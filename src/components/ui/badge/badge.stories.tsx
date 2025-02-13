/**
 * @file バッジコンポーネントのストーリー
 * @description バッジコンポーネントの使用例を表示します
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '.'

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

/**
 * デフォルトのバッジの使用例
 */
export const Default: Story = {
  render: () => <Badge>デフォルト</Badge>,
}

/**
 * セカンダリバリアントのバッジの使用例
 */
export const Secondary: Story = {
  render: () => <Badge variant="secondary">セカンダリ</Badge>,
}

/**
 * デストラクティブバリアントのバッジの使用例
 */
export const Destructive: Story = {
  render: () => <Badge variant="destructive">デストラクティブ</Badge>,
}

/**
 * アウトラインバリアントのバッジの使用例
 */
export const Outline: Story = {
  render: () => <Badge variant="outline">アウトライン</Badge>,
}

/**
 * リンクとして機能するバッジの使用例
 */
export const AsLink: Story = {
  render: () => (
    <Badge asChild>
      <a href="/test">リンクバッジ</a>
    </Badge>
  ),
}

/**
 * 複数のバッジを組み合わせた使用例
 */
export const Combined: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Badge>デフォルト</Badge>
      <Badge variant="secondary">セカンダリ</Badge>
      <Badge variant="destructive">デストラクティブ</Badge>
      <Badge variant="outline">アウトライン</Badge>
      <Badge className="bg-blue-500 hover:bg-blue-600">カスタム</Badge>
    </div>
  ),
}

/**
 * アイコンを含むバッジの使用例
 */
export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-4">
      <Badge>
        <span className="mr-1">✨</span>
        新機能
      </Badge>
      <Badge variant="destructive">
        <span className="mr-1">⚠️</span>
        重要
      </Badge>
    </div>
  ),
} 