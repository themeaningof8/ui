/**
 * @file ラベルコンポーネントのテスト
 * @description ラベルコンポーネントの機能テスト
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Label } from './'
import { Input } from '../input'

describe('Labelコンポーネント', () => {
  describe('基本機能', () => {
    it('テキストコンテンツを正しく表示する', () => {
      render(<Label>テストラベル</Label>)
      expect(screen.getByText('テストラベル')).toBeInTheDocument()
    })

    it('htmlForプロパティが正しく設定される', () => {
      render(
        <>
          <Label htmlFor="test-input">テストラベル</Label>
          <Input id="test-input" />
        </>
      )
      expect(screen.getByText('テストラベル')).toHaveAttribute('for', 'test-input')
    })
  })

  describe('スタイリング', () => {
    it('デフォルトのスタイルが適用される', () => {
      render(<Label>テストラベル</Label>)
      expect(screen.getByText('テストラベル')).toHaveClass(
        'text-sm',
        'font-medium',
        'text-base-high'
      )
    })

    it('カスタムクラスが適用される', () => {
      render(<Label className="custom-class">テストラベル</Label>)
      expect(screen.getByText('テストラベル')).toHaveClass('custom-class')
    })
  })

  describe('アクセシビリティ', () => {
    it('入力フィールドと正しく関連付けられる', () => {
      render(
        <>
          <Label htmlFor="test-input">テストラベル</Label>
          <Input id="test-input" aria-labelledby="test-label" />
        </>
      )
      
      const label = screen.getByText('テストラベル')
      const input = screen.getByRole('textbox')
      
      expect(label).toHaveAttribute('for', 'test-input')
      expect(input).toHaveAttribute('id', 'test-input')
    })

    it('必須項目のマークアップが適切に行われる', () => {
      render(
        <Label htmlFor="required-input">
          必須項目
          <span aria-hidden="true" className="text-destructive-high ml-1">*</span>
        </Label>
      )
      
      expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true')
    })
  })
}) 