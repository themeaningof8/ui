/**
 * @file Tooltipのテスト
 * @description Tooltipの機能とアクセシビリティをテスト
 */
import { render, screen, waitFor, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, afterEach } from 'vitest';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  runAxeTest,
  runKeyboardNavigationTest,
  runAriaAttributesTest,
  runFocusManagementTest,
  runContrastTest
} from '@/tests/wcag3/helpers';

describe('Tooltip', () => {
  const user = userEvent.setup();

  afterEach(() => {
    cleanup();
  });

  const renderTooltip = (side?: 'top' | 'right' | 'bottom' | 'left') => {
    render(
      <TooltipProvider delayDuration={0} skipDelayDuration={0} disableHoverableContent={true}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button data-testid={`tooltip-trigger-${side || 'default'}`}>トリガー</Button>
          </TooltipTrigger>
          <TooltipContent side={side} data-testid="tooltip-content">
            <p>ツールチップの内容</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  describe('基本機能', () => {
    it('初期状態でツールチップが非表示であること', () => {
      renderTooltip();
      expect(screen.queryByTestId('tooltip-content')).not.toBeInTheDocument();
    });

    it('各方向に表示できること', async () => {
      // 上方向
      renderTooltip('top');
      const topTrigger = screen.getByTestId('tooltip-trigger-top');
      await user.hover(topTrigger);
      const topContent = await screen.findByTestId('tooltip-content');
      expect(topContent).toHaveAttribute('data-side', 'top');
      await user.unhover(topTrigger);
      cleanup();

      // 右方向
      renderTooltip('right');
      const rightTrigger = screen.getByTestId('tooltip-trigger-right');
      await user.hover(rightTrigger);
      const rightContent = await screen.findByTestId('tooltip-content');
      expect(rightContent).toHaveAttribute('data-side', 'right');
      await user.unhover(rightTrigger);
      cleanup();

      // 下方向
      renderTooltip('bottom');
      const bottomTrigger = screen.getByTestId('tooltip-trigger-bottom');
      await user.hover(bottomTrigger);
      const bottomContent = await screen.findByTestId('tooltip-content');
      expect(bottomContent).toHaveAttribute('data-side', 'bottom');
      await user.unhover(bottomTrigger);
      cleanup();

      // 左方向
      renderTooltip('left');
      const leftTrigger = screen.getByTestId('tooltip-trigger-left');
      await user.hover(leftTrigger);
      const leftContent = await screen.findByTestId('tooltip-content');
      expect(leftContent).toHaveAttribute('data-side', 'left');
      await user.unhover(leftTrigger);
    });
  });

  describe('インタラクション', () => {
    it('ホバー時にツールチップが表示されること', async () => {
      renderTooltip();
      const trigger = screen.getByTestId('tooltip-trigger-default');
      await user.hover(trigger);
      await waitFor(() => {
        expect(screen.getByTestId('tooltip-content')).toBeInTheDocument();
      });
    });

    it('ホバーが外れるとツールチップが非表示になること', async () => {
      renderTooltip();
      const trigger = screen.getByTestId('tooltip-trigger-default');
      
      // ホバーしてツールチップを表示
      await user.hover(trigger);
      await waitFor(() => {
        expect(screen.getByTestId('tooltip-content')).toBeInTheDocument();
      });
      
      // トリガーからホバー解除および対応する mouseLeave イベントを発火
      await user.unhover(trigger);
      fireEvent.mouseLeave(trigger);

      // 明示的にマウスを body (画面外) に移動
      await user.hover(document.body);
      
      // ツールチップ（TooltipContent）が非表示（DOMから削除）であることを検証
      await waitFor(() => {
        expect(screen.queryByTestId('tooltip-content')).not.toBeInTheDocument();
      }, { timeout: 2000 });
    });
  });

  describe('アクセシビリティ', () => {
    describe('基本的なアクセシビリティ', () => {
      it('axeによる基本的なアクセシビリティ要件を満たす', async () => {
        await runAxeTest(
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button>トリガー</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>ツールチップの内容</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      });

      it('キーボードナビゲーションが適切に機能する', () => {
        const { container } = render(
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button>トリガー</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>ツールチップの内容</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
        runKeyboardNavigationTest(container);
      });

      it('ARIA属性が適切に設定されている', () => {
        const { container } = render(
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button>トリガー</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>ツールチップの内容</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
        runAriaAttributesTest(container);
      });

      it('フォーカス管理が適切に機能する', () => {
        const { container } = render(
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button>トリガー</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>ツールチップの内容</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
        runFocusManagementTest(container);
      });

      it('コントラスト要件を満たす', () => {
        const { container } = render(
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button>トリガー</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>ツールチップの内容</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
        runContrastTest(container);
      });
    });

    it('適切なARIA属性が設定されていること', async () => {
      renderTooltip();
      const trigger = screen.getByTestId('tooltip-trigger-default');
      await user.hover(trigger);
      const tooltip = await screen.findByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
      expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);
    });

    it('フォーカス時にツールチップが表示されること', async () => {
      renderTooltip();
      const trigger = screen.getByTestId('tooltip-trigger-default');
      await user.tab();
      expect(trigger).toHaveFocus();
      expect(trigger).toHaveAttribute('data-state', 'instant-open');
    });
  });
}); 