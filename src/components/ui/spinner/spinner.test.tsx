/**
 * @file Spinnerのテスト
 * @description Spinnerの機能とアクセシビリティをテスト
 */

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { 
  runAxeTest,
  runKeyboardNavigationTest,
  runAriaAttributesTest,
  runFocusManagementTest,
  runContrastTest
} from '@/tests/wcag3/helpers'
import { Spinner } from '@/components/ui/spinner'

describe('Spinner', () => {
  describe('基本機能', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<Spinner />)
      const spinner = screen.getByRole('status')
      const loadingText = screen.getByText('Loading...')
      
      expect(spinner).toBeInTheDocument()
      expect(loadingText).toBeInTheDocument()
      expect(loadingText).toHaveClass('sr-only')
      expect(spinner).toHaveClass('animate-spin')
    })

    it('異なるサイズバリアントが適用される', () => {
      const sizes = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8'
      } as const

      for (const [size, expectedClass] of Object.entries(sizes)) {
        const { rerender } = render(<Spinner size={size as keyof typeof sizes} />)
        const spinner = screen.getByRole('status')
        const [width, height] = expectedClass.split(' ')
        
        expect(spinner).toHaveClass(width, height)
        rerender(null)
      }
    })

    it('デフォルトサイズが md である', () => {
      render(<Spinner />)
      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('w-6', 'h-6')
    })
  })

  describe('インタラクション', () => {
    it('カスタムクラスが適用される', () => {
      const customClass = 'custom-spinner'
      render(<Spinner className={customClass} />)
      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass(customClass)
    })

    it('カスタム属性が適用される', () => {
      const testId = 'test-spinner'
      render(<Spinner data-testid={testId} />)
      expect(screen.getByTestId(testId)).toBeInTheDocument()
    })
  })

  describe('アクセシビリティ', () => {
    describe('基本的なアクセシビリティ', () => {
      it('axeによる基本的なアクセシビリティ要件を満たす', async () => {
        await runAxeTest(<Spinner />);
      });

      it('キーボードナビゲーションが適切に機能する', () => {
        const { container } = render(<Spinner />);
        runKeyboardNavigationTest(container);
      });

      it('ARIA属性が適切に設定されている', () => {
        const { container } = render(<Spinner />);
        runAriaAttributesTest(container);
      });

      it('フォーカス管理が適切に機能する', () => {
        const { container } = render(<Spinner />);
        runFocusManagementTest(container);
      });

      it('コントラスト要件を満たす', () => {
        const { container } = render(<Spinner />);
        runContrastTest(container);
      });
    });

    it('アニメーションの減少モードに対応している', () => {
      render(<Spinner />)
      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('motion-reduce:animate-none')
    })
  })
}) 