/**
 * @file Buttonのテスト
 * @description ボタンの基本機能、インタラクション、アクセシビリティをテスト
 */
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Link, MemoryRouter } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  runAxeTest, 
  runKeyboardNavigationTest, 
  runAriaAttributesTest, 
  runFocusManagementTest,
  runContrastTest
} from '@/tests/wcag3/helpers';

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
    describe('コントラスト', () => {
      it('基本的なコントラスト要件を満たす', () => {
        const { container } = render(<TestButton />);
        runContrastTest(container);
      });

      it('各バリアントでコントラスト要件を満たす', () => {
        const variants = [
          'default',
          'destructive',
          'outline',
          'secondary',
          'ghost',
          'link'
        ] as const;

        for (const variant of variants) {
          const { container } = render(
            <Button variant={variant}>テストボタン</Button>
          );
          runContrastTest(container);
          cleanup();
        }
      });

      it('無効化状態でコントラスト要件を満たす', () => {
        const { container } = render(
          <Button disabled>テストボタン</Button>
        );
        runContrastTest(container);
      });

      it('ホバー状態でコントラスト要件を満たす', () => {
        const { container } = render(<TestButton />);
        const button = screen.getByRole('button');
        button.classList.add('hover:bg-base-solid-hover');
        runContrastTest(container);
      });
    });

    describe('基本的なアクセシビリティ', () => {
      it('axeによる基本的なアクセシビリティ要件を満たす', async () => {
        await runAxeTest(<TestButton />);
      });

      it('キーボードナビゲーションが適切に機能する', async () => {
        const { container } = render(<TestButton />);
        runKeyboardNavigationTest(container);

        // キーボード操作による具体的な動作確認
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>テストボタン</Button>);
        const button = screen.getByRole('button');
        
        await userEvent.tab();
        expect(button).toHaveFocus();
        
        await userEvent.keyboard('{Enter}');
        expect(handleClick).toHaveBeenCalledTimes(1);
        
        await userEvent.keyboard(' ');
        expect(handleClick).toHaveBeenCalledTimes(2);
      });

      it('ARIA属性が適切に設定されている', () => {
        const { container } = render(<TestButton />);
        runAriaAttributesTest(container);
      });

      it('フォーカス管理が適切に機能する', () => {
        const { container } = render(<TestButton />);
        runFocusManagementTest(container);
      });
    });

    describe('バリアントとサイズ', () => {
      it('各バリアントでアクセシビリティ要件を満たす', async () => {
        const variants = [
          'default',
          'destructive',
          'outline',
          'secondary',
          'ghost',
          'link'
        ] as const;

        for (const variant of variants) {
          const { container } = render(
            <Button variant={variant}>テストボタン</Button>
          );

          await runAxeTest(<Button variant={variant}>テストボタン</Button>);
          runKeyboardNavigationTest(container);
          runAriaAttributesTest(container);
          runFocusManagementTest(container);

          cleanup();
        }
      });

      it('サイズバリアントでアクセシビリティ要件を満たす', async () => {
        const sizes = ['default', 'sm', 'lg', 'icon'] as const;

        for (const size of sizes) {
          const { container } = render(
            <Button size={size}>テストボタン</Button>
          );

          await runAxeTest(<Button size={size}>テストボタン</Button>);
          runKeyboardNavigationTest(container);
          runAriaAttributesTest(container);
          runFocusManagementTest(container);

          cleanup();
        }
      });
    });

    describe('特殊な状態', () => {
      it('無効化状態でアクセシビリティ要件を満たす', async () => {
        const { container } = render(
          <Button disabled>テストボタン</Button>
        );

        await runAxeTest(<Button disabled>テストボタン</Button>);
        runAriaAttributesTest(container);

        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
        expect(button).toHaveAttribute('aria-disabled', 'true');
      });

      it('Linkとしての使用時にアクセシビリティ要件を満たす', async () => {
        const { container } = render(
          <MemoryRouter>
            <Button asChild>
              <Link to="/test">リンクボタン</Link>
            </Button>
          </MemoryRouter>
        );

        await runAxeTest(
          <MemoryRouter>
            <Button asChild>
              <Link to="/test">リンクボタン</Link>
            </Button>
          </MemoryRouter>
        );

        runKeyboardNavigationTest(container);
        runAriaAttributesTest(container);
        runFocusManagementTest(container);
      });
    });
  });
});