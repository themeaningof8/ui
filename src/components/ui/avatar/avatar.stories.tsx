/**
 * @file Avatarのストーリー
 * @description Avatarの使用例とバリエーションを表示
 */
import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    onLoad: () => {
      const consoleError = console.error;
      console.error = (...args) => {
        consoleError(...args);
        throw new Error(args.join(' '));
      };
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

/**
 * @description 基本的なアバター（画像あり）
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const image = canvas.getByRole('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', '@shadcn')
    expect(image).toHaveAttribute('src', 'https://github.com/shadcn.png')
  },
}

/**
 * @description フォールバックテキストを表示するアバター（画像なし）
 */
export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="" alt="fallback example" />
      <AvatarFallback>FB</AvatarFallback>
    </Avatar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const fallback = canvas.getByText('FB')
    expect(fallback).toBeInTheDocument()
  },
}

/**
 * @description カスタムサイズのアバター
 */
export const CustomSize: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="small" />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar className="h-16 w-16">
        <AvatarImage src="https://github.com/shadcn.png" alt="medium" />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar className="h-24 w-24">
        <AvatarImage src="https://github.com/shadcn.png" alt="large" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const avatars = canvas.getAllByRole('img')
    
    // 3つのサイズのアバターが存在することを確認
    expect(avatars).toHaveLength(3)
    
    // 各サイズのクラスを確認
    const [small, medium, large] = avatars.map(avatar => avatar.closest('span'))
    expect(small).toHaveClass('h-8', 'w-8')
    expect(medium).toHaveClass('h-16', 'w-16')
    expect(large).toHaveClass('h-24', 'w-24')
  },
}

/**
 * @description カスタムスタイルを適用したアバター
 */
export const CustomStyles: Story = {
  render: () => (
    <Avatar className="ring-2 ring-primary ring-offset-2">
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="custom styled"
        className="object-cover"
      />
      <AvatarFallback className="bg-primary text-primary-foreground">
        CS
      </AvatarFallback>
    </Avatar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const avatar = canvas.getByRole('img').closest('span')
    expect(avatar).toHaveClass('ring-2', 'ring-primary', 'ring-offset-2')
  },
}

/**
 * @description グループ化されたアバター
 */
export const AvatarGroup: Story = {
  render: () => (
    <div className="flex items-center -space-x-2">
      <Avatar className="border-2 border-background">
        <AvatarImage src="https://github.com/shadcn.png" alt="user1" />
        <AvatarFallback>U1</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarImage src="https://github.com/shadcn.png" alt="user2" />
        <AvatarFallback>U2</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarImage src="https://github.com/shadcn.png" alt="user3" />
        <AvatarFallback>U3</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarFallback>+2</AvatarFallback>
      </Avatar>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // アバターグループの要素を確認
    const avatars = canvas.getAllByRole('img')
    expect(avatars).toHaveLength(3) // 画像を持つアバターの数
    
    // ボーダースタイルの確認
    const avatarContainers = avatars.map(avatar => avatar.closest('span'))
    for (const container of avatarContainers) {
      expect(container).toHaveClass('border-2', 'border-background')
    }
    
    // 追加ユーザー数を示すフォールバックの確認
    const fallback = canvas.getByText('+2')
    expect(fallback).toBeInTheDocument()
    expect(fallback.closest('span')).toHaveClass('border-2', 'border-background')
  },
} 