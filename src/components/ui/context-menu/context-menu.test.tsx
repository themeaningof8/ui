/**
 * @file コンテキストメニューコンポーネントのテスト
 * @description コンテキストメニューコンポーネントの機能をテストします
 */

import { useState } from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@/tests/test-utils'
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
} from '.'

describe('ContextMenuコンポーネント', () => {
  it('基本的なコンテキストメニューが正しくレンダリングされること', async () => {
    const { user } = render(
      <ContextMenu>
        <ContextMenuTrigger>右クリックエリア</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>メニュー項目1</ContextMenuItem>
          <ContextMenuItem>メニュー項目2</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    const trigger = screen.getByText('右クリックエリア')
    expect(trigger).toBeInTheDocument()

    await user.pointer({ keys: '[MouseRight]', target: trigger })
    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument()
      expect(screen.getByText('メニュー項目1')).toBeInTheDocument()
      expect(screen.getByText('メニュー項目2')).toBeInTheDocument()
    })
  })

  it('サブメニューが正しくレンダリングされること', async () => {
    const { user } = render(
      <ContextMenu>
        <ContextMenuTrigger>右クリックエリア</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuSub>
            <ContextMenuSubTrigger>サブメニュー</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>サブ項目1</ContextMenuItem>
              <ContextMenuItem>サブ項目2</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    )

    const trigger = screen.getByText('右クリックエリア')
    await user.pointer({ keys: '[MouseRight]', target: trigger })
    
    await waitFor(() => {
      expect(screen.getByText('サブメニュー')).toBeInTheDocument()
    })

    await user.hover(screen.getByText('サブメニュー'))
    await waitFor(() => {
      expect(screen.getByText('サブ項目1')).toBeInTheDocument()
      expect(screen.getByText('サブ項目2')).toBeInTheDocument()
    })
  })

  it('セパレーターが正しくレンダリングされること', async () => {
    const { user } = render(
      <ContextMenu>
        <ContextMenuTrigger>右クリックエリア</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>項目1</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>項目2</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    const trigger = screen.getByText('右クリックエリア')
    await user.pointer({ keys: '[MouseRight]', target: trigger })

    await waitFor(() => {
      expect(screen.getByRole('separator')).toBeInTheDocument()
    })
  })

  it('チェックボックス項目が正しく機能すること', async () => {
    const TestComponent = () => {
      const [checked, setChecked] = useState(false)
      return (
        <ContextMenu>
          <ContextMenuTrigger>右クリックエリア</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuCheckboxItem
              checked={checked}
              onCheckedChange={setChecked}
            >
              チェックボックス項目
            </ContextMenuCheckboxItem>
          </ContextMenuContent>
        </ContextMenu>
      )
    }

    const { user } = render(<TestComponent />)

    const trigger = screen.getByText('右クリックエリア')
    await user.pointer({ keys: '[MouseRight]', target: trigger })
    
    await waitFor(() => {
      expect(screen.getByRole('menuitemcheckbox')).toBeInTheDocument()
    })

    const checkbox = screen.getByRole('menuitemcheckbox')
    expect(checkbox).toHaveAttribute('aria-checked', 'false')

    await user.click(checkbox)
    await waitFor(() => {
      expect(checkbox).toHaveAttribute('aria-checked', 'true')
    })
  })

  it('ラジオグループが正しく機能すること', async () => {
    const TestComponent = () => {
      const [value, setValue] = useState('item1')
      return (
        <ContextMenu>
          <ContextMenuTrigger>右クリックエリア</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuRadioGroup value={value} onValueChange={setValue}>
              <ContextMenuRadioItem value="item1">
                ラジオ項目1
              </ContextMenuRadioItem>
              <ContextMenuRadioItem value="item2">
                ラジオ項目2
              </ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuContent>
        </ContextMenu>
      )
    }

    const { user } = render(<TestComponent />)

    const trigger = screen.getByText('右クリックエリア')
    await user.pointer({ keys: '[MouseRight]', target: trigger })

    await waitFor(() => {
      expect(screen.getByRole('menuitemradio', { name: 'ラジオ項目1' })).toBeInTheDocument()
    })

    const radio1 = screen.getByRole('menuitemradio', { name: 'ラジオ項目1' })
    const radio2 = screen.getByRole('menuitemradio', { name: 'ラジオ項目2' })

    expect(radio1).toHaveAttribute('aria-checked', 'true')
    expect(radio2).toHaveAttribute('aria-checked', 'false')

    await user.click(radio2)
    await waitFor(() => {
      expect(radio1).toHaveAttribute('aria-checked', 'false')
      expect(radio2).toHaveAttribute('aria-checked', 'true')
    })
  })
}) 