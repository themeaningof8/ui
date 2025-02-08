/**
 * @file Sliderのストーリー
 * @description Sliderの様々な状態とバリエーションを表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from '@/components/ui/slider'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const slider = canvas.getByRole('slider')
    
    // スライダーの存在確認
    expect(slider).toBeInTheDocument()
    
    // 初期値の確認
    expect(slider).toHaveAttribute('aria-valuenow', '50')
    expect(slider).toHaveAttribute('aria-valuemin', '0')
    expect(slider).toHaveAttribute('aria-valuemax', '100')
    
    // キーボード操作のテスト
    await userEvent.keyboard('[ArrowRight]')
    expect(slider).toHaveAttribute('aria-valuenow', '51')
    
    await userEvent.keyboard('[ArrowLeft]')
    expect(slider).toHaveAttribute('aria-valuenow', '50')
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
    className: 'h-4',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const slider = canvas.getByRole('slider')
    
    // スライダーの存在確認
    expect(slider).toBeInTheDocument()
    
    // サイズクラスの確認
    expect(slider.closest('[role="slider"]')).toHaveClass('h-4')
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
    className: 'h-6',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const slider = canvas.getByRole('slider')
    
    // スライダーの存在確認
    expect(slider).toBeInTheDocument()
    
    // サイズクラスの確認
    expect(slider.closest('[role="slider"]')).toHaveClass('h-6')
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const slider = canvas.getByRole('slider')
    
    // 無効化状態の確認
    expect(slider).toBeDisabled()
    expect(slider).toHaveClass('cursor-not-allowed')
    
    // キーボード操作が無効化されていることを確認
    await userEvent.keyboard('[ArrowRight]')
    expect(slider).toHaveAttribute('aria-valuenow', '50')
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const slider = canvas.getByRole('slider')
    
    // 初期値の確認
    expect(slider).toHaveAttribute('aria-valuenow', '0')
    
    // ステップ値でのキーボード操作をテスト
    await userEvent.keyboard('[ArrowRight]')
    expect(slider).toHaveAttribute('aria-valuenow', '10')
    
    await userEvent.keyboard('[ArrowRight]')
    expect(slider).toHaveAttribute('aria-valuenow', '20')
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // 各スライダーの存在確認
    const sliders = canvas.getAllByRole('slider')
    expect(sliders).toHaveLength(3)
    
    // 各スライダーのラベルと初期値を確認
    const volumeSlider = canvas.getByLabelText('音量')
    const brightnessSlider = canvas.getByLabelText('明るさ')
    const contrastSlider = canvas.getByLabelText('コントラスト')
    
    expect(volumeSlider).toHaveAttribute('aria-valuenow', '75')
    expect(brightnessSlider).toHaveAttribute('aria-valuenow', '50')
    expect(contrastSlider).toHaveAttribute('aria-valuenow', '25')
    
    // スライダーの操作テスト
    await userEvent.click(volumeSlider)
    await userEvent.keyboard('[ArrowRight]')
    expect(volumeSlider).toHaveAttribute('aria-valuenow', '76')
    
    await userEvent.click(brightnessSlider)
    await userEvent.keyboard('[ArrowLeft]')
    expect(brightnessSlider).toHaveAttribute('aria-valuenow', '49')
    
    await userEvent.click(contrastSlider)
    await userEvent.keyboard('[ArrowRight][ArrowRight]')
    expect(contrastSlider).toHaveAttribute('aria-valuenow', '27')
  },
} 