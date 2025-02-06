/**
 * @file Progressのテスト
 * @description Progressの機能とアクセシビリティをテスト
 */

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Progress } from '@/components/ui/progress'
import { 
  runAxeTest,
  runKeyboardNavigationTest,
  runAriaAttributesTest,
  runFocusManagementTest,
  runContrastTest
} from '@/tests/wcag3/helpers'

describe('Progress', () => {
  describe('基本機能', () => {
    it('基本的なプログレスバーが表示されること', () => {
      render(<Progress value={50} />)
      const progress = screen.getByRole('progressbar')
      
      expect(progress).toBeInTheDocument()
      expect(progress).toHaveAttribute('aria-valuenow', '50')
    })

    it('異なるサイズが適用されること', () => {
      render(<Progress value={50} size="sm" />)
      const progress = screen.getByRole('progressbar')
      
      expect(progress).toHaveClass('h-2')
    })

    it('不定の進捗状態が表示されること', () => {
      render(<Progress isIndeterminate />)
      const progress = screen.getByRole('progressbar')
      const indicator = progress.querySelector('[class*="animate-indeterminate-progress"]')
      
      expect(indicator).toBeInTheDocument()
    })

    it('カスタムクラス名が適用されること', () => {
      const customClass = 'custom-class'
      render(<Progress value={50} className={customClass} />)
      const progress = screen.getByRole('progressbar')
      
      expect(progress).toHaveClass(customClass)
    })
  })

  describe('アクセシビリティ', () => {
    describe('基本的なアクセシビリティ', () => {
      it('axeによる基本的なアクセシビリティ要件を満たす', async () => {
        await runAxeTest(<Progress value={50} />)
      })

      it('キーボードナビゲーションが適切に機能する', () => {
        const { container } = render(<Progress value={50} />)
        runKeyboardNavigationTest(container)
      })

      it('ARIA属性が適切に設定されている', () => {
        const { container } = render(<Progress value={50} />)
        runAriaAttributesTest(container)
      })

      it('フォーカス管理が適切に機能する', () => {
        const { container } = render(<Progress value={50} />)
        runFocusManagementTest(container)
      })

      it('コントラスト要件を満たす', () => {
        const { container } = render(<Progress value={50} />)
        runContrastTest(container)
      })
    })

    it('アニメーションの低減設定に対応している', () => {
      render(<Progress isIndeterminate />)
      const progress = screen.getByRole('progressbar')
      const indicator = progress.querySelector('[class*="animate-indeterminate-progress"]')
      
      expect(indicator).toHaveClass('motion-reduce:animate-none')
    })
  })
}) 