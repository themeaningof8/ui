/**
 * @file Sliderのストーリー
 * @description Sliderの様々な状態とバリエーションを表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from '@/components/ui/slider'

const meta = {
  title: 'UI/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

/**
 * @description 基本的なスライダーの表示
 */
export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
  },
}

/**
 * @description 小さいサイズのスライダー
 */
export const Small: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    size: 'sm',
  },
}

/**
 * @description 大きいサイズのスライダー
 */
export const Large: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    size: 'lg',
  },
}

/**
 * @description 無効化されたスライダー
 */
export const Disabled: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    disabled: true,
  },
}

/**
 * @description ステップ値が設定されたスライダー
 */
export const WithSteps: Story = {
  args: {
    defaultValue: [0],
    max: 100,
    step: 10,
  },
}

/**
 * @description 複数のスライダーの表示
 */
export const MultipleSliders: Story = {
  render: () => (
    <div className="w-[60vw] space-y-4">
      <div className="space-y-1">
        <label htmlFor="volume-slider" className="text-sm font-medium text-base-high">音量</label>
        <Slider id="volume-slider" defaultValue={[75]} max={100} step={1} />
      </div>
      <div className="space-y-1">
        <label htmlFor="brightness-slider" className="text-sm font-medium text-base-high">明るさ</label>
        <Slider id="brightness-slider" defaultValue={[50]} max={100} step={1} />
      </div>
      <div className="space-y-1">
        <label htmlFor="contrast-slider" className="text-sm font-medium text-base-high">コントラスト</label>
        <Slider id="contrast-slider" defaultValue={[25]} max={100} step={1} />
      </div>
    </div>
  ),
} 