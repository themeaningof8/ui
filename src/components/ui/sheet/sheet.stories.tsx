import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from '.'

/**
 * `Sheet`は、サイドから表示されるモーダルコンポーネントです。
 * Radix UIのDialogプリミティブをベースに、アクセシビリティと一貫したスタイリングを提供します。
 */
const meta = {
  title: 'UI/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof Sheet>

/**
 * 基本的な使用例です。
 */
export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">シートを開く</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>シートのタイトル</SheetTitle>
          <SheetDescription>
            シートの説明文が入ります。この部分は複数行に渡る説明を記述できます。
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              名前
            </label>
            <input
              id="name"
              className="col-span-3 rounded-md border p-2"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right">
              ユーザー名
            </label>
            <input
              id="username"
              className="col-span-3 rounded-md border p-2"
            />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">保存</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

/**
 * 左側から表示される例です。
 */
export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">左から開く</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>左側のシート</SheetTitle>
          <SheetDescription>
            このシートは左側からスライドインします。
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p>シートのコンテンツが入ります。</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

/**
 * 上部から表示される例です。
 */
export const Top: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">上から開く</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>上部のシート</SheetTitle>
          <SheetDescription>
            このシートは上部からスライドインします。
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p>シートのコンテンツが入ります。</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

/**
 * 下部から表示される例です。
 */
export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">下から開く</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>下部のシート</SheetTitle>
          <SheetDescription>
            このシートは下部からスライドインします。
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p>シートのコンテンツが入ります。</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

/**
 * カスタムサイズの例です。
 */
export const CustomSize: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">カスタムサイズ</Button>
      </SheetTrigger>
      <SheetContent className="w-[800px] sm:max-w-[800px]">
        <SheetHeader>
          <SheetTitle>大きいシート</SheetTitle>
          <SheetDescription>
            このシートはカスタムサイズで表示されます。
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p>シートのコンテンツが入ります。</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

/**
 * フォーム付きの例です。
 */
export const WithForm: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">フォームを開く</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>プロフィール編集</SheetTitle>
          <SheetDescription>
            プロフィール情報を編集できます。
          </SheetDescription>
        </SheetHeader>
        <form className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              名前
            </label>
            <input
              id="name"
              className="col-span-3 rounded-md border p-2"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right">
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              className="col-span-3 rounded-md border p-2"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="bio" className="text-right">
              自己紹介
            </label>
            <textarea
              id="bio"
              className="col-span-3 rounded-md border p-2"
              rows={3}
            />
          </div>
          <SheetFooter>
            <Button type="submit">保存</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  ),
} 