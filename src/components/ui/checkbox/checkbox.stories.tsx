/**
 * @file Checkboxのストーリー
 * @description Checkboxの使用例とバリエーションを表示
 */
import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    // Add error handling
    onLoad: () => {
      const consoleError = console.error;
      console.error = (...args) => {
        consoleError(...args);
        throw new Error(args.join(' '));
      };
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

/**
 * @description 基本的なチェックボックス
 */
export const Default: Story = {
  render: () => <Checkbox />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox')
    
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()
    
    // チェックボックスをクリック
    await userEvent.click(checkbox)
    expect(checkbox).toBeChecked()
    
    // もう一度クリックして解除
    await userEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()
  },
}

/**
 * @description ラベル付きチェックボックス
 */
export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">利用規約に同意する</Label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox')
    const label = canvas.getByText('利用規約に同意する')
    
    expect(checkbox).toBeInTheDocument()
    expect(label).toBeInTheDocument()
    
    // ラベルをクリックしてチェックボックスを操作
    await userEvent.click(label)
    expect(checkbox).toBeChecked()
  },
}

/**
 * @description 無効化されたチェックボックス
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="disabled" disabled />
      <Label htmlFor="disabled" className="text-muted-foreground">
        無効化された選択肢
      </Label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox')
    
    expect(checkbox).toBeDisabled()
    expect(checkbox).toHaveClass('disabled:cursor-not-allowed')
  },
}

/**
 * @description チェック済みの状態
 */
export const Checked: Story = {
  render: () => <Checkbox defaultChecked />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox')
    
    expect(checkbox).toBeChecked()
    expect(checkbox).toHaveAttribute('data-state', 'checked')
  },
}

/**
 * @description 複数のチェックボックスグループ
 */
export const CheckboxGroup: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="option1" />
        <Label htmlFor="option1">オプション1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="option2" defaultChecked />
        <Label htmlFor="option2">オプション2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="option3" />
        <Label htmlFor="option3">オプション3</Label>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkboxes = canvas.getAllByRole('checkbox')
    
    expect(checkboxes).toHaveLength(3)
    expect(checkboxes[1]).toBeChecked() // オプション2がデフォルトでチェック済み
    
    // 各チェックボックスを順番にクリック
    for (const checkbox of checkboxes) {
      await userEvent.click(checkbox)
      expect(checkbox).toHaveAttribute('aria-checked', 'true')
    }
  },
}

/**
 * @description カスタムスタイルを適用したチェックボックス
 */
export const CustomStyles: Story = {
  render: () => (
    <Checkbox className="h-6 w-6 rounded-full border-primary data-[state=checked]:bg-primary-foreground" />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox')
    
    expect(checkbox).toHaveClass('h-6', 'w-6', 'rounded-full')
    
    await userEvent.click(checkbox)
    expect(checkbox).toHaveAttribute('data-state', 'checked')
  },
} 