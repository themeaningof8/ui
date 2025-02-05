/**
 * @file Buttonのテスト
 * @description ボタンの基本機能、インタラクション、アクセシビリティをテスト
 */
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Link, MemoryRouter } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { runAccessibilityTest } from '@/tests/wcag3/helpers';

const TestButton = () => (
  <Button>テストボタン</Button>
);

describe('Button', () => {
  beforeEach(() => {
    cleanup();
  });

  describe('基本機能', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<TestButton />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('バリアントに応じたスタイルが適用される', () => {
      const variants = [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link'
      ] as const;

      type VariantType = typeof variants[number];

      const variantClasses: Record<VariantType, string[]> = {
        default: ['bg-base-solid', 'text-base-on-solid', 'hover:bg-base-solid-hover'],
        destructive: ['bg-destructive-solid', 'text-destructive-on-solid', 'hover:bg-destructive-solid-hover'],
        outline: ['border', 'border-base-ui', 'bg-transparent', 'hover:bg-base-hover', 'text-base-high'],
        secondary: ['bg-base-ui', 'text-base-high', 'hover:bg-base-hover'],
        ghost: ['hover:bg-base-hover', 'text-base-high'],
        link: ['text-base-high', 'underline-offset-4', 'hover:underline'],
      };

      for (const variant of variants) {
        cleanup();
        render(<Button variant={variant} data-testid={`button-${variant}`}>テストボタン</Button>);
        const button = screen.getByTestId(`button-${variant}`);
        for (const className of variantClasses[variant]) {
          expect(button).toHaveClass(className);
        }
      }
    });

    it('サイズバリアントが適用される', () => {
      const sizes = ['default', 'sm', 'lg', 'icon'] as const;
      type SizeType = typeof sizes[number];

      const sizeClasses: Record<SizeType, string[]> = {
        default: ['h-10', 'px-4', 'py-2'],
        sm: ['h-9', 'rounded-md', 'px-3'],
        lg: ['h-11', 'rounded-md', 'px-8'],
        icon: ['h-10', 'w-10'],
      };

      for (const size of sizes) {
        cleanup();
        render(<Button size={size} data-testid={`button-${size}`}>テストボタン</Button>);
        const button = screen.getByTestId(`button-${size}`);
        for (const className of sizeClasses[size]) {
          expect(button).toHaveClass(className);
        }
      }
    });
  });

  describe('インタラクション', () => {
    it('クリックイベントが発火する', async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick} data-testid="button-click">テストボタン</Button>);
      
      await userEvent.click(screen.getByTestId('button-click'));
      expect(handleClick).toHaveBeenCalled();
    });

    it('無効化状態でクリックイベントが発火しない', async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick} disabled data-testid="button-disabled">テストボタン</Button>);
      
      await userEvent.click(screen.getByTestId('button-disabled'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('カスタムクラスが適用される', () => {
      render(<Button className="custom-class" data-testid="button-custom">テストボタン</Button>);
      expect(screen.getByTestId('button-custom')).toHaveClass('custom-class');
    });

    it('Linkコンポーネントとして機能する', () => {
      render(
        <MemoryRouter>
          <Button asChild>
            <Link to="/test" data-testid="button-link">リンクボタン</Link>
          </Button>
        </MemoryRouter>
      );
      
      const link = screen.getByTestId('button-link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/test');
    });
  });

  describe('アクセシビリティ', () => {
    it('基本的なアクセシビリティ要件を満たす', async () => {
      await runAccessibilityTest(<TestButton />, {
        keyboardNavigation: true,
        ariaAttributes: true,
        focusManagement: true,
        contrast: true
      });
    });

    it('キーボード操作が正しく機能する', async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick} data-testid="button-keyboard">テストボタン</Button>);
      const button = screen.getByTestId('button-keyboard');
      
      await userEvent.tab();
      expect(button).toHaveFocus();
      
      await userEvent.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      await userEvent.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('無効化状態で適切なARIA属性が設定される', () => {
      render(<Button disabled data-testid="button-aria">テストボタン</Button>);
      const button = screen.getByTestId('button-aria');
      
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('各バリアントでコントラスト要件を満たす', async () => {
      const variants = [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link'
      ] as const;

      for (const variant of variants) {
        cleanup();
        await runAccessibilityTest(
          <Button variant={variant} data-testid={`button-contrast-${variant}`}>テストボタン</Button>,
          {
            keyboardNavigation: true,
            ariaAttributes: true,
            focusManagement: true,
            contrast: true
          }
        );
      }
    });
  });
});