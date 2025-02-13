import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button'
import { Toaster } from '.'
import { toast } from 'sonner'

/**
 * `Toaster`は、トースト通知を表示するためのコンポーネントです。
 * Sonnerライブラリを使用して、美しいトースト通知を提供します。
 */
const meta = {
  title: 'UI/Toaster',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的な使用例です。
 */
export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Button onClick={() => toast('基本的なメッセージ')}>
        基本的なトースト
      </Button>
      <Toaster />
    </div>
  ),
}

/**
 * 成功メッセージの例です。
 */
export const Success: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Button onClick={() => toast.success('成功しました！')}>
        成功トースト
      </Button>
      <Toaster />
    </div>
  ),
}

/**
 * エラーメッセージの例です。
 */
export const ErrorToast: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Button onClick={() => toast.error('エラーが発生しました')}>
        エラートースト
      </Button>
      <Toaster />
    </div>
  ),
}

/**
 * アクション付きの例です。
 */
export const WithAction: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Button
        onClick={() =>
          toast('アクション付きメッセージ', {
            action: {
              label: '元に戻す',
              onClick: () => console.log('アクションがクリックされました'),
            },
          })
        }
      >
        アクション付きトースト
      </Button>
      <Toaster />
    </div>
  ),
}

/**
 * 説明付きの例です。
 */
export const WithDescription: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Button
        onClick={() =>
          toast('タイトル', {
            description: 'これは詳細な説明文です。',
          })
        }
      >
        説明付きトースト
      </Button>
      <Toaster />
    </div>
  ),
}

/**
 * カスタムスタイルの例です。
 */
export const CustomStyle: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Button
        onClick={() =>
          toast('カスタムスタイル', {
            className: 'bg-blue-500 text-white',
            description: 'カスタマイズされたトーストです。',
          })
        }
      >
        カスタムスタイルトースト
      </Button>
      <Toaster />
    </div>
  ),
} 