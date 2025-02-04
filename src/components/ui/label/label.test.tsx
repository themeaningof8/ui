/**
 * @file Labelのテスト
 * @description Labelの機能とアクセシビリティをテスト
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { runAccessibilityTest } from '@/tests/wcag3/helpers'

describe('Label', () => {
  describe('基本機能', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<Label>テストラベル</Label>)
      expect(screen.getByText('テストラベル')).toBeInTheDocument()
    })

    it('デフォルトのスタイルが適用される', () => {
      render(<Label>テストラベル</Label>)
      expect(screen.getByText('テストラベル')).toHaveClass(
        'text-sm',
        'font-medium',
        'text-base-high'
      )
    })

    it('htmlFor属性が正しく設定される', () => {
      render(
        <>
          <Label htmlFor="test-input">テストラベル</Label>
          <Input id="test-input" />
        </>
      )
      expect(screen.getByText('テストラベル')).toHaveAttribute('for', 'test-input')
    })
  })

  describe('インタラクション', () => {
    it('カスタムクラスが適用される', () => {
      render(<Label className="custom-class">テストラベル</Label>)
      expect(screen.getByText('テストラベル')).toHaveClass('custom-class')
    })

    it('入力フィールドと関連付けられる', () => {
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
  })

  describe('アクセシビリティ', () => {
    it('基本的なアクセシビリティ要件を満たす', async () => {
      await runAccessibilityTest(
        <>
          <Label htmlFor="test-input">テストラベル</Label>
          <Input id="test-input" />
        </>, 
        {
          keyboardNavigation: true,
          ariaAttributes: true,
          focusManagement: true,
          contrast: false
        }
      );
    });

    it('必須項目のマークアップが適切に設定される', () => {
      render(
        <Label htmlFor="required-input">
          必須項目
          <span aria-hidden="true" className="text-destructive-high ml-1">*</span>
        </Label>
      )
      
      expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true')
    })

    it('キーボード操作が正しく機能する', async () => {
      render(
        <>
          <Label htmlFor="test-input">テストラベル</Label>
          <Input id="test-input" />
        </>
      )

      const input = screen.getByRole('textbox')
      input.focus()
      expect(input).toHaveFocus()
    })
  })
}) 