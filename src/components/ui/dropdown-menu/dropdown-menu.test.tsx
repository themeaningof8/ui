/**
 * @file DropdownMenuのテスト
 * @description DropdownMenuの基本機能、インタラクション、アクセシビリティをテスト
 */
import { render, screen, cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
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
import { 
  runAxeTest,
  runKeyboardNavigationTest,
  runAriaAttributesTest,
  runFocusManagementTest,
  runContrastTest
} from '@/tests/wcag3/helpers'

describe('DropdownMenu', () => {
  beforeEach(() => {
    cleanup()
  })

  const renderDropdownMenu = () => {
    return render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="menu-trigger">メニュー</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>アカウント</DropdownMenuLabel>
          <DropdownMenuItem data-testid="profile-item">プロフィール</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger data-testid="settings-trigger">詳細設定</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem data-testid="notification-item">通知設定</DropdownMenuItem>
              <DropdownMenuItem data-testid="security-item">セキュリティ設定</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem data-testid="logout-item">
            ログアウト
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  describe('基本機能', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      renderDropdownMenu()
      expect(screen.getByText('メニュー')).toBeInTheDocument()
    })

    it('メニューが初期状態で非表示である', () => {
      renderDropdownMenu()
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })

    it('メニュー項目が正しい順序で表示される', async () => {
      renderDropdownMenu()
      const user = userEvent.setup()
      await user.click(screen.getByTestId('menu-trigger'))
      
      await waitFor(() => {
        const menuItems = screen.getAllByRole('menuitem')
        expect(menuItems[0]).toHaveTextContent('プロフィール')
        expect(menuItems[1]).toHaveTextContent('詳細設定')
        expect(menuItems[2]).toHaveTextContent('ログアウト')
      })
    })

    it('ショートカットが正しく表示される', async () => {
      renderDropdownMenu()
      const user = userEvent.setup()
      await user.click(screen.getByTestId('menu-trigger'))
      
      await waitFor(() => {
        expect(screen.getByText('⇧⌘Q')).toBeInTheDocument()
      })
    })
  })

  describe('インタラクション', () => {
    it('トリガーをクリックするとメニューが表示される', async () => {
      renderDropdownMenu()
      const user = userEvent.setup()
      await user.click(screen.getByTestId('menu-trigger'))
      
      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeVisible()
      })
    })

    it('メニュー項目がクリック可能である', async () => {
      renderDropdownMenu()
      const user = userEvent.setup()
      await user.click(screen.getByTestId('menu-trigger'))
      
      await waitFor(() => {
        expect(screen.getByTestId('profile-item')).toBeVisible()
      })
      
      await user.click(screen.getByTestId('profile-item'))
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })

    it('サブメニューが正しく動作する', async () => {
      renderDropdownMenu()
      const user = userEvent.setup()
      await user.click(screen.getByTestId('menu-trigger'))
      
      await waitFor(() => {
        expect(screen.getByTestId('settings-trigger')).toBeVisible()
      })
      
      await user.hover(screen.getByTestId('settings-trigger'))
      await waitFor(() => {
        expect(screen.getByText('通知設定')).toBeVisible()
        expect(screen.getByText('セキュリティ設定')).toBeVisible()
      })
    })

    it('ESCキーでメニューが閉じる', async () => {
      renderDropdownMenu()
      const user = userEvent.setup()
      await user.click(screen.getByTestId('menu-trigger'))
      
      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeVisible()
      })
      
      await user.keyboard('{Escape}')
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })
  })

  describe('アクセシビリティ', () => {
    describe('基本的なアクセシビリティ', () => {
      const SimpleDropdownMenu = () => (
        <DropdownMenu>
          <DropdownMenuTrigger>メニュー</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>テスト項目</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      it('axeによる基本的なアクセシビリティ要件を満たす', async () => {
        await runAxeTest(<SimpleDropdownMenu />);
      });

      it('キーボードナビゲーションが適切に機能する', () => {
        const { container } = render(<SimpleDropdownMenu />);
        runKeyboardNavigationTest(container);
      });

      it('ARIA属性が適切に設定されている', () => {
        const { container } = render(<SimpleDropdownMenu />);
        runAriaAttributesTest(container);
      });

      it('フォーカス管理が適切に機能する', () => {
        const { container } = render(<SimpleDropdownMenu />);
        runFocusManagementTest(container);
      });

      it('コントラスト要件を満たす', () => {
        const { container } = render(<SimpleDropdownMenu />);
        runContrastTest(container);
      });
    });

    it('メインメニューのARIA属性が適切に設定されている', async () => {
      renderDropdownMenu()
      const trigger = screen.getByTestId('menu-trigger')
      
      expect(trigger).toHaveAttribute('aria-haspopup', 'menu')
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
      
      const user = userEvent.setup()
      await user.click(trigger)
      
      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true')
      })
    })

    it('サブメニューのARIA属性が適切に設定されている', async () => {
      renderDropdownMenu()
      const user = userEvent.setup()
      await user.click(screen.getByTestId('menu-trigger'))
      
      await waitFor(() => {
        expect(screen.getByTestId('settings-trigger')).toBeVisible()
      })
      
      const subTrigger = screen.getByTestId('settings-trigger')
      expect(subTrigger).toHaveAttribute('aria-haspopup', 'menu')
      expect(subTrigger).toHaveAttribute('aria-expanded', 'false')
      
      await user.hover(subTrigger)
      await waitFor(() => {
        expect(subTrigger).toHaveAttribute('aria-expanded', 'true')
      })
    })

    test('キーボード操作が正しく機能する', async () => {
      const user = userEvent.setup()
      renderDropdownMenu()

      // メニューを開く
      await user.click(screen.getByTestId('menu-trigger'))
      expect(screen.getByRole('menu')).toBeVisible()

      // 最初のメニュー項目にフォーカスが移動することを確認
      await user.keyboard('{ArrowDown}')
      await waitFor(() => {
        expect(screen.getByTestId('profile-item')).toHaveFocus()
      })

      // 次のメニュー項目に移動
      await user.keyboard('{ArrowDown}')
      await waitFor(() => {
        expect(screen.getByTestId('settings-trigger')).toHaveFocus()
      })

      // 最後のメニュー項目に移動
      await user.keyboard('{ArrowDown}')
      await waitFor(() => {
        expect(screen.getByTestId('logout-item')).toHaveFocus()
      })

      // 最初のメニュー項目に戻る
      await user.keyboard('{ArrowUp}')
      await user.keyboard('{ArrowUp}')
      await waitFor(() => {
        expect(screen.getByTestId('profile-item')).toHaveFocus()
      })
    })
  })
})