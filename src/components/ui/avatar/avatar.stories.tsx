/**
 * @file アバターコンポーネントのストーリー
 * @description アバターコンポーネントの使用例を表示します
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarImage, AvatarFallback } from '.'

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なアバターの使用例
 */
export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="@shadcn"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
}

/**
 * フォールバックを表示するアバターの使用例
 */
export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage
        src="invalid-image.jpg"
        alt="無効な画像"
      />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

/**
 * 遅延フォールバックを持つアバターの使用例
 */
export const WithDelayedFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage
        src="invalid-image.jpg"
        alt="無効な画像"
      />
      <AvatarFallback delayMs={1000}>
        遅延表示
      </AvatarFallback>
    </Avatar>
  ),
}

/**
 * カスタムスタイルを適用したアバターの使用例
 */
export const CustomStyle: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar className="h-16 w-16 border-2 border-primary">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="大きいアバター"
        />
        <AvatarFallback className="text-lg">XL</AvatarFallback>
      </Avatar>
      <Avatar className="h-8 w-8 bg-muted">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="小さいアバター"
        />
        <AvatarFallback className="text-xs">SM</AvatarFallback>
      </Avatar>
    </div>
  ),
}

/**
 * グループ化されたアバターの使用例
 */
export const AvatarGroup: Story = {
  render: () => (
    <div className="flex -space-x-4">
      <Avatar className="border-2 border-background">
        <AvatarImage src="https://github.com/shadcn.png" alt="ユーザー1" />
        <AvatarFallback>U1</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarImage src="https://github.com/shadcn.png" alt="ユーザー2" />
        <AvatarFallback>U2</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarImage src="https://github.com/shadcn.png" alt="ユーザー3" />
        <AvatarFallback>U3</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background bg-muted">
        <AvatarFallback>+2</AvatarFallback>
      </Avatar>
    </div>
  ),
} 