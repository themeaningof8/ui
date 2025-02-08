/**
 * @file AlertDialogのストーリー
 * @description AlertDialogの様々な状態とバリエーションを表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta = {
  title: 'UI/AlertDialog',
  component: AlertDialog,
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
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof meta>

/**
 * @description 基本的なアラートダイアログ
 */
export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">アカウントを削除</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
          <AlertDialogDescription>
            この操作は取り消すことができません。アカウントに関連するすべてのデータが完全に削除されます。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction>削除する</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // トリガーボタンの確認
    const triggerButton = canvas.getByRole('button', { name: 'アカウントを削除' })
    expect(triggerButton).toBeInTheDocument()
    
    // ダイアログを開く
    await userEvent.click(triggerButton)
    
    // ダイアログの内容を確認
    const dialog = canvas.getByRole('alertdialog')
    expect(dialog).toBeInTheDocument()
    
    // タイトルと説明の確認
    expect(canvas.getByText('本当に削除しますか？')).toBeVisible()
    expect(canvas.getByText(/この操作は取り消すことができません/)).toBeVisible()
    
    // フッターボタンの確認
    const cancelButton = canvas.getByRole('button', { name: 'キャンセル' })
    const deleteButton = canvas.getByRole('button', { name: '削除する' })
    expect(cancelButton).toBeVisible()
    expect(deleteButton).toBeVisible()
    
    // キャンセルボタンでダイアログを閉じる
    await userEvent.click(cancelButton)
    expect(dialog).not.toBeVisible()
  },
}

/**
 * @description カスタムアクション付きのアラートダイアログ
 */
export const WithCustomActions: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>設定を変更</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>設定の変更</AlertDialogTitle>
          <AlertDialogDescription>
            変更を保存する前に、すべての設定を確認してください。
            この操作は後で元に戻すことができます。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:space-x-4">
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction className="bg-orange-500 hover:bg-orange-600">
            後で適用
          </AlertDialogAction>
          <AlertDialogAction>
            今すぐ適用
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // トリガーボタンの確認
    const triggerButton = canvas.getByRole('button', { name: '設定を変更' })
    expect(triggerButton).toBeInTheDocument()
    
    // ダイアログを開く
    await userEvent.click(triggerButton)
    
    // ダイアログの内容を確認
    const dialog = canvas.getByRole('alertdialog')
    expect(dialog).toBeInTheDocument()
    
    // フッターボタンの確認
    const buttons = canvas.getAllByRole('button')
    expect(buttons).toHaveLength(4) // トリガー + 3つのアクションボタン
    
    // 各ボタンのテキストを確認
    expect(canvas.getByText('キャンセル')).toBeVisible()
    expect(canvas.getByText('後で適用')).toBeVisible()
    expect(canvas.getByText('今すぐ適用')).toBeVisible()
  },
}

/**
 * @description フォーム確認用のアラートダイアログ
 */
export const FormConfirmation: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>フォームを送信</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>送信の確認</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>以下の内容で送信します：</p>
            <ul className="list-disc pl-4 text-sm">
              <li>ユーザー名: example_user</li>
              <li>メールアドレス: user@example.com</li>
              <li>プラン: プロフェッショナル</li>
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>修正する</AlertDialogCancel>
          <AlertDialogAction>送信する</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // トリガーボタンの確認
    const triggerButton = canvas.getByRole('button', { name: 'フォームを送信' })
    expect(triggerButton).toBeInTheDocument()
    
    // ダイアログを開く
    await userEvent.click(triggerButton)
    
    // ダイアログの内容を確認
    const dialog = canvas.getByRole('alertdialog')
    expect(dialog).toBeInTheDocument()
    
    // リストアイテムの確認
    const listItems = canvas.getAllByRole('listitem')
    expect(listItems).toHaveLength(3)
    
    // 各リストアイテムのテキストを確認
    expect(canvas.getByText(/ユーザー名: example_user/)).toBeVisible()
    expect(canvas.getByText(/メールアドレス: user@example.com/)).toBeVisible()
    expect(canvas.getByText(/プラン: プロフェッショナル/)).toBeVisible()
  },
} 