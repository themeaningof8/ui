/**
 * @file Switchのストーリー
 * @description Switchの様々な状態とバリエーションを表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from '@/components/ui/switch'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta = {
  title: 'UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

/**
 * @description デフォルトのスイッチの表示
 */
export const Default: Story = {
  args: {
    'aria-label': 'デフォルトスイッチ',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const switchEl = canvas.getByRole('switch')
    
    // 初期状態の確認
    expect(switchEl).toBeInTheDocument()
    expect(switchEl).toHaveAttribute('aria-checked', 'false')
    
    // クリックしてスイッチを切り替え
    await userEvent.click(switchEl)
    expect(switchEl).toHaveAttribute('aria-checked', 'true')
    
    // もう一度クリックして元に戻す
    await userEvent.click(switchEl)
    expect(switchEl).toHaveAttribute('aria-checked', 'false')
  },
}

/**
 * @description チェック状態のスイッチの表示
 */
export const Checked: Story = {
  args: {
    checked: true,
    'aria-label': 'チェック済みスイッチ',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const switchEl = canvas.getByRole('switch')
    
    // チェック済み状態の確認
    expect(switchEl).toHaveAttribute('aria-checked', 'true')
    expect(switchEl).toHaveAttribute('data-state', 'checked')
    
    // クリックして状態を切り替え
    await userEvent.click(switchEl)
    expect(switchEl).toHaveAttribute('aria-checked', 'false')
  },
}

/**
 * @description 無効化されたスイッチの表示
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    'aria-label': '無効化されたスイッチ',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const switchEl = canvas.getByRole('switch')
    
    // 無効化状態の確認
    expect(switchEl).toBeDisabled()
    expect(switchEl).toHaveClass('cursor-not-allowed', 'opacity-50')
    
    // クリックしても状態が変化しないことを確認
    await userEvent.click(switchEl)
    expect(switchEl).toHaveAttribute('aria-checked', 'false')
  },
}

/**
 * @description チェック済みで無効化されたスイッチの表示
 */
export const CheckedAndDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
    'aria-label': 'チェック済みで無効化されたスイッチ',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const switchEl = canvas.getByRole('switch')
    
    // チェック済みかつ無効化状態の確認
    expect(switchEl).toBeDisabled()
    expect(switchEl).toHaveAttribute('aria-checked', 'true')
    expect(switchEl).toHaveClass('cursor-not-allowed', 'opacity-50')
    
    // クリックしても状態が変化しないことを確認
    await userEvent.click(switchEl)
    expect(switchEl).toHaveAttribute('aria-checked', 'true')
  },
}

/**
 * @description フォームで使用する例
 */
export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" aria-label="機内モード" />
      <label
        htmlFor="airplane-mode"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        機内モード
      </label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const switchEl = canvas.getByRole('switch')
    const label = canvas.getByText('機内モード')
    
    // スイッチとラベルの関連付けを確認
    expect(switchEl).toHaveAttribute('id', 'airplane-mode')
    expect(label).toHaveAttribute('for', 'airplane-mode')
    
    // ラベルをクリックしてスイッチを切り替え
    await userEvent.click(label)
    expect(switchEl).toHaveAttribute('aria-checked', 'true')
    
    // スイッチを直接クリックして切り替え
    await userEvent.click(switchEl)
    expect(switchEl).toHaveAttribute('aria-checked', 'false')
  },
} 