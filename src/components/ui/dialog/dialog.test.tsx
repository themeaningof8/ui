/**
 * @file Dialogのテスト
 * @description Dialogの基本的なレンダリングと機能をテストします。
 */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  runAxeTest,
  runKeyboardNavigationTest,
  runAriaAttributesTest,
  runFocusManagementTest,
  runContrastTest
} from '@/tests/wcag3/helpers';

const TestDialog = () => (
  <Dialog>
    <DialogTrigger>開く</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>タイトル</DialogTitle>
        <DialogDescription>説明文</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button">キャンセル</Button>
        </DialogClose>
        <Button type="button">OK</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

describe('Dialog', () => {
  const user = userEvent.setup();

  describe('基本機能', () => {
    it('コンポーネントが正しくレンダリングされる', async () => {
      render(<TestDialog />);
      const trigger = screen.getByText('開く');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeVisible();
        expect(screen.getByText('タイトル')).toBeVisible();
        expect(screen.getByText('説明文')).toBeVisible();
      });
    });

    it('ダイアログのコンテンツが表示される', async () => {
      render(
        <Dialog>
          <DialogTrigger>開く</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>タイトル</DialogTitle>
              <DialogDescription>説明文</DialogDescription>
            </DialogHeader>
            <div>コンテンツ</div>
          </DialogContent>
        </Dialog>
      );

      const trigger = screen.getByText('開く');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('コンテンツ')).toBeVisible();
      });
    });
  });

  describe('インタラクション', () => {
    it('閉じるボタンでダイアログが閉じる', async () => {
      render(<TestDialog />);
      const trigger = screen.getByText('開く');
      await user.click(trigger);

      const dialog = await screen.findByRole('dialog');
      const closeButton = screen.getByRole('button', { name: '閉じる' });
      await user.click(closeButton);

      await waitFor(() => {
        expect(dialog).not.toBeVisible();
      });
    });

    it('ESCキーでダイアログが閉じる', async () => {
      render(<TestDialog />);
      const trigger = screen.getByText('開く');
      await user.click(trigger);

      const dialog = await screen.findByRole('dialog');
      await user.keyboard('[Escape]');

      await waitFor(() => {
        expect(dialog).not.toBeVisible();
      });
    });
  });

  describe('アクセシビリティ', () => {
    describe('基本的なアクセシビリティ', () => {
      it('axeによる基本的なアクセシビリティ要件を満たす', async () => {
        await runAxeTest(<TestDialog />);
      });

      it('キーボードナビゲーションが適切に機能する', () => {
        const { container } = render(<TestDialog />);
        runKeyboardNavigationTest(container);
      });

      it('ARIA属性が適切に設定されている', () => {
        const { container } = render(<TestDialog />);
        runAriaAttributesTest(container);
      });

      it('フォーカス管理が適切に機能する', () => {
        const { container } = render(<TestDialog />);
        runFocusManagementTest(container);
      });

      it('コントラスト要件を満たす', () => {
        const { container } = render(<TestDialog />);
        runContrastTest(container);
      });
    });

    it('適切なARIA属性が設定されている', async () => {
      render(<TestDialog />);
      await user.click(screen.getByText('開く'));
      const dialog = await screen.findByRole('dialog');

      expect(dialog).toHaveAttribute('aria-labelledby');
      expect(dialog).toHaveAttribute('aria-describedby');
    });

    describe('キーボード操作', () => {
      it('フォーカストラップが機能する', async () => {
        render(<TestDialog />);
        await user.click(screen.getByText('開く'));
        
        // 初期フォーカス（キャンセルボタン）
        expect(screen.getByRole('button', { name: 'キャンセル' })).toHaveFocus();
        
        // OKボタンにフォーカス
        await user.tab();
        expect(screen.getByRole('button', { name: 'OK' })).toHaveFocus();
        
        // 閉じるボタン（X）にフォーカス
        await user.tab();
        expect(screen.getByRole('button', { name: '閉じる' })).toHaveFocus();
        
        // キャンセルボタンに戻る
        await user.tab();
        expect(screen.getByRole('button', { name: 'キャンセル' })).toHaveFocus();
        
        // OKボタンに移動（循環の確認）
        await user.tab();
        expect(screen.getByRole('button', { name: 'OK' })).toHaveFocus();
      });

      it('フォーカスの順序が適切である', async () => {
        render(<TestDialog />);
        await user.click(screen.getByText('開く'));

        // 初期フォーカスを確認
        expect(screen.getByRole('button', { name: 'キャンセル' })).toHaveFocus();

        // フォーカスの順序を確認
        await user.tab();
        expect(screen.getByRole('button', { name: 'OK' })).toHaveFocus();

        await user.tab();
        expect(screen.getByRole('button', { name: '閉じる' })).toHaveFocus();

        await user.tab();
        expect(screen.getByRole('button', { name: 'キャンセル' })).toHaveFocus();

        await user.tab();
        expect(screen.getByRole('button', { name: 'OK' })).toHaveFocus();
      });
    });
  });
});
