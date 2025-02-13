import type { Meta, StoryObj } from '@storybook/react'
import { Label } from '../label'
import { Switch } from '.'

/**
 * `Switch`は、オン/オフの状態を切り替えるためのコンポーネントです。
 * Radix UIのSwitchプリミティブをベースに、アクセシビリティと一貫したスタイリングを提供します。
 */
const meta = {
  title: 'UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof Switch>

/**
 * 基本的な使用例です。
 */
export const Default: Story = {
  render: () => <Switch />,
}

/**
 * ラベル付きの例です。
 */
export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
}

/**
 * チェック済みの状態の例です。
 */
export const Checked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="checked" defaultChecked />
      <Label htmlFor="checked">Enabled</Label>
    </div>
  ),
}

/**
 * 無効化された状態の例です。
 */
export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="disabled-unchecked" disabled />
        <Label htmlFor="disabled-unchecked">Disabled</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="disabled-checked" disabled defaultChecked />
        <Label htmlFor="disabled-checked">Disabled (checked)</Label>
      </div>
    </div>
  ),
}

/**
 * フォーム内での使用例です。
 */
export const WithForm: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="notifications">Enable notifications</Label>
      <Switch id="notifications" />
      <p className="text-sm text-muted-foreground">
        Receive notifications about important updates.
      </p>
    </div>
  ),
}

/**
 * カスタムスタイルを適用した例です。
 */
export const CustomStyle: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch
        id="custom"
        className="data-[state=checked]:bg-green-500"
      />
      <Label htmlFor="custom">Custom Color</Label>
    </div>
  ),
}

/**
 * 複数のスイッチを持つ例です。
 */
export const MultipleSettings: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="notifications">Notifications</Label>
          <p className="text-sm text-muted-foreground">
            Receive notifications about your account.
          </p>
        </div>
        <Switch id="notifications" />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="email">Email updates</Label>
          <p className="text-sm text-muted-foreground">
            Receive emails about your activity.
          </p>
        </div>
        <Switch id="email" defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="marketing">Marketing emails</Label>
          <p className="text-sm text-muted-foreground">
            Receive emails about new products and features.
          </p>
        </div>
        <Switch id="marketing" />
      </div>
    </div>
  ),
} 