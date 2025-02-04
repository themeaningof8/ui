/**
 * @file Alertのテスト
 * @description Alertの機能とアクセシビリティをテスト
 */
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { runAccessibilityTest } from '@/tests/wcag3/helpers';

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

  describe('インタラクション', () => {
    it('カスタムクラスが適用される', () => {
      render(
        <Alert className="custom-class">
          <AlertTitle>テストタイトル</AlertTitle>
        </Alert>
      );
      expect(screen.getByRole('alert')).toHaveClass('custom-class');
    });

    it('カスタム属性が適用される', () => {
      render(
        <Alert data-testid="custom-alert" data-custom="test">
          <AlertTitle>テストタイトル</AlertTitle>
        </Alert>
      );
      const alert = screen.getByTestId('custom-alert');
      expect(alert).toHaveAttribute('data-custom', 'test');
    });

    it('動的にバリアントを切り替えられる', () => {
      const { rerender } = render(
        <Alert variant="default">
          <AlertTitle>テストタイトル</AlertTitle>
        </Alert>
      );
      expect(screen.getByRole('alert')).toHaveClass('bg-base-app');

      rerender(
        <Alert variant="warning">
          <AlertTitle>テストタイトル</AlertTitle>
        </Alert>
      );
      expect(screen.getByRole('alert')).toHaveClass('bg-base-app');
    });
  });

  describe('アクセシビリティ', () => {
    it('基本的なアクセシビリティ要件を満たす', async () => {
      await runAccessibilityTest(<TestAlert />, {
        keyboardNavigation: true,
        ariaAttributes: true,
        focusManagement: true,
        contrast: false,
        skipFocusableCheck: true,
      });
    });

    it('適切なARIA属性が設定されている', () => {
      render(<TestAlert />);
      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveAttribute('role', 'alert');
    });

    it('タイトルが適切な見出しレベルで表示される', () => {
      render(<TestAlert />);
      const title = screen.getByText('テストタイトル');
      expect(title.tagName).toBe('H5');
    });

    it('各バリアントで適切なARIA属性が設定される', () => {
      const variants = ['default', 'destructive', 'success', 'warning'] as const;
      
      for (const variant of variants) {
        render(
          <Alert variant={variant}>
            <AlertTitle>テストタイトル</AlertTitle>
            <AlertDescription>テスト説明文</AlertDescription>
          </Alert>
        );
        
        const alert = screen.getByRole('alert');
        expect(alert).toHaveAttribute('role', 'alert');
        
        // バリアントに応じた追加のARIA属性を確認
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