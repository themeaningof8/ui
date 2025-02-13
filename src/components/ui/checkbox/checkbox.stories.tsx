/**
 * @file チェックボックスコンポーネントのストーリー
 * @description チェックボックスコンポーネントの使用例を表示します
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Label } from '@/components/ui/label'
import { Checkbox } from '.'

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なチェックボックスの使用例
 */
export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">利用規約に同意する</Label>
    </div>
  ),
}

/**
 * チェック済み状態のチェックボックスの使用例
 */
export const Checked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" defaultChecked />
      <Label htmlFor="terms">利用規約に同意する</Label>
    </div>
  ),
}

/**
 * 無効化されたチェックボックスの使用例
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" disabled />
      <Label htmlFor="terms" className="text-muted-foreground">
        利用規約に同意する
      </Label>
    </div>
  ),
}

/**
 * カスタムサイズのチェックボックスの使用例
 */
export const CustomSize: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="small" className="h-4 w-4" />
        <Label htmlFor="small">小さいサイズ</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="default" />
        <Label htmlFor="default">デフォルトサイズ</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="large" className="h-6 w-6" />
        <Label htmlFor="large">大きいサイズ</Label>
      </div>
    </div>
  ),
}

/**
 * フォーム内での使用例
 */
export const InForm: Story = {
  render: () => (
    <form className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="newsletter" />
        <Label htmlFor="newsletter">ニュースレターを購読する</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="marketing" />
        <Label htmlFor="marketing">マーケティングメールを受け取る</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" required />
        <Label htmlFor="terms" className="text-sm">
          <span className="text-red-500">*</span> 利用規約に同意する
        </Label>
      </div>
    </form>
  ),
} 