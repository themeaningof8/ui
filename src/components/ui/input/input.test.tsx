/**
 * @file インプットコンポーネントのテスト
 * @description インプットコンポーネントの機能テスト
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Input } from '@/components/ui/input'
import { testBasicAccessibility, testWCAG3Compliance, testKeyboardInteraction } from '@/tests/wcag3/helpers'

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

    // 基本的なアクセシビリティテスト
    testBasicAccessibility(<Input />, {
      expectedRole: 'textbox',
      testDisabled: true,
    })
  })

  describe('状態とバリアント', () => {
    it('エラー状態で正しいスタイルが適用される', () => {
      render(<Input error />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('border-destructive-ui', 'focus-visible:ring-destructive-ui')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })

    it('必須状態で正しいスタイルが適用される', () => {
      render(<Input required />)
      const input = screen.getByRole('textbox')
      expect(input).toBeRequired()
      expect(input).toHaveAttribute('aria-required', 'true')
    })

    // 各状態のWCAG3コンプライアンスをテスト
    it.each([
      ['default', {}],
      ['error', { error: true }],
      ['required', { required: true }],
      ['disabled', { disabled: true }],
    ] as const)('%s状態がWCAG3に準拠している', (_, props) => {
      testWCAG3Compliance(<Input {...props} />)
    })
  })

  describe('インタラクション', () => {
    // キーボード操作のテスト
    testKeyboardInteraction(<Input />, {
      expectedRole: 'textbox',
      triggerKeys: [], // 入力要素なのでトリガーキーは不要
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