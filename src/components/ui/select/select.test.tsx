/**
 * @file Selectのテスト
 * @description Selectの機能とアクセシビリティをテスト
 */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from '@/components/ui/select';
import { 
  runAxeTest,
  runKeyboardNavigationTest,
  runAriaAttributesTest,
  runFocusManagementTest,
  runContrastTest
} from '@/tests/wcag3/helpers';

// scrollIntoViewとhasPointerCaptureのモック
beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
  Element.prototype.hasPointerCapture = vi.fn();
});

const TestSelect = ({
  onValueChange = vi.fn(),
  defaultValue,
  disabled,
}: {
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
}) => (
  <Select onValueChange={onValueChange} defaultValue={defaultValue} disabled={disabled}>
    <SelectTrigger>
      <SelectValue placeholder="選択してください" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>フルーツ</SelectLabel>
        <SelectItem value="apple">りんご</SelectItem>
        <SelectItem value="banana">バナナ</SelectItem>
        <SelectSeparator />
        <SelectItem value="orange">オレンジ</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
);

describe('Select', () => {
  const user = userEvent.setup();

  describe('基本機能', () => {
    it('デフォルト状態でレンダリングされる', () => {
      render(<TestSelect />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveTextContent('選択してください');
    });

    it('初期値が設定される', () => {
      render(<TestSelect defaultValue="apple" />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveTextContent('りんご');
    });

    it('disabled 状態が適用される', () => {
      render(<TestSelect disabled />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeDisabled();
    });

    it('SelectTriggerにカスタムクラスが適用される', () => {
      render(
        <Select>
          <SelectTrigger className="custom-trigger">
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">テスト</SelectItem>
          </SelectContent>
        </Select>
      );
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveClass('custom-trigger');
    });

    it('SelectValueにプレースホルダーが表示される', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="カスタムプレースホルダー" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">テスト</SelectItem>
          </SelectContent>
        </Select>
      );
      expect(screen.getByText('カスタムプレースホルダー')).toBeInTheDocument();
    });

    it('SelectContentにカスタムクラスが適用される', async () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent className="custom-content">
            <SelectItem value="test">テスト</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      await waitFor(() => {
        const content = document.querySelector('[role="listbox"]');
        expect(content?.parentElement).toHaveClass('custom-content');
      });
    });
  });

  describe('インタラクション', () => {
    it('クリックでオプションが表示される', async () => {
      render(<TestSelect />);
      const trigger = screen.getByRole('combobox');
      
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeVisible();
        expect(screen.getByText('フルーツ')).toBeVisible();
        expect(screen.getByText('りんご')).toBeVisible();
        expect(screen.getByText('バナナ')).toBeVisible();
        expect(screen.getByText('オレンジ')).toBeVisible();
      });
    });

    it('オプションを選択できる', async () => {
      const onValueChange = vi.fn();
      render(<TestSelect onValueChange={onValueChange} />);
      
      await user.click(screen.getByRole('combobox'));
      await waitFor(() => {
        expect(screen.getByText('りんご')).toBeVisible();
      });
      await user.click(screen.getByText('りんご'));
      
      expect(onValueChange).toHaveBeenCalledWith('apple');
      expect(screen.getByRole('combobox')).toHaveTextContent('りんご');
    });

    it('無効化されたオプションは選択できない', async () => {
      const onValueChange = vi.fn();
      render(<TestSelect onValueChange={onValueChange} />);
      
      await user.click(screen.getByRole('combobox'));
      await waitFor(() => {
        expect(screen.getByText('オレンジ')).toBeVisible();
      });
      const orangeOption = screen.getByText('オレンジ');
      
      expect(orangeOption.parentElement).toHaveAttribute('data-disabled');
      await user.click(orangeOption);
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it('Escキーでコンテンツが閉じる', async () => {
      render(<TestSelect />);
      const trigger = screen.getByRole('combobox');
      
      await user.click(trigger);
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeVisible();
      });

      await user.keyboard('{Escape}');
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });
  });

  describe('アクセシビリティ', () => {
    describe('基本的なアクセシビリティ', () => {
      it('axeによる基本的なアクセシビリティ要件を満たす', async () => {
        await runAxeTest(<TestSelect />);
      });

      it('キーボードナビゲーションが適切に機能する', () => {
        const { container } = render(<TestSelect />);
        runKeyboardNavigationTest(container);
      });

      it('ARIA属性が適切に設定されている', () => {
        const { container } = render(<TestSelect />);
        runAriaAttributesTest(container);
      });

      it('フォーカス管理が適切に機能する', () => {
        const { container } = render(<TestSelect />);
        runFocusManagementTest(container);
      });

      it('コントラスト要件を満たす', () => {
        const { container } = render(<TestSelect />);
        runContrastTest(container);
      });
    });

    it('適切なARIA属性が設定されている', async () => {
      render(<TestSelect />);
      const trigger = screen.getByRole('combobox');
      
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
        expect(screen.getByRole('listbox')).toHaveAttribute('aria-label', 'フルーツ');
      });
    });
  });
}); 