/**
 * @file Avatar コンポーネントのテスト
 * @description Avatar コンポーネントの基本的なレンダリングと機能をテストします。
 */
import { render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Avatar, AvatarImage, AvatarFallback, type AvatarProps } from '@/components/ui/avatar';
import { testBasicAccessibility } from '@/tests/wcag3/helpers';

describe('Avatar コンポーネント', () => {
  describe('基本機能', () => {
    it('デフォルト状態でレンダリングされる', () => {
      render(<Avatar alt="Test Avatar">
        <AvatarImage src="test.jpg" alt="Test Avatar" />
        <AvatarFallback>TA</AvatarFallback>
      </Avatar>);
      
      const avatar = screen.getByRole('img', { name: 'Test Avatar' });
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('src', 'test.jpg');
    });

    it('カスタムクラスが適用される', () => {
      const { container } = render(<Avatar alt="Test Avatar" className="custom-class" />);
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
      const { container } = render(<Avatar alt="Test Avatar" size={size as AvatarProps['size']} />);
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
        <Avatar alt="Test Avatar">
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

    it('フォールバックのコントラスト比が適切である', async () => {
      const { container } = render(
        <Avatar alt="Test Avatar">
          <AvatarFallback delayMs={0}>TA</AvatarFallback>
        </Avatar>
      );

      // フォールバックのテキストを待機
      const fallbackText = await screen.findByText('TA');

      // Avatar要素のスタイルをテスト
      const avatarRoot = container.firstElementChild;
      expect(avatarRoot).toHaveClass('bg-base-ui', 'text-base-high');

      // フォールバック要素のスタイルをテスト
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

  describe('アクセシビリティ', () => {
    describe('WCAG 3.0メトリクス', () => {
      it('適切なサイズと間隔が設定されている', () => {
        render(
          <Avatar alt="Test Avatar">
            <AvatarImage src="test.jpg" alt="Test Avatar" />
            <AvatarFallback>TA</AvatarFallback>
          </Avatar>
        );

        const avatar = screen.getByRole('img').parentElement;
        expect(avatar).toHaveClass('h-10', 'w-10');
        expect(avatar).toHaveClass('rounded-full');
      });

      it('画像に適切なアスペクト比が設定されている', () => {
        render(
          <Avatar alt="Test Avatar">
            <AvatarImage src="test.jpg" alt="Test Avatar" />
            <AvatarFallback>TA</AvatarFallback>
          </Avatar>
        );

        const img = screen.getByRole('img');
        expect(img).toHaveClass('aspect-square');
      });

      it('フォールバックのコントラスト比が適切である', async () => {
        const { container } = render(
          <Avatar alt="Test Avatar">
            <AvatarFallback delayMs={0}>TA</AvatarFallback>
          </Avatar>
        );

        // フォールバックのテキストを待機
        const fallbackText = await screen.findByText('TA');

        // Avatar要素のスタイルをテスト
        const avatarRoot = container.firstElementChild;
        expect(avatarRoot).toHaveClass('bg-base-ui', 'text-base-high');

        // フォールバック要素のスタイルをテスト
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

    // 基本的なアクセシビリティテスト
    testBasicAccessibility(
      <Avatar alt="Test Avatar">
        <AvatarImage src="test.jpg" alt="Test Avatar" />
        <AvatarFallback>TA</AvatarFallback>
      </Avatar>,
      {
        expectedRole: 'img',
        testDisabled: false,
      }
    );
  });
}); 