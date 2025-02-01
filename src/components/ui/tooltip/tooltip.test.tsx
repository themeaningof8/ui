/**
 * @file Tooltipコンポーネントのテスト
 * @description Tooltipコンポーネントの機能とアクセシビリティをテスト
 */
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Button } from '../button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '.';

describe('Tooltip Component', () => {
  const user = userEvent.setup();

  const renderTooltip = (side?: 'top' | 'right' | 'bottom' | 'left') => {
    render(
      <TooltipProvider delayDuration={0} skipDelayDuration={0} disableHoverableContent={true}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>トリガー</Button>
          </TooltipTrigger>
          <TooltipContent side={side}>
            <p>ツールチップの内容</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  describe('基本機能', () => {
    it('初期状態ではツールチップは非表示', () => {
      renderTooltip();
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('ホバー時にツールチップが表示される', async () => {
      renderTooltip();
      const trigger = screen.getByRole('button');
      await user.hover(trigger);
      await waitFor(() => {
        expect(trigger).toHaveAttribute('data-state', 'delayed-open');
      });
    });

    it('ホバーが外れるとツールチップが非表示になる', async () => {
      renderTooltip();
      const trigger = screen.getByRole('button');
      
      // ホバーしてツールチップを表示
      await user.hover(trigger);
      await waitFor(() => {
        expect(trigger).toHaveAttribute('data-state', 'delayed-open');
      });
      
      // トリガーからホバー解除および対応する mouseLeave イベントを発火
      await user.unhover(trigger);
      fireEvent.mouseLeave(trigger);

      // 明示的にマウスを body (画面外) に移動
      await user.hover(document.body);
      
      // ツールチップ（TooltipContent）が非表示（DOMから削除）であることを検証
      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      }, { timeout: 2000 });
    });
  });

  describe('アクセシビリティ', () => {
    it('適切なARIA属性が設定されている', async () => {
      renderTooltip();
      const trigger = screen.getByRole('button');
      await user.hover(trigger);
      const tooltip = await screen.findByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
      expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);
    });

    it('フォーカス時にツールチップが表示される', async () => {
      renderTooltip();
      const trigger = screen.getByRole('button');
      await user.tab();
      expect(trigger).toHaveFocus();
      expect(trigger).toHaveAttribute('data-state', 'instant-open');
    });
  });

  describe('表示位置', () => {
    it('上側に表示される', async () => {
      renderTooltip('top');
      const trigger = screen.getByRole('button');
      await user.hover(trigger);
      const content = await screen.findAllByText('ツールチップの内容');
      const wrapper = content[0].closest('[data-radix-popper-content-wrapper]');
      expect(wrapper?.querySelector('[data-side]')).toHaveAttribute('data-side', 'top');
    });

    it('右側に表示される', async () => {
      renderTooltip('right');
      const trigger = screen.getByRole('button');
      await user.hover(trigger);
      const content = await screen.findAllByText('ツールチップの内容');
      const wrapper = content[0].closest('[data-radix-popper-content-wrapper]');
      expect(wrapper?.querySelector('[data-side]')).toHaveAttribute('data-side', 'right');
    });

    it('下側に表示される', async () => {
      renderTooltip('bottom');
      const trigger = screen.getByRole('button');
      await user.hover(trigger);
      const content = await screen.findAllByText('ツールチップの内容');
      const wrapper = content[0].closest('[data-radix-popper-content-wrapper]');
      expect(wrapper?.querySelector('[data-side]')).toHaveAttribute('data-side', 'bottom');
    });

    it('左側に表示される', async () => {
      renderTooltip('left');
      const trigger = screen.getByRole('button');
      await user.hover(trigger);
      const content = await screen.findAllByText('ツールチップの内容');
      const wrapper = content[0].closest('[data-radix-popper-content-wrapper]');
      expect(wrapper?.querySelector('[data-side]')).toHaveAttribute('data-side', 'left');
    });
  });
}); 