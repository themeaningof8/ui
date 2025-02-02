/**
 * @file インプットコンポーネントのテスト
 * @description インプットコンポーネントの機能テスト
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Input } from '@/components/ui/input'

describe('Inputコンポーネント', () => {
  describe('基本機能', () => {
    it('デフォルトのスタイルでレンダリングされる', () => {
      render(<Input />)
      const input = screen.getByRole('textbox')
      
      expect(input).toHaveClass(
        'flex',
        'h-10',
        'w-full',
        'rounded-md',
        'border',
        'px-3',
        'py-2',
        'text-sm',
        'bg-base-app',
        'text-base-high',
        'border-base-ui',
        'file:border-0',
        'file:bg-transparent',
        'file:text-sm',
        'file:font-medium',
        'placeholder:text-base-low',
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-base-ui',
        'focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed',
        'disabled:opacity-50'
      )
    })

    it('プレースホルダーテキストを表示する', () => {
      render(<Input placeholder="テスト入力" />)
      expect(screen.getByPlaceholderText('テスト入力')).toBeInTheDocument()
    })

    it('入力値が正しく更新される', async () => {
      const user = userEvent.setup()
      render(<Input />)
      const input = screen.getByRole('textbox')
      
      await user.type(input, 'テストテキスト')
      expect(input).toHaveValue('テストテキスト')
    })
  })

  describe('状態とバリアント', () => {
    it('無効状態で正しいスタイルが適用される', () => {
      render(<Input disabled />)
      const input = screen.getByRole('textbox')
      expect(input).toBeDisabled()
      expect(input).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
    })

    it('エラー状態で正しいスタイルが適用される', () => {
      render(<Input error />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('border-destructive-ui', 'focus-visible:ring-destructive-ui')
    })

    it('必須状態で正しいスタイルが適用される', () => {
      render(<Input required />)
      const input = screen.getByRole('textbox')
      expect(input).toBeRequired()
    })
  })

  describe('アクセシビリティ', () => {
    it('aria-labelを正しく設定できる', () => {
      render(<Input aria-label="テスト入力" />)
      expect(screen.getByLabelText('テスト入力')).toBeInTheDocument()
    })

    it('aria-requiredを正しく設定できる', () => {
      render(<Input required />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-required', 'true')
    })

    it('aria-invalidを正しく設定できる', () => {
      render(<Input error />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })
  })

  describe('カスタマイズ', () => {
    it('追加のクラス名を適用できる', () => {
      render(<Input className="custom-class" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('custom-class')
    })

    it('追加のプロパティを適用できる', () => {
      render(<Input data-testid="custom-input" />)
      expect(screen.getByTestId('custom-input')).toBeInTheDocument()
    })
  })
}) 