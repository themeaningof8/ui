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
import { testBasicAccessibility, testWCAG3Compliance, testKeyboardInteraction } from '../../../tests/wcag3/helpers';

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
    it('Tabキーでフォーカスできる', async () => {
      render(<TestSelect />);
      const trigger = screen.getByRole('combobox');

      await user.tab();
      expect(trigger).toHaveFocus();
    });

    it('Space/Enterキーでオプションを開閉できる', async () => {
      render(<TestSelect />);
      const trigger = screen.getByRole('combobox');

      // Spaceキーで開く
      await user.tab();
      await user.keyboard('[Space]');
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeVisible();
      });

      // Escキーで閉じる
      await user.keyboard('{Escape}');
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });

      // Enterキーで開く
      await user.keyboard('[Enter]');
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeVisible();
      });
    });

    it('矢印キーでオプションを選択できる', async () => {
      const onValueChange = vi.fn();
      render(<TestSelect onValueChange={onValueChange} />);
      const trigger = screen.getByRole('combobox');

      // 下矢印キーで開く
      await user.tab();
      await user.keyboard('{ArrowDown}');
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeVisible();
      });

      // 下矢印で移動して選択（最初のアイテムはラベルなのでスキップ）
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Enter}');
      expect(onValueChange).toHaveBeenCalledWith('banana');

      // 上矢印キーで開く
      await user.keyboard('{ArrowUp}');
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeVisible();
      });

      // 上矢印で移動して選択
      await user.keyboard('{ArrowUp}');
      await user.keyboard('{Enter}');
      expect(onValueChange).toHaveBeenCalledWith('apple');
    });

    it('Home/Endキーでオプションの最初/最後に移動できる', async () => {
      const onValueChange = vi.fn();
      render(<TestSelect onValueChange={onValueChange} />);
      const trigger = screen.getByRole('combobox');

      // オプションを開く
      await user.tab();
      await user.keyboard('[Space]');
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeVisible();
      });

      // Endキーで最後に移動（オレンジは無効なのでバナナが選択される）
      await user.keyboard('{End}');
      await user.keyboard('{Enter}');  // オレンジは無効なので自動的にバナナが選択される
      expect(onValueChange).toHaveBeenCalledWith('banana');

      // 再度開く
      await user.keyboard('[Space]');
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeVisible();
      });

      // Homeキーで最初に移動（ラベルはスキップされる）
      await user.keyboard('{Home}');
      await user.keyboard('{Enter}');  // ラベルは自動的にスキップされる
      expect(onValueChange).toHaveBeenCalledWith('apple');
    });

    it('Escキーでオプションを閉じられる', async () => {
      render(<TestSelect />);
      const trigger = screen.getByRole('combobox');

      // オプションを開く
      await user.tab();
      await user.keyboard('[Space]');
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeVisible();
      });

      // Escキーで閉じる
      await user.keyboard('{Escape}');
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
      expect(trigger).toHaveFocus();
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

  // WCAG 3.0 コンプライアンステスト
  describe('WCAG 3.0', () => {
    // SelectTriggerの基本的なアクセシビリティテスト
    testBasicAccessibility(<SelectTrigger><SelectValue placeholder="選択してください" /></SelectTrigger>, {
      expectedRole: 'combobox',
      testDisabled: true,
      useDataDisabled: true,
      wrapper: (trigger) => (
        <Select>
          {trigger}
          <SelectContent>
            <SelectItem value="test">テスト</SelectItem>
          </SelectContent>
        </Select>
      ),
    });

    // SelectItemの基本的なアクセシビリティテスト
    testBasicAccessibility(<SelectItem value="test">テスト</SelectItem>, {
      expectedRole: 'option',
      testDisabled: true,
      useDataDisabled: true,
      wrapper: (item) => (
        <Select defaultOpen>
          <SelectTrigger>
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            {item}
          </SelectContent>
        </Select>
      ),
    });

    // WCAG 3.0メトリクスのコンプライアンステスト
    testWCAG3Compliance(<TestSelect />, {
      expectedRole: 'combobox'
    });

    describe('キーボード操作', () => {
      const user = userEvent.setup();

      it('Tabキーでフォーカスできる', async () => {
        render(<TestSelect />);
        const trigger = screen.getByRole('combobox');

        await user.tab();
        expect(trigger).toHaveFocus();
      });

      it('Space/Enterキーでオプションを開閉できる', async () => {
        render(<TestSelect />);
        const trigger = screen.getByRole('combobox');

        // Spaceキーで開く
        await user.tab();
        await user.keyboard('[Space]');
        await waitFor(() => {
          expect(screen.getByRole('listbox')).toBeVisible();
        });

        // Escキーで閉じる
        await user.keyboard('{Escape}');
        await waitFor(() => {
          expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        });

        // Enterキーで開く
        await user.keyboard('[Enter]');
        await waitFor(() => {
          expect(screen.getByRole('listbox')).toBeVisible();
        });
      });

      it('矢印キーでオプションを選択できる', async () => {
        const onValueChange = vi.fn();
        render(<TestSelect onValueChange={onValueChange} />);
        const trigger = screen.getByRole('combobox');

        // 下矢印キーで開く
        await user.tab();
        await user.keyboard('{ArrowDown}');
        await waitFor(() => {
          expect(screen.getByRole('listbox')).toBeVisible();
        });

        // 下矢印で移動して選択（最初のアイテムはラベルなのでスキップ）
        await user.keyboard('{ArrowDown}');
        await user.keyboard('{ArrowDown}');
        await user.keyboard('{Enter}');
        expect(onValueChange).toHaveBeenCalledWith('banana');

        // 上矢印キーで開く
        await user.keyboard('{ArrowUp}');
        await waitFor(() => {
          expect(screen.getByRole('listbox')).toBeVisible();
        });

        // 上矢印で移動して選択
        await user.keyboard('{ArrowUp}');
        await user.keyboard('{Enter}');
        expect(onValueChange).toHaveBeenCalledWith('apple');
      });

      it('Home/Endキーでオプションの最初/最後に移動できる', async () => {
        const onValueChange = vi.fn();
        render(<TestSelect onValueChange={onValueChange} />);
        const trigger = screen.getByRole('combobox');

        // オプションを開く
        await user.tab();
        await user.keyboard('[Space]');
        await waitFor(() => {
          expect(screen.getByRole('listbox')).toBeVisible();
        });

        // Endキーで最後に移動（オレンジは無効なのでバナナが選択される）
        await user.keyboard('{End}');
        await user.keyboard('{Enter}');  // オレンジは無効なので自動的にバナナが選択される
        expect(onValueChange).toHaveBeenCalledWith('banana');

        // 再度開く
        await user.keyboard('[Space]');
        await waitFor(() => {
          expect(screen.getByRole('listbox')).toBeVisible();
        });

        // Homeキーで最初に移動（ラベルはスキップされる）
        await user.keyboard('{Home}');
        await user.keyboard('{Enter}');  // ラベルは自動的にスキップされる
        expect(onValueChange).toHaveBeenCalledWith('apple');
      });

      it('Escキーでオプションを閉じられる', async () => {
        render(<TestSelect />);
        const trigger = screen.getByRole('combobox');

        // オプションを開く
        await user.tab();
        await user.keyboard('[Space]');
        await waitFor(() => {
          expect(screen.getByRole('listbox')).toBeVisible();
        });

        // Escキーで閉じる
        await user.keyboard('{Escape}');
        await waitFor(() => {
          expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        });
        expect(trigger).toHaveFocus();
      });
    });
  });
}); 