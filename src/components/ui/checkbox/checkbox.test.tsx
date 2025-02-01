/**
 * @file Checkbox コンポーネントのテスト
 * @description Checkbox コンポーネントの基本的なレンダリングと機能をテストします。
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './';
import type { CheckboxProps } from './';

describe('Checkbox コンポーネント', () => {
  describe('基本機能', () => {
    it('デフォルト状態でレンダリングされる', () => {
      render(<Checkbox aria-label="test checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();
    });

    it('初期状態でチェックされた状態でレンダリングされる', () => {
      render(<Checkbox checked aria-label="test checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('disabled 状態が適用される', () => {
      render(<Checkbox disabled aria-label="test checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
    });
  });

  describe('インタラクション', () => {
    it('クリックでチェック状態が切り替わる', () => {
      render(<Checkbox aria-label="test checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
      
      fireEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it('onCheckedChange が呼び出される', () => {
      const onCheckedChange = vi.fn();
      render(<Checkbox onCheckedChange={onCheckedChange} aria-label="test checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      
      fireEvent.click(checkbox);
      expect(onCheckedChange).toHaveBeenCalledWith(true);
      
      fireEvent.click(checkbox);
      expect(onCheckedChange).toHaveBeenCalledWith(false);
    });

    it('onChange が呼び出される', () => {
      const onChange = vi.fn();
      render(<Checkbox onChange={onChange} aria-label="test checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      
      fireEvent.click(checkbox);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0].target.checked).toBe(true);
      
      fireEvent.click(checkbox);
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange.mock.calls[1][0].target.checked).toBe(false);
    });

    it('onCheckedChange と onChange の両方が呼び出される', () => {
      const onCheckedChange = vi.fn();
      const onChange = vi.fn();
      render(
        <Checkbox
          onCheckedChange={onCheckedChange}
          onChange={onChange}
          aria-label="test checkbox"
        />
      );
      const checkbox = screen.getByRole('checkbox');
      
      fireEvent.click(checkbox);
      expect(onCheckedChange).toHaveBeenCalledWith(true);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0].target.checked).toBe(true);
    });

    it('controlled モードで動作する', () => {
      const onCheckedChange = vi.fn();
      const { rerender } = render(
        <Checkbox checked={false} onCheckedChange={onCheckedChange} aria-label="test checkbox" />
      );
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();

      rerender(
        <Checkbox checked={true} onCheckedChange={onCheckedChange} aria-label="test checkbox" />
      );
      expect(checkbox).toBeChecked();
    });
  });

  describe('サイズバリアント', () => {
    it.each([
      ['sm', ['h-4', 'w-4']],
      ['default', ['h-5', 'w-5']],
      ['lg', ['h-6', 'w-6']],
    ])('size="%s" の場合、適切なサイズが適用される', (size, expectedClasses) => {
      render(<Checkbox size={size as CheckboxProps['size']} aria-label="test checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      for (const className of expectedClasses) {
        expect(checkbox).toHaveClass(className);
      }
    });
  });

  describe('不確定状態', () => {
    it('不確定状態が適用される', () => {
      render(<Checkbox indeterminate aria-label="test checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
      expect(checkbox).toHaveAttribute('data-state', 'indeterminate');
    });
  });

  describe('アクセシビリティ', () => {
    it('aria-label が適用される', () => {
      render(<Checkbox aria-label="accessibility test" />);
      const checkbox = screen.getByLabelText('accessibility test');
      expect(checkbox).toBeInTheDocument();
    });

    it('フォーカス時のスタイルが適用される', () => {
      render(<Checkbox aria-label="test checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass(
        'focus-visible:outline-none',
        'focus-visible:ring-2'
      );
    });
  });
}); 