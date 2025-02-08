/**
 * @file ラベルのストーリー
 * @description ラベルの使用例を表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'フォーム要素のラベルを提供するコンポーネント'
      }
    },
    onLoad: () => {
      const consoleError = console.error;
      console.error = (...args) => {
        consoleError(...args);
        throw new Error(args.join(' '));
      };
    },
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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText('ラベル')
    
    // ラベルの存在確認
    expect(label).toBeInTheDocument()
    expect(label.tagName).toBe('LABEL')
  },
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
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText('必須項目')
    const requiredMark = canvas.getByText('*')
    const input = canvas.getByRole('textbox')
    
    // ラベルと必須マークの確認
    expect(label).toBeInTheDocument()
    expect(requiredMark).toHaveClass('text-destructive-high')
    
    // 入力フィールドの必須属性確認
    expect(input).toBeRequired()
    expect(input).toHaveAttribute('id', 'required')
    expect(label).toHaveAttribute('for', 'required')
    
    // ラベルクリックでフォーカス
    await userEvent.click(label)
    expect(input).toHaveFocus()
  },
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
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText('無効状態のラベル')
    const input = canvas.getByRole('textbox')
    
    // ラベルと入力フィールドの確認
    expect(label).toBeInTheDocument()
    expect(input).toBeDisabled()
    
    // 関連付けの確認
    expect(input).toHaveAttribute('id', 'disabled')
    expect(label).toHaveAttribute('for', 'disabled')
    
    // 無効状態での操作確認
    await userEvent.click(label)
    expect(input).not.toHaveFocus()
  },
}

/**
 * エラー状態のラベル
 */
export const ErrorState: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="error" className="text-destructive-high">エラー状態のラベル</Label>
      <Input id="error" aria-invalid="true" className="border-destructive" />
      <p className="text-sm text-destructive-high">エラーメッセージ</p>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText('エラー状態のラベル')
    const input = canvas.getByRole('textbox')
    const errorMessage = canvas.getByText('エラーメッセージ')
    
    // エラー状態の確認
    expect(label).toHaveClass('text-destructive-high')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveClass('border-destructive')
    expect(errorMessage).toHaveClass('text-destructive-high')
    
    // 関連付けの確認
    expect(input).toHaveAttribute('id', 'error')
    expect(label).toHaveAttribute('for', 'error')
    
    // フォーカス操作の確認
    await userEvent.click(label)
    expect(input).toHaveFocus()
  },
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
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText('メールアドレス')
    const input = canvas.getByRole('textbox')
    
    // ラベルと入力フィールドの確認
    expect(label).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toHaveAttribute('placeholder', 'example@example.com')
    
    // 関連付けの確認
    expect(input).toHaveAttribute('id', 'email')
    expect(label).toHaveAttribute('for', 'email')
    
    // ラベルクリックでフォーカスとテキスト入力
    await userEvent.click(label)
    expect(input).toHaveFocus()
    await userEvent.type(input, 'test@example.com')
    expect(input).toHaveValue('test@example.com')
  },
} 