/**
 * @file Labelコンポーネントのテスト
 * @description Labelコンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import { Label } from '.'

describe('Label', () => {
  describe('基本機能テスト', () => {
    it('デフォルトのラベルが正しくレンダリングされること', () => {
      render(<Label>テストラベル</Label>)
      const label = screen.getByText('テストラベル')
      expect(label).toBeInTheDocument()
    })

    it('htmlForが正しく設定されること', () => {
      render(<Label htmlFor="test-input">テストラベル</Label>)
      const label = screen.getByText('テストラベル')
      expect(label).toHaveAttribute('for', 'test-input')
    })

    it('入力要素と正しく関連付けられること', () => {
      render(
        <>
          <Label htmlFor="test-input">テストラベル</Label>
          <input id="test-input" type="text" />
        </>
      )
      
      const input = screen.getByLabelText('テストラベル')
      expect(input).toBeInTheDocument()
    })
  })

  describe('アクセシビリティテスト', () => {
    it('必須項目のマークが正しく表示されること', () => {
      render(
        <Label htmlFor="required-input" required>
          必須項目
          <span aria-hidden="true" className="text-destructive">*</span>
        </Label>
      )
      
      expect(screen.getByText('*')).toBeInTheDocument()
      expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true')
    })

    it('aria属性が正しく設定されること', () => {
      render(
        <Label htmlFor="test-input" aria-label="カスタムラベル">
          テストラベル
        </Label>
      )
      
      const label = screen.getByText('テストラベル')
      expect(label).toHaveAttribute('aria-label', 'カスタムラベル')
    })
  })

  describe('スタイルテスト', () => {
    it('カスタムクラスが適用できること', () => {
      render(
        <Label htmlFor="test-input" className="custom-label">
          テストラベル
        </Label>
      )
      
      const label = screen.getByText('テストラベル')
      expect(label).toHaveClass('custom-label')
    })

    it('無効状態のスタイルが適用できること', () => {
      render(
        <Label htmlFor="disabled-input" disabled>
          無効なラベル
        </Label>
      )
      
      const label = screen.getByText('無効なラベル')
      expect(label).toHaveClass('cursor-not-allowed opacity-70')
    })
  })
}) 