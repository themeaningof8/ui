/**
 * @file Textareaコンポーネントのテスト
 * @description Textareaコンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import { Textarea } from './textarea'
import userEvent from '@testing-library/user-event'

describe('Textarea', () => {
  describe('基本機能テスト', () => {
    it('基本的なテキストエリアが正しくレンダリングされること', () => {
      render(
        <Textarea
          placeholder="メッセージを入力"
          aria-label="メッセージ入力欄"
        />
      )
      
      const textarea = screen.getByRole('textbox', { name: 'メッセージ入力欄' })
      expect(textarea).toBeInTheDocument()
      expect(textarea).toHaveAttribute('placeholder', 'メッセージを入力')
    })

    it('デフォルト値が正しく表示されること', () => {
      render(
        <Textarea
          defaultValue="デフォルトテキスト"
          aria-label="メッセージ入力欄"
        />
      )
      
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveValue('デフォルトテキスト')
    })

    it('テキスト入力が正しく動作すること', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      render(
        <Textarea
          onChange={onChange}
          aria-label="メッセージ入力欄"
        />
      )
      
      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'テストメッセージ')
      
      expect(textarea).toHaveValue('テストメッセージ')
      expect(onChange).toHaveBeenCalled()
    })
  })

  describe('アクセシビリティテスト', () => {
    it('適切なARIA属性が設定されていること', () => {
      render(
        <Textarea
          aria-label="説明文"
          aria-describedby="description"
          aria-required="true"
        />
      )
      
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveAttribute('aria-label', '説明文')
      expect(textarea).toHaveAttribute('aria-describedby', 'description')
      expect(textarea).toHaveAttribute('aria-required', 'true')
    })

    it('キーボード操作が正しく動作すること', async () => {
      const user = userEvent.setup()

      render(
        <Textarea
          aria-label="メッセージ入力欄"
        />
      )
      
      const textarea = screen.getByRole('textbox')
      await user.tab()
      expect(textarea).toHaveFocus()
      
      await user.keyboard('Hello{enter}World')
      expect(textarea).toHaveValue('Hello\nWorld')
    })
  })

  describe('スタイルテスト', () => {
    it('デフォルトのスタイルが適用されること', () => {
      render(
        <Textarea
          aria-label="メッセージ入力欄"
        />
      )
      
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveClass('flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50')
    })

    it('カスタムクラスが適用できること', () => {
      render(
        <Textarea
          className="custom-textarea"
          aria-label="メッセージ入力欄"
        />
      )
      
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveClass('custom-textarea')
    })
  })

  describe('エッジケーステスト', () => {
    it('無効状態が正しく表示されること', () => {
      render(
        <Textarea
          disabled
          aria-label="メッセージ入力欄"
        />
      )
      
      const textarea = screen.getByRole('textbox')
      expect(textarea).toBeDisabled()
      expect(textarea).toHaveClass('disabled:cursor-not-allowed disabled:opacity-50')
    })

    it('最大長制限が正しく動作すること', async () => {
      const user = userEvent.setup()

      render(
        <Textarea
          maxLength={10}
          aria-label="メッセージ入力欄"
        />
      )
      
      const textarea = screen.getByRole('textbox')
      await user.type(textarea, '12345678901')
      
      expect(textarea).toHaveValue('1234567890')
      expect(textarea).toHaveAttribute('maxlength', '10')
    })

    it('必須フィールドが正しく表示されること', () => {
      render(
        <Textarea
          required
          aria-label="メッセージ入力欄"
        />
      )
      
      const textarea = screen.getByRole('textbox')
      expect(textarea).toBeRequired()
    })
  })

  describe('コンテキストテスト', () => {
    it('フォーム内でのテキストエリアが正しく動作すること', async () => {
      const user = userEvent.setup()
      const onSubmit = vi.fn(e => e.preventDefault())

      render(
        <form onSubmit={onSubmit}>
          <label htmlFor="message">メッセージ:</label>
          <Textarea
            id="message"
            name="message"
            required
          />
          <button type="submit">送信</button>
        </form>
      )
      
      const textarea = screen.getByLabelText('メッセージ:')
      const submitButton = screen.getByRole('button', { name: '送信' })
      
      await user.type(textarea, 'テストメッセージ')
      await user.click(submitButton)
      
      expect(onSubmit).toHaveBeenCalled()
      expect(textarea).toHaveValue('テストメッセージ')
    })

    it('エラー状態が正しく表示されること', () => {
      render(
        <div>
          <label htmlFor="message">メッセージ:</label>
          <Textarea
            id="message"
            aria-invalid="true"
            aria-errormessage="error-message"
          />
          <div id="error-message" role="alert">
            メッセージを入力してください
          </div>
        </div>
      )
      
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveAttribute('aria-invalid', 'true')
      expect(textarea).toHaveAttribute('aria-errormessage', 'error-message')
      expect(screen.getByRole('alert')).toHaveTextContent('メッセージを入力してください')
    })
  })
}) 