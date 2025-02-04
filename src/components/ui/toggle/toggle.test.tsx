/**
 * @file Toggleのテスト
 * @description Toggleの機能とアクセシビリティをテスト
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Toggle } from '@/components/ui/toggle';

describe('Toggle', () => {
  const user = userEvent.setup();

  describe('基本機能', () => {
    it('クリックでトグルの状態が切り替わる', async () => {
      render(<Toggle aria-label="トグル" />);
      const toggle = screen.getByRole('switch');

      expect(toggle).toHaveAttribute('aria-checked', 'false');
      await user.click(toggle);
      expect(toggle).toHaveAttribute('aria-checked', 'true');
      await user.click(toggle);
      expect(toggle).toHaveAttribute('aria-checked', 'false');
    });

    it('Spaceキーでトグルの状態が切り替わる', async () => {
      render(<Toggle aria-label="トグル" />);
      const toggle = screen.getByRole('switch');

      await user.tab();
      expect(toggle).toHaveFocus();
      await user.keyboard('[Space]');
      expect(toggle).toHaveAttribute('aria-checked', 'true');
      await user.keyboard('[Space]');
      expect(toggle).toHaveAttribute('aria-checked', 'false');
    });

    it('無効状態のトグルは操作できない', async () => {
      render(<Toggle aria-label="トグル" disabled />);
      const toggle = screen.getByRole('switch');

      expect(toggle).toBeDisabled();
      await user.click(toggle);
      expect(toggle).toHaveAttribute('aria-checked', 'false');
    });
  });

  describe('アクセシビリティ', () => {
    it('適切なARIA属性が設定されている', () => {
      render(<Toggle aria-label="トグル" />);
      const toggle = screen.getByRole('switch');

      expect(toggle).toHaveAttribute('role', 'switch');
      expect(toggle).toHaveAttribute('aria-checked');
      expect(toggle).toHaveAttribute('aria-label', 'トグル');
    });

    it('サイズ指定が反映される', () => {
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
  });
}); 