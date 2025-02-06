/**
 * @file Badgeのテスト
 * @description Badge コンポーネントの機能とアクセシビリティをテスト
 */
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { Badge } from '@/components/ui/badge';
import { 
  runAxeTest,
  runKeyboardNavigationTest,
  runAriaAttributesTest,
  runFocusManagementTest,
  runContrastTest
} from '@/tests/wcag3/helpers';

const TestBadge = () => (
  <Badge aria-label="テストバッジ">テストバッジ</Badge>
);

describe('Badge', () => {
  afterEach(() => {
    cleanup();
  });

  describe('基本機能', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<TestBadge />);
      expect(screen.getByText('テストバッジ')).toBeInTheDocument();
    });

    it('バリアントに応じたスタイルが適用される', () => {
      const variants = ['default', 'secondary', 'destructive', 'outline'] as const;
      for (const variant of variants) {
        render(
          <Badge variant={variant}>テストバッジ</Badge>
        );
        const badge = screen.getByRole('status');
        if (variant === 'outline') {
          expect(badge).toHaveClass('border');
        } else if (variant === 'default') {
          expect(badge).toHaveClass('bg-base-solid');
        } else if (variant === 'secondary') {
          expect(badge).toHaveClass('bg-base-ui');
        } else {
          expect(badge).toHaveClass(`bg-${variant}-solid`);
        }
        cleanup();
      }
    });

    it('基本的なスタイルが適用される', () => {
      render(<TestBadge />);
      const badge = screen.getByText('テストバッジ');
      expect(badge).toHaveClass('px-2.5');  // 水平パディング
      expect(badge).toHaveClass('py-0.5');  // 垂直パディング
      expect(badge).toHaveClass('text-xs'); // フォントサイズ
      expect(badge).toHaveClass('rounded-full'); // 角丸
    });
  });

  describe('インタラクション', () => {
    it('カスタムクラスが適用される', () => {
      render(<Badge className="custom-class">テストバッジ</Badge>);
      const badge = screen.getByText('テストバッジ');
      expect(badge).toHaveClass('custom-class');
    });

    it('追加のHTML属性が正しく適用される', () => {
      render(
        <Badge data-testid="custom-badge" data-custom="test">
          テストバッジ
        </Badge>
      );
      const badge = screen.getByTestId('custom-badge');
      expect(badge).toHaveAttribute('data-custom', 'test');
    });
  });

  describe('アクセシビリティ', () => {
    describe('基本的なアクセシビリティ', () => {
      it('axeによる基本的なアクセシビリティ要件を満たす', async () => {
        await runAxeTest(<TestBadge />);
      });

      it('キーボードナビゲーションが適切に機能する', () => {
        const { container } = render(<TestBadge />);
        runKeyboardNavigationTest(container);
      });

      it('ARIA属性が適切に設定されている', () => {
        const { container } = render(<TestBadge />);
        runAriaAttributesTest(container);
      });

      it('フォーカス管理が適切に機能する', () => {
        const { container } = render(<TestBadge />);
        runFocusManagementTest(container);
      });

      it('コントラスト要件を満たす', () => {
        const { container } = render(<TestBadge />);
        runContrastTest(container);
      });
    });
  });
}); 