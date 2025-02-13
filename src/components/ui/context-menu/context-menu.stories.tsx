/**
 * @file コンテキストメニューコンポーネントのストーリー
 * @description コンテキストメニューコンポーネントの使用例を表示します
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Check, ChevronRight, Circle } from 'lucide-react'
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
} from '.'

const meta = {
  title: 'UI/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なコンテキストメニューの使用例
 */
export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        右クリックでメニューを表示
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>
          新規作成
        </ContextMenuItem>
        <ContextMenuItem>
          開く
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          保存
        </ContextMenuItem>
        <ContextMenuItem>
          名前を付けて保存
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

/**
 * サブメニューを含むコンテキストメニューの使用例
 */
export const WithSubmenu: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        右クリックでメニューを表示
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>
          戻る
        </ContextMenuItem>
        <ContextMenuItem>
          進む
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            その他
            <ChevronRight className="ml-auto h-4 w-4" />
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              設定
            </ContextMenuItem>
            <ContextMenuItem>
              ヘルプ
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

/**
 * チェックボックス項目を含むコンテキストメニューの使用例
 */
export const WithCheckboxItems: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        右クリックでメニューを表示
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuCheckboxItem>
          <Check className="mr-2 h-4 w-4" />
          ツールバーを表示
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>
          <Check className="mr-2 h-4 w-4" />
          ステータスバーを表示
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

/**
 * ラジオ項目を含むコンテキストメニューの使用例
 */
export const WithRadioItems: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        右クリックでメニューを表示
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuRadioGroup value="light">
          <ContextMenuRadioItem value="light">
            <Circle className="mr-2 h-4 w-4 fill-current" />
            ライトモード
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="dark">
            <Circle className="mr-2 h-4 w-4 fill-current" />
            ダークモード
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="system">
            <Circle className="mr-2 h-4 w-4 fill-current" />
            システム設定に従う
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
} 