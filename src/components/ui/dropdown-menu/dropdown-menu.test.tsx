/**
 * @file DropdownMenuコンポーネントのテスト
 * @description DropdownMenuコンポーネントの機能とアクセシビリティをテスト
 */

import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
} from '.'
import { Button } from '../button'

describe('DropdownMenu', () => {
  it('トリガーをクリックするとメニューが表示されること', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>メニューを開く</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>アイテム1</DropdownMenuItem>
          <DropdownMenuItem>アイテム2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    )

    const trigger = screen.getByRole('button', { name: 'メニューを開く' })
    await userEvent.click(trigger)

    expect(screen.getByText('アイテム1')).toBeInTheDocument()
    expect(screen.getByText('アイテム2')).toBeInTheDocument()
  })

  it('無効化されたメニューアイテムがクリックできないこと', async () => {
    const handleClick = vi.fn()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>メニューを開く</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled onClick={handleClick}>
            無効化されたアイテム
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    )

    const trigger = screen.getByRole('button', { name: 'メニューを開く' })
    await userEvent.click(trigger)

    const disabledItem = screen.getByText('無効化されたアイテム')
    await userEvent.click(disabledItem)

    expect(handleClick).not.toHaveBeenCalled()
  })

  it('メニューアイテムがクリック可能であること', async () => {
    const handleClick = vi.fn()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>メニューを開く</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleClick}>
            クリック可能なアイテム
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    )

    const trigger = screen.getByRole('button', { name: 'メニューを開く' })
    await userEvent.click(trigger)

    const clickableItem = screen.getByText('クリック可能なアイテム')
    await userEvent.click(clickableItem)

    expect(handleClick).toHaveBeenCalled()
  })

  it('Escapeキーでメニューが閉じること', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>メニューを開く</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>アイテム1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    )

    const trigger = screen.getByRole('button', { name: 'メニューを開く' })
    await userEvent.click(trigger)

    const item = screen.getByText('アイテム1')
    expect(item).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')
    expect(item).not.toBeInTheDocument()
  })

  it('ラベルが正しく表示されること', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>メニューを開く</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>メニューラベル</DropdownMenuLabel>
          <DropdownMenuItem>アイテム1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    )

    const trigger = screen.getByRole('button', { name: 'メニューを開く' })
    await userEvent.click(trigger)

    expect(screen.getByText('メニューラベル')).toBeInTheDocument()
  })

  it('セパレータが正しく表示されること', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>メニューを開く</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>アイテム1</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>アイテム2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    )

    const trigger = screen.getByRole('button', { name: 'メニューを開く' })
    await userEvent.click(trigger)

    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('ショートカットが正しく表示されること', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>メニューを開く</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            アイテム1
            <DropdownMenuShortcut>⌘+S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    )

    const trigger = screen.getByRole('button', { name: 'メニューを開く' })
    await userEvent.click(trigger)

    expect(screen.getByText('⌘+S')).toBeInTheDocument()
  })

  it('サブメニューが正しく表示されること', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>メニューを開く</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuItem>サブメニュー</DropdownMenuItem>
            <DropdownMenuSubContent>
              <DropdownMenuItem>サブアイテム</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>,
    )

    const trigger = screen.getByRole('button', { name: 'メニューを開く' })
    await userEvent.click(trigger)

    expect(screen.getByText('サブメニュー')).toBeInTheDocument()
  })
}) 