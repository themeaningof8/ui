/**
 * Sonnerコンポーネントのストーリー
 * @module Sonner.stories
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/ui/button'
import { Toaster, toast } from '@/components/ui/sonner'

const meta = {
  title: 'UI/Sonner',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

function ToastDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() => {
          toast('デフォルトトースト', {
            description: 'これはデフォルトのトースト通知です。',
          })
        }}
      >
        デフォルト
      </Button>

      <Button
        onClick={() => {
          toast.success('成功トースト', {
            description: 'これは成功を示すトースト通知です。',
          })
        }}
      >
        成功
      </Button>

      <Button
        onClick={() => {
          toast.warning('警告トースト', {
            description: 'これは警告を示すトースト通知です。',
          })
        }}
      >
        警告
      </Button>

      <Button
        variant="destructive"
        onClick={() => {
          toast.error('エラートースト', {
            description: 'これはエラーを示すトースト通知です。',
          })
        }}
      >
        エラー
      </Button>

      <Button
        onClick={() => {
          toast('アクション付きトースト', {
            description: 'これはアクション付きのトースト通知です。',
            action: {
              label: 'アクション',
              onClick: () => console.log('アクションがクリックされました'),
            },
          })
        }}
      >
        アクション付き
      </Button>
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <>
      <ToastDemo />
      <Toaster />
    </>
  ),
}
