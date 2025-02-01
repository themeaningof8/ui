/**
 * @file Dialog コンポーネントのテスト
 * @description Dialog コンポーネントの基本的なレンダリングと機能をテストします。
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
} from './';
import { Button } from '../button';

describe('Dialog Component', () => {
  const user = userEvent.setup();

  describe('基本機能', () => {
    it('トリガーボタンをクリックするとダイアログが開く', async () => {
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
        expect(screen.getByRole('dialog')).toBeVisible();
        expect(screen.getByText('タイトル')).toBeVisible();
        expect(screen.getByText('説明文')).toBeVisible();
        expect(screen.getByText('コンテンツ')).toBeVisible();
      });
    });

    it('閉じるボタンをクリックするとダイアログが閉じる', async () => {
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

      const dialog = await screen.findByRole('dialog');
      const closeButton = screen.getByRole('button', { name: '閉じる' });
      await user.click(closeButton);

      await waitFor(() => {
        expect(dialog).not.toBeVisible();
      });
    });

    it('ESCキーでダイアログが閉じる', async () => {
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

      const dialog = await screen.findByRole('dialog');
      await user.keyboard('[Escape]');

      await waitFor(() => {
        expect(dialog).not.toBeVisible();
      });
    });
  });

  describe('アクセシビリティ', () => {
    it('DialogTitleとDialogDescriptionのアクセシビリティ要件', async () => {
      render(
        <Dialog>
          <DialogTrigger>開く</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>タイトル</DialogTitle>
              <DialogDescription>説明文</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByText('開く'));
      const dialog = await screen.findByRole('dialog');

      expect(dialog).toHaveAttribute('aria-labelledby');
      expect(dialog).toHaveAttribute('aria-describedby');
    });

    it('フォーカスの順序を確認（デバッグ用）', async () => {
      render(
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

      await user.click(screen.getByText('開く'));

      // 初期フォーカスの状態を確認
      console.log('Initial focus:', document.activeElement?.textContent);
      
      // Tab キーを押して各要素のフォーカスを確認
      for (let i = 0; i < 4; i++) {
        await user.tab();
        console.log(`Focus after tab ${i + 1}:`, document.activeElement?.textContent);
        
        // フォーカスされた要素の詳細情報
        const focusedElement = document.activeElement;
        console.log('Focused element details:', {
          tagName: focusedElement?.tagName,
          className: focusedElement?.className,
          attributes: Array.from(focusedElement?.attributes || []).map(attr => `${attr.name}="${attr.value}"`),
        });
      }
    });

    it('フォーカストラップが機能する', async () => {
      render(
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
  });
});
