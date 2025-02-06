/**
 * @file Avatarのテスト
 * @description Avatarの基本的なレンダリングと機能をテストします。
 */
import { render, screen, waitFor, act, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  runAxeTest, 
  runKeyboardNavigationTest, 
  runAriaAttributesTest, 
  runFocusManagementTest,
  runContrastTest
} from '@/tests/wcag3/helpers';

const TestAvatar = () => (
  <Avatar alt="テストアバター">
    <AvatarImage src="test.jpg" alt="テストアバター" />
    <AvatarFallback>TA</AvatarFallback>
  </Avatar>
);

describe('Avatar', () => {
  afterEach(() => {
    cleanup();
  });

  describe('基本機能', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<TestAvatar />);
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
  });

  describe('アクセシビリティ', () => {
    describe('基本的なアクセシビリティ', () => {
      it('axeによる基本的なアクセシビリティ要件を満たす', async () => {
        await runAxeTest(<TestAvatar />);
      });

      it('キーボードナビゲーションが適切に機能する', () => {
        const { container } = render(<TestAvatar />);
        runKeyboardNavigationTest(container);
      });

      it('ARIA属性が適切に設定されている', () => {
        const { container } = render(<TestAvatar />);
        runAriaAttributesTest(container);
      });

      it('フォーカス管理が適切に機能する', () => {
        const { container } = render(<TestAvatar />);
        runFocusManagementTest(container);
      });

      it('コントラスト要件を満たす', () => {
        const { container } = render(
          <div style={{ backgroundColor: '#FFFFFF' }}>
            <Avatar 
              alt="テストアバター" 
              style={{ backgroundColor: '#E5E7EB' }}
            >
              <AvatarFallback style={{ color: '#1F2937' }}>TA</AvatarFallback>
            </Avatar>
          </div>
        );
        runContrastTest(container);
      });
    });

    describe('サイズバリアント', () => {
      it('各サイズでアクセシビリティ要件を満たす', async () => {
        const sizes = ['sm', 'default', 'lg'] as const;

        for (const size of sizes) {
          const { container } = render(
            <div style={{ backgroundColor: '#FFFFFF' }}>
              <Avatar 
                alt="テストアバター" 
                size={size}
                style={{ backgroundColor: '#E5E7EB' }}
              >
                <AvatarFallback style={{ color: '#1F2937' }}>TA</AvatarFallback>
              </Avatar>
            </div>
          );

          await runAxeTest(
            <Avatar alt="テストアバター" size={size}>
              <AvatarImage src="test.jpg" alt="テストアバター" />
              <AvatarFallback>TA</AvatarFallback>
            </Avatar>
          );
          runAriaAttributesTest(container);
          runContrastTest(container);

          cleanup();
        }
      });
    });

    describe('フォールバック状態', () => {
      it('フォールバック表示時にアクセシビリティ要件を満たす', async () => {
        const { container } = render(
          <div style={{ backgroundColor: '#FFFFFF' }}>
            <Avatar 
              alt="テストアバター" 
              role="img" 
              aria-label="テストアバター" 
              style={{ backgroundColor: '#E5E7EB' }}
            >
              <AvatarFallback style={{ color: '#1F2937' }}>TA</AvatarFallback>
            </Avatar>
          </div>
        );

        await runAxeTest(
          <Avatar alt="テストアバター" role="img" aria-label="テストアバター">
            <AvatarFallback>TA</AvatarFallback>
          </Avatar>
        );
        runAriaAttributesTest(container);
        runContrastTest(container);
      });
    });
  });
}); 