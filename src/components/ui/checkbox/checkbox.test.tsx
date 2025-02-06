/**
 * @file Checkboxのテスト
 * @description Checkboxの基本的なレンダリングと機能をテストします。
 */
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  runAxeTest,
  runKeyboardNavigationTest,
  runAriaAttributesTest,
  runFocusManagementTest,
  runContrastTest
} from '@/tests/wcag3/helpers';

const TestCheckbox = () => (
  <Checkbox aria-label="test checkbox" />
);

describe('Checkbox', () => {
  afterEach(() => {
    cleanup();
  });

  describe('基本機能', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<TestCheckbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();
    });

    it('初期状態でチェックされた状態でレンダリングされる', () => {
      render(<Checkbox checked aria-label="test checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('無効化状態が適用される', () => {
      render(<Checkbox disabled aria-label="test checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
    });

    it('サイズバリアントが適用される', () => {
      const sizes = ['sm', 'default', 'lg'] as const;
      const sizeClasses = {
        sm: ['h-4', 'w-4'],
        default: ['h-5', 'w-5'],
        lg: ['h-6', 'w-6'],
      };

      for (const size of sizes) {
        render(<Checkbox size={size} aria-label={`test checkbox ${size}`} />);
        const checkbox = screen.getByRole('checkbox');
        for (const className of sizeClasses[size]) {
          expect(checkbox).toHaveClass(className);
        }
        cleanup();
      }
    });
  });

  describe('インタラクション', () => {
    it('クリックでチェック状態が切り替わる', () => {
      render(<TestCheckbox />);
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

    it('不確定状態が適用される', () => {
      render(<Checkbox indeterminate aria-label="test checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
      expect(checkbox).toHaveAttribute('data-state', 'indeterminate');
    });
  });

  describe('アクセシビリティ', () => {
    describe('基本的なアクセシビリティ', () => {
      it('axeによる基本的なアクセシビリティ要件を満たす', async () => {
        await runAxeTest(<TestCheckbox />);
      });

      it('キーボードナビゲーションが適切に機能する', () => {
        const { container } = render(<TestCheckbox />);
        runKeyboardNavigationTest(container);
      });

      it('ARIA属性が適切に設定されている', () => {
        const { container } = render(<TestCheckbox />);
        runAriaAttributesTest(container);
      });

      it('フォーカス管理が適切に機能する', () => {
        const { container } = render(<TestCheckbox />);
        runFocusManagementTest(container);
      });

      it('コントラスト要件を満たす', () => {
        const { container } = render(<TestCheckbox />);
        runContrastTest(container);
      });
    });

    describe('キーボード操作', () => {
      it('Spaceキーでチェック状態を切り替えられる', async () => {
        const onCheckedChange = vi.fn();
        render(<Checkbox onCheckedChange={onCheckedChange} aria-label="test checkbox" />);
        const checkbox = screen.getByRole('checkbox');

        checkbox.focus();
        expect(checkbox).toHaveFocus();

        fireEvent.keyDown(checkbox, { key: ' ' });
        expect(onCheckedChange).toHaveBeenCalledWith(true);

        fireEvent.keyDown(checkbox, { key: ' ' });
        expect(onCheckedChange).toHaveBeenCalledWith(false);
      });

      it('無効化状態でキーボード操作が機能しない', () => {
        const onCheckedChange = vi.fn();
        render(<Checkbox disabled onCheckedChange={onCheckedChange} aria-label="test checkbox" />);
        const checkbox = screen.getByRole('checkbox');

        checkbox.focus();
        fireEvent.keyDown(checkbox, { key: ' ' });
        expect(onCheckedChange).not.toHaveBeenCalled();
      });
    });

    describe('ラベルとステート', () => {
      it('aria-labelが適切に設定される', () => {
        const customLabel = "カスタムチェックボックス";
        render(<Checkbox aria-label={customLabel} />);
        const checkbox = screen.getByLabelText(customLabel);
        expect(checkbox).toBeInTheDocument();
      });

      it('不確定状態が適切にアナウンスされる', () => {
        render(<Checkbox indeterminate aria-label="test checkbox" />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
      });
    });
  });
}); 