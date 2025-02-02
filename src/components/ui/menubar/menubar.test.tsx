/**
 * @file Menubarコンポーネントのテスト
 * @description Menubarコンポーネントの機能とアクセシビリティをテスト
 */

import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

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
} from '.'
import * as MenubarPrimitive from '@radix-ui/react-menubar'

describe('Menubar', () => {
  it('基本的なメニューバーが表示されること', () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>ファイル</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>新規作成</MenubarItem>
            <MenubarItem>開く</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    const trigger = screen.getByText('ファイル')
    expect(trigger).toBeInTheDocument()
  })

  it('メニューアイテムが正しく表示されること', async () => {
    const user = userEvent.setup()
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>ファイル</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>新規作成</MenubarItem>
            <MenubarItem>開く</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    const trigger = screen.getByText('ファイル')
    await user.click(trigger)

    expect(screen.getByText('新規作成')).toBeInTheDocument()
    expect(screen.getByText('開く')).toBeInTheDocument()
  })

  it('セパレーターが表示されること', async () => {
    const user = userEvent.setup()
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>ファイル</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>新規作成</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>開く</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    const trigger = screen.getByText('ファイル')
    await user.click(trigger)

    const separator = screen.getByRole('separator')
    expect(separator).toBeInTheDocument()
  })

  it('ショートカットが表示されること', async () => {
    const user = userEvent.setup()
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>ファイル</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              新規作成
              <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    const trigger = screen.getByText('ファイル')
    await user.click(trigger)

    expect(screen.getByText('⌘N')).toBeInTheDocument()
  })

  it('チェックボックスアイテムが機能すること', async () => {
    const user = userEvent.setup()
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>表示</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked>ツールバー</MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    const trigger = screen.getByText('表示')
    await user.click(trigger)

    const checkbox = screen.getByRole('menuitemcheckbox')
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toHaveAttribute('data-state', 'checked')
  })

  it('ラジオアイテムが機能すること', async () => {
    const user = userEvent.setup()
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>表示</MenubarTrigger>
          <MenubarContent>
            <MenubarPrimitive.RadioGroup value="medium">
              <MenubarRadioItem value="small">小</MenubarRadioItem>
              <MenubarRadioItem value="medium">中</MenubarRadioItem>
              <MenubarRadioItem value="large">大</MenubarRadioItem>
            </MenubarPrimitive.RadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    const trigger = screen.getByText('表示')
    await user.click(trigger)

    const radioItems = screen.getAllByRole('menuitemradio')
    expect(radioItems).toHaveLength(3)
    expect(radioItems[1]).toHaveAttribute('data-state', 'checked')
  })

  it('サブメニューが機能すること', async () => {
    const user = userEvent.setup()
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>編集</MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>詳細設定</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>設定1</MenubarItem>
                <MenubarItem>設定2</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    // メインメニューを開く
    const trigger = screen.getByText('編集')
    await user.click(trigger)

    // サブメニューのトリガーを見つけて操作
    const subTrigger = screen.getByText('詳細設定')
    expect(subTrigger).toBeInTheDocument()

    // サブメニューを開く
    await user.hover(subTrigger)
    await user.click(subTrigger)

    // サブメニューの項目が表示されることを確認
    const subMenuItem1 = await screen.findByText('設定1')
    const subMenuItem2 = await screen.findByText('設定2')
    
    expect(subMenuItem1).toBeInTheDocument()
    expect(subMenuItem2).toBeInTheDocument()
  })

  it('ラベルが表示されること', async () => {
    const user = userEvent.setup()
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>表示</MenubarTrigger>
          <MenubarContent>
            <MenubarLabel>表示オプション</MenubarLabel>
            <MenubarItem>設定</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    const trigger = screen.getByText('表示')
    await user.click(trigger)

    expect(screen.getByText('表示オプション')).toBeInTheDocument()
  })

  it('アクセシビリティ要件を満たすこと', () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>ファイル</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>新規作成</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    const menubar = screen.getByRole('menubar')
    expect(menubar).toBeInTheDocument()

    const menuitem = screen.getByRole('menuitem')
    expect(menuitem).toBeInTheDocument()
  })

  it('insetプロパティが正しく適用されること', async () => {
    const user = userEvent.setup()
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>編集</MenubarTrigger>
          <MenubarContent>
            <MenubarItem inset>通常アイテム</MenubarItem>
            <MenubarSub>
              <MenubarSubTrigger inset>サブメニュー</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>サブアイテム</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarLabel inset>ラベル</MenubarLabel>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    const trigger = screen.getByText('編集')
    await user.click(trigger)

    // insetが適用されたMenubarItemの確認
    const menuItem = screen.getByText('通常アイテム')
    expect(menuItem).toHaveClass('pl-8')

    // insetが適用されたMenubarSubTriggerの確認
    const subTrigger = screen.getByText('サブメニュー')
    expect(subTrigger).toHaveClass('pl-8')

    // insetが適用されたMenubarLabelの確認
    const label = screen.getByText('ラベル')
    expect(label).toHaveClass('pl-8')
  })
}) 