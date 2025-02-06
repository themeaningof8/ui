/**
 * @file NavigationMenuのテスト
 * @description NavigationMenuの基本機能、インタラクション、アクセシビリティをテスト
 * 主なテスト項目：
 * - 基本的なレンダリングと動作
 * - キーボードナビゲーション
 * - フォーカス管理
 * - アクセシビリティ対応
 * - モバイル対応
 */

import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { 
  runAxeTest,
  runKeyboardNavigationTest,
  runAriaAttributesTest,
  runFocusManagementTest,
  runContrastTest
} from '@/tests/wcag3/helpers'

const TestNavigationMenu = () => (
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger data-testid="menu1-trigger">メニュー1</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink data-testid="link1" href="/link1">リンク1</NavigationMenuLink>
          <NavigationMenuLink data-testid="link2" href="/link2">リンク2</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger data-testid="menu2-trigger">メニュー2</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink data-testid="link3" href="/link3">リンク3</NavigationMenuLink>
          <NavigationMenuLink data-testid="link4" href="/link4">リンク4</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

describe('NavigationMenu', () => {
  describe('基本機能', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<TestNavigationMenu />);
      expect(screen.getByTestId('menu1-trigger')).toBeInTheDocument();
      expect(screen.getByTestId('menu2-trigger')).toBeInTheDocument();
    });

    it('トリガーをクリックするとメニューが表示される', async () => {
      render(<TestNavigationMenu />);
      const trigger = screen.getByTestId('menu1-trigger');
      await userEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByTestId('link1')).toBeVisible();
        expect(screen.getByTestId('link2')).toBeVisible();
      });
    });

    it('メニューが開いている状態でEscapeキーを押すと閉じる', async () => {
      render(<TestNavigationMenu />);
      const trigger = screen.getByTestId('menu1-trigger');
      await userEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByTestId('link1')).toBeVisible();
      });
      
      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        expect(screen.queryByTestId('link1')).not.toBeInTheDocument();
      });
    });

    it('メニュー外をクリックすると閉じる', async () => {
      render(
        <>
          <TestNavigationMenu />
          <div data-testid="outside">Outside</div>
        </>
      );
      
      const trigger = screen.getByTestId('menu1-trigger');
      await userEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByTestId('link1')).toBeVisible();
      });
      
      await userEvent.click(screen.getByTestId('outside'));
      await waitFor(() => {
        expect(screen.queryByTestId('link1')).not.toBeInTheDocument();
      });
    });
  });

  describe('インタラクション', () => {
    it('無効化されたトリガーがクリックできない', async () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger disabled data-testid="disabled-trigger">メニュー1</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>リンク1</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      );

      const trigger = screen.getByTestId('disabled-trigger');
      await userEvent.click(trigger);
      expect(screen.queryByText('リンク1')).not.toBeInTheDocument();
    });

    it('リンクがクリック可能である', async () => {
      const handleClick = vi.fn();
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger data-testid="menu-trigger">メニュー1</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink onClick={handleClick} data-testid="clickable-link">
                  リンク1
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      );

      const trigger = screen.getByTestId('menu-trigger');
      await userEvent.click(trigger);

      const link = await screen.findByTestId('clickable-link');
      await userEvent.click(link);
      expect(handleClick).toHaveBeenCalled();
    });

    it('モバイルでタッチ操作が正しく機能する', async () => {
      render(<TestNavigationMenu />);
      const trigger = screen.getByTestId('menu1-trigger');
      
      // タッチイベントをシミュレート
      await userEvent.click(trigger);
      await waitFor(() => {
        expect(screen.getByTestId('link1')).toBeVisible();
      });

      // 2回目のタッチでメニューが閉じることを確認
      await userEvent.click(trigger);
      await waitFor(() => {
        expect(screen.queryByTestId('link1')).not.toBeInTheDocument();
      });
    });
  });

  describe('アクセシビリティ', () => {
    describe('基本的なアクセシビリティ', () => {
      it('axeによる基本的なアクセシビリティ要件を満たす', async () => {
        await runAxeTest(<TestNavigationMenu />);
      });

      it('キーボードナビゲーションが適切に機能する', () => {
        const { container } = render(<TestNavigationMenu />);
        runKeyboardNavigationTest(container);
      });

      it('ARIA属性が適切に設定されている', () => {
        const { container } = render(<TestNavigationMenu />);
        runAriaAttributesTest(container);
      });

      it('フォーカス管理が適切に機能する', () => {
        const { container } = render(<TestNavigationMenu />);
        runFocusManagementTest(container);
      });

      it('コントラスト要件を満たす', () => {
        const { container } = render(<TestNavigationMenu />);
        runContrastTest(container);
      });
    });

    test('適切なARIA属性が設定されている', async () => {
      render(<TestNavigationMenu />);
      const trigger = screen.getByTestId('menu1-trigger');

      // buttonタグを使用しているため、role属性は不要
      expect(trigger).toHaveAttribute('aria-controls');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      
      await userEvent.click(trigger);
      
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    describe('キーボードナビゲーション', () => {
      it('メニュー内でのキーボード操作が正しく機能する', async () => {
        render(<TestNavigationMenu />);
        const user = userEvent.setup();

        // 最初のトリガーにフォーカス
        await user.tab();
        expect(screen.getByTestId('menu1-trigger')).toHaveFocus();

        // メニューを開く
        await user.keyboard('{Enter}');
        await waitFor(() => {
          expect(screen.getByTestId('link1')).toBeVisible();
        });

        // メニュー内の最初のリンクにフォーカスが移動
        await user.tab();
        expect(screen.getByTestId('link1')).toHaveFocus();

        // 次のリンクに移動
        await user.keyboard('{ArrowDown}');
        expect(screen.getByTestId('link2')).toHaveFocus();

        // 前のリンクに戻る
        await user.keyboard('{ArrowUp}');
        expect(screen.getByTestId('link1')).toHaveFocus();
      });

      it('メニュー間の移動が正しく機能する', async () => {
        render(<TestNavigationMenu />);
        const user = userEvent.setup();

        // 最初のトリガーにフォーカス
        await user.tab();
        expect(screen.getByTestId('menu1-trigger')).toHaveFocus();

        // 次のメニューに移動
        await user.keyboard('{ArrowRight}');
        expect(screen.getByTestId('menu2-trigger')).toHaveFocus();

        // 前のメニューに戻る
        await user.keyboard('{ArrowLeft}');
        expect(screen.getByTestId('menu1-trigger')).toHaveFocus();
      });

      test('フォーカストラップが正しく機能する', async () => {
        render(<TestNavigationMenu />);
        const user = userEvent.setup();
        const trigger = screen.getByTestId('menu1-trigger');

        // メニューを開く
        await user.click(trigger);
        expect(trigger).toHaveAttribute('aria-expanded', 'true');

        // メニューが開いている状態でTabを押すと、メニュー内の最初のリンクにフォーカスが移動
        await user.tab();
        expect(screen.getByTestId('link1')).toHaveFocus();

        // さらにTabを押すと次のリンクに移動
        await user.tab();
        expect(screen.getByTestId('link2')).toHaveFocus();

        // メニューを閉じる
        await user.keyboard('{Escape}');
        expect(trigger).toHaveAttribute('aria-expanded', 'false');

        // メニューが閉じた状態でTabを押すと次のトリガーに移動
        await user.tab();
        expect(screen.getByTestId('menu2-trigger')).toHaveFocus();

        // Shift+Tabで前のトリガーに戻る
        await user.keyboard('{Shift>}{Tab}{/Shift}');
        expect(screen.getByTestId('menu1-trigger')).toHaveFocus();
      });
    });
  });
}); 