/**
 * @file Progressコンポーネントのストーリー
 * @description Progressコンポーネントの様々な状態とバリエーションを表示
 */

import type { Meta } from '@storybook/react'
import { Progress } from '.'

const meta = {
  title: 'UI/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Progress>

export default meta

/**
 * @description 基本的なプログレスバー
 */
export const Default = () => <Progress value={60} className="w-[300px]" />
Default.parameters = {
  docs: {
    description: {
      story: '基本的なプログレスバーの表示例です。',
    },
  },
}

/**
 * @description 異なるサイズのプログレスバー
 */
export const Sizes = () => (
  <div className="space-y-4 w-[300px]">
    <Progress value={60} size="sm" />
    <Progress value={60} size="md" />
    <Progress value={60} size="lg" />
  </div>
)
Sizes.parameters = {
  docs: {
    description: {
      story: '異なるサイズのプログレスバーの表示例です。',
    },
  },
}

/**
 * @description 不定の進捗状態
 */
export const Indeterminate = () => (
  <Progress className="w-[300px]" isIndeterminate />
)
Indeterminate.parameters = {
  docs: {
    description: {
      story: '進捗が不定の状態のプログレスバーの表示例です。',
    },
  },
}

/**
 * @description 異なる進捗値
 */
export const Values = () => (
  <div className="space-y-4 w-[300px]">
    <Progress value={25} />
    <Progress value={50} />
    <Progress value={75} />
    <Progress value={100} />
  </div>
)
Values.parameters = {
  docs: {
    description: {
      story: '異なる進捗値のプログレスバーの表示例です。',
    },
  },
} 