/**
 * @file Switchのストーリー
 * @description Switchの使用例とバリエーションを表示
 */
import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta = {
  title: 'UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    // Storybookのコンソールエラーをキャッチし、テストを失敗させる
    onLoad: () => {
      const consoleError = console.error;
      console.error = (...args) => {
        consoleError(...args);
        throw new Error(args.join(' '));
      };
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'スイッチの状態',
    },
    disabled: {
      control: 'boolean',
      description: '無効状態',
    },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

/**
 * @description 基本的なスイッチ
 */
export const Default: Story = {
  render: () => <Switch />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const switchElement = canvas.getByRole('switch')

    expect(switchElement).toBeInTheDocument()
    expect(switchElement).not.toBeChecked()

    // スイッチをクリックして状態を切り替え
    await userEvent.click(switchElement)
    expect(switchElement).toBeChecked()
  },
}

/**
 * @description ラベル付きスイッチ
 */
export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">機内モード</Label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const switchElement = canvas.getByRole('switch')
    const label = canvas.getByText('機内モード')

    expect(switchElement).toBeInTheDocument()
    expect(label).toBeInTheDocument()

    // ラベルをクリックしてスイッチを操作
    await userEvent.click(label)
    expect(switchElement).toBeChecked()
  },
}

/**
 * @description 無効化されたスイッチ
 */
export const Disabled: Story = {
  render: () => <Switch disabled />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const switchElement = canvas.getByRole('switch')

    expect(switchElement).toBeInTheDocument()
    expect(switchElement).toBeDisabled()

    // 無効なスイッチはクリックしても状態が変わらない
    await userEvent.click(switchElement)
    expect(switchElement).not.toBeChecked()
  },
}

/**
 * @description デフォルトでチェックされたスイッチ
 */
export const CheckedByDefault: Story = {
  render: () => <Switch defaultChecked />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const switchElement = canvas.getByRole('switch')

    expect(switchElement).toBeInTheDocument()
    expect(switchElement).toBeChecked()

    // スイッチをクリックして状態を切り替え
    await userEvent.click(switchElement)
    expect(switchElement).not.toBeChecked()
  },
}

/**
 * @description カスタムスタイルを適用したスイッチ
 */
export const CustomStyles: Story = {
  render: () => (
    <Switch
      className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground"
      defaultChecked
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const switchElement = canvas.getByRole('switch')

    expect(switchElement).toBeInTheDocument()
    expect(switchElement).toHaveClass(
      'data-[state=checked]:bg-primary',
      'data-[state=unchecked]:bg-muted-foreground'
    )
  },
} 