/**
 * @file Separatorのテスト
 * @description Separatorの基本的なレンダリングと機能をテストします。
 */
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Separator } from './';
import { 
  runAxeTest,
  runKeyboardNavigationTest,
  runAriaAttributesTest,
  runFocusManagementTest,
  runContrastTest
} from '@/tests/wcag3/helpers';

describe('Separator', () => {
  describe('基本機能', () => {
    it('デフォルト状態でレンダリングされる', () => {
      render(<Separator />);
      const separator = screen.getByRole('separator');
      expect(separator).toBeInTheDocument();
      expect(separator).toHaveClass('bg-base-ui', 'h-[1px]', 'w-full');
    });

    it('カスタムクラスが適用される', () => {
      render(<Separator className="custom-class" />);
      const separator = screen.getByRole('separator');
      expect(separator).toHaveClass('custom-class');
    });
  });

  describe('向き', () => {
    it('垂直方向のセパレーターが正しくレンダリングされる', () => {
      render(<Separator orientation="vertical" />);
      const separator = screen.getByRole('separator');
      expect(separator).toHaveClass('h-full', 'w-[1px]');
      expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('水平方向のセパレーターが正しくレンダリングされる', () => {
      render(<Separator orientation="horizontal" />);
      const separator = screen.getByRole('separator');
      expect(separator).toHaveClass('h-[1px]', 'w-full');
      expect(separator).not.toHaveAttribute('aria-orientation');
    });
  });

  describe('装飾的セパレーター', () => {
    it('装飾的セパレーターが正しくレンダリングされる', () => {
      render(<Separator decorative />);
      const separator = screen.getByRole('none');
      expect(separator).toBeInTheDocument();
      expect(separator).toHaveClass('bg-base-ui');
    });

    it('非装飾的セパレーターが正しくレンダリングされる', () => {
      render(<Separator decorative={false} />);
      const separator = screen.getByRole('separator');
      expect(separator).toBeInTheDocument();
    });
  });

  describe('アクセシビリティ', () => {
    describe('基本的なアクセシビリティ', () => {
      it('axeによる基本的なアクセシビリティ要件を満たす', async () => {
        await runAxeTest(<Separator />);
      });

      it('キーボードナビゲーションが適切に機能する', () => {
        const { container } = render(<Separator />);
        runKeyboardNavigationTest(container);
      });

      it('ARIA属性が適切に設定されている', () => {
        const { container } = render(<Separator />);
        runAriaAttributesTest(container);
      });

      it('フォーカス管理が適切に機能する', () => {
        const { container } = render(<Separator />);
        runFocusManagementTest(container);
      });

      it('コントラスト要件を満たす', () => {
        const { container } = render(<Separator />);
        runContrastTest(container);
      });
    });

    it('装飾的セパレーターが適切なロールを持つ', () => {
      render(<Separator decorative />);
      const separator = screen.getByRole('none');
      expect(separator).toHaveAttribute('aria-hidden', 'true');
    });
  });
}); 