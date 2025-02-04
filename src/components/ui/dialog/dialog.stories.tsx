/**
 * @file Dialogの Storybook ストーリー
 * @description Dialogの様々な状態とバリエーションを表示します。
 */
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
  DialogPortal,
  DialogClose,
} from '@/components/ui/dialog'

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
 * デフォルトの Dialog の表示例です。
 */
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>ダイアログを開く</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ダイアログのタイトル</DialogTitle>
          <DialogDescription>
            ダイアログの説明文をここに記述します。ユーザーに対して重要な情報を提供します。
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          ダイアログのメインコンテンツをここに配置します。
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">キャンセル</Button>
          </DialogClose>
          <Button type="submit">保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/**
 * 確認ダイアログの表示例です。
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
            この操作は取り消すことができません。削除後、このデータは完全に失われます。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">キャンセル</Button>
          </DialogClose>
          <Button variant="destructive">削除する</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/**
 * フォーム付きダイアログの表示例です。
 */
export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>新規作成</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新規アイテムの作成</DialogTitle>
          <DialogDescription>
            新しいアイテムの詳細を入力してください。
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4 py-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              名前
            </label>
            <input
              id="name"
              type="text"
              className="flex h-10 w-full rounded-md border border-base-ui bg-base-app px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-base-low focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-base-ui focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="アイテム名を入力"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              説明
            </label>
            <textarea
              id="description"
              className="flex min-h-[80px] w-full rounded-md border border-base-ui bg-base-app px-3 py-2 text-sm ring-offset-background placeholder:text-base-low focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-base-ui focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="アイテムの説明を入力"
            />
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">キャンセル</Button>
          </DialogClose>
          <Button type="submit">作成</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const WithCustomStyles: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Styled Dialog</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-2xl">Custom Styled Dialog</DialogTitle>
            <DialogDescription>
              This dialog uses custom styles for each component.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <p>Content with custom styling</p>
          </div>
          <DialogFooter className="border-t pt-4">
            <Button variant="outline" type="button">Cancel</Button>
            <Button type="submit">Continue</Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  ),
}

export const NestedDialogs: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open First Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>First Dialog</DialogTitle>
          <DialogDescription>
            This dialog contains another dialog.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Second Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Second Dialog</DialogTitle>
                <DialogDescription>
                  This is a nested dialog.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                Nested dialog content
              </div>
              <DialogFooter>
                <Button type="button">Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <DialogFooter>
          <Button type="button">Close First</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const ResponsiveLayout: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Responsive Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-3">
          <DialogTitle>Mobile First Layout</DialogTitle>
          <DialogDescription>
            This dialog demonstrates responsive layout changes.
          </DialogDescription>
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium">Additional Header Content</span>
            <p className="text-sm text-muted-foreground">
              Header content with custom spacing
            </p>
          </div>
        </DialogHeader>
        <div className="py-4">
          <p>Main content area</p>
        </div>
        <DialogFooter className="space-x-2">
          <Button variant="outline" type="button">Cancel</Button>
          <Button type="submit">Continue</Button>
          <Button variant="ghost" type="button">Skip</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const CustomHeaderFooter: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Custom Layout</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="grid grid-cols-[1fr,auto] items-center">
          <div>
            <DialogTitle>Custom Header Layout</DialogTitle>
            <DialogDescription>
              Header with side-by-side content
            </DialogDescription>
          </div>
          <Button variant="ghost" size="icon">
            ⚙️
          </Button>
        </DialogHeader>
        <div className="py-4">
          <p>Main content area</p>
        </div>
        <DialogFooter className="grid grid-cols-2 gap-2">
          <Button variant="outline" type="button" className="w-full">Cancel</Button>
          <Button type="submit" className="w-full">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
} 