/**
 * @file Buttonのテスト
 * @description Buttonの基本的なレンダリング、バリアント、サイズ、インタラクション、およびWCAG 3.0メトリクスをテストします。
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Link, MemoryRouter } from 'react-router-dom';
import { Button, type ButtonProps } from '@/components/ui/button';
import { runAccessibilityTest } from '@/tests/wcag3/helpers';

const TestButton = () => (
  <Button>テストボタン</Button>
);

describe('Button', () => {
  describe('基本機能', () => {
    it('デフォルト状態でレンダリングされる', () => {
      render(<TestButton />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('カスタムクラスが適用される', () => {
      render(<Button className="custom-class">テストボタン</Button>);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });

    it('基本的なアクセシビリティ要件を満たす', async () => {
      await runAccessibilityTest(<TestButton />, {
        keyboardNavigation: true,
        ariaAttributes: true,
        focusManagement: true,
        contrast: true
      });
    });
  });

  describe('バリアント', () => {
    it.each([
      ['default', ['bg-base-solid', 'text-base-on-solid', 'hover:bg-base-solid-hover']],
      ['destructive', ['bg-destructive-solid', 'text-destructive-on-solid', 'hover:bg-destructive-solid-hover']],
      ['outline', ['border', 'border-base-ui', 'bg-transparent', 'hover:bg-base-hover', 'text-base-high']],
      ['secondary', ['bg-base-ui', 'text-base-high', 'hover:bg-base-hover']],
      ['ghost', ['hover:bg-base-hover', 'text-base-high']],
      ['link', ['text-base-high', 'underline-offset-4', 'hover:underline']],
    ])('variant="%s" の場合、適切なスタイルが適用される', (variant, expectedClasses) => {
      render(<Button variant={variant as ButtonProps['variant']}>テストボタン</Button>);
      const button = screen.getByRole('button');
      for (const className of expectedClasses) {
        expect(button).toHaveClass(className);
      }
    });

    // 各バリアントのアクセシビリティテスト
    it.each([
      'default',
      'destructive',
      'outline',
      'secondary',
      'ghost',
      'link',
    ] as const)('variant="%s" がアクセシビリティ要件を満たす', async (variant) => {
      await runAccessibilityTest(
        <Button variant={variant}>テストボタン</Button>,
        {
          keyboardNavigation: true,
          ariaAttributes: true,
          focusManagement: true,
          contrast: true
        }
      );
    });
  });

  describe('サイズ', () => {
    it.each([
      ['default', ['h-10', 'px-4', 'py-2']],
      ['sm', ['h-9', 'rounded-md', 'px-3']],
      ['lg', ['h-11', 'rounded-md', 'px-8']],
      ['icon', ['h-10', 'w-10']],
    ])('size="%s" の場合、適切なサイズが適用される', (size, expectedClasses) => {
      render(<Button size={size as ButtonProps['size']}>テストボタン</Button>);
      const button = screen.getByRole('button');
      for (const className of expectedClasses) {
        expect(button).toHaveClass(className);
      }
    });

    // 各サイズのアクセシビリティテスト
    it.each([
      'default',
      'sm',
      'lg',
      'icon',
    ] as const)('size="%s" がアクセシビリティ要件を満たす', async (size) => {
      await runAccessibilityTest(
        <Button size={size}>テストボタン</Button>,
        {
          keyboardNavigation: true,
          ariaAttributes: true,
          focusManagement: true,
          contrast: true
        }
      );
    });
  });

  describe('インタラクション', () => {
    it('クリックイベントが発火する', async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>テストボタン</Button>);
      
      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalled();
    });

    it('無効化された状態でクリックイベントが発火しない', async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick} disabled>テストボタン</Button>);
      
      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('キーボード操作が適切に機能する', async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>テストボタン</Button>);
      const button = screen.getByRole('button');
      
      button.focus();
      await userEvent.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      await userEvent.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });
  });

  describe('Linkコンポーネントとの統合', () => {
    it('Linkコンポーネントとして正しくレンダリングされる', async () => {
      render(
        <MemoryRouter>
          <Button asChild>
            <Link to="/test">リンクボタン</Link>
          </Button>
        </MemoryRouter>
      );
      
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/test');

      // リンクとしてのアクセシビリティテスト
      await runAccessibilityTest(
        <MemoryRouter>
          <Button asChild>
            <Link to="/test">リンクボタン</Link>
          </Button>
        </MemoryRouter>,
        {
          keyboardNavigation: true,
          ariaAttributes: true,
          focusManagement: true,
          contrast: true
        }
      );
    });
  });
});