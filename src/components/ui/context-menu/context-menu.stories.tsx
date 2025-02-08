/**
 * @file ContextMenuのストーリー
 * @description ContextMenuの様々な状態とバリエーションを表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from '@/components/ui/context-menu'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

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
 * @description 基本的なコンテキストメニューの表示
 */
export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        右クリックでメニューを表示
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          新規作成 <ContextMenuShortcut>⌘N</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          開く <ContextMenuShortcut>⌘O</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          保存 <ContextMenuShortcut>⌘S</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // トリガー要素の確認
    const trigger = canvas.getByText('右クリックでメニューを表示')
    expect(trigger).toBeInTheDocument()
    
    // コンテキストメニューを開く
    await userEvent.pointer([
      { target: trigger },
      { keys: '[MouseRight]', target: trigger },
    ])
    
    // メニュー項目の確認
    const menu = document.querySelector('[role="menu"]')
    expect(menu).toBeInTheDocument()
    
    const menuContent = within(menu as HTMLElement)
    expect(menuContent.getByText('新規作成')).toBeVisible()
    expect(menuContent.getByText('開く')).toBeVisible()
    expect(menuContent.getByText('保存')).toBeVisible()
  },
}

/**
 * @description チェックボックス付きメニュー
 */
export const WithCheckboxItems: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        右クリックでメニューを表示
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuCheckboxItem checked>ツールバーを表示</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>ステータスバーを表示</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem disabled>全画面表示</ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // トリガー要素の確認
    const trigger = canvas.getByText('右クリックでメニューを表示')
    expect(trigger).toBeInTheDocument()
    
    // コンテキストメニューを開く
    await userEvent.pointer([
      { target: trigger },
      { keys: '[MouseRight]', target: trigger },
    ])
    
    // チェックボックス項目の確認
    const menu = document.querySelector('[role="menu"]')
    expect(menu).toBeInTheDocument()
    
    const menuContent = within(menu as HTMLElement)
    const checkedItem = menuContent.getByRole('menuitemcheckbox', { name: 'ツールバーを表示' })
    expect(checkedItem).toHaveAttribute('data-state', 'checked')
    
    const disabledItem = menuContent.getByRole('menuitemcheckbox', { name: '全画面表示' })
    expect(disabledItem).toBeDisabled()
  },
}

/**
 * @description ラジオボタン付きメニュー
 */
export const WithRadioItems: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        右クリックでメニューを表示
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuRadioGroup value="medium">
          <ContextMenuLabel>表示サイズ</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuRadioItem value="small">小</ContextMenuRadioItem>
          <ContextMenuRadioItem value="medium">中</ContextMenuRadioItem>
          <ContextMenuRadioItem value="large">大</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // トリガー要素の確認
    const trigger = canvas.getByText('右クリックでメニューを表示')
    expect(trigger).toBeInTheDocument()
    
    // コンテキストメニューを開く
    await userEvent.pointer([
      { target: trigger },
      { keys: '[MouseRight]', target: trigger },
    ])
    
    // ラジオボタン項目の確認
    const menu = document.querySelector('[role="menu"]')
    expect(menu).toBeInTheDocument()
    
    const menuContent = within(menu as HTMLElement)
    expect(menuContent.getByText('表示サイズ')).toBeVisible()
    
    const selectedItem = menuContent.getByRole('menuitemradio', { name: '中' })
    expect(selectedItem).toHaveAttribute('data-state', 'checked')
  },
}

/**
 * @description サブメニュー付きメニュー
 */
export const WithSubMenu: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        右クリックでメニューを表示
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          戻る <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          進む <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>その他</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>設定</ContextMenuItem>
            <ContextMenuItem>ヘルプ</ContextMenuItem>
            <ContextMenuItem>フィードバック</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // トリガー要素の確認
    const trigger = canvas.getByText('右クリックでメニューを表示')
    expect(trigger).toBeInTheDocument()
    
    // コンテキストメニューを開く
    await userEvent.pointer([
      { target: trigger },
      { keys: '[MouseRight]', target: trigger },
    ])
    
    // メインメニューの確認
    const menu = document.querySelector('[role="menu"]')
    expect(menu).toBeInTheDocument()
    
    const menuContent = within(menu as HTMLElement)
    expect(menuContent.getByText('戻る')).toBeVisible()
    expect(menuContent.getByText('進む')).toBeVisible()
    
    // サブメニューの確認
    const subMenuTrigger = menuContent.getByText('その他')
    expect(subMenuTrigger).toBeVisible()
  },
} 