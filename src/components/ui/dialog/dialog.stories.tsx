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
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta = {
  title: 'UI/Dialog',
  component: Dialog,
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // トリガーボタンの確認
    const triggerButton = canvas.getByRole('button', { name: 'ダイアログを開く' })
    expect(triggerButton).toBeInTheDocument()
    
    // ダイアログを開く
    await userEvent.click(triggerButton)
    
    // ダイアログの内容を確認
    const dialog = document.querySelector('[role="dialog"]')
    expect(dialog).toBeInTheDocument()
    
    const dialogContent = within(dialog as HTMLElement)
    
    // タイトルと説明文の確認
    expect(dialogContent.getByText('ダイアログのタイトル')).toBeVisible()
    expect(dialogContent.getByText('ダイアログの説明文をここに記述します。ユーザーに対して重要な情報を提供します。')).toBeVisible()
    
    // メインコンテンツの確認
    expect(dialogContent.getByText('ダイアログのメインコンテンツをここに配置します。')).toBeVisible()
    
    // フッターボタンの確認
    const cancelButton = dialogContent.getByRole('button', { name: 'キャンセル' })
    const saveButton = dialogContent.getByRole('button', { name: '保存' })
    expect(cancelButton).toBeVisible()
    expect(saveButton).toBeVisible()
    
    // キャンセルボタンでダイアログを閉じる
    await userEvent.click(cancelButton)
    expect(dialog).not.toBeVisible()
    
    // 再度ダイアログを開く
    await userEvent.click(triggerButton)
    expect(dialog).toBeVisible()
    
    // ESCキーでダイアログを閉じる
    await userEvent.keyboard('{Escape}')
    expect(dialog).not.toBeVisible()
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // 削除ボタンの確認
    const deleteButton = canvas.getByText('削除')
    expect(deleteButton).toBeInTheDocument()
    expect(deleteButton).toHaveClass('destructive')
    
    // ダイアログを開く
    await userEvent.click(deleteButton)
    
    // 確認ダイアログの内容を確認
    const dialog = document.querySelector('[role="dialog"]')
    expect(dialog).toBeInTheDocument()
    
    const dialogContent = within(dialog as HTMLElement)
    expect(dialogContent.getByText('本当に削除しますか？')).toBeInTheDocument()
    expect(dialogContent.getByText('この操作は取り消すことができません。削除後、このデータは完全に失われます。')).toBeInTheDocument()
    
    // ボタンの確認
    const cancelButton = dialogContent.getByText('キャンセル')
    const confirmButton = dialogContent.getByText('削除する')
    expect(cancelButton).toBeInTheDocument()
    expect(confirmButton).toBeInTheDocument()
    expect(confirmButton).toHaveClass('destructive')
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // 新規作成ボタンの確認
    const createButton = canvas.getByText('新規作成')
    expect(createButton).toBeInTheDocument()
    
    // ダイアログを開く
    await userEvent.click(createButton)
    
    // フォームダイアログの内容を確認
    const dialog = document.querySelector('[role="dialog"]')
    expect(dialog).toBeInTheDocument()
    
    const dialogContent = within(dialog as HTMLElement)
    expect(dialogContent.getByText('新規アイテムの作成')).toBeInTheDocument()
    expect(dialogContent.getByText('新しいアイテムの詳細を入力してください。')).toBeInTheDocument()
    
    // フォーム要素の確認
    const nameInput = dialogContent.getByPlaceholderText('アイテム名を入力')
    const descriptionInput = dialogContent.getByPlaceholderText('アイテムの説明を入力')
    expect(nameInput).toBeInTheDocument()
    expect(descriptionInput).toBeInTheDocument()
    
    // フォームの入力テスト
    await userEvent.type(nameInput, 'テストアイテム')
    await userEvent.type(descriptionInput, 'これはテストアイテムの説明です。')
    expect(nameInput).toHaveValue('テストアイテム')
    expect(descriptionInput).toHaveValue('これはテストアイテムの説明です。')
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // スタイル付きダイアログを開く
    const openButton = canvas.getByText('Styled Dialog')
    await userEvent.click(openButton)
    
    // カスタムスタイルの確認
    const dialog = document.querySelector('[role="dialog"]')
    expect(dialog).toBeInTheDocument()
    
    const dialogContent = within(dialog as HTMLElement)
    const header = dialogContent.getByRole('heading')
    expect(header).toHaveClass('text-2xl')
    
    // ヘッダーとフッターのボーダーを確認
    const headerElement = header.closest('.border-b')
    const footerElement = dialogContent.getByRole('footer')
    expect(headerElement).toHaveClass('pb-4')
    expect(footerElement).toHaveClass('border-t', 'pt-4')
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // 最初のダイアログを開く
    const firstDialogButton = canvas.getByText('Open First Dialog')
    await userEvent.click(firstDialogButton)
    
    // 最初のダイアログの内容を確認
    const firstDialog = document.querySelector('[role="dialog"]')
    expect(firstDialog).toBeInTheDocument()
    
    const firstDialogContent = within(firstDialog as HTMLElement)
    expect(firstDialogContent.getByText('First Dialog')).toBeInTheDocument()
    
    // 2番目のダイアログを開く
    const secondDialogButton = firstDialogContent.getByText('Open Second Dialog')
    await userEvent.click(secondDialogButton)
    
    // 2番目のダイアログの内容を確認
    const dialogs = document.querySelectorAll('[role="dialog"]')
    expect(dialogs).toHaveLength(2)
    
    const secondDialog = dialogs[1]
    const secondDialogContent = within(secondDialog as HTMLElement)
    expect(secondDialogContent.getByText('Second Dialog')).toBeInTheDocument()
    expect(secondDialogContent.getByText('Nested dialog content')).toBeInTheDocument()
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // トリガーボタンの確認
    const trigger = canvas.getByRole('button', { name: 'Responsive Dialog' })
    expect(trigger).toBeInTheDocument()
    
    // ダイアログを開く
    await userEvent.click(trigger)
    
    // ダイアログの内容を確認
    const dialog = document.querySelector('[role="dialog"]')
    expect(dialog).toBeInTheDocument()
    
    const dialogContent = within(dialog as HTMLElement)
    
    // ヘッダー部分の確認
    expect(dialogContent.getByText('Mobile First Layout')).toBeVisible()
    expect(dialogContent.getByText('This dialog demonstrates responsive layout changes.')).toBeVisible()
    expect(dialogContent.getByText('Additional Header Content')).toBeVisible()
    expect(dialogContent.getByText('Header content with custom spacing')).toBeVisible()
    
    // メインコンテンツの確認
    expect(dialogContent.getByText('Main content area')).toBeVisible()
    
    // フッターボタンの確認
    const buttons = dialogContent.getAllByRole('button')
    expect(buttons).toHaveLength(3)
    expect(buttons[0]).toHaveTextContent('Cancel')
    expect(buttons[1]).toHaveTextContent('Continue')
    expect(buttons[2]).toHaveTextContent('Skip')
    
    // ボタンのバリアントを確認
    expect(buttons[0]).toHaveClass('variant-outline')
    expect(buttons[2]).toHaveClass('variant-ghost')
    
    // ダイアログを閉じる
    await userEvent.keyboard('{Escape}')
    expect(dialog).not.toBeVisible()
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // カスタムレイアウトダイアログを開く
    const openButton = canvas.getByText('Custom Layout')
    await userEvent.click(openButton)
    
    // ダイアログの内容を確認
    const dialog = document.querySelector('[role="dialog"]')
    expect(dialog).toBeInTheDocument()
    
    const dialogContent = within(dialog as HTMLElement)
    
    // ヘッダーのグリッドレイアウトを確認
    const header = dialogContent.getByRole('heading').closest('.grid')
    expect(header).toHaveClass('grid-cols-[1fr,auto]', 'items-center')
    
    // 設定ボタンの確認
    const settingsButton = dialogContent.getByText('⚙️')
    expect(settingsButton).toHaveClass('ghost')
    
    // フッターのグリッドレイアウトを確認
    const footer = dialogContent.getByRole('footer')
    expect(footer).toHaveClass('grid', 'grid-cols-2', 'gap-2')
    
    // ボタンの幅を確認
    const buttons = dialogContent.getAllByRole('button').slice(-2)
    for (const button of buttons) {
      expect(button).toHaveClass('w-full')
    }
  },
} 