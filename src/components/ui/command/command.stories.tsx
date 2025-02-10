/**
 * @file Commandのストーリー
 * @description Commandの様々な状態とバリエーションを表示
 * 各ストーリーに Play Function を用いて、ユーザーインタラクションとその結果を検証するテストコードを記述しています。
 */

import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Calendar,
  Settings,
  Search,
  FileText,
  Mail,
  MessageSquare,
  User,
  CreditCard,
  Plus,
} from 'lucide-react'
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { userEvent, within, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta = {
  title: 'UI/Command',
  component: Command,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Command>

export default meta
type Story = StoryObj<typeof meta>

/**
 * @description 基本的なコマンドパレットの表示
 * Play Function 内で、検索文字列の入力と該当項目の表示、選択が動作するかを検証
 */
export const Default: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="コマンドを検索..." />
      <CommandList>
        <CommandEmpty>結果が見つかりません</CommandEmpty>
        <CommandGroup heading="提案">
          <CommandItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>カレンダー</span>
          </CommandItem>
          <CommandItem>
            <Search className="mr-2 h-4 w-4" />
            <span>検索</span>
            <CommandShortcut>⌘K</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>設定</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // 入力欄へフォーカスするためクリック
    const input = canvas.getByPlaceholderText('コマンドを検索...')
    await userEvent.click(input)

    // "検索" と入力
    await userEvent.type(input, '検索')

    // "検索" の項目が表示されることを検証
    const searchItem = await canvas.findByText('検索')
    expect(searchItem).toBeVisible()

    // Enter キーを押して "検索" を選択
    await userEvent.type(input, '{enter}')

    // CommandDialog が開くのを待つ
    const dialog = await waitFor(() => canvas.getByRole('dialog'))

    // CommandEmpty が表示されるのを待つ
    const empty = await waitFor(() => within(dialog).getByRole('presentation', { name: '結果なし' }))
    expect(empty).toBeVisible()
  },
}

/**
 * @description ダイアログとして表示されるコマンドパレット
 * Play Function 内で、ダイアログのトリガーボタンをクリックし、コマンド入力欄が表示された後の入力動作を検証します。
 */
export const Dialog: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          setOpen((open) => !open)
        }
      }
      document.addEventListener('keydown', down)
      return () => document.removeEventListener('keydown', down)
    }, [])

    return (
      <>
        <Button onClick={() => setOpen(true)}>
          <Search className="mr-2 h-4 w-4" />
          コマンドを検索
          <CommandShortcut className="ml-2">⌘K</CommandShortcut>
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="コマンドを検索..." />
          <CommandList>
            <CommandEmpty>結果が見つかりません</CommandEmpty>
            <CommandGroup heading="提案">
              <CommandItem>
                <Calendar className="mr-2 h-4 w-4" />
                <span>カレンダー</span>
              </CommandItem>
              <CommandItem>
                <Search className="mr-2 h-4 w-4" />
                <span>検索</span>
                <CommandShortcut>⌘K</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>設定</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // ボタンをクリックしてダイアログを開く
    const button = canvas.getByRole('button', { name: /コマンドを検索/i })
    await userEvent.click(button)

    // ダイアログ内にコマンド入力が表示されるのを待機
    const input = await canvas.findByPlaceholderText('コマンドを検索...')
    expect(input).toBeVisible()

    // 入力欄へ "設定" と入力し、項目が見えるかを検証
    await userEvent.type(input, '設定')
    const settingsItem = await canvas.findByText('設定')
    expect(settingsItem).toBeVisible()

    // Enter キーでアイテム選択をシミュレート
    await userEvent.type(input, '{enter}')
  },
}

/**
 * @description グループ化されたコマンドパレット
 * Play Function 内で、各グループの見出しが正しく表示されるかを検証します。
 */
export const Grouped: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="コマンドを検索..." />
      <CommandList>
        <CommandEmpty>結果が見つかりません</CommandEmpty>
        <CommandGroup heading="ファイル">
          <CommandItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>新規ドキュメント</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Plus className="mr-2 h-4 w-4" />
            <span>新規プロジェクト</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="コミュニケーション">
          <CommandItem>
            <Mail className="mr-2 h-4 w-4" />
            <span>メール</span>
          </CommandItem>
          <CommandItem>
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>メッセージ</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="設定">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>プロフィール</span>
          </CommandItem>
          <CommandItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>請求設定</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // 検索入力欄の確認
    const input = canvas.getByPlaceholderText('コマンドを検索...')
    expect(input).toBeInTheDocument()
    
    // グループヘッダーの確認
    const groups = ['ファイル', 'コミュニケーション', '設定']
    for (const heading of groups) {
      expect(canvas.getByText(heading)).toBeVisible()
    }
    
    // ファイルグループのアイテムを確認
    expect(canvas.getByText('新規ドキュメント')).toBeVisible()
    expect(canvas.getByText('新規プロジェクト')).toBeVisible()
    expect(canvas.getByText('⌘N')).toBeVisible()
    expect(canvas.getByText('⌘P')).toBeVisible()
    
    // コミュニケーショングループのアイテムを確認
    expect(canvas.getByText('メール')).toBeVisible()
    expect(canvas.getByText('メッセージ')).toBeVisible()
    
    // 設定グループのアイテムを確認
    expect(canvas.getByText('プロフィール')).toBeVisible()
    expect(canvas.getByText('請求設定')).toBeVisible()
    
    // 検索機能のテスト
    await userEvent.type(input, 'プロフィール')
    expect(canvas.getByText('プロフィール')).toBeVisible()
    expect(canvas.queryByText('メール')).not.toBeVisible()
    
    // 検索をクリア
    await userEvent.clear(input)
    expect(canvas.getByText('メール')).toBeVisible()
  },
} 