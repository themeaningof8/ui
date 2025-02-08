/**
 * @file Menubarのストーリー
 * @description Menubarの様々な状態とバリエーションを表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import * as MenubarPrimitive from '@radix-ui/react-menubar'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  MenubarCheckboxItem,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from '@/components/ui/menubar'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta = {
  title: 'UI/Menubar',
  component: Menubar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Menubar>

export default meta
type Story = StoryObj<typeof meta>

/**
 * @description 基本的なメニューバー
 */
export const Default: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>ファイル</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            新規作成
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            開く
            <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            保存
            <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>編集</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            元に戻す
            <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            やり直し
            <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            切り取り
            <MenubarShortcut>⌘X</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            コピー
            <MenubarShortcut>⌘C</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            貼り付け
            <MenubarShortcut>⌘V</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // メニュートリガーの確認
    const triggers = canvas.getAllByRole('menuitem')
    expect(triggers).toHaveLength(2)
    expect(triggers[0]).toHaveTextContent('ファイル')
    expect(triggers[1]).toHaveTextContent('編集')
    
    // ファイルメニューの操作テスト
    await userEvent.click(triggers[0])
    const fileMenuItems = document.querySelectorAll('[role="menuitem"]')
    expect(fileMenuItems.length).toBeGreaterThan(0)
    expect(fileMenuItems[0]).toHaveTextContent('新規作成')
    expect(fileMenuItems[1]).toHaveTextContent('開く')
    expect(fileMenuItems[2]).toHaveTextContent('保存')
    
    // 編集メニューの操作テスト
    await userEvent.click(triggers[1])
    const editMenuItems = document.querySelectorAll('[role="menuitem"]')
    expect(editMenuItems.length).toBeGreaterThan(0)
    expect(editMenuItems[0]).toHaveTextContent('元に戻す')
    expect(editMenuItems[1]).toHaveTextContent('やり直し')
  },
}
Default.parameters = {
  docs: {
    description: {
      story: '基本的なメニューバーの表示例です。',
    },
  },
}

/**
 * @description チェックボックス付きメニュー
 */
export const WithCheckboxItems: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>表示</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>表示オプション</MenubarLabel>
          <MenubarSeparator />
          <MenubarCheckboxItem checked>ツールバー</MenubarCheckboxItem>
          <MenubarCheckboxItem>ステータスバー</MenubarCheckboxItem>
          <MenubarCheckboxItem>サイドバー</MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // メニュートリガーの確認
    const trigger = canvas.getByRole('menuitem', { name: '表示' })
    expect(trigger).toBeInTheDocument()
    
    // メニューを開く
    await userEvent.click(trigger)
    
    // チェックボックスアイテムの確認
    const checkboxItems = document.querySelectorAll('[role="menuitemcheckbox"]')
    expect(checkboxItems).toHaveLength(3)
    
    // 初期状態の確認
    expect(checkboxItems[0]).toHaveAttribute('aria-checked', 'true')
    expect(checkboxItems[1]).toHaveAttribute('aria-checked', 'false')
    expect(checkboxItems[2]).toHaveAttribute('aria-checked', 'false')
    
    // チェックボックスの操作テスト
    await userEvent.click(checkboxItems[1])
    expect(checkboxItems[1]).toHaveAttribute('aria-checked', 'true')
  },
}
WithCheckboxItems.parameters = {
  docs: {
    description: {
      story: 'チェックボックス付きメニューアイテムの表示例です。',
    },
  },
}

/**
 * @description ラジオボタン付きメニュー
 */
export const WithRadioItems: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>表示</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>表示サイズ</MenubarLabel>
          <MenubarSeparator />
          <MenubarPrimitive.RadioGroup value="medium">
            <MenubarRadioItem value="small">小</MenubarRadioItem>
            <MenubarRadioItem value="medium">中</MenubarRadioItem>
            <MenubarRadioItem value="large">大</MenubarRadioItem>
          </MenubarPrimitive.RadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // メニュートリガーの確認
    const trigger = canvas.getByRole('menuitem', { name: '表示' })
    expect(trigger).toBeInTheDocument()
    
    // メニューを開く
    await userEvent.click(trigger)
    
    // ラジオアイテムの確認
    const radioItems = document.querySelectorAll('[role="menuitemradio"]')
    expect(radioItems).toHaveLength(3)
    
    // 初期値の確認
    expect(radioItems[1]).toHaveAttribute('aria-checked', 'true') // medium
    
    // ラジオボタンの操作テスト
    await userEvent.click(radioItems[0])
    expect(radioItems[0]).toHaveAttribute('aria-checked', 'true')
    expect(radioItems[1]).toHaveAttribute('aria-checked', 'false')
  },
}
WithRadioItems.parameters = {
  docs: {
    description: {
      story: 'ラジオボタン付きメニューアイテムの表示例です。',
    },
  },
}

/**
 * @description サブメニュー付きメニュー
 */
export const WithSubMenu: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>設定</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>基本設定</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>詳細設定</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>設定1</MenubarItem>
              <MenubarItem>設定2</MenubarItem>
              <MenubarItem>設定3</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // メニュートリガーの確認
    const trigger = canvas.getByRole('menuitem', { name: '設定' })
    expect(trigger).toBeInTheDocument()
    
    // メインメニューを開く
    await userEvent.click(trigger)
    
    // メインメニューアイテムの確認
    const menuItems = document.querySelectorAll('[role="menuitem"]')
    expect(menuItems[0]).toHaveTextContent('基本設定')
    
    // サブメニューの確認
    const subTrigger = document.querySelector('[role="menuitem"]')
    expect(subTrigger).toHaveTextContent('詳細設定')
    
    // サブメニューを開く
    if (subTrigger) {
      await userEvent.hover(subTrigger)
      const subMenuItems = document.querySelectorAll('[role="menuitem"]')
      expect(subMenuItems.length).toBeGreaterThan(0)
      expect(subMenuItems[0]).toHaveTextContent('設定1')
      expect(subMenuItems[1]).toHaveTextContent('設定2')
      expect(subMenuItems[2]).toHaveTextContent('設定3')
    }
  },
}
WithSubMenu.parameters = {
  docs: {
    description: {
      story: 'サブメニュー付きメニューの表示例です。',
    },
  },
} 