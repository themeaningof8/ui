/**
 * @file ナビゲーションメニューコンポーネントのテスト
 * @description ナビゲーションメニューコンポーネントの機能をテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
} from '.'

describe('NavigationMenuコンポーネント', () => {
  it('基本的なナビゲーションメニューが正しくレンダリングされること', async () => {
    const user = userEvent.setup()

    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item 1</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink className="flex items-center gap-2" href="#">
                <img src="/test-image.png" alt="Test" width={20} height={20} />
                <span>Content 1</span>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )

    // トリガーが表示される
    const trigger = screen.getByRole('button', { name: 'Item 1' })
    expect(trigger).toBeInTheDocument()

    // トリガーをクリック
    await user.click(trigger)

    // コンテンツが表示される
    await waitFor(() => {
      expect(screen.getByRole('link')).toBeInTheDocument()
      expect(screen.getByRole('img')).toHaveAttribute('src', '/test-image.png')
    })
  })

  it('リンクが正しく機能すること', async () => {
    const user = userEvent.setup()

    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item 1</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink className="flex items-center gap-2" href="/test">
                <img src="/test-image.png" alt="Test" width={20} height={20} />
                <span>Content 1</span>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )

    // トリガーをクリック
    const trigger = screen.getByRole('button', { name: 'Item 1' })
    await user.click(trigger)

    // リンクが正しいhref属性を持つ
    await waitFor(() => {
      expect(screen.getByRole('link')).toHaveAttribute('href', '/test')
    })
  })

  it('複数のメニュー項目が正しく機能すること', async () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item 1</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div data-testid="content-1">
                <span>Content 1</span>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item 2</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div data-testid="content-2">
                <span>Content 2</span>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )

    // 初期状態では両方のコンテンツが非表示
    expect(screen.queryByTestId('content-1')).not.toBeInTheDocument()
    expect(screen.queryByTestId('content-2')).not.toBeInTheDocument()

    // Item 1をクリック
    const item1Trigger = screen.getByText('Item 1')
    fireEvent.click(item1Trigger)

    // Item 1のコンテンツが表示されることを確認
    await waitFor(() => {
      expect(screen.getByTestId('content-1')).toBeInTheDocument()
      expect(screen.queryByTestId('content-2')).not.toBeInTheDocument()
    })

    // Item 2をクリック
    const item2Trigger = screen.getByText('Item 2')
    fireEvent.click(item2Trigger)

    // Item 2のコンテンツが表示され、Item 1のコンテンツが非表示になることを確認
    await waitFor(() => {
      expect(screen.getByTestId('content-2')).toBeInTheDocument()
      expect(screen.queryByTestId('content-1')).not.toBeInTheDocument()
    }, { timeout: 2000 })
  })
}) 