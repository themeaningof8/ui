/**
 * @file HoverCardのテスト
 * @description HoverCard機能とアクセシビリティをテスト
 */

import { describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Button } from '@/components/ui/button'
import { runAccessibilityTest } from '@/tests/wcag3/helpers'

const TestHoverCard = () => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <Button>ホバーしてください</Button>
    </HoverCardTrigger>
    <HoverCardContent>
      <div>ホバーカードの内容</div>
    </HoverCardContent>
  </HoverCard>
);

describe('HoverCard', () => {
  describe('基本機能', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<TestHoverCard />);
      expect(screen.getByRole('button', { name: 'ホバーしてください' })).toBeInTheDocument();
    });

    it('異なる配置でコンテンツが表示される', async () => {
      render(
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button>ホバーしてください</Button>
          </HoverCardTrigger>
          <HoverCardContent align="start">
            <div>左寄せコンテンツ</div>
          </HoverCardContent>
        </HoverCard>
      );

      const trigger = screen.getByRole('button', { name: 'ホバーしてください' });
      await userEvent.hover(trigger);

      await waitFor(() => {
        const content = screen.getByText('左寄せコンテンツ');
        expect(content).toBeInTheDocument();
        expect(content.parentElement).toHaveAttribute('data-align', 'start');
      });
    });

    it('カスタムクラスが適用される', async () => {
      render(
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button>ホバーしてください</Button>
          </HoverCardTrigger>
          <HoverCardContent className="custom-class">
            <div>カスタムスタイルのコンテンツ</div>
          </HoverCardContent>
        </HoverCard>
      );

      const trigger = screen.getByRole('button', { name: 'ホバーしてください' });
      await userEvent.hover(trigger);

      await waitFor(() => {
        const content = screen.getByText('カスタムスタイルのコンテンツ');
        expect(content.parentElement).toHaveClass('custom-class');
      });
    });
  });

  describe('インタラクション', () => {
    it('トリガーにホバーするとコンテンツが表示される', async () => {
      render(<TestHoverCard />);
      const trigger = screen.getByRole('button', { name: 'ホバーしてください' });
      await userEvent.hover(trigger);

      await waitFor(() => {
        expect(screen.getByText('ホバーカードの内容')).toBeInTheDocument();
      });
    });

    it('トリガーからマウスが離れるとコンテンツが非表示になる', async () => {
      render(<TestHoverCard />);
      const trigger = screen.getByRole('button', { name: 'ホバーしてください' });
      await userEvent.hover(trigger);

      await waitFor(() => {
        expect(screen.getByText('ホバーカードの内容')).toBeInTheDocument();
      });

      await userEvent.unhover(trigger);

      await waitFor(() => {
        expect(screen.queryByText('ホバーカードの内容')).not.toBeInTheDocument();
      });
    });
  });

  describe('アクセシビリティ', () => {
    it('基本的なアクセシビリティ要件を満たす', async () => {
      await runAccessibilityTest(<TestHoverCard />, {
        keyboardNavigation: true,
        ariaAttributes: true,
        focusManagement: true,
        contrast: false,
        skipFocusableCheck: true,
      });
    });

    it('適切なARIA属性が設定される', async () => {
      render(<TestHoverCard />);
      const trigger = screen.getByRole('button', { name: 'ホバーしてください' });
      await userEvent.hover(trigger);

      await waitFor(() => {
        const content = screen.getByText('ホバーカードの内容');
        expect(content.parentElement).toHaveAttribute('role', 'tooltip');
      });
    });
  });
}); 