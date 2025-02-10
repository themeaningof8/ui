/**
 * @file NavigationMenuコンポーネントのテスト
 * @description NavigationMenu関連コンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@/tests/test-utils'
import { userEvent } from '@testing-library/user-event'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
} from '.'

describe('NavigationMenu', () => {
  describe('基本機能テスト', () => {
    it('基本的なナビゲーションメニューが正しくレンダリングされること', () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/">ホーム</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/about">概要</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )

      expect(screen.getByText('ホーム')).toBeInTheDocument()
      expect(screen.getByText('概要')).toBeInTheDocument()
    })

    it('トリガーをクリックするとコンテンツが表示されること', async () => {
      const user = userEvent.setup()
      
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>製品</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul>
                  <li>製品A</li>
                  <li>製品B</li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )

      const trigger = screen.getByText('製品')
      await user.click(trigger)

      await waitFor(() => {
        expect(screen.getByText('製品A')).toBeVisible()
        expect(screen.getByText('製品B')).toBeVisible()
      })
    })
  })

  describe('インタラクティブ機能テスト', () => {
    it('ホバー時にコンテンツが表示されること', async () => {
      const user = userEvent.setup()
      
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>サービス</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div>サービスの詳細</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )

      const trigger = screen.getByText('サービス')
      await user.hover(trigger)

      await waitFor(() => {
        expect(screen.getByText('サービスの詳細')).toBeVisible()
      })
    })

    it('インジケーターが正しく動作すること', async () => {
      const user = userEvent.setup()
      
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>メニュー1</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div>コンテンツ1</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuIndicator />
          </NavigationMenuList>
          <NavigationMenuViewport />
        </NavigationMenu>
      )

      const trigger = screen.getByText('メニュー1')
      await user.hover(trigger)

      const indicator = screen.getByRole('presentation')
      expect(indicator).toBeInTheDocument()
    })
  })

  describe('アクセシビリティテスト', () => {
    it('適切なARIA属性が設定されていること', () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>メニュー</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div>コンテンツ</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )

      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()

      const trigger = screen.getByRole('button')
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })

    it('キーボード操作が正しく機能すること', async () => {
      const user = userEvent.setup()
      
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>メニュー1</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/item1">アイテム1</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>メニュー2</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/item2">アイテム2</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )

      await user.tab()
      expect(screen.getByText('メニュー1')).toHaveFocus()

      await user.keyboard('{ArrowRight}')
      expect(screen.getByText('メニュー2')).toHaveFocus()

      await user.keyboard('{Enter}')
      await waitFor(() => {
        expect(screen.getByText('アイテム2')).toBeVisible()
      })
    })
  })

  describe('スタイルテスト', () => {
    it('カスタムクラスが適用できること', () => {
      render(
        <NavigationMenu className="custom-nav">
          <NavigationMenuList className="custom-list">
            <NavigationMenuItem className="custom-item">
              <NavigationMenuLink className="custom-link" href="/">
                ホーム
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )

      expect(screen.getByRole('navigation')).toHaveClass('custom-nav')
      expect(screen.getByRole('list')).toHaveClass('custom-list')
      expect(screen.getByRole('listitem')).toHaveClass('custom-item')
      expect(screen.getByRole('link')).toHaveClass('custom-link')
    })

    it('ビューポートのスタイルが適用されること', () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>メニュー</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div>コンテンツ</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuViewport className="custom-viewport" />
        </NavigationMenu>
      )

      const viewport = screen.getByRole('region')
      expect(viewport).toHaveClass('custom-viewport')
    })
  })
}) 