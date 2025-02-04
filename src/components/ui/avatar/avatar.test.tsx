/**
 * @file Avatarのテスト
 * @description Avatarの基本的なレンダリングと機能をテストします。
 */
import { render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { runAccessibilityTest } from '@/tests/wcag3/helpers';

describe('Avatar', () => {
  describe('基本機能', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<Avatar alt="テストアバター">
        <AvatarImage src="test.jpg" alt="テストアバター" />
        <AvatarFallback>TA</AvatarFallback>
      </Avatar>);
      
      const avatar = screen.getByRole('img', { name: 'テストアバター' });
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('src', 'test.jpg');
    });

    it('サイズバリアントが適用される', () => {
      const sizes = [
        { size: 'sm', classes: ['h-8', 'w-8'] },
        { size: 'default', classes: ['h-10', 'w-10'] },
        { size: 'lg', classes: ['h-12', 'w-12'] },
      ] as const;

      for (const { size, classes } of sizes) {
        const { container } = render(<Avatar alt="テストアバター" size={size} />);
        const avatar = container.firstElementChild;
        expect(avatar).not.toBeNull();
        for (const className of classes) {
          expect(avatar).toHaveClass(className);
        }
      }
    });

    it('フォールバックが指定した遅延後に表示される', async () => {
      render(
        <Avatar alt="テストアバター">
          <AvatarFallback delayMs={100}>TA</AvatarFallback>
        </Avatar>
      );

      const fallback = screen.queryByText('TA');
      expect(fallback).not.toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByText('TA')).toBeInTheDocument();
      });
    });
  });

  describe('インタラクション', () => {
    it('画像の読み込み状態が通知される', async () => {
      const onLoadingStatusChange = vi.fn();
      render(
        <AvatarImage
          src="test.jpg"
          alt="テストアバター"
          onLoadingStatusChange={onLoadingStatusChange}
        />
      );

      expect(onLoadingStatusChange).toHaveBeenCalledWith('loading');
      
      const img = screen.getByRole('img');
      await act(async () => {
        img.dispatchEvent(new Event('load'));
      });
      
      await waitFor(() => {
        expect(onLoadingStatusChange).toHaveBeenCalledWith('loaded');
      });
    });

    it('画像の読み込みエラーが通知される', async () => {
      const onLoadingStatusChange = vi.fn();
      render(
        <AvatarImage
          src="invalid.jpg"
          alt="テストアバター"
          onLoadingStatusChange={onLoadingStatusChange}
        />
      );

      expect(onLoadingStatusChange).toHaveBeenCalledWith('loading');

      const img = screen.getByRole('img');
      await act(async () => {
        img.dispatchEvent(new Event('error'));
      });

      await waitFor(() => {
        expect(onLoadingStatusChange).toHaveBeenCalledWith('error');
      });
    });

    it('カスタムクラスが適用される', () => {
      const { container } = render(<Avatar alt="テストアバター" className="custom-class" />);
      const avatar = container.querySelector('div[class*="custom-class"]');
      expect(avatar).toHaveClass('custom-class');
    });

    it('フォールバックにカスタムクラスが適用される', async () => {
      render(
        <AvatarFallback className="custom-fallback" delayMs={0}>
          TA
        </AvatarFallback>
      );

      const fallback = await screen.findByText('TA');
      expect(fallback).toHaveClass('custom-fallback');
    });
  });

  describe('アクセシビリティ', () => {
    it('基本的なアクセシビリティ要件を満たす', () => {
      runAccessibilityTest(
        <Avatar alt="テストアバター">
          <AvatarImage src="test.jpg" alt="テストアバター" />
          <AvatarFallback>TA</AvatarFallback>
        </Avatar>,
        {
          ariaAttributes: true,
          focusManagement: true,
          contrast: true,
          skipFocusableCheck: true
        }
      );
    });

    it('適切なサイズと間隔が設定されている', () => {
      render(
        <Avatar alt="テストアバター">
          <AvatarImage src="test.jpg" alt="テストアバター" />
          <AvatarFallback>TA</AvatarFallback>
        </Avatar>
      );

      const avatar = screen.getByRole('img').parentElement;
      expect(avatar).toHaveClass('h-10', 'w-10', 'rounded-full');
    });

    it('画像に適切なアスペクト比が設定されている', () => {
      render(
        <Avatar alt="テストアバター">
          <AvatarImage src="test.jpg" alt="テストアバター" />
          <AvatarFallback>TA</AvatarFallback>
        </Avatar>
      );

      const img = screen.getByRole('img');
      expect(img).toHaveClass('aspect-square');
    });

    it('フォールバックのコントラストが適切である', async () => {
      const { container } = render(
        <Avatar alt="テストアバター">
          <AvatarFallback delayMs={0}>TA</AvatarFallback>
        </Avatar>
      );

      const fallbackText = await screen.findByText('TA');
      const avatarRoot = container.firstElementChild;
      expect(avatarRoot).toHaveClass('bg-base-ui', 'text-base-high');

      const fallbackElement = fallbackText.closest('div[class*="flex h-full w-full"]');
      expect(fallbackElement).not.toBeNull();
      expect(fallbackElement).toHaveClass(
        'flex',
        'h-full',
        'w-full',
        'items-center',
        'justify-center',
        'rounded-full',
        'bg-base-ui',
        'font-medium',
        'text-base-high'
      );
    });
  });
}); 