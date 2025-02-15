import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from '.'

/**
 * `Progress`は、進行状況を視覚的に表示するためのコンポーネントです。
 * アクセシビリティに配慮し、アニメーションとスタイリングを提供します。
 */
const meta = {
  title: 'UI/Progress',
  component: Progress,
  tags: ['autodocs'],
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof Progress>

/**
 * 基本的な使用例です。
 */
export const Default: Story = {
  args: {
    value: 50,
  },
}

/**
 * 進行状況0%の例です。
 */
export const Empty: Story = {
  args: {
    value: 0,
  },
}

/**
 * 進行状況100%の例です。
 */
export const Full: Story = {
  args: {
    value: 100,
  },
}

/**
 * カスタムスタイルを適用した例です。
 */
export const CustomStyle: Story = {
  args: {
    value: 60,
    className: "h-2",
  },
}

/**
 * アニメーション付きの例です。
 */
export const Animated: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(13)
 
    React.useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500)
      return () => clearTimeout(timer)
    }, [])
 
    return <Progress value={progress} />
  },
}

/**
 * ラベル付きの例です。
 */
export const WithLabel: Story = {
  render: () => (
    <div>
      <div className="flex justify-between text-sm text-step-11 mb-2">
        <span>Progress</span>
        <span>40%</span>
      </div>
      <Progress value={40} />
    </div>
  ),
}

/**
 * インディケーター付きの例です。
 */
export const WithIndicator: Story = {
  render: () => (
    <div className="relative">
      <Progress value={80} />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-medium">
        80%
      </span>
    </div>
  ),
} 