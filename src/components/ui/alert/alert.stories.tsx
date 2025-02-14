/**
 * @file alert.stories.tsx
 * @description Alertコンポーネントのストーリー定義ファイル
 * @package components
 */

import type { Meta, StoryObj } from "@storybook/react"
import { Alert, AlertTitle, AlertDescription } from "."
import { AlertTriangle } from "lucide-react"

const meta = {
  title: "UI/Alert",
  component: Alert,
  tags: ["autodocs"],
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

/**
 * デフォルトのアラート表示
 */
export const Default: Story = {
  args: {
    children: "This is a default alert message",
  },
}

/**
 * 破壊的な操作を示すアラート
 */
export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "This is a destructive alert message",
  },
}

/**
 * タイトルと説明文を含むアラート
 */
export const WithTitleAndDescription: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Alert Title</AlertTitle>
      <AlertDescription>
        This is a more detailed description of the alert.
      </AlertDescription>
    </Alert>
  ),
}

/**
 * アイコン付きのアラート
 */
export const WithIcon: Story = {
  render: () => (
    <Alert>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        This is an alert with an icon and detailed description.
      </AlertDescription>
    </Alert>
  ),
}