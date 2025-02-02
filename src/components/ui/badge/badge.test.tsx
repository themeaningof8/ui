/**
 * @file Badge コンポーネントのテスト
 * @description Badge コンポーネントの基本的なレンダリングとバリアントをテストします。
 */
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge, type BadgeProps } from '@/components/ui/badge';

describe('Badge コンポーネント', () => {
  describe('基本機能', () => {
    it('デフォルト状態でレンダリングされる', () => {
      render(<Badge>Test Badge</Badge>);
      const badge = screen.getByText('Test Badge');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('bg-base-solid', 'text-base-on-solid');
    });

    it('カスタムクラスが適用される', () => {
      render(<Badge className="custom-class">Custom Badge</Badge>);
      const badge = screen.getByText('Custom Badge');
      expect(badge).toHaveClass('custom-class');
    });
  });

  describe('バリアント', () => {
    it.each([
      ['default', ['bg-base-solid', 'text-base-on-solid']],
      ['secondary', ['bg-base-ui', 'text-base-high']],
      ['destructive', ['bg-destructive-solid', 'text-destructive-on-solid']],
      ['outline', ['text-base-high', 'border', 'border-base-ui']],
    ])('variant="%s" の場合、適切なスタイルが適用される', (variant, expectedClasses) => {
      render(<Badge variant={variant as BadgeProps['variant']}>Badge</Badge>);
      const badge = screen.getByText('Badge');
      for (const className of expectedClasses) {
        expect(badge).toHaveClass(className);
      }
    });
  });

  describe('アクセシビリティ', () => {
    it('フォーカス時のスタイルが適用される', () => {
      render(<Badge>Focus Test</Badge>);
      const badge = screen.getByText('Focus Test');
      expect(badge).toHaveClass(
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-base-ui'
      );
    });
  });
}); 