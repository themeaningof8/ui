/**
 * @file Select コンポーネントのテスト
 * @description Select コンポーネントの基本的なレンダリングと機能をテストします。
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

// scrollIntoViewのモック
beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
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
  <Select onValueChange={onValueChange} defaultValue={defaultValue}>
    <SelectTrigger disabled={disabled}>
      <SelectValue placeholder="選択してください" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>フルーツ</SelectLabel>
        <SelectItem value="apple">りんご</SelectItem>
        <SelectSeparator />
        <SelectItem value="banana">バナナ</SelectItem>
        <SelectItem value="orange" disabled>オレンジ</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
);

describe('Select コンポーネント', () => {
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
      await user.click(screen.getByText('りんご'));
      
      expect(onValueChange).toHaveBeenCalledWith('apple');
      expect(screen.getByRole('combobox')).toHaveTextContent('りんご');
    });

    it('無効化されたオプションは選択できない', async () => {
      const onValueChange = vi.fn();
      render(<TestSelect onValueChange={onValueChange} />);
      
      await user.click(screen.getByRole('combobox'));
      const orangeOption = screen.getByText('オレンジ');
      
      expect(orangeOption.parentElement).toHaveAttribute('data-disabled');
      await user.click(orangeOption);
      expect(onValueChange).not.toHaveBeenCalled();
    });
  });

  describe('キーボード操作', () => {
    it('Spaceキーでオプションが表示される', async () => {
      render(<TestSelect />);
      const trigger = screen.getByRole('combobox');
      
      await user.tab();
      expect(trigger).toHaveFocus();
      
      await user.keyboard('[Space]');
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeVisible();
      });
    });

    it('矢印キーで選択を移動できる', async () => {
      render(<TestSelect />);
      
      await user.tab();
      await user.keyboard('[Space]');
      await user.keyboard('[ArrowDown]');
      
      await waitFor(() => {
        const options = screen.getAllByRole('option');
        expect(options[0]).toHaveAttribute('data-radix-collection-item');
        expect(options[0]).toHaveAttribute('aria-selected', 'false');
      });
    });

    it('Enterキーで選択を確定できる', async () => {
      const onValueChange = vi.fn();
      render(<TestSelect onValueChange={onValueChange} />);
      
      await user.tab();
      await user.keyboard('[Space]');
      await user.keyboard('[ArrowDown]');
      await user.keyboard('[ArrowDown]');
      await user.keyboard('[Enter]');
      
      expect(onValueChange).toHaveBeenCalledWith('banana');
      expect(screen.getByRole('combobox')).toHaveTextContent('バナナ');
    });
  });

  describe('アクセシビリティ', () => {
    it('適切なARIA属性が設定される', () => {
      render(<TestSelect />);
      const trigger = screen.getByRole('combobox');
      
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('aria-autocomplete', 'none');
    });

    it('選択時にARIA属性が更新される', async () => {
      render(<TestSelect />);
      const trigger = screen.getByRole('combobox');
      
      await user.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      
      await user.click(screen.getByText('りんご'));
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });
}); 