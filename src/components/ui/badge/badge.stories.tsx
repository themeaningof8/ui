/**
 * @file Badgeのストーリー
 * @description Badgeの使用例とバリエーションを表示
 */
import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@/components/ui/badge'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    onLoad: () => {
      const consoleError = console.error;
      console.error = (...args) => {
        consoleError(...args);
        throw new Error(args.join(' '));
      };
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

/**
 * @description デフォルトのバッジ
 */
export const Default: Story = {
  render: () => <Badge>バッジ</Badge>,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const badge = canvas.getByText('バッジ')
    
    await step("デフォルトバッジの表示確認", async () => {
      expect(badge).toHaveClass('bg-base-solid text-base-on-solid shadow')
    })
  },
}

/**
 * @description セカンダリバッジ
 */
export const Secondary: Story = {
  render: () => <Badge variant="secondary">セカンダリ</Badge>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const badge = canvas.getByText('セカンダリ')
    
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('bg-secondary', 'text-secondary-foreground')
  },
}

/**
 * @description デストラクティブバッジ
 */
export const Destructive: Story = {
  render: () => <Badge variant="destructive">エラー</Badge>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const badge = canvas.getByText('エラー')
    
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('bg-destructive', 'text-destructive-foreground')
  },
}

/**
 * @description アウトラインバッジ
 */
export const Outline: Story = {
  render: () => <Badge variant="outline">アウトライン</Badge>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const badge = canvas.getByText('アウトライン')
    
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('text-foreground')
  },
}

/**
 * @description カスタムスタイルを適用したバッジ
 */
export const CustomStyles: Story = {
  render: () => (
    <Badge className="bg-blue-500 text-white hover:bg-blue-600">
      カスタム
    </Badge>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const badge = canvas.getByText('カスタム')
    
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('bg-blue-500', 'text-white', 'hover:bg-blue-600')
  },
}

/**
 * @description 複数のバッジを組み合わせた例
 */
export const Combined: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge>新着</Badge>
      <Badge variant="secondary">カテゴリ</Badge>
      <Badge variant="outline">タグ</Badge>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const badges = canvas.getAllByRole('div')
    
    expect(badges).toHaveLength(4) // コンテナdivを含む
    
    const [container, badge1, badge2, badge3] = badges
    expect(container).toHaveClass('flex', 'gap-2')
    expect(badge1).toHaveTextContent('新着')
    expect(badge2).toHaveTextContent('カテゴリ')
    expect(badge3).toHaveTextContent('タグ')
  },
} 