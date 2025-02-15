import type { Meta, StoryObj } from '@storybook/react'
import { Label } from '@/components/ui/label'
import { Slider } from '.'

/**
 * `Slider`は、数値範囲から値を選択するためのコンポーネントです。
 * Radix UIのSliderプリミティブをベースに、アクセシビリティと一貫したスタイリングを提供します。
 */
const meta = {
  title: 'UI/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof Slider>

/**
 * 基本的な使用例です。
 */
export const Default: Story = {
  render: () => (
    <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      className="w-[60vw] max-w-[400px]"
    />
  ),
}

/**
 * ラベル付きの例です。
 */
export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="volume">Volume</Label>
      <Slider
        id="volume"
        defaultValue={[50]}
        max={100}
        step={1}
        className="w-[60vw] max-w-[400px]"
      />
      <div className="text-sm text-step-11">
        Adjust the volume level
      </div>
    </div>
  ),
}

/**
 * 複数のつまみを持つ例です。
 */
export const MultipleThumb: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="range">Price Range</Label>
      <Slider
        id="range"
        defaultValue={[25, 75]}
        max={100}
        step={1}
        className="w-[60vw] max-w-[400px]"
      />
      <div className="flex justify-between text-sm text-step-11">
        <span>$0</span>
        <span>$100</span>
      </div>
    </div>
  ),
}

/**
 * ステップ値を持つ例です。
 */
export const WithSteps: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="steps">Size</Label>
      <Slider
        id="steps"
        defaultValue={[40]}
        max={100}
        step={20}
        className="w-[60vw] max-w-[400px]"
      />
      <div className="flex justify-between text-sm text-step-11">
        <span>XS</span>
        <span>S</span>
        <span>M</span>
        <span>L</span>
        <span>XL</span>
      </div>
    </div>
  ),
}

/**
 * 無効化された状態の例です。
 */
export const Disabled: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="disabled">Brightness</Label>
      <Slider
        id="disabled"
        defaultValue={[50]}
        max={100}
        step={1}
        disabled
        className="w-[60vw] max-w-[400px]"
      />
      <div className="text-sm text-step-11">
        This slider is disabled
      </div>
    </div>
  ),
}

/**
 * カスタムスタイルを適用した例です。
 */
export const CustomStyle: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="custom">Temperature</Label>
      <Slider
        id="custom"
        defaultValue={[30]}
        max={100}
        step={1}
        className="w-[60vw] max-w-[400px] [&_[role=slider]]:bg-blue-500 [&_[role=slider]]:border-blue-500 [&_[class*=bg-primary]]:bg-blue-500"
      />
      <div className="flex justify-between text-sm text-step-11">
        <span>Cold</span>
        <span>Hot</span>
      </div>
    </div>
  ),
} 