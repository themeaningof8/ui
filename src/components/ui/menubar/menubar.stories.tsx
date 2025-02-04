/**
 * @file Menubarのストーリー
 * @description Menubarの様々な状態とバリエーションを表示
 */

import type { Meta } from '@storybook/react'
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

const meta = {
  title: 'UI/Menubar',
  component: Menubar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Menubar>

export default meta

/**
 * @description 基本的なメニューバー
 */
export const Default = () => (
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
)
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
export const WithCheckboxItems = () => (
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
)
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
export const WithRadioItems = () => (
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
)
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
export const WithSubMenu = () => (
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
)
WithSubMenu.parameters = {
  docs: {
    description: {
      story: 'サブメニュー付きメニューの表示例です。',
    },
  },
} 