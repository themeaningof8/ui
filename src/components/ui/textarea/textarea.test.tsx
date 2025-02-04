/**
 * @file Textareaのテスト
 * @description Textareaの基本的なレンダリングと機能をテストします。
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Textarea } from '@/components/ui/textarea';

describe('Textarea', () => {
  const user = userEvent.setup();

  describe('基本機能', () => {
    it('デフォルト状態でレンダリングされる', () => {
      render(<Textarea />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('プレースホルダーが表示される', () => {
      render(<Textarea placeholder="メッセージを入力" />);
      expect(screen.getByPlaceholderText('メッセージを入力')).toBeInTheDocument();
    });

    it('初期値が設定される', () => {
      render(<Textarea defaultValue="初期テキスト" />);
      expect(screen.getByRole('textbox')).toHaveValue('初期テキスト');
    });

    it('disabled 状態が適用される', () => {
      render(<Textarea disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('readonly 状態が適用される', () => {
      render(<Textarea readOnly />);
      expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    });
  });

  describe('インタラクション', () => {
    it('テキストを入力できる', async () => {
      const onChange = vi.fn();
      render(<Textarea onChange={onChange} />);
      
      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'テストメッセージ');
      
      expect(textarea).toHaveValue('テストメッセージ');
      expect(onChange).toHaveBeenCalled();
    });

    it('複数行のテキストを入力できる', async () => {
      render(<Textarea />);
      
      const textarea = screen.getByRole('textbox');
      await user.type(textarea, '1行目{enter}2行目');
      
      expect(textarea).toHaveValue('1行目\n2行目');
    });
  });

  describe('スタイリング', () => {
    it('エラー状態のスタイルが適用される', () => {
      render(<Textarea error />);
      expect(screen.getByRole('textbox')).toHaveClass('border-error');
    });

    it('カスタムクラスが適用される', () => {
      render(<Textarea className="custom-class" />);
      expect(screen.getByRole('textbox')).toHaveClass('custom-class');
    });
  });

  describe('アクセシビリティ', () => {
    it('aria-label が設定される', () => {
      render(<Textarea aria-label="メッセージ入力欄" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', 'メッセージ入力欄');
    });

    it('aria-describedby が設定される', () => {
      render(
        <>
          <Textarea aria-describedby="helper-text" />
          <div id="helper-text">入力のヘルプテキスト</div>
        </>
      );
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'helper-text');
    });
  });
}); 