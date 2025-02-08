/**
 * @file ScrollAreaのストーリー
 * @description ScrollAreaの様々な状態とバリエーションを表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta = {
  title: 'UI/ScrollArea',
  component: ScrollArea,
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
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

// 一意のIDを生成する関数
const generateId = (prefix: string, num: number) => `${prefix}-${num}`

/**
 * @description 基本的なスクロールエリアの表示
 */
export const Default: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      <div className="space-y-4">
        <h4 className="text-sm font-medium leading-none">スクロールコンテンツ</h4>
        {Array.from({ length: 10 }, (_, i) => (
          <div key={generateId('default-item', i)} className="text-sm">
            項目 {i + 1}：スクロール可能なコンテンツの例です。
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // スクロールエリアの存在確認
    const scrollArea = canvas.getByRole('region')
    expect(scrollArea).toBeInTheDocument()
    
    // コンテンツの確認
    const items = canvas.getAllByText(/項目 \d+：/)
    expect(items).toHaveLength(10)
    
    // スクロールバーの確認
    const scrollbar = scrollArea.querySelector('[role="scrollbar"]')
    expect(scrollbar).toBeInTheDocument()
  },
}

/**
 * @description 長いコンテンツを含むスクロールエリア
 */
export const LongContent: Story = {
  render: () => (
    <ScrollArea className="h-[300px] w-[350px] rounded-md border p-4">
      <div className="space-y-4">
        <h4 className="text-sm font-medium leading-none">長いコンテンツ</h4>
        <p className="text-sm text-base-low">
          以下のコンテンツは長いテキストを含み、垂直方向にスクロール可能です。
        </p>
        {Array.from({ length: 20 }, (_, i) => (
          <div key={generateId('long-content', i)} className="rounded-md border p-4">
            <h5 className="mb-2 text-sm font-medium">セクション {i + 1}</h5>
            <p className="text-sm text-base-low">
              これは長いコンテンツの例です。スクロールエリアを使用することで、
              限られたスペースでも多くのコンテンツを表示できます。
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // スクロールエリアの存在確認
    const scrollArea = canvas.getByRole('region')
    expect(scrollArea).toBeInTheDocument()
    
    // セクションの確認
    const sections = canvas.getAllByText(/セクション \d+/)
    expect(sections).toHaveLength(20)
    
    // スクロールバーの確認
    const scrollbar = scrollArea.querySelector('[role="scrollbar"]')
    expect(scrollbar).toBeInTheDocument()
    expect(scrollbar).toHaveAttribute('data-orientation', 'vertical')
  },
}

/**
 * @description 水平スクロール可能なコンテンツ
 */
export const HorizontalScroll: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      <div className="flex space-x-4">
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={generateId('horizontal-card', i)}
            className="h-32 w-32 flex-shrink-0 rounded-md border p-4"
          >
            <h5 className="mb-2 text-sm font-medium">カード {i + 1}</h5>
            <p className="text-sm text-base-low">
              水平スクロール可能なカードの例です。
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // スクロールエリアの存在確認
    const scrollArea = canvas.getByRole('region')
    expect(scrollArea).toBeInTheDocument()
    
    // カードの確認
    const cards = canvas.getAllByText(/カード \d+/)
    expect(cards).toHaveLength(10)
    
    // 水平スクロールバーの確認
    const scrollbar = scrollArea.querySelector('[role="scrollbar"][data-orientation="horizontal"]')
    expect(scrollbar).toBeInTheDocument()
  },
}

/**
 * @description カスタムスタイルを適用したスクロールエリア
 */
export const CustomStyles: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[350px] rounded-md bg-base-ui p-4">
      <div className="space-y-4">
        <h4 className="text-sm font-medium leading-none text-base-high">
          カスタムスタイル
        </h4>
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={generateId('custom-item', i)}
            className="rounded-md bg-background p-4 shadow-sm"
          >
            <h5 className="mb-2 text-sm font-medium">項目 {i + 1}</h5>
            <p className="text-sm text-base-low">
              カスタムスタイルを適用したコンテンツの例です。
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // スクロールエリアの存在確認
    const scrollArea = canvas.getByRole('region')
    expect(scrollArea).toBeInTheDocument()
    expect(scrollArea).toHaveClass('bg-base-ui')
    
    // コンテンツの確認
    const items = canvas.getAllByText(/項目 \d+/)
    expect(items).toHaveLength(10)
    
    // スタイルの確認
    const contentItems = canvas.getAllByText(/カスタムスタイルを適用したコンテンツの例です。/)
    for (const item of contentItems) {
      expect(item.parentElement).toHaveClass('bg-background', 'shadow-sm')
    }
  },
} 