/**
 * @file Commandコンポーネントのテスト
 * @description Commandコンポーネントの機能とアクセシビリティをテスト
 */

import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from '.'

describe('Command', () => {
  it('基本的なコマンドパレットが表示されること', () => {
    render(
      <Command>
        <CommandInput placeholder="コマンドを検索..." />
        <CommandList>
          <CommandEmpty>結果が見つかりません</CommandEmpty>
          <CommandGroup heading="提案">
            <CommandItem>カレンダー</CommandItem>
            <CommandItem>検索</CommandItem>
            <CommandItem>設定</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    )

    expect(screen.getByPlaceholderText('コマンドを検索...')).toBeInTheDocument()
    expect(screen.getByText('提案')).toBeInTheDocument()
    expect(screen.getByText('カレンダー')).toBeInTheDocument()
    expect(screen.getByText('検索')).toBeInTheDocument()
    expect(screen.getByText('設定')).toBeInTheDocument()
  })

  it('検索機能が動作すること', async () => {
    const user = userEvent.setup()
    render(
      <Command>
        <CommandInput placeholder="コマンドを検索..." />
        <CommandList>
          <CommandEmpty>結果が見つかりません</CommandEmpty>
          <CommandGroup heading="提案">
            <CommandItem>カレンダー</CommandItem>
            <CommandItem>検索</CommandItem>
            <CommandItem>設定</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    )

    const input = screen.getByPlaceholderText('コマンドを検索...')
    await user.type(input, 'カレ')

    expect(screen.getByText('カレンダー')).toBeInTheDocument()
    expect(screen.queryByText('検索')).not.toBeInTheDocument()
    expect(screen.queryByText('設定')).not.toBeInTheDocument()
  })

  it('結果が見つからない場合にEmptyメッセージが表示されること', async () => {
    const user = userEvent.setup()
    render(
      <Command>
        <CommandInput placeholder="コマンドを検索..." />
        <CommandList>
          <CommandEmpty>結果が見つかりません</CommandEmpty>
          <CommandGroup heading="提案">
            <CommandItem>カレンダー</CommandItem>
            <CommandItem>検索</CommandItem>
            <CommandItem>設定</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    )

    const input = screen.getByPlaceholderText('コマンドを検索...')
    await user.type(input, 'xxx')

    expect(screen.getByText('結果が見つかりません')).toBeInTheDocument()
  })

  it('カスタムフィルター関数が動作すること', async () => {
    const user = userEvent.setup()
    const customFilter = (value: string, search: string) => {
      return value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
    }

    render(
      <Command filter={customFilter}>
        <CommandInput placeholder="コマンドを検索..." />
        <CommandList>
          <CommandEmpty>結果が見つかりません</CommandEmpty>
          <CommandGroup heading="提案">
            <CommandItem>カレンダー</CommandItem>
            <CommandItem>検索</CommandItem>
            <CommandItem>設定</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    )

    const input = screen.getByPlaceholderText('コマンドを検索...')
    await user.type(input, 'カレ')

    expect(screen.getByText('カレンダー')).toBeInTheDocument()
    expect(screen.queryByText('検索')).not.toBeInTheDocument()
  })

  it('ショートカットが表示されること', () => {
    render(
      <Command>
        <CommandList>
          <CommandGroup>
            <CommandItem>
              検索
              <CommandShortcut>⌘K</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    )

    expect(screen.getByText('⌘K')).toBeInTheDocument()
  })

  it('コマンドがクリックできること', async () => {
    const user = userEvent.setup()
    const handleSelect = vi.fn()

    render(
      <Command>
        <CommandList>
          <CommandGroup>
            <CommandItem onSelect={handleSelect}>検索</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    )

    const item = screen.getByText('検索')
    await user.click(item)

    expect(handleSelect).toHaveBeenCalled()
  })
}) 