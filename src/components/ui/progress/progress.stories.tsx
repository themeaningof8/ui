/**
 * @file Progressのストーリー
 * @description Progressの様々な状態とバリエーションを表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from '@/components/ui/progress'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta = {
  title: 'UI/Progress',
  component: Progress,
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
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

/**
 * @description 基本的なプログレスバー
 */
export const Default: Story = {
  render: () => <Progress value={60} className="w-[300px]" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const progress = canvas.getByRole('progressbar')
    
    // プログレスバーの存在確認
    expect(progress).toBeInTheDocument()
    
    // 値と属性の確認
    expect(progress).toHaveAttribute('aria-valuenow', '60')
    expect(progress).toHaveAttribute('aria-valuemin', '0')
    expect(progress).toHaveAttribute('aria-valuemax', '100')
    expect(progress).toHaveClass('w-[300px]')
  },
}

/**
 * @description 異なるサイズのプログレスバー
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <Progress value={60} className="h-2" />
      <Progress value={60} className="h-4" />
      <Progress value={60} className="h-6" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const progressBars = canvas.getAllByRole('progressbar')
    
    // 3つのサイズのプログレスバーが存在することを確認
    expect(progressBars).toHaveLength(3)
    
    // 各サイズのプログレスバーの確認
    const [small, medium, large] = progressBars
    expect(small).toHaveClass('h-2')
    expect(medium).toHaveClass('h-4')
    expect(large).toHaveClass('h-6')
    
    // すべてのプログレスバーが同じ値を持つことを確認
    for (const bar of progressBars) {
      expect(bar).toHaveAttribute('aria-valuenow', '60')
    }
  },
}

/**
 * @description 不定の進捗状態
 */
export const Indeterminate: Story = {
  render: () => (
    <Progress className="w-[300px] animate-progress" value={null} />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const progress = canvas.getByRole('progressbar')
    
    // 不定の進捗状態の確認
    expect(progress).toBeInTheDocument()
    expect(progress).toHaveClass('animate-progress')
    expect(progress).not.toHaveAttribute('aria-valuenow')
    expect(progress).toHaveClass('w-[300px]')
  },
}

/**
 * @description 異なる進捗値
 */
export const Values: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <Progress value={25} />
      <Progress value={50} />
      <Progress value={75} />
      <Progress value={100} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const progressBars = canvas.getAllByRole('progressbar')
    
    // 4つのプログレスバーが存在することを確認
    expect(progressBars).toHaveLength(4)
    
    // 各プログレスバーの値を確認
    const expectedValues = ['25', '50', '75', '100']
    for (const [index, bar] of progressBars.entries()) {
      expect(bar).toHaveAttribute('aria-valuenow', expectedValues[index])
      expect(bar).toHaveAttribute('aria-valuemin', '0')
      expect(bar).toHaveAttribute('aria-valuemax', '100')
    }
  },
} 