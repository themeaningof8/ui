/**
 * @file ContextMenuコンポーネントのテスト
 * @description ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextSub, ContextSubTrigger, ContextSubContent コンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@/tests/test-utils'
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextSub,
  ContextSubTrigger,
  ContextSubContent,
} from '.'

describe('ContextMenu', () => {
  describe('基本レンダリングテスト', () => {
    it('すべてのコンポーネントが正しくレンダリングされること', () => {
      render(
        <ContextMenu>
          <ContextMenuTrigger>
            <div>右クリックで開く</div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>メニュー</ContextMenuLabel >
            < ContextMenuSeparator />
            <ContextMenuItem>
              項目1
              <ContextMenuShortcut>⌘A</ContextMenuShortcut>
            </ContextMenuItem>
            < ContextMenuCheckboxItem checked >
              チェックボックス1
            </ContextMenuCheckboxItem>
            < ContextMenuRadioGroup value="item2" >
              < ContextMenuRadioItem value="item1" >ラジオボタン1</ContextMenuRadioItem >
              < ContextMenuRadioItem value="item2" >ラジオボタン2</ContextMenuRadioItem >
            </ContextMenuRadioGroup>
            <ContextSub>
              <ContextSubTrigger>サブメニュー</ContextSubTrigger >
              <ContextSubContent>
                <ContextMenuItem>サブメニュー項目1</ContextMenuItem >
              </ContextSubContent>
            </ContextSub>
          </ContextMenuContent>
        </ContextMenu>
      )

      const trigger = screen.getByText('右クリックで開く')
      expect(trigger).toBeInTheDocument()

      // 右クリックでコンテキストメニューを開く
      fireEvent.contextMenu(trigger)

      expect(screen.getByText('メニュー')).toBeInTheDocument()
      expect(screen.getByText('項目1')).toBeInTheDocument()
      expect(screen.getByText('⌘A')).toBeInTheDocument()
      expect(screen.getByText('チェックボックス1')).toBeInTheDocument()
      expect(screen.getByText('ラジオボタン1')).toBeInTheDocument()
      expect(screen.getByText('ラジオボタン2')).toBeInTheDocument()
      expect(screen.getByText('サブメニュー')).toBeInTheDocument()

      // サブメニューを開く
      fireEvent.mouseEnter(screen.getByText('サブメニュー'))
      expect(screen.getByText('サブメニュー項目1')).toBeInTheDocument()
    })
  })

  describe('インタラクションテスト', () => {
    it('ContextMenuItem をクリックすると選択されること', () => {
      const onSelect = vi.fn()
      render(
        <ContextMenu>
          <ContextMenuTrigger>
            <div>右クリックで開く</div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            < ContextMenuItem onSelect={onSelect} >項目1</ContextMenuItem >
          </ContextMenuContent>
        </ContextMenu>
      )

      const trigger = screen.getByText('右クリックで開く')
      fireEvent.contextMenu(trigger)

      const item = screen.getByText('項目1')
      fireEvent.click(item)
      expect(onSelect).toHaveBeenCalled()
    })

    it('ContextMenuCheckboxItem のチェック状態が変更されること', () => {
      const onCheckedChange = vi.fn()
      render(
        <ContextMenu>
          <ContextMenuTrigger>
            <div>右クリックで開く</div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            < ContextMenuCheckboxItem checked={false} onCheckedChange={onCheckedChange} >
              チェックボックス1
            </ContextMenuCheckboxItem>
          </ContextMenuContent>
        </ContextMenu>
      )

      const trigger = screen.getByText('右クリックで開く')
      fireEvent.contextMenu(trigger)

      const item = screen.getByText('チェックボックス1')
      fireEvent.click(item)
      expect(onCheckedChange).toHaveBeenCalledWith(true)
    })

    it('ContextMenuRadioItem を選択すると他の項目が非選択になること', () => {
      const onValueChange = vi.fn()
      render(
        <ContextMenu>
          <ContextMenuTrigger>
            <div>右クリックで開く</div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            < ContextMenuRadioGroup value="item1" onValueChange={onValueChange} >
              < ContextMenuRadioItem value="item1" >ラジオボタン1</ContextMenuRadioItem >
              < ContextMenuRadioItem value="item2" >ラジオボタン2</ContextMenuRadioItem >
            </ContextMenuRadioGroup>
          </ContextMenuContent>
        </ContextMenu>
      )

      const trigger = screen.getByText('右クリックで開く')
      fireEvent.contextMenu(trigger)

      const item2 = screen.getByText('ラジオボタン2')
      fireEvent.click(item2)
      expect(onValueChange).toHaveBeenCalledWith('item2')
    })
  })

  describe('アクセシビリティテスト', () => {
    it('ContextMenuContent に role="menu" が設定されていること', () => {
      render(
        <ContextMenu>
          <ContextMenuTrigger>
            <div>右クリックで開く</div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>項目1</ContextMenuItem >
          </ContextMenuContent>
        </ContextMenu>
      )

      const trigger = screen.getByText('右クリックで開く')
      fireEvent.contextMenu(trigger)

      expect(screen.getByRole('menu')).toBeInTheDocument()
    })

    it('ContextMenuItem に role="menuitem" が設定されていること', () => {
      render(
        <ContextMenu>
          <ContextMenuTrigger>
            <div>右クリックで開く</div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>項目1</ContextMenuItem >
          </ContextMenuContent>
        </ContextMenu>
      )

      const trigger = screen.getByText('右クリックで開く')
      fireEvent.contextMenu(trigger)

      expect(screen.getByRole('menuitem')).toBeInTheDocument()
    })

    it('ContextMenuCheckboxItem に role="menuitemcheckbox" が設定されていること', () => {
      render(
        <ContextMenu>
          <ContextMenuTrigger>
            <div>右クリックで開く</div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            < ContextMenuCheckboxItem checked >チェックボックス1</ContextMenuCheckboxItem >
          </ContextMenuContent>
        </ContextMenu>
      )

      const trigger = screen.getByText('右クリックで開く')
      fireEvent.contextMenu(trigger)

      expect(screen.getByRole('menuitemcheckbox')).toBeInTheDocument()
    })

    it('ContextMenuRadioItem に role="menuitemradio" が設定されていること', () => {
      render(
        <ContextMenu>
          <ContextMenuTrigger>
            <div>右クリックで開く</div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            < ContextMenuRadioGroup value="item1" >
              < ContextMenuRadioItem value="item1" >ラジオボタン1</ContextMenuRadioItem >
            </ContextMenuRadioGroup>
          </ContextMenuContent>
        </ContextMenu>
      )

      const trigger = screen.getByText('右クリックで開く')
      fireEvent.contextMenu(trigger)

      expect(screen.getByRole('menuitemradio')).toBeInTheDocument()
    })
  })
}) 