/**
 * @file DropdownMenuのテスト
 * @description DropdownMenuの機能とアクセシビリティをテスト
 */

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, beforeEach } from 'vitest'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu'
import { runAccessibilityTest } from '@/tests/wcag3/helpers'

describe('DropdownMenu', () => {
  const user = userEvent.setup({
    delay: 50, // イベント間の遅延を追加
    pointerEventsCheck: 0,
  })

  beforeEach(() => {
    // テスト環境のセットアップ
    document.body.innerHTML = ''
  })

  const renderDropdownMenu = () => {
    return render(
      <DropdownMenu>
        <DropdownMenuTrigger>メニュー</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>アカウント</DropdownMenuLabel>
          <DropdownMenuItem>プロフィール</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>詳細設定</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>通知設定</DropdownMenuItem>
              <DropdownMenuItem>セキュリティ設定</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem>
            ログアウト
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  describe('基本機能', () => {
    it('メニューが正しくレンダリングされる', () => {
      renderDropdownMenu()
      expect(screen.getByText('メニュー')).toBeInTheDocument()
    })

    it('トリガーをクリックするとメニューが表示される', async () => {
      renderDropdownMenu()
      const trigger = screen.getByText('メニュー')
      
      await user.click(trigger)
      
      await waitFor(() => {
        expect(screen.getByText('アカウント')).toBeVisible()
        expect(screen.getByText('プロフィール')).toBeVisible()
        expect(screen.getByText('ログアウト')).toBeVisible()
      })
    })

    it('メニュー項目がクリック可能である', async () => {
      renderDropdownMenu()
      const trigger = screen.getByText('メニュー')
      
      await user.click(trigger)
      await waitFor(() => {
        expect(screen.getByText('プロフィール')).toBeVisible()
      })
      
      const menuItem = screen.getByText('プロフィール')
      await user.click(menuItem)
    })
  })

  describe('サブメニュー', () => {
    it('サブメニューが正しく動作する', async () => {
      renderDropdownMenu()
      const trigger = screen.getByText('メニュー')
      
      await user.click(trigger)
      await waitFor(() => {
        expect(screen.getByText('詳細設定')).toBeVisible()
      })
      
      const subTrigger = screen.getByText('詳細設定')
      await user.hover(subTrigger)
      
      await waitFor(() => {
        expect(screen.getByText('通知設定')).toBeVisible()
        expect(screen.getByText('セキュリティ設定')).toBeVisible()
      }, { timeout: 1000 })
    })
  })

  describe('アクセシビリティ', () => {
    it('基本的なアクセシビリティ要件を満たす', async () => {
      await runAccessibilityTest(
        <DropdownMenu>
          <DropdownMenuTrigger>メニュー</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>テスト項目</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    })

    it('メインメニューのARIA属性が適切に設定されている', async () => {
      renderDropdownMenu()
      const trigger = screen.getByText('メニュー')
      
      // 初期状態を確認
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
      expect(trigger).toHaveAttribute('aria-haspopup', 'menu')
      
      // メニューを開いた状態を確認
      await user.click(trigger)
      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true')
      })
      
      // メニューを閉じた状態を確認
      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'false')
      })
    })

    it('サブメニューのARIA属性が適切に設定されている', async () => {
      renderDropdownMenu()
      const trigger = screen.getByText('メニュー')
      
      // メインメニューを開く
      await user.click(trigger)
      await waitFor(() => {
        expect(screen.getByText('詳細設定')).toBeVisible()
      })
      
      const subTrigger = screen.getByText('詳細設定')
      
      // 初期状態を確認
      expect(subTrigger).toHaveAttribute('aria-expanded', 'false')
      
      // サブメニューを開く
      await user.hover(subTrigger)
      await waitFor(() => {
        expect(subTrigger).toHaveAttribute('aria-expanded', 'true')
      }, { timeout: 1000 })
      
      // サブメニューを閉じる
      await user.unhover(subTrigger)
      await waitFor(() => {
        expect(subTrigger).toHaveAttribute('aria-expanded', 'false')
      }, { timeout: 1000 })
    })

    it('キーボード操作が正しく機能する', async () => {
      renderDropdownMenu()
      const trigger = screen.getByText('メニュー')
      
      // Enterキーでメニューを開く
      trigger.focus()
      await user.keyboard('{Enter}')
      await waitFor(() => {
        expect(screen.getByText('プロフィール')).toBeVisible()
      })
      
      // 最初のメニュー項目にフォーカスが移動することを確認
      const firstMenuItem = screen.getByText('プロフィール')
      await waitFor(() => {
        expect(firstMenuItem).toHaveAttribute('data-highlighted', '')
      })
      
      // 矢印キーで次のメニュー項目に移動
      await user.keyboard('{ArrowDown}')
      const nextMenuItem = screen.getByText('詳細設定')
      await waitFor(() => {
        expect(nextMenuItem).toHaveAttribute('data-highlighted', '')
      })
      
      // Escapeキーでメニューを閉じる
      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByText('プロフィール')).toBeNull()
      })
    })
  })
})