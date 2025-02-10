/**
 * @file Inputコンポーネントのテスト
 * @description Inputコンポーネントの機能、バリデーション、アクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import { userEvent } from '@testing-library/user-event'
import { Input } from '.'

describe('Input', () => {
  describe('基本機能テスト', () => {
    it('デフォルトのinputが正しくレンダリングされること', () => {
      render(<Input aria-label="テスト入力" />)
      const input = screen.getByRole('textbox', { name: 'テスト入力' })
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('type', 'text')
    })

    it('プレースホルダーが正しく表示されること', () => {
      render(<Input placeholder="入力してください" aria-label="テスト入力" />)
      const input = screen.getByPlaceholderText('入力してください')
      expect(input).toBeInTheDocument()
    })

    it('入力値が正しく更新されること', async () => {
      const user = userEvent.setup()
      render(<Input aria-label="テスト入力" />)
      
      const input = screen.getByRole('textbox', { name: 'テスト入力' })
      await user.type(input, 'テストテキスト')
      
      expect(input).toHaveValue('テストテキスト')
    })

    it('disabled状態が正しく機能すること', async () => {
      const user = userEvent.setup()
      render(<Input disabled aria-label="テスト入力" />)
      
      const input = screen.getByRole('textbox', { name: 'テスト入力' })
      expect(input).toBeDisabled()
      
      await user.type(input, 'テストテキスト')
      expect(input).not.toHaveValue('テストテキスト')
    })
  })

  describe('入力タイプテスト', () => {
    it('各種input typeが正しく設定されること', () => {
      const types = ['text', 'password', 'email', 'number', 'tel', 'url', 'search'] as const
      
      for (const type of types) {
        const { rerender } = render(<Input type={type} aria-label={`${type}入力`} />)
        const input = screen.getByRole('textbox', { name: `${type}入力` })
        expect(input).toHaveAttribute('type', type)
        rerender(<div />)
      }
    })

    it('パスワードタイプで入力が隠されること', async () => {
      const user = userEvent.setup()
      render(<Input type="password" aria-label="パスワード入力" />)
      
      const input = screen.getByLabelText('パスワード入力')
      await user.type(input, 'secretpassword')
      
      expect(input).toHaveAttribute('type', 'password')
    })
  })

  describe('バリデーションテスト', () => {
    it('required属性が正しく機能すること', () => {
      render(<Input required aria-label="必須入力" />)
      const input = screen.getByRole('textbox', { name: '必須入力' })
      expect(input).toBeRequired()
    })

    it('pattern属性が正しく機能すること', async () => {
      const user = userEvent.setup()
      render(
        <Input
          pattern="[0-9]{3}"
          aria-label="数字3桁"
          title="3桁の数字を入力してください"
        />
      )
      
      const input = screen.getByRole('textbox', { name: '数字3桁' })
      await user.type(input, '123')
      expect(input).toBeValid()
      
      await user.clear(input)
      await user.type(input, 'abc')
      expect(input).not.toBeValid()
    })

    it('maxLength属性が正しく機能すること', async () => {
      const user = userEvent.setup()
      render(<Input maxLength={5} aria-label="最大5文字" />)
      
      const input = screen.getByRole('textbox', { name: '最大5文字' })
      await user.type(input, '123456')
      
      expect(input).toHaveValue('12345')
    })
  })

  describe('アクセシビリティテスト', () => {
    it('aria-label属性が正しく設定されること', () => {
      render(<Input aria-label="アクセシブルな入力" />)
      const input = screen.getByLabelText('アクセシブルな入力')
      expect(input).toBeInTheDocument()
    })

    it('aria-describedby属性が正しく機能すること', () => {
      render(
        <>
          <Input aria-label="説明付き入力" aria-describedby="description" />
          <div id="description">入力の説明文</div>
        </>
      )
      
      const input = screen.getByRole('textbox', { name: '説明付き入力' })
      expect(input).toHaveAttribute('aria-describedby', 'description')
    })
  })

  describe('スタイルテスト', () => {
    it('カスタムクラスが適用できること', () => {
      render(<Input className="custom-input" aria-label="スタイル付き入力" />)
      const input = screen.getByRole('textbox', { name: 'スタイル付き入力' })
      expect(input).toHaveClass('custom-input')
    })

    it('エラー状態のスタイルが適用できること', () => {
      render(
        <Input
          className="error"
          aria-invalid="true"
          aria-label="エラー入力"
        />
      )
      
      const input = screen.getByRole('textbox', { name: 'エラー入力' })
      expect(input).toHaveClass('error')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })
  })
}) 