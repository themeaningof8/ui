/**
 * @file Popover コンポーネントのテスト
 * @description Popover コンポーネントの機能とアクセシビリティをテスト
 */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

describe('Popover Component', () => {
  const user = userEvent.setup();

  const renderPopover = () => {
    render(
      <Popover>
        <PopoverTrigger asChild>
          <Button>トリガー</Button>
        </PopoverTrigger>
        <PopoverContent>
          <p>ポップオーバーの内容</p>
        </PopoverContent>
      </Popover>
    );
  };

  describe('基本機能', () => {
    it('初期状態ではポップオーバーは非表示', () => {
      renderPopover();
      expect(screen.queryByText('ポップオーバーの内容')).not.toBeInTheDocument();
    });

    it('クリックでポップオーバーが表示される', async () => {
      renderPopover();
      const trigger = screen.getByRole('button');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('ポップオーバーの内容')).toBeInTheDocument();
      });
    });

    it('再度クリックでポップオーバーが非表示になる', async () => {
      renderPopover();
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
    it('トリガーに適切なARIA属性が設定されている', async () => {
      renderPopover();
      const trigger = screen.getByRole('button');
      
      // 初期状態
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      
      // 開いた状態
      await user.click(trigger);
      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
        expect(trigger).toHaveAttribute('aria-controls');
      });
    });

    it('コンテンツに適切なARIA属性が設定されている', async () => {
      renderPopover();
      const trigger = screen.getByRole('button');
      await user.click(trigger);
      
      const content = await screen.findByRole('dialog');
      expect(content).toHaveAttribute('data-state', 'open');
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