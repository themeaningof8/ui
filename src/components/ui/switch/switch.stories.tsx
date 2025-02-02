/**
 * @file Switchコンポーネントのストーリー
 * @description Switchコンポーネントの様々な状態とバリエーションを表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from '.'

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
}

/**
 * @description チェック状態のスイッチの表示
 */
export const Checked: Story = {
  args: {
    checked: true,
    'aria-label': 'チェック済みスイッチ',
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
} 