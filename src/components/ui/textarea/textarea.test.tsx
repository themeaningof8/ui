/**
 * @file Textareaのテスト
 * @description Textareaの機能とアクセシビリティをテスト
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Textarea } from '@/components/ui/textarea';
import { 
  runAxeTest,
  runKeyboardNavigationTest,
  runAriaAttributesTest,
  runFocusManagementTest,
  runContrastTest
} from '@/tests/wcag3/helpers';

describe('Textarea', () => {
  const user = userEvent.setup();

  describe('基本機能', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
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

    it('無効化状態が適用される', () => {
      render(<Textarea disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('読み取り専用状態が適用される', () => {
      render(<Textarea readOnly />);
      expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    });

    it('エラー状態のスタイルが適用される', () => {
      render(<Textarea error />);
      expect(screen.getByRole('textbox')).toHaveClass('border-error');
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

    it('カスタムクラスが適用される', () => {
      render(<Textarea className="custom-class" />);
      expect(screen.getByRole('textbox')).toHaveClass('custom-class');
    });
  });

  describe('アクセシビリティ', () => {
    describe('基本的なアクセシビリティ', () => {
      it('axeによる基本的なアクセシビリティ要件を満たす', async () => {
        await runAxeTest(<Textarea aria-label="テストテキストエリア" />);
      });

      it('キーボードナビゲーションが適切に機能する', () => {
        const { container } = render(<Textarea aria-label="テストテキストエリア" />);
        runKeyboardNavigationTest(container);
      });

      it('ARIA属性が適切に設定されている', () => {
        const { container } = render(<Textarea aria-label="テストテキストエリア" />);
        runAriaAttributesTest(container);
      });

      it('フォーカス管理が適切に機能する', () => {
        const { container } = render(<Textarea aria-label="テストテキストエリア" />);
        runFocusManagementTest(container);
      });

      it('コントラスト要件を満たす', () => {
        const { container } = render(<Textarea aria-label="テストテキストエリア" />);
        runContrastTest(container);
      });
    });

    it('適切なARIA属性が設定される', () => {
      render(<Textarea aria-label="メッセージ入力欄" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', 'メッセージ入力欄');
    });

    it('補助説明文が関連付けられる', () => {
      render(
        <>
          <Textarea aria-describedby="helper-text" />
          <div id="helper-text">入力のヘルプテキスト</div>
        </>
      );
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'helper-text');
    });

    it('キーボード操作が正しく機能する', async () => {
      render(<Textarea />);
      const textarea = screen.getByRole('textbox');
      
      await user.tab();
      expect(textarea).toHaveFocus();
      
      await user.keyboard('テスト入力');
      expect(textarea).toHaveValue('テスト入力');
    });
  });
}); 