/**
 * @file AspectRatioのストーリー
 * @description AspectRatioの使用例とバリエーションを表示
 */
import type { Meta, StoryObj } from '@storybook/react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta = {
  title: 'UI/AspectRatio',
  component: AspectRatio,
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
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

/**
 * @description 基本的なアスペクト比の設定（16:9）
 */
export const Default: Story = {
  render: () => (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="写真"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const image = canvas.getByRole('img')
    
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', '写真')
    expect(image).toHaveClass('object-cover', 'w-full', 'h-full')
  },
}

/**
 * @description 正方形のアスペクト比（1:1）
 */
export const Square: Story = {
  render: () => (
    <div className="w-[450px]">
      <AspectRatio ratio={1} data-testid="aspect-ratio">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="正方形の写真"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const aspectRatio = canvas.getByTestId('aspect-ratio')
    // AspectRatio コンポーネントの paddingBottom の値を検証
    expect(aspectRatio).toHaveStyle({ paddingBottom: '100%' })
  },
}

/**
 * @description 縦長のアスペクト比（9:16）
 */
export const Portrait: Story = {
  render: () => (
    <div className="w-[250px]">
      <AspectRatio ratio={9 / 16}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="縦長の写真"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const aspectRatio = canvas.getByTestId('aspect-ratio')
    const style = window.getComputedStyle(aspectRatio)
    expect(style.paddingBottom).toBe('177.777%')
  },
}

/**
 * @description カスタムスタイルを適用したアスペクト比
 */
export const CustomStyles: Story = {
  render: () => (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9} className="bg-muted" data-testid="aspect-ratio">
        <div className="flex items-center justify-center">
          <span className="text-muted-foreground">16:9のアスペクト比</span>
        </div>
      </AspectRatio>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const text = canvas.getByText('16:9のアスペクト比')
    const container = text.closest('div')
    
    expect(text).toBeInTheDocument()
    expect(container).toHaveClass('bg-muted')
  },
} 