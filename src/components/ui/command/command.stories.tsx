/**
 * @file コマンドコンポーネントのストーリー
 * @description コマンドコンポーネントの使用例を表示します
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from 'lucide-react'

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '.'

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
 * 基本的なコマンドメニューの使用例
 */
export const Default: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="コマンドを入力..." />
      <CommandList>
        <CommandEmpty>結果が見つかりません</CommandEmpty>
        <CommandGroup heading="提案">
          <CommandItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>カレンダー</span>
          </CommandItem>
          <CommandItem>
            <Smile className="mr-2 h-4 w-4" />
            <span>絵文字</span>
            <CommandShortcut>⌘E</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Calculator className="mr-2 h-4 w-4" />
            <span>電卓</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="設定">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>プロフィール</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>支払い方法</span>
            <CommandShortcut>⌘B</CommandShortcut>
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
 * ダイアログモードでのコマンドメニューの使用例
 */
export const Dialog: Story = {
  render: () => (
    <CommandDialog>
      <CommandInput placeholder="コマンドを入力..." />
      <CommandList>
        <CommandEmpty>結果が見つかりません</CommandEmpty>
        <CommandGroup heading="提案">
          <CommandItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>カレンダー</span>
          </CommandItem>
          <CommandItem>
            <Smile className="mr-2 h-4 w-4" />
            <span>絵文字</span>
            <CommandShortcut>⌘E</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  ),
}

/**
 * 空の状態のコマンドメニューの使用例
 */
export const Empty: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="コマンドを入力..." />
      <CommandList>
        <CommandEmpty>結果が見つかりません</CommandEmpty>
      </CommandList>
    </Command>
  ),
} 