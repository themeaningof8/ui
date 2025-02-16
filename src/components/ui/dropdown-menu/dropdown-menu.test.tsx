/**
 * @file ドロップダウンメニューコンポーネントのテスト
 * @description ドロップダウンメニューコンポーネントの機能をテストします
 */

import { describe, it, expect } from 'vitest'
import { waitFor } from '@testing-library/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import React from 'react'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuPortal,
} from '.'

describe('DropdownMenuコンポーネント', () => {
  it('トリガーをクリックしてメニューが開くこと', async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await user.click(screen.getByText('Open Menu'))
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })

  it('チェックボックス項目が正しく機能すること', async () => {
    const user = userEvent.setup()
    const TestComponent = () => {
      const [checked, setChecked] = useState(false)
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem
              checked={checked}
              onCheckedChange={setChecked}
            >
              Checkbox Item
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    render(<TestComponent />)

    await user.click(screen.getByText('Open Menu'))
    await waitFor(() => {
      expect(screen.getByRole('menuitemcheckbox')).toBeInTheDocument()
    })

    const checkboxItem = screen.getByRole('menuitemcheckbox')
    expect(checkboxItem).toHaveAttribute('aria-checked', 'false')

    await user.click(checkboxItem)
    await waitFor(() => {
      expect(checkboxItem).toHaveAttribute('aria-checked', 'true')
    })
  })

  it('ラジオグループが正しく機能すること', async () => {
    const user = userEvent.setup()
    const TestComponent = () => {
      const [value, setValue] = useState("")
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
              <DropdownMenuRadioItem value="1">Option 1</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="2">Option 2</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    render(<TestComponent />)

    await user.click(screen.getByText('Open Menu'))
    await waitFor(() => {
      expect(screen.getByRole('menuitemradio', { name: 'Option 1' })).toBeInTheDocument()
    })

    const option1 = screen.getByRole('menuitemradio', { name: 'Option 1' })
    const option2 = screen.getByRole('menuitemradio', { name: 'Option 2' })

    expect(option1).toHaveAttribute('aria-checked', 'false')
    expect(option2).toHaveAttribute('aria-checked', 'false')

    await user.click(option1)
    await waitFor(() => {
      expect(option1).toHaveAttribute('aria-checked', 'true')
      expect(option2).toHaveAttribute('aria-checked', 'false')
    })
  })

  it('サブメニューが正しく機能すること', async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Submenu</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Submenu Item</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await user.click(screen.getByText('Open Menu'))
    expect(screen.getByText('Submenu')).toBeInTheDocument()

    await user.hover(screen.getByText('Submenu'))
    await waitFor(() => {
      expect(screen.getByText('Submenu Item')).toBeInTheDocument()
    })
  })

  it('セパレーターが正しくレンダリングされること', async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await user.click(screen.getByText('Open Menu'))
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('ラベルが正しくレンダリングされること', async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuItem>Menu Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await user.click(screen.getByText('Open Menu'))
    expect(screen.getByText('Settings')).toHaveClass(
      'px-2',
      'py-1.5',
      'text-sm',
      'font-semibold',
      'text-step-12'
    )
  })

  it('ラベルにinsetプロパティが正しく適用されること', async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel inset>Settings</DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await user.click(screen.getByText('Open Menu'))
    expect(screen.getByText('Settings')).toHaveClass('pl-8')
  })

  it('グループが正しくレンダリングされること', async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await user.click(screen.getByText('Open Menu'))
    const group = screen.getByRole('group')
    expect(group).toBeInTheDocument()
    expect(group.children).toHaveLength(2)
  })

  it('ショートカットが正しくレンダリングされること', async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            Item 1
            <span className="ml-auto text-xs tracking-widest text-step-11">⌘K</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await user.click(screen.getByText('Open Menu'))
    const shortcut = screen.getByText('⌘K')
    expect(shortcut).toHaveClass('ml-auto', 'text-xs', 'tracking-widest', 'text-step-11')
  })

  it('ESCキーでメニューが閉じること', async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await user.click(screen.getByText('Open Menu'))
    expect(screen.getByRole('menu')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('ポータルを使用してコンテンツがレンダリングされること', async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent>
            <DropdownMenuItem>Menu Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    )

    await user.click(screen.getByText('Open Menu'))
    await waitFor(() => {
      const menuItem = screen.getByText('Menu Item')
      expect(menuItem).toBeInTheDocument()
      expect(menuItem.closest('[role="menu"]')).toBeInTheDocument()
    })
  })

  it('メニュー項目にinsetプロパティが正しく適用されること', async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem inset>Menu Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await user.click(screen.getByText('Open Menu'))
    expect(screen.getByText('Menu Item')).toHaveClass('pl-8')
  })

  it('無効化されたメニュー項目が正しく表示されること', async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled>Menu Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await user.click(screen.getByText('Open Menu'))
    const menuItem = screen.getByText('Menu Item')
    expect(menuItem).toHaveAttribute('data-disabled')
    expect(menuItem).toHaveClass('data-[disabled]:pointer-events-none')
    expect(menuItem).toHaveClass('data-[disabled]:opacity-50')
  })
}) 