/**
 * @file ドロップダウンメニューコンポーネントのテスト
 * @description ドロップダウンメニューコンポーネントの機能をテストします
 */

import { describe, it, expect } from 'vitest'
import { waitFor } from '@testing-library/react'
import { render, screen } from '@/tests/test-utils'
import React from 'react'
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
} from '.'

describe('DropdownMenuコンポーネント', () => {
  it('基本的なドロップダウンメニューが正しくレンダリングされること', async () => {
    const { user } = render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Menu Item 1</DropdownMenuItem>
          <DropdownMenuItem>Menu Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    await user.click(screen.getByText('Open Menu'))
    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(screen.getByText('Menu Item 1')).toBeInTheDocument()
    expect(screen.getByText('Menu Item 2')).toBeInTheDocument()
  })

  it('チェックボックス項目が正しく機能すること', async () => {
    const TestComponent = () => {
      const [checked, setChecked] = React.useState(false)
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

    const { user } = render(<TestComponent />)

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
    const TestComponent = () => {
      const [value, setValue] = React.useState("")
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

    const { user } = render(<TestComponent />)

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
    const { user } = render(
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
    const { user } = render(
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
}) 