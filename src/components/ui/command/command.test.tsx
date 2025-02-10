/**
 * @file Commandコンポーネントのテスト
 * @description Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator コンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@/tests/test-utils'
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
} from '.'

describe('Command', () => {
  describe('基本レンダリングテスト', () => {
    it('すべてのコンポーネントが正しくレンダリングされること', () => {
      render(
        <Command>
          < CommandInput placeholder="検索..." />
          <CommandList>
            <CommandEmpty>該当なし</CommandEmpty>
            < CommandGroup heading="グループ1" >
              <CommandItem>
                アイテム1
                <CommandShortcut>⌘K</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            < CommandGroup heading="グループ2" >
              <CommandItem>アイテム2</CommandItem >
            </CommandGroup>
          </CommandList>
        </Command>
      )

      expect(screen.getByPlaceholderText('検索...')).toBeInTheDocument()
      expect(screen.getByText('該当なし')).toBeInTheDocument()
      expect(screen.getByText('グループ1')).toBeInTheDocument()
      expect(screen.getByText('アイテム1')).toBeInTheDocument()
      expect(screen.getByText('⌘K')).toBeInTheDocument()
      expect(screen.getByText('グループ2')).toBeInTheDocument()
      expect(screen.getByText('アイテム2')).toBeInTheDocument()
    })
  })

  describe('インタラクションテスト', () => {
    it('CommandInput で検索できること', () => {
      const onInputValueChange = vi.fn()
      render(
        <Command>
          < CommandInput placeholder="検索..." onValueChange={onInputValueChange} />
          <CommandList>
            <CommandGroup>
              < CommandItem value="item1" >アイテム1</CommandItem >
              < CommandItem value="item2" >アイテム2</CommandItem >
            </CommandGroup>
          </CommandList>
        </Command>
      )

      const input = screen.getByPlaceholderText('検索...')
      fireEvent.change(input, { target: { value: 'item1' } })
      expect(onInputValueChange).toHaveBeenCalledWith('item1')

      // value="item1"のアイテムだけが表示されることを確認
      expect(screen.getByText('アイテム1')).toBeVisible()
      expect(screen.queryByText('アイテム2')).not.toBeVisible()

      fireEvent.change(input, { target: { value: '' } })
      expect(onInputValueChange).toHaveBeenCalledWith('')

      // 全てのアイテムが表示されることを確認
      expect(screen.getByText('アイテム1')).toBeVisible()
      expect(screen.getByText('アイテム2')).toBeVisible()
    })

    it('CommandItem をクリックすると選択されること', () => {
      const onSelect = vi.fn()
      render(
        <Command>
          < CommandInput placeholder="検索..." />
          <CommandList>
            <CommandGroup>
              < CommandItem value="item1" onSelect={onSelect} >アイテム1</CommandItem >
            </CommandGroup>
          </CommandList>
        </Command>
      )

      const item = screen.getByText('アイテム1')
      fireEvent.click(item)
      expect(onSelect).toHaveBeenCalledWith('item1')
    })
  })

  describe('アクセシビリティテスト', () => {
    it('CommandList に role="listbox" が設定されていること', () => {
      render(
        <Command>
          <CommandList>
            <CommandGroup>
              <CommandItem>アイテム1</CommandItem >
            </CommandGroup>
          </CommandList>
        </Command>
      )

      expect(screen.getByRole('listbox')).toBeInTheDocument()
    })

    it('CommandItem に role="option" が設定されていること', () => {
      render(
        <Command>
          <CommandList>
            <CommandGroup>
              <CommandItem>アイテム1</CommandItem >
            </CommandGroup>
          </CommandList>
        </Command>
      )

      expect(screen.getByRole('option')).toBeInTheDocument()
    })
  })

  describe('CommandDialog のテスト', () => {
    it('CommandDialog が正しく開閉すること', () => {
      render(
        < CommandDialog open={true} >
          < CommandInput placeholder="検索..." />
          <CommandList>
            <CommandGroup>
              <CommandItem>アイテム1</CommandItem >
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      )

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })
}) 