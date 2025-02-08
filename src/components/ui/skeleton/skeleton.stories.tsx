/**
 * @file Skeletonのストーリー
 * @description Skeletonの様々な状態とバリエーションを表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from '@/components/ui/skeleton'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
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
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

/**
 * @description 基本的なスケルトン
 */
export const Default: Story = {
  render: () => <Skeleton className="h-4 w-[250px]" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const skeleton = canvas.getByTestId('skeleton')
    
    // スケルトンの存在確認
    expect(skeleton).toBeInTheDocument()
    
    // スタイルの確認
    expect(skeleton).toHaveClass('h-4', 'w-[250px]')
    expect(skeleton).toHaveStyle({
      height: '1rem',
      width: '250px',
    })
  },
}

/**
 * @description 円形のスケルトン（アバター用）
 */
export const Circle: Story = {
  render: () => <Skeleton className="h-12 w-12 rounded-full" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const skeleton = canvas.getByTestId('skeleton')
    
    // スケルトンの存在確認
    expect(skeleton).toBeInTheDocument()
    
    // 円形スタイルの確認
    expect(skeleton).toHaveClass('h-12', 'w-12', 'rounded-full')
    expect(skeleton).toHaveStyle({
      height: '3rem',
      width: '3rem',
    })
  },
}

/**
 * @description カードのスケルトン
 */
export const Card: Story = {
  render: () => (
    <div className="space-y-3">
      <Skeleton className="h-[200px] w-full rounded-xl" />
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const skeletons = canvas.getAllByTestId('skeleton')
    
    // 3つのスケルトンが存在することを確認
    expect(skeletons).toHaveLength(3)
    
    // 各スケルトンのスタイルを確認
    const [image, title, description] = skeletons
    
    expect(image).toHaveClass('h-[200px]', 'w-full', 'rounded-xl')
    expect(title).toHaveClass('h-4', 'w-[250px]')
    expect(description).toHaveClass('h-4', 'w-[200px]')
  },
}

/**
 * @description リストのスケルトン
 */
export const List: Story = {
  render: () => (
    <div className="space-y-3">
      {Array.from({ length: 5 }, () => (
        <div key={`list-item-${crypto.randomUUID()}`} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const skeletons = canvas.getAllByTestId('skeleton')
    
    // 15個のスケルトンが存在することを確認（5アイテム × 3要素）
    expect(skeletons).toHaveLength(15)
    
    // アバタースケルトンの確認
    const avatarSkeletons = skeletons.filter(skeleton => 
      skeleton.classList.contains('rounded-full')
    )
    expect(avatarSkeletons).toHaveLength(5)
    
    // テキストスケルトンの確認
    const textSkeletons = skeletons.filter(skeleton => 
      !skeleton.classList.contains('rounded-full')
    )
    expect(textSkeletons).toHaveLength(10)
    
    // 各アバタースケルトンのスタイルを確認
    for (const avatar of avatarSkeletons) {
      expect(avatar).toHaveClass('h-12', 'w-12', 'rounded-full')
    }
  },
} 