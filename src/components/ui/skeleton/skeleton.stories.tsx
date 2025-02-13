import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from '.'

/**
 * `Skeleton`は、コンテンツのローディング状態を表示するためのコンポーネントです。
 * アニメーション効果と一貫したスタイリングを提供します。
 */
const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof Skeleton>

/**
 * 基本的な使用例です。
 */
export const Default: Story = {
  render: () => <Skeleton className="h-4 w-[250px]" />,
}

/**
 * 円形のスケルトンの例です。
 */
export const Circle: Story = {
  render: () => <Skeleton className="h-12 w-12 rounded-full" />,
}

/**
 * カードのスケルトンの例です。
 */
export const Card: Story = {
  render: () => (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
}

/**
 * プロフィールのスケルトンの例です。
 */
export const Profile: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
}

/**
 * テーブルのスケルトンの例です。
 */
export const Table: Story = {
  render: () => {
    const id = React.useId();
    let counter = 0;
    return (
      <div className="w-[600px] space-y-4">
        <div className="space-y-2">
          {Array.from({ length: 5 }).map(() => (
            <div key={`${id}-table-${counter++}`} className="flex items-center justify-between">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          ))}
        </div>
      </div>
    )
  },
}

/**
 * リストのスケルトンの例です。
 */
export const List: Story = {
  render: () => {
    const id = React.useId();
    let counter = 0;
    return (
      <div className="w-[300px] space-y-4">
        {Array.from({ length: 5 }).map(() => (
          <div key={`${id}-list-${counter++}`} className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[80%]" />
          </div>
        ))}
      </div>
    )
  },
}

/**
 * カスタムスタイルを適用した例です。
 */
export const CustomStyle: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton className="h-4 w-[200px] bg-primary/10" />
      <Skeleton className="h-4 w-[150px] bg-secondary/20" />
      <Skeleton className="h-4 w-[180px] bg-accent/30" />
    </div>
  ),
} 