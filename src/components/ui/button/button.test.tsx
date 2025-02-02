/**
 * @file Button コンポーネントのテスト
 * @description Button コンポーネントの基本機能とWCAG 3.0メトリクスをテストします。
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button, type ButtonProps } from '@/components/ui/button';
import { checkWCAG3Metrics, reportWCAG3Results } from '@/tests/wcag3';

describe('Button', () => {
  describe('基本機能', () => {
    it('デフォルト状態でレンダリングされる', () => {
      render(<Button>テストボタン</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('無効化された状態が正しく表示される', () => {
      render(<Button disabled>テストボタン</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('アクセシビリティ', () => {
    it('WCAG 3.0のメトリクスを満たしている', () => {
      const renderResult = render(<Button>テストボタン</Button>);
      const metrics = checkWCAG3Metrics(renderResult);
      reportWCAG3Results(metrics);

      // APCAコントラスト比が70以上であることを確認
      expect(metrics.apca).toHaveLength(0);

      // インタラクティブ要素が適切に設定されていることを確認
      expect(metrics.interactiveElements).toHaveLength(1);
      expect(metrics.interactiveElements[0].tagName.toLowerCase()).toBe('button');

      // フォーカス可能要素が適切に設定されていることを確認
      expect(metrics.focusableElements).toHaveLength(0);
    });

    it('各バリアントがWCAG 3.0のコントラスト要件を満たしている', () => {
      const variants: ButtonProps['variant'][] = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'];
      
      for (const variant of variants) {
        const renderResult = render(<Button variant={variant}>テストボタン</Button>);
        const metrics = checkWCAG3Metrics(renderResult);
        
        // APCAコントラスト比が70以上であることを確認
        expect(metrics.apca).toHaveLength(0);
      }
    });

    it('キーボード操作が適切に機能する', async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>テストボタン</Button>);
      const button = screen.getByRole('button');

      // ボタンにフォーカスを当てる
      await userEvent.tab();
      expect(button).toHaveFocus();

      // Enterキーでクリックイベントが発火する
      await userEvent.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);

      // Spaceキーでクリックイベントが発火する
      await userEvent.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });
  });
});