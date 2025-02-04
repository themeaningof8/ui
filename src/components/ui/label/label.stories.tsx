/**
 * @file ラベルのストーリー
 * @description ラベルの使用例を表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const meta = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'フォーム要素のラベルを提供するコンポーネント'
      }
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なラベル
 */
export const Default: Story = {
  args: {
    children: 'ラベル'
  }
}

/**
 * 必須項目のラベル
 */
export const Required: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="required">
        必須項目
        <span className="text-destructive-high ml-1">*</span>
      </Label>
      <Input id="required" required />
    </div>
  )
}

/**
 * 無効状態のラベル
 */
export const Disabled: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="disabled">無効状態のラベル</Label>
      <Input id="disabled" disabled />
    </div>
  )
}

/**
 * エラー状態のラベル
 */
export const ErrorState: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="error" className="text-destructive-high">エラー状態のラベル</Label>
      <Input id="error" error />
      <p className="text-sm text-destructive-high">エラーメッセージ</p>
    </div>
  )
}

/**
 * 入力フィールドとの組み合わせ
 */
export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">メールアドレス</Label>
      <Input type="email" id="email" placeholder="example@example.com" />
    </div>
  )
} 