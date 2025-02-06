/**
 * @file Alertのテスト
 * @description Alertの機能とアクセシビリティをテスト
 */
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { 
  runAxeTest, 
  runKeyboardNavigationTest, 
  runAriaAttributesTest, 
  runFocusManagementTest,
  runContrastTest
} from '@/tests/wcag3/helpers';

const TestAlert = () => (
  <Alert>
    <AlertTitle>テストタイトル</AlertTitle>
    <AlertDescription>テスト説明文</AlertDescription>
  </Alert>
);

describe('Alert', () => {
  afterEach(() => {
    cleanup();
  });

  describe('基本機能', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<TestAlert />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('テストタイトル')).toBeInTheDocument();
      expect(screen.getByText('テスト説明文')).toBeInTheDocument();
    });

    it('バリアントに応じたスタイルが適用される', () => {
      const variants = ['default', 'destructive', 'success', 'warning'] as const;
      const variantClasses = {
        default: 'bg-base-app text-base-high border-base-subtle',
        destructive: 'bg-destructive-app text-destructive-high border-destructive-subtle',
        success: 'bg-accent-app text-accent-high border-accent-subtle',
        warning: 'bg-base-app text-base-high border-base-subtle',
      };

      for (const variant of variants) {
        render(
          <Alert variant={variant}>
            <AlertTitle>テストタイトル</AlertTitle>
          </Alert>
        );
        const alert = screen.getByRole('alert');
        const classes = variantClasses[variant].split(' ');
        for (const className of classes) {
          expect(alert).toHaveClass(className);
        }
        cleanup();
      }
    });
  });

  describe('アクセシビリティ', () => {
    describe('基本的なアクセシビリティ', () => {
      it('axeによる基本的なアクセシビリティ要件を満たす', async () => {
        await runAxeTest(<TestAlert />);
      });

      it('キーボードナビゲーションが適切に機能する', () => {
        const { container } = render(<TestAlert />);
        runKeyboardNavigationTest(container);
      });

      it('ARIA属性が適切に設定されている', () => {
        const { container } = render(<TestAlert />);
        runAriaAttributesTest(container);
      });

      it('フォーカス管理が適切に機能する', () => {
        const { container } = render(<TestAlert />);
        runFocusManagementTest(container);
      });

      it('コントラスト要件を満たす', () => {
        const { container } = render(<TestAlert />);
        runContrastTest(container);
      });
    });

    describe('バリアント', () => {
      it('各バリアントでアクセシビリティ要件を満たす', async () => {
        const variants = ['default', 'destructive', 'success', 'warning'] as const;

        for (const variant of variants) {
          const { container } = render(
            <Alert variant={variant}>
              <AlertTitle>テストタイトル</AlertTitle>
              <AlertDescription>テスト説明文</AlertDescription>
            </Alert>
          );

          await runAxeTest(
            <Alert variant={variant}>
              <AlertTitle>テストタイトル</AlertTitle>
              <AlertDescription>テスト説明文</AlertDescription>
            </Alert>
          );
          runAriaAttributesTest(container);
          runContrastTest(container);

          const alert = screen.getByRole('alert');
          if (variant === 'destructive') {
            expect(alert).toHaveAttribute('aria-live', 'assertive');
          } else if (variant === 'warning') {
            expect(alert).toHaveAttribute('aria-live', 'polite');
          }

          cleanup();
        }
      });
    });
  });
}); 