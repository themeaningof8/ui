/**
 * @file Button コンポーネントのテスト
 * @description Button コンポーネントの基本的なレンダリング、バリアント、サイズ、インタラクションをテストします。
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button, type ButtonProps } from './';
import { Link, MemoryRouter } from 'react-router-dom';

describe('Button コンポーネント', () => {
  describe('基本機能', () => {
    it('デフォルト状態でレンダリングされる', () => {
      render(<Button>Test Button</Button>);
      const button = screen.getByRole('button', { name: 'Test Button' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bg-base-solid', 'text-base-on-solid');
    });

    it('クリックイベントが発火する', async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Click Me</Button>);
      await userEvent.click(screen.getByRole('button', { name: 'Click Me' }));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('disabled 状態ではクリックイベントが発火しない', async () => {
      const onClick = vi.fn();
      render(<Button disabled onClick={onClick}>Disabled Button</Button>);
      const button = screen.getByRole('button', { name: 'Disabled Button' });
      await userEvent.click(button);
      expect(onClick).not.toHaveBeenCalled();
      expect(button).toHaveClass('disabled:opacity-50');
    });
  });

  describe('バリアント', () => {
    it.each([
      ['default', ['bg-base-solid', 'text-base-on-solid']],
      ['destructive', ['bg-destructive-solid', 'text-destructive-on-solid']],
      ['outline', ['border', 'border-base-ui', 'bg-transparent']],
      ['secondary', ['bg-base-ui', 'text-base-high']],
      ['ghost', ['text-base-high']],
      ['link', ['text-base-high', 'underline-offset-4']],
    ])('variant="%s" の場合、適切なスタイルが適用される', (variant, expectedClasses) => {
      render(<Button variant={variant as ButtonProps['variant']}>Button</Button>);
      const button = screen.getByRole('button', { name: 'Button' });
      for (const className of expectedClasses) {
        expect(button).toHaveClass(className);
      }
    });
  });

  describe('サイズ', () => {
    it.each([
      ['default', ['h-10', 'px-4', 'py-2']],
      ['sm', ['h-9', 'px-3']],
      ['lg', ['h-11', 'px-8']],
      ['icon', ['h-10', 'w-10']],
    ])('size="%s" の場合、適切なサイズが適用される', (size, expectedClasses) => {
      render(<Button size={size as ButtonProps['size']}>Button</Button>);
      const button = screen.getByRole('button', { name: 'Button' });
      for (const className of expectedClasses) {
        expect(button).toHaveClass(className);
      }
    });
  });

  describe('asChild機能', () => {
    it('asChild が true の場合、子要素のコンポーネントがラップされる', () => {
      render(
        <MemoryRouter>
          <Button asChild>
            <Link to="/test">Link Button</Link>
          </Button>
        </MemoryRouter>
      );
      const link = screen.getByRole('link', { name: 'Link Button' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/test');
      expect(link).toHaveClass('inline-flex', 'items-center', 'justify-center');
    });
  });

  describe('アクセシビリティ', () => {
    it('フォーカス時に適切なスタイルが適用される', () => {
      render(<Button>Focus Test</Button>);
      const button = screen.getByRole('button', { name: 'Focus Test' });
      expect(button).toHaveClass(
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-base-ui'
      );
    });

    it('カスタムクラスが正しく適用される', () => {
      render(<Button className="custom-class">Custom Button</Button>);
      const button = screen.getByRole('button', { name: 'Custom Button' });
      expect(button).toHaveClass('custom-class');
    });
  });
});