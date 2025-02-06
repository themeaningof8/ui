/**
 * @file Popoverのテスト
 * @description Popoverの機能とアクセシビリティをテスト
 */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  runAxeTest,
  runKeyboardNavigationTest,
  runAriaAttributesTest,
  runFocusManagementTest,
  runContrastTest
} from '@/tests/wcag3/helpers';

describe('Popover', () => {
  const user = userEvent.setup();

  const TestPopover = () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>トリガー</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p>ポップオーバーの内容</p>
      </PopoverContent>
    </Popover>
  );

  describe('基本機能', () => {
    it('初期状態ではポップオーバーは非表示', () => {
      render(<TestPopover />);
      expect(screen.queryByText('ポップオーバーの内容')).not.toBeInTheDocument();
    });

    it('クリックでポップオーバーが表示される', async () => {
      render(<TestPopover />);
      const trigger = screen.getByRole('button');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('ポップオーバーの内容')).toBeInTheDocument();
      });
    });

    it('再度クリックでポップオーバーが非表示になる', async () => {
      render(<TestPopover />);
      const trigger = screen.getByRole('button');
      
      // 表示
      await user.click(trigger);
      await waitFor(() => {
        expect(screen.getByText('ポップオーバーの内容')).toBeInTheDocument();
      });
      
      // 非表示
      await user.click(trigger);
      await waitFor(() => {
        expect(screen.queryByText('ポップオーバーの内容')).not.toBeInTheDocument();
      });
    });
  });

  describe('アクセシビリティ', () => {
    describe('基本的なアクセシビリティ', () => {
      it('axeによる基本的なアクセシビリティ要件を満たす', async () => {
        await runAxeTest(<TestPopover />);
      });

      it('キーボードナビゲーションが適切に機能する', () => {
        const { container } = render(<TestPopover />);
        runKeyboardNavigationTest(container);
      });

      it('ARIA属性が適切に設定されている', () => {
        const { container } = render(<TestPopover />);
        runAriaAttributesTest(container);
      });

      it('フォーカス管理が適切に機能する', () => {
        const { container } = render(<TestPopover />);
        runFocusManagementTest(container);
      });

      it('コントラスト要件を満たす', () => {
        const { container } = render(<TestPopover />);
        runContrastTest(container);
      });
    });
  });

  describe('カスタマイズ', () => {
    it('カスタムクラスが適用される', async () => {
      render(
        <Popover>
          <PopoverTrigger asChild>
            <Button>トリガー</Button>
          </PopoverTrigger>
          <PopoverContent className="custom-class">
            <p>ポップオーバーの内容</p>
          </PopoverContent>
        </Popover>
      );

      const trigger = screen.getByRole('button');
      await user.click(trigger);
      
      const content = await screen.findByRole('dialog');
      expect(content).toHaveClass('custom-class');
    });

    it('align と sideOffset が正しく適用される', async () => {
      render(
        <Popover>
          <PopoverTrigger asChild>
            <Button>トリガー</Button>
          </PopoverTrigger>
          <PopoverContent align="start" sideOffset={8}>
            <p>ポップオーバーの内容</p>
          </PopoverContent>
        </Popover>
      );

      const trigger = screen.getByRole('button');
      await user.click(trigger);
      
      const content = await screen.findByRole('dialog');
      expect(content).toHaveAttribute('data-align', 'start');
    });
  });
}); 