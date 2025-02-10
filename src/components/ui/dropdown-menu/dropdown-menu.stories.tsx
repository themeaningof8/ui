/**
 * @file DropdownMenuのストーリー
 * @description DropdownMenuの様々な状態とバリエーションを表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta = {
  title: 'UI/DropdownMenu',
  component: DropdownMenu,
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
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

/**
 * @description 基本的なドロップダウンメニューの表示
 */
export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">メニューを開く</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>マイアカウント</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          プロフィール
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          請求設定
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          設定
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          キーボードショートカット
          <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          チームを作成
          <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          API キー
          <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          ログアウト
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // トリガーボタンの確認
    const triggerButton = canvas.getByRole('button', { name: 'メニューを開く' })
    expect(triggerButton).toBeInTheDocument()
    
    // メニューを開く
    await userEvent.click(triggerButton)
    
    // メニューが表示されるのを待つ
    const menu = await waitFor(() => canvas.getByRole('menu'))
    expect(menu).toBeVisible()
    
    // メニュー項目のテキストを検証 (例: getByText とカスタムマッチャー)
    expect(
      within(menu).getByText((content, element) =>
        element?.textContent?.includes('プロフィール') ?? false
      )
    ).toBeVisible()
    
    // セパレータの数を検証 (例: queryAllByRole を使用)
    const separators = within(menu).queryAllByRole('separator')
    expect(separators.length).toBe(2)
    
    // メニューアイテムの確認
    const menuItems = document.querySelectorAll('[role="menuitem"]')
    expect(menuItems.length).toBeGreaterThan(0)
    
    // 無効化されたアイテムの確認
    const disabledItem = Array.from(menuItems).find(item => 
      item.textContent?.includes('API キー')
    )
    expect(disabledItem).toHaveAttribute('aria-disabled', 'true')
    
    // ショートカットの確認
    const shortcuts = document.querySelectorAll('[class*="DropdownMenuShortcut"]')
    expect(shortcuts.length).toBeGreaterThan(0)
    expect(shortcuts[0]).toHaveTextContent('⇧⌘P')
  },
}

/**
 * @description 無効化されたアイテムを含むドロップダウンメニューの表示
 */
export const WithDisabledItems: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">編集</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          コピー
          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          切り取り
          <DropdownMenuShortcut>⌘X</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          貼り付け
          <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // トリガーボタンの確認
    const triggerButton = canvas.getByRole('button', { name: '編集' })
    expect(triggerButton).toBeInTheDocument()
    
    // メニューを開く
    await userEvent.click(triggerButton)
    
    // メニューアイテムの確認
    const menuItems = document.querySelectorAll('[role="menuitem"]')
    expect(menuItems).toHaveLength(3)
    
    // 無効化されたアイテムの確認
    const disabledItem = Array.from(menuItems).find(item => 
      item.textContent?.includes('切り取り')
    )
    expect(disabledItem).toHaveAttribute('aria-disabled', 'true')
    
    // 有効なアイテムの確認
    const enabledItems = Array.from(menuItems).filter(item => 
      !item.hasAttribute('aria-disabled')
    )
    expect(enabledItems).toHaveLength(2)
  },
}

/**
 * @description ラベルとセパレータを使用したドロップダウンメニューの表示
 */
export const WithLabelsAndSeparators: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">表示</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>表示オプション</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          ズームイン
          <DropdownMenuShortcut>⌘+</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          ズームアウト
          <DropdownMenuShortcut>⌘-</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>表示モード</DropdownMenuLabel>
        <DropdownMenuItem>
          ライトモード
          <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          ダークモード
          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // トリガーボタンの確認
    const triggerButton = canvas.getByRole('button', { name: '表示' })
    expect(triggerButton).toBeInTheDocument()
    
    // メニューを開く
    await userEvent.click(triggerButton)
    
    // メニューが表示されるのを待つ
    const menu = await waitFor(() => canvas.getByRole('menu'))
    expect(menu).toBeVisible()
    
    // メニュー項目のテキストを検証 (例: getByText とカスタムマッチャー)
    expect(
      within(menu).getByText((content, element) =>
        element?.textContent?.includes('表示オプション') ?? false
      )
    ).toBeVisible()
    
    // セパレータの数を検証 (例: queryAllByRole を使用)
    const separators = within(menu).queryAllByRole('separator')
    expect(separators.length).toBe(2)
    
    // メニューアイテムの確認
    const menuItems = document.querySelectorAll('[role="menuitem"]')
    expect(menuItems.length).toBeGreaterThan(0)
    
    // ショートカットの確認
    const shortcuts = document.querySelectorAll('[class*="DropdownMenuShortcut"]')
    expect(shortcuts).toHaveLength(4)
    expect(shortcuts[0]).toHaveTextContent('⌘+')
    expect(shortcuts[1]).toHaveTextContent('⌘-')
  },
} 