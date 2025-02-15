import type { Meta, StoryObj } from '@storybook/react'
import { Label } from '.'

/**
 * `Label`は、フォーム要素に関連付けられたラベルを表示するコンポーネントです。
 * Radix UIのLabelプリミティブをベースに、アクセシビリティと一貫したスタイリングを提供します。
 */
const meta = {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs'],
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof Label>

/**
 * 基本的な使用例です。
 */
export const Default: Story = {
  args: {
    children: 'Label Text',
  },
}

/**
 * フォーム要素と組み合わせた使用例です。
 */
export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <input type="email" id="email" placeholder="Email" className="w-full p-2 border rounded" />
    </div>
  ),
}

/**
 * 無効化された状態のフォーム要素と組み合わせた例です。
 */
export const WithDisabledInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="disabled">Disabled Field</Label>
      <input type="text" id="disabled" disabled className="w-full p-2 border rounded" />
    </div>
  ),
}

/**
 * 必須フィールドを示す例です。
 */
export const Required: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="required">
        Required Field <span className="text-red-500">*</span>
      </Label>
      <input type="text" id="required" required className="w-full p-2 border rounded" />
    </div>
  ),
} 