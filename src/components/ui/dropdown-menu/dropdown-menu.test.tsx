/**
 * @file DropdownMenuコンポーネントのテスト
 * @description DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownSub, DropdownSubTrigger, DropdownSubContent コンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@/tests/test-utils'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownSub,
  DropdownSubTrigger,
  DropdownSubContent,
} from '.'

describe('DropdownMenu', () => {
  describe('基本レンダリングテスト', () => {
    it('すべてのコンポーネントが正しくレンダリングされること', () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button>メニューを開く</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>メニュー</DropdownMenuLabel >
            < DropdownMenuSeparator />
            <DropdownMenuItem>
              項目1
              <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
            </DropdownMenuItem>
            < DropdownMenuCheckboxItem checked >
              チェックボックス1
            </DropdownMenuCheckboxItem>
            < DropdownMenuRadioGroup value="item2" >
              < DropdownMenuRadioItem value="item1" >ラジオボタン1</DropdownMenuRadioItem >
              < DropdownMenuRadioItem value="item2" >ラジオボタン2</DropdownMenuRadioItem >
            </DropdownMenuRadioGroup>
            <DropdownSub>
              <DropdownSubTrigger>サブメニュー</DropdownSubTrigger >
              <DropdownSubContent>
                <DropdownMenuItem>サブメニュー項目1</DropdownMenuItem >
              </DropdownSubContent>
            </DropdownSub>
          </DropdownMenuContent>
        </DropdownMenu>
      )

      const trigger = screen.getByText('メニューを開く')
      expect(trigger).toBeInTheDocument()

      // メニューを開く
      fireEvent.click(trigger)

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
    it('DropdownMenuTrigger をクリックするとメニューが開閉すること', () => {
      const onOpenChange = vi.fn()
      render(
        < DropdownMenu onOpenChange={onOpenChange} >
          <DropdownMenuTrigger>
            <button>メニューを開く</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>項目1</DropdownMenuItem >
          </DropdownMenuContent>
        </DropdownMenu>
      )

      const trigger = screen.getByText('メニューを開く')
      fireEvent.click(trigger)
      expect(onOpenChange).toHaveBeenCalledWith(true)

      fireEvent.click(trigger)
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it('DropdownMenuItem をクリックすると選択されること', () => {
      const onSelect = vi.fn()
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button>メニューを開く</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            < DropdownMenuItem onSelect={onSelect} >項目1</DropdownMenuItem >
          </DropdownMenuContent>
        </DropdownMenu>
      )

      const trigger = screen.getByText('メニューを開く')
      fireEvent.click(trigger)

      const item = screen.getByText('項目1')
      fireEvent.click(item)
      expect(onSelect).toHaveBeenCalled()
    })

    it('DropdownMenuCheckboxItem のチェック状態が変更できること', () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button>メニューを開く</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem>チェックボックス1</DropdownMenuCheckboxItem >
          </DropdownMenuContent>
        </DropdownMenu>
      )

      const trigger = screen.getByText('メニューを開く')
      fireEvent.click(trigger)

      const checkbox = screen.getByRole('menuitemcheckbox')
      expect(checkbox).not.toBeChecked()

      fireEvent.click(checkbox)
      expect(checkbox).toBeChecked()
    })

    it('DropdownMenuRadioGroup でラジオボタンを選択できること', () => {
      const onValueChange = vi.fn()
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button>メニューを開く</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            < DropdownMenuRadioGroup value="item1" onValueChange={onValueChange} >
              < DropdownMenuRadioItem value="item1" >ラジオボタン1</DropdownMenuRadioItem >
              < DropdownMenuRadioItem value="item2" >ラジオボタン2</DropdownMenuRadioItem >
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )

      const trigger = screen.getByText('メニューを開く')
      fireEvent.click(trigger)

      const radio1 = screen.getByText('ラジオボタン1')
      const radio2 = screen.getByText('ラジオボタン2')
      expect(radio1).toHaveAttribute('data-state', 'checked')
      expect(radio2).toHaveAttribute('data-state', 'unchecked')

      fireEvent.click(radio2)
      expect(onValueChange).toHaveBeenCalledWith('item2')
    })
  })

  describe('アクセシビリティテスト', () => {
    it('DropdownMenuContent に role="menu" が設定されていること', () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button>メニューを開く</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>項目1</DropdownMenuItem >
          </DropdownMenuContent>
        </DropdownMenu>
      )

      const trigger = screen.getByText('メニューを開く')
      fireEvent.click(trigger)

      expect(screen.getByRole('menu')).toBeInTheDocument()
    })

    it('DropdownMenuItem に role="menuitem" が設定されていること', () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button>メニューを開く</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>項目1</DropdownMenuItem >
          </DropdownMenuContent>
        </DropdownMenu>
      )

      const trigger = screen.getByText('メニューを開く')
      fireEvent.click(trigger)

      expect(screen.getByRole('menuitem')).toBeInTheDocument()
    })

    it('DropdownMenuCheckboxItem に role="menuitemcheckbox" が設定されていること', () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button>メニューを開く</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem>チェックボックス1</DropdownMenuCheckboxItem >
          </DropdownMenuContent>
        </DropdownMenu>
      )

      const trigger = screen.getByText('メニューを開く')
      fireEvent.click(trigger)

      expect(screen.getByRole('menuitemcheckbox')).toBeInTheDocument()
    })

    it('DropdownMenuRadioItem に role="menuitemradio" が設定されていること', () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button>メニューを開く</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup>
              < DropdownMenuRadioItem value="item1" >ラジオボタン1</DropdownMenuRadioItem >
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )

      const trigger = screen.getByText('メニューを開く')
      fireEvent.click(trigger)

      expect(screen.getByRole('menuitemradio')).toBeInTheDocument()
    })
  })
}) 