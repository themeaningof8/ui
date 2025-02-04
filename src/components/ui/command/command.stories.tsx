/**
 * @file Commandのストーリー
 * @description Commandの様々な状態とバリエーションを表示
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
}

/**
 * @description ダイアログとして表示されるコマンドパレット
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
        <Button
          onClick={() => setOpen(true)}
        >
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
}

/**
 * @description グループ化されたコマンドパレット
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
} 