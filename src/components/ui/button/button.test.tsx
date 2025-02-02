/**
 * @file Button コンポーネントのテスト
 * @description Button コンポーネントの基本的なレンダリング、バリアント、サイズ、インタラクション、およびWCAG 3.0メトリクスをテストします。
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Link, MemoryRouter } from 'react-router-dom';
import { Button, type ButtonProps } from '@/components/ui/button';
import { testBasicAccessibility, testWCAG3Compliance, testKeyboardInteraction } from '@/tests/wcag3/helpers';

describe('Button', () => {
  describe('基本機能', () => {
    it('デフォルト状態でレンダリングされる', () => {
      render(<Button>テストボタン</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('カスタムクラスが適用される', () => {
      render(<Button className="custom-class">テストボタン</Button>);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });

    testBasicAccessibility(<Button>テストボタン</Button>, {
      expectedRole: 'button',
      testDisabled: true,
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

    // 各バリアントのWCAG3コンプライアンスをテスト
    it.each([
      'default',
      'destructive',
      'outline',
      'secondary',
      'ghost',
      'link',
    ] as const)('variant="%s" がWCAG3に準拠している', (variant) => {
      testWCAG3Compliance(<Button variant={variant}>テストボタン</Button>);
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

    // 各サイズのWCAG3コンプライアンスをテスト
    it.each([
      'default',
      'sm',
      'lg',
      'icon',
    ] as const)('size="%s" がWCAG3に準拠している', (size) => {
      testWCAG3Compliance(<Button size={size}>テストボタン</Button>);
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

    testKeyboardInteraction(<Button>テストボタン</Button>, {
      expectedRole: 'button',
      triggerKeys: [' ', 'Enter'],
    });
  });

  describe('Linkコンポーネントとの統合', () => {
    it('Linkコンポーネントとして正しくレンダリングされる', () => {
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

      // リンクとしてのWCAG3コンプライアンスをテスト
      testWCAG3Compliance(
        <MemoryRouter>
          <Button asChild>
            <Link to="/test">リンクボタン</Link>
          </Button>
        </MemoryRouter>
      );
    });
  });
});