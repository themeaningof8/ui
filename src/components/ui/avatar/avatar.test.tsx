/**
 * @file Avatar コンポーネントのテスト
 * @description Avatar コンポーネントの基本的なレンダリングと機能をテストします。
 */
import { render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Avatar, AvatarImage, AvatarFallback, type AvatarProps } from '@/components/ui/avatar';

describe('Avatar コンポーネント', () => {
  describe('基本機能', () => {
    it('デフォルト状態でレンダリングされる', () => {
      render(<Avatar>
        <AvatarImage src="test.jpg" alt="Test Avatar" />
        <AvatarFallback>TA</AvatarFallback>
      </Avatar>);
      
      const avatar = screen.getByRole('img', { name: 'Test Avatar' });
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('src', 'test.jpg');
    });

    it('カスタムクラスが適用される', () => {
      const { container } = render(<Avatar className="custom-class" />);
      const avatar = container.querySelector('div[class*="custom-class"]');
      expect(avatar).toHaveClass('custom-class');
    });
  });

  describe('サイズバリアント', () => {
    it.each([
      ['sm', ['h-8', 'w-8']],
      ['default', ['h-10', 'w-10']],
      ['lg', ['h-12', 'w-12']],
    ])('size="%s" の場合、適切なサイズが適用される', (size, expectedClasses) => {
      const { container } = render(<Avatar size={size as AvatarProps['size']} />);
      const avatar = container.firstElementChild;
      expect(avatar).not.toBeNull();
      for (const className of expectedClasses) {
        expect(avatar).toHaveClass(className);
      }
    });
  });

  describe('AvatarImage', () => {
    it('画像の読み込み状態が正しく通知される', async () => {
      const onLoadingStatusChange = vi.fn();
      render(
        <AvatarImage
          src="test.jpg"
          alt="Test Avatar"
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

    it('画像の読み込みエラーが正しく通知される', async () => {
      const onLoadingStatusChange = vi.fn();
      render(
        <AvatarImage
          src="invalid.jpg"
          alt="Test Avatar"
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
  });

  describe('AvatarFallback', () => {
    it('指定した遅延後にフォールバックが表示される', async () => {
      render(
        <Avatar>
          <AvatarFallback delayMs={100}>TA</AvatarFallback>
        </Avatar>
      );

      const fallback = screen.queryByText('TA');
      expect(fallback).not.toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByText('TA')).toBeInTheDocument();
      });
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
}); 