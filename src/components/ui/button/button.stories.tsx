/**
 * @file Buttonのストーリー
 * @description Buttonの使用例とバリエーションを表示
 */
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/ui/button'
import { Search, Settings, Loader2 } from 'lucide-react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta = {
  title: 'UI/Button',
  component: Button,
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
  argTypes: {
    asChild: {
      control: 'boolean',
      description: 'Whether to render as a Slot component',
    },
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style of the button',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof Button>

/**
 * @description デフォルトのボタン
 */
export const Default: Story = {
  render: () => <Button>ボタン</Button>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')
    
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('ボタン')
    expect(button).toBeEnabled()
    
    // クリックイベントのテスト
    await userEvent.click(button)
  },
}

/**
 * @description バリアントのバリエーション
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">デフォルト</Button>
      <Button variant="destructive">デストラクティブ</Button>
      <Button variant="outline">アウトライン</Button>
      <Button variant="secondary">セカンダリ</Button>
      <Button variant="ghost">ゴースト</Button>
      <Button variant="link">リンク</Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const buttons = canvas.getAllByRole('button')
    
    // 6つのバリアントが存在することを確認
    expect(buttons).toHaveLength(6)
    
    // 各バリアントのスタイルを確認
    const [defaultBtn, destructive, outline, secondary, ghost, link] = buttons
    expect(defaultBtn).toHaveClass('bg-primary')
    expect(destructive).toHaveClass('bg-destructive')
    expect(outline).toHaveClass('border-input')
    expect(secondary).toHaveClass('bg-secondary')
    expect(ghost).toHaveClass('hover:bg-accent')
    expect(link).toHaveClass('text-primary')
  },
}

/**
 * @description サイズのバリエーション
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Search className="h-4 w-4" />
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const buttons = canvas.getAllByRole('button')
    
    // 4つのサイズが存在することを確認
    expect(buttons).toHaveLength(4)
    
    // 各サイズのクラスを確認
    const [small, defaultSize, large, icon] = buttons
    expect(small).toHaveClass('h-8')
    expect(defaultSize).toHaveClass('h-9')
    expect(large).toHaveClass('h-10')
    expect(icon).toHaveClass('h-9', 'w-9')
  },
}

/**
 * @description 無効化されたボタン
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button disabled>無効化</Button>
      <Button disabled variant="secondary">
        無効化（セカンダリ）
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const buttons = canvas.getAllByRole('button')
    
    // すべてのボタンが無効化されていることを確認
    for (const button of buttons) {
      expect(button).toBeDisabled()
      expect(button).toHaveClass('disabled:opacity-50')
    }
  },
}

/**
 * @description アイコン付きボタン
 */
export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button>
        <Search className="mr-2" />
        検索
      </Button>
      <Button variant="secondary">
        <Settings className="mr-2" />
        設定
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const buttons = canvas.getAllByRole('button')
    
    // アイコンとテキストが正しく表示されていることを確認
    expect(buttons[0]).toHaveTextContent('検索')
    expect(buttons[1]).toHaveTextContent('設定')
  },
}

/**
 * @description ローディング状態のボタン
 */
export const Loading: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button isLoading>
        <Loader2 className="mr-2 animate-spin" />
        読み込み中...
      </Button>
      <Button isLoading variant="outline">
        <Loader2 className="mr-2 animate-spin" />
        読み込み中...
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const buttons = canvas.getAllByRole('button')
    
    // ボタンが無効化されていることを確認
    for (const button of buttons) {
      expect(button).toBeDisabled()
      expect(button).toHaveClass('disabled:opacity-50')
    }
    
    // ローディングアイコンが表示されていることを確認
    const loaders = canvas.getAllByTestId('loader')
    expect(loaders).toHaveLength(2)
    for (const loader of loaders) {
      expect(loader).toHaveClass('animate-spin')
    }
  },
}

/**
 * @description カスタムスタイルを適用したボタン
 */
export const CustomStyles: Story = {
  render: () => (
    <Button className="bg-gradient-to-r from-pink-500 to-violet-500 text-white">
      グラデーション
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')
    
    expect(button).toHaveClass(
      'bg-gradient-to-r',
      'from-pink-500',
      'to-violet-500',
      'text-white'
    )
  },
} 