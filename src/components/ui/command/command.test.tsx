/**
 * @file コマンドコンポーネントのテスト
 * @description コマンドコンポーネントの機能をテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
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

describe('Commandコンポーネント', () => {
  it('基本的なコマンドメニューが正しくレンダリングされること', () => {
    render(
      <Command>
        <CommandInput placeholder="検索..." />
        <CommandList>
          <CommandEmpty>結果が見つかりません</CommandEmpty>
          <CommandGroup heading="提案">
            <CommandItem>アイテム1</CommandItem>
            <CommandItem>アイテム2</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )

    expect(screen.getByPlaceholderText('検索...')).toBeInTheDocument()
    expect(screen.getByText('提案')).toBeInTheDocument()
    expect(screen.getByText('アイテム1')).toBeInTheDocument()
    expect(screen.getByText('アイテム2')).toBeInTheDocument()
  })

  it('ダイアログモードが正しく機能すること', () => {
    render(
      <CommandDialog open={true}>
        <CommandInput placeholder="コマンドを入力..." />
        <CommandList>
          <CommandItem>ダイアログアイテム</CommandItem>
        </CommandList>
      </CommandDialog>
    )

    expect(screen.getByPlaceholderText('コマンドを入力...')).toBeInTheDocument()
    expect(screen.getByText('ダイアログアイテム')).toBeInTheDocument()
  })

  it('ショートカットが正しく表示されること', () => {
    render(
      <Command>
        <CommandList>
          <CommandItem>
            設定
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandList>
      </Command>
    )

    expect(screen.getByText('⌘S')).toBeInTheDocument()
  })

  it('セパレーターが正しく表示されること', () => {
    render(
      <Command>
        <CommandList>
          <CommandItem>上部アイテム</CommandItem>
          <CommandSeparator />
          <CommandItem>下部アイテム</CommandItem>
        </CommandList>
      </Command>
    )

    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('空の状態が正しく表示されること', async () => {
    const { user } = render(
      <Command>
        <CommandInput placeholder="検索..." />
        <CommandList>
          <CommandEmpty>結果が見つかりません</CommandEmpty>
          <CommandGroup>
            <CommandItem>検索結果</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )

    const input = screen.getByPlaceholderText('検索...')
    await user.type(input, '存在しない検索語')
    
    expect(screen.getByText('結果が見つかりません')).toBeVisible()
    const searchResult = screen.queryByText('検索結果')
    expect(searchResult).toBeNull()
  })

  it('グループ化されたアイテムが正しく表示されること', () => {
    render(
      <Command>
        <CommandList>
          <CommandGroup heading="グループ1">
            <CommandItem>アイテム1-1</CommandItem>
            <CommandItem>アイテム1-2</CommandItem>
          </CommandGroup>
          <CommandGroup heading="グループ2">
            <CommandItem>アイテム2-1</CommandItem>
            <CommandItem>アイテム2-2</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )

    expect(screen.getByText('グループ1')).toBeInTheDocument()
    expect(screen.getByText('グループ2')).toBeInTheDocument()
    expect(screen.getByText('アイテム1-1')).toBeInTheDocument()
    expect(screen.getByText('アイテム2-1')).toBeInTheDocument()
  })
}) 