/**
 * Sonnerのストーリー
 * @module Sonner.stories
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { expect } from '@storybook/jest'
import { screen, within, userEvent } from '@storybook/testing-library'

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // デフォルトトーストのテスト
    const defaultButton = canvas.getByText('デフォルト')
    await userEvent.click(defaultButton)
    const defaultToast = await screen.findByText('デフォルトトースト')
    expect(defaultToast).toBeInTheDocument()
    expect(screen.getByText('これはデフォルトのトースト通知です。')).toBeInTheDocument()

    // 成功トーストのテスト
    const successButton = canvas.getByText('成功')
    await userEvent.click(successButton)
    const successToast = await screen.findByText('成功トースト')
    expect(successToast).toBeInTheDocument()
    expect(screen.getByText('これは成功を示すトースト通知です。')).toBeInTheDocument()

    // 警告トーストのテスト
    const warningButton = canvas.getByText('警告')
    await userEvent.click(warningButton)
    const warningToast = await screen.findByText('警告トースト')
    expect(warningToast).toBeInTheDocument()
    expect(screen.getByText('これは警告を示すトースト通知です。')).toBeInTheDocument()

    // エラートーストのテスト
    const errorButton = canvas.getByText('エラー')
    await userEvent.click(errorButton)
    const errorToast = await screen.findByText('エラートースト')
    expect(errorToast).toBeInTheDocument()
    expect(screen.getByText('これはエラーを示すトースト通知です。')).toBeInTheDocument()

    // アクション付きトーストのテスト
    const actionButton = canvas.getByText('アクション付き')
    await userEvent.click(actionButton)
    const actionToast = await screen.findByText('アクション付きトースト')
    expect(actionToast).toBeInTheDocument()
    expect(screen.getByText('これはアクション付きのトースト通知です。')).toBeInTheDocument()
    
    // アクションボタンのテスト
    const toastActionButton = screen.getByText('アクション')
    expect(toastActionButton).toBeInTheDocument()
    await userEvent.click(toastActionButton)
  }
}
