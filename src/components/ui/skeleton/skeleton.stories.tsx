/**
 * @file Skeletonコンポーネントのストーリー
 * @description Skeletonコンポーネントの様々な状態とバリエーションを表示
 */

import type { Meta } from '@storybook/react'
import { Skeleton } from '.'

const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>

export default meta

/**
 * @description 基本的なスケルトン
 */
export const Default = () => <Skeleton className="h-4 w-[250px]" />
Default.parameters = {
  docs: {
    description: {
      story: '基本的なテキストのスケルトン表示例です。',
    },
  },
}

/**
 * @description 円形のスケルトン（アバター用）
 */
export const Circle = () => <Skeleton className="h-12 w-12" isCircle />
Circle.parameters = {
  docs: {
    description: {
      story: 'アバターなどの円形コンテンツ用のスケルトン表示例です。',
    },
  },
}

/**
 * @description カードのスケルトン
 */
export const Card = () => (
  <div className="space-y-3">
    <Skeleton className="h-[200px] w-full rounded-xl" />
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
)
Card.parameters = {
  docs: {
    description: {
      story: 'カードコンポーネントのスケルトン表示例です。画像、タイトル、説明文のプレースホルダーを表示します。',
    },
  },
}

/**
 * @description リストのスケルトン
 */
export const List = () => (
  <div className="space-y-3">
    {Array.from({ length: 5 }, (_, i) => (
      <div key={`skeleton-list-item-${i}`} className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12" isCircle />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    ))}
  </div>
)
List.parameters = {
  docs: {
    description: {
      story: 'リスト表示のスケルトン例です。アバターと2行のテキストを持つリストアイテムを表示します。',
    },
  },
} 