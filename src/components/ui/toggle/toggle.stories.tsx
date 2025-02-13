import type { Meta, StoryObj } from '@storybook/react'
import { Italic, Bold, Underline } from 'lucide-react'
import { Toggle } from '.'

/**
 * `Toggle`は、オン/オフの状態を切り替えるボタンコンポーネントです。
 * Radix UIのToggleプリミティブをベースに、アクセシビリティと一貫したスタイリングを提供します。
 */
const meta = {
  title: 'UI/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof Toggle>

/**
 * 基本的な使用例です。
 */
export const Default: Story = {
  render: () => <Toggle>Toggle</Toggle>,
}

/**
 * アイコン付きの例です。
 */
export const WithIcon: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Toggle aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </Toggle>
    </div>
  ),
}

/**
 * アウトラインバリアントの例です。
 */
export const Outline: Story = {
  render: () => (
    <Toggle variant="outline">
      Outline
    </Toggle>
  ),
}

/**
 * 異なるサイズの例です。
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Toggle size="sm">Small</Toggle>
      <Toggle size="default">Default</Toggle>
      <Toggle size="lg">Large</Toggle>
    </div>
  ),
}

/**
 * 無効化された状態の例です。
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Toggle disabled>Disabled</Toggle>
      <Toggle disabled pressed>
        Disabled (pressed)
      </Toggle>
    </div>
  ),
}

/**
 * テキストとアイコンを組み合わせた例です。
 */
export const WithTextAndIcon: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Toggle>
        <Bold className="h-4 w-4" />
        Bold
      </Toggle>
      <Toggle variant="outline">
        <Italic className="h-4 w-4" />
        Italic
      </Toggle>
    </div>
  ),
}

/**
 * ツールバーの例です。
 */
export const Toolbar: Story = {
  render: () => (
    <div className="rounded-lg border p-2 w-max">
      <div className="flex items-center space-x-1">
        <Toggle aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle aria-label="Toggle underline">
          <Underline className="h-4 w-4" />
        </Toggle>
      </div>
    </div>
  ),
}

/**
 * プレス済みの状態の例です。
 */
export const Pressed: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Toggle pressed>
        <Bold className="h-4 w-4" />
        Bold
      </Toggle>
      <Toggle variant="outline" pressed>
        <Italic className="h-4 w-4" />
        Italic
      </Toggle>
    </div>
  ),
} 