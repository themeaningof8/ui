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
import { testBasicAccessibility, testWCAG3Compliance, testKeyboardInteraction } from '@/tests/wcag3/helpers'
import React from 'react'

describe('Command', () => {
  const TestComponent = ({
    onKeyDown,
    onSelect,
  }: {
    onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    onSelect?: (value: string) => void;
  }) => {
    const [value, setValue] = React.useState<string>("");
    const [selectedValue, setSelectedValue] = React.useState<string>("");

    const items = React.useMemo(() => ["ホーム", "検索", "設定"], []);

    const handleValueChange = React.useCallback((newValue: string) => {
      setValue(newValue);
    }, []);

    const handleSelect = React.useCallback((value: string) => {
      setSelectedValue(value);
      onSelect?.(value);
    }, [onSelect]);

    const handleKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);

      if (event.key === "ArrowDown") {
        event.preventDefault();
        const currentIndex = items.indexOf(selectedValue);
        const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % items.length;
        const nextValue = items[nextIndex];
        setValue(nextValue);
        setSelectedValue(nextValue);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        const currentIndex = items.indexOf(selectedValue);
        const nextIndex = currentIndex === -1 ? items.length - 1 : (currentIndex - 1 + items.length) % items.length;
        const nextValue = items[nextIndex];
        setValue(nextValue);
        setSelectedValue(nextValue);
      } else if (event.key === "Enter") {
        event.preventDefault();
        if (selectedValue) {
          onSelect?.(selectedValue);
        }
      }
    }, [items, selectedValue, onSelect, onKeyDown]);

    return (
      <Command
        onKeyDown={handleKeyDown}
        value={value}
        onValueChange={handleValueChange}
      >
        <CommandInput placeholder="コマンドを検索..." />
        <CommandList>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item}
                value={item}
                onSelect={handleSelect}
              >
                {item}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    );
  };

  // WCAG3テスト
  testBasicAccessibility(<TestComponent />, {
    expectedRole: "combobox",
    testDisabled: false,
  })

  testWCAG3Compliance(<TestComponent />, {
    expectedRole: "combobox",
    focusClasses: {
      outline: "focus-visible:outline-none",
      ring: "focus-visible:ring-2",
      ringColor: "focus-visible:ring-base-ui",
      ringOffset: "focus-visible:ring-offset-2",
    },
    sizeClasses: {
      height: "h-full",
      width: "w-full",
      padding: ["px-3", "py-3"],
      layout: ["flex", "items-center"],
    },
  })

  testKeyboardInteraction(<TestComponent />, {
    expectedRole: "combobox",
    triggerKeys: ["Enter", "ArrowDown", "ArrowUp", "Escape"],
  })

  // 既存のテスト
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

  it('キーボード操作が正しく動作すること', async () => {
    const user = userEvent.setup()
    const handleKeyDown = vi.fn()
    const handleSelect = vi.fn()

    render(
      <TestComponent onKeyDown={handleKeyDown} onSelect={handleSelect} />
    )

    // 入力フィールドにフォーカス
    const input = screen.getByRole('combobox')
    await user.tab()
    expect(input).toHaveFocus()

    // 下矢印キーで最初の項目を選択
    await user.keyboard('{ArrowDown}')
    expect(handleKeyDown).toHaveBeenCalled()
    const firstItem = screen.getByText('ホーム')
    await waitFor(() => {
      expect(firstItem).toHaveAttribute('data-selected', 'true')
    })
    expect(input).toHaveFocus()

    // 下矢印キーで次の項目を選択
    await user.keyboard('{ArrowDown}')
    expect(handleKeyDown).toHaveBeenCalledTimes(2)
    const secondItem = screen.getByText('検索')
    await waitFor(() => {
      expect(secondItem).toHaveAttribute('data-selected', 'true')
    })
    expect(input).toHaveFocus()

    // 上矢印キーで前の項目を選択
    await user.keyboard('{ArrowUp}')
    expect(handleKeyDown).toHaveBeenCalledTimes(3)
    await waitFor(() => {
      expect(firstItem).toHaveAttribute('data-selected', 'true')
    })
    expect(input).toHaveFocus()

    // Enterキーで選択
    await user.keyboard('{Enter}')
    expect(handleSelect).toHaveBeenCalledWith('ホーム')
    expect(input).toHaveFocus()

    // Escapeキーでフォーカスを外す
    await user.keyboard('{Escape}')
    expect(handleKeyDown).toHaveBeenCalledTimes(5)
    expect(input).toHaveFocus()
  })

  it('コマンドがクリックできること', async () => {
    const user = userEvent.setup()
    const handleSelect = vi.fn()

    render(
      <Command>
        <CommandList>
          <CommandGroup>
            <CommandItem value="検索" onSelect={handleSelect}>検索</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    )

    const item = screen.getByText('検索')
    await user.click(item)
    expect(handleSelect).toHaveBeenCalledWith('検索')
  })
}) 