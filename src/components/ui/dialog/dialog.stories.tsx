/**
 * @file ダイアログコンポーネントのストーリー
 * @description ダイアログコンポーネントの使用例を表示します
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '.'

const meta = {
  title: 'UI/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なダイアログの使用例
 */
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">ダイアログを開く</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>基本的なダイアログ</DialogTitle>
          <DialogDescription>
            これは基本的なダイアログの例です。
            ヘッダー、コンテンツ、フッターを含む標準的な構成を示しています。
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          ダイアログのメインコンテンツをここに配置します。
          必要に応じて、フォームやその他のインタラクティブな要素を含めることができます。
        </div>
        <DialogFooter>
          <Button type="submit">保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/**
 * フォームを含むダイアログの使用例
 */
export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>フォームを開く</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新規アカウント作成</DialogTitle>
          <DialogDescription>
            以下のフォームに必要事項を入力してください。
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name">名前</label>
            <input
              id="name"
              type="text"
              className="w-full rounded-md border px-3 py-2"
              placeholder="名前を入力"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="email">メールアドレス</label>
            <input
              id="email"
              type="email"
              className="w-full rounded-md border px-3 py-2"
              placeholder="メールアドレスを入力"
            />
          </div>
        </form>
        <DialogFooter>
          <Button type="button" variant="outline">キャンセル</Button>
          <Button type="submit">作成</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/**
 * 確認ダイアログの使用例
 */
export const Confirmation: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">削除</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>本当に削除しますか？</DialogTitle>
          <DialogDescription>
            この操作は取り消すことができません。
            削除後、このデータは完全に失われます。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline">キャンセル</Button>
          <Button type="button" variant="destructive">削除</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
} 