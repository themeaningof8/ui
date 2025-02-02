/**
 * @file NavigationMenuコンポーネントのテスト
 * @description NavigationMenuコンポーネントの機能とアクセシビリティをテスト
 */

import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '.'

describe('NavigationMenu', () => {
  it('トリガーをクリックするとメニューが表示されること', async () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>メニュー1</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>リンク1</NavigationMenuLink>
              <NavigationMenuLink>リンク2</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    )

    const trigger = screen.getByRole('button', { name: 'メニュー1' })
    await userEvent.click(trigger)

    expect(screen.getByText('リンク1')).toBeInTheDocument()
    expect(screen.getByText('リンク2')).toBeInTheDocument()
  })

  it('メニューが開いている状態でEscapeキーを押すと閉じること', async () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>メニュー1</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>リンク1</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    )

    const trigger = screen.getByRole('button', { name: 'メニュー1' })
    await userEvent.click(trigger)

    const link = screen.getByText('リンク1')
    expect(link).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')
    expect(link).not.toBeInTheDocument()
  })

  it('無効化されたトリガーがクリックできないこと', async () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger disabled>メニュー1</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>リンク1</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    )

    const trigger = screen.getByRole('button', { name: 'メニュー1' })
    await userEvent.click(trigger)

    expect(screen.queryByText('リンク1')).not.toBeInTheDocument()
  })

  it('リンクがクリック可能であること', async () => {
    const handleClick = vi.fn()
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>メニュー1</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink onClick={handleClick}>
                リンク1
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    )

    const trigger = screen.getByRole('button', { name: 'メニュー1' })
    await userEvent.click(trigger)

    const link = screen.getByText('リンク1')
    await userEvent.click(link)

    expect(handleClick).toHaveBeenCalled()
  })
}) 