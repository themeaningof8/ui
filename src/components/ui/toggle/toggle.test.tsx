/**
 * @file Toggleのテスト
 * @description Toggleの機能とアクセシビリティをテスト
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Toggle } from '@/components/ui/toggle';
import { 
  runAxeTest,
  runKeyboardNavigationTest,
  runAriaAttributesTest,
  runFocusManagementTest,
  runContrastTest
} from '@/tests/wcag3/helpers';

describe('Toggle', () => {
  const user = userEvent.setup();

  describe('基本機能', () => {
    it('デフォルト状態でレンダリングされること', () => {
      render(<Toggle aria-label="トグル" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toBeInTheDocument();
      expect(toggle).toHaveAttribute('aria-checked', 'false');
    });

    it('サイズバリアントが適用されること', () => {
      const { rerender } = render(<Toggle aria-label="トグル" size="sm" />);
      let toggle = screen.getByRole('switch');
      expect(toggle).toHaveClass('h-4');

      rerender(<Toggle aria-label="トグル" size="default" />);
      toggle = screen.getByRole('switch');
      expect(toggle).toHaveClass('h-5');

      rerender(<Toggle aria-label="トグル" size="lg" />);
      toggle = screen.getByRole('switch');
      expect(toggle).toHaveClass('h-6');
    });

    it('無効化状態が適用されること', () => {
      render(<Toggle aria-label="トグル" disabled />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toBeDisabled();
    });
  });

  describe('インタラクション', () => {
    it('クリックで状態が切り替わること', async () => {
      render(<Toggle aria-label="トグル" />);
      const toggle = screen.getByRole('switch');

      expect(toggle).toHaveAttribute('aria-checked', 'false');
      await user.click(toggle);
      expect(toggle).toHaveAttribute('aria-checked', 'true');
      await user.click(toggle);
      expect(toggle).toHaveAttribute('aria-checked', 'false');
    });

    it('無効化状態でクリックしても状態が変化しないこと', async () => {
      render(<Toggle aria-label="トグル" disabled />);
      const toggle = screen.getByRole('switch');

      expect(toggle).toHaveAttribute('aria-checked', 'false');
      await user.click(toggle);
      expect(toggle).toHaveAttribute('aria-checked', 'false');
    });

    it('カスタムクラスが適用されること', () => {
      render(<Toggle aria-label="トグル" className="custom-class" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveClass('custom-class');
    });
  });

  describe('アクセシビリティ', () => {
    describe('基本的なアクセシビリティ', () => {
      it('axeによる基本的なアクセシビリティ要件を満たす', async () => {
        await runAxeTest(<Toggle aria-label="トグル" />);
      });

      it('キーボードナビゲーションが適切に機能する', () => {
        const { container } = render(<Toggle aria-label="トグル" />);
        runKeyboardNavigationTest(container);
      });

      it('ARIA属性が適切に設定されている', () => {
        const { container } = render(<Toggle aria-label="トグル" />);
        runAriaAttributesTest(container);
      });

      it('フォーカス管理が適切に機能する', () => {
        const { container } = render(<Toggle aria-label="トグル" />);
        runFocusManagementTest(container);
      });

      it('コントラスト要件を満たす', () => {
        const { container } = render(<Toggle aria-label="トグル" />);
        runContrastTest(container);
      });
    });

    it('適切なARIA属性が設定されていること', () => {
      render(<Toggle aria-label="トグル" />);
      const toggle = screen.getByRole('switch');

      expect(toggle).toHaveAttribute('role', 'switch');
      expect(toggle).toHaveAttribute('aria-checked');
      expect(toggle).toHaveAttribute('aria-label', 'トグル');
    });

    it('キーボード操作で状態が切り替わること', async () => {
      render(<Toggle aria-label="トグル" />);
      const toggle = screen.getByRole('switch');

      await user.tab();
      expect(toggle).toHaveFocus();
      await user.keyboard('[Space]');
      expect(toggle).toHaveAttribute('aria-checked', 'true');
      await user.keyboard('[Space]');
      expect(toggle).toHaveAttribute('aria-checked', 'false');
    });
  });
}); 