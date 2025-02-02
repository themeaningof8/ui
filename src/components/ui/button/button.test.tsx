/**
 * @file Button コンポーネントのテスト
 * @description Button コンポーネントの基本的なレンダリング、バリアント、サイズ、インタラクション、およびWCAG 3.0メトリクスをテストします。
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Link, MemoryRouter } from 'react-router-dom';
import { Button, type ButtonProps } from '@/components/ui/button';
import { checkWCAG3Metrics, reportWCAG3Results } from '@/tests/wcag3';

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

    it('無効化された状態が正しく表示される', () => {
      render(<Button disabled>テストボタン</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
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
  });

  describe('アクセシビリティ', () => {
    it('WCAG 3.0のメトリクスを満たしている', () => {
      const renderResult = render(<Button>テストボタン</Button>);
      const metrics = checkWCAG3Metrics(renderResult);
      reportWCAG3Results(metrics);

      // APCAコントラスト比が70以上であることを確認
      expect(metrics.apca).toHaveLength(0);

      // インタラクティブ要素が適切に設定されていることを確認
      expect(metrics.interactiveElements).toHaveLength(1);
      expect(metrics.interactiveElements[0].tagName.toLowerCase()).toBe('button');

      // フォーカス可能要素が適切に設定されていることを確認
      expect(metrics.focusableElements).toHaveLength(0);
    });

    it('各バリアントがWCAG 3.0のコントラスト要件を満たしている', () => {
      const variants: ButtonProps['variant'][] = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'];
      
      for (const variant of variants) {
        const renderResult = render(<Button variant={variant}>テストボタン</Button>);
        const metrics = checkWCAG3Metrics(renderResult);
        
        // APCAコントラスト比が70以上であることを確認
        expect(metrics.apca).toHaveLength(0);
      }
    });

    it('キーボード操作が適切に機能する', async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>テストボタン</Button>);
      const button = screen.getByRole('button');

      // ボタンにフォーカスを当てる
      await userEvent.tab();
      expect(button).toHaveFocus();

      // Enterキーでクリックイベントが発火する
      await userEvent.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);

      // Spaceキーでクリックイベントが発火する
      await userEvent.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('スクリーンリーダー対応が適切に設定されている', () => {
      render(<Button disabled>テストボタン</Button>);
      const button = screen.getByRole('button');

      // ネイティブのbutton要素が使用されていることを確認
      expect(button.tagName.toLowerCase()).toBe('button');

      // 無効化状態が適切に通知される
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
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
    });
  });
});