/**
 * @file Separator コンポーネントのテスト
 * @description Separator コンポーネントの基本的なレンダリングと機能をテストします。
 */
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Separator } from './';

describe('Separator コンポーネント', () => {
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
}); 