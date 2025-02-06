/**
 * @file Sliderのテスト
 * @description Sliderの機能とアクセシビリティをテスト
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Slider } from '@/components/ui/slider'
import { 
  runAxeTest,
  runKeyboardNavigationTest,
  runAriaAttributesTest,
  runFocusManagementTest,
  runContrastTest
} from '@/tests/wcag3/helpers'

describe('Slider', () => {
  describe('基本機能', () => {
    it('デフォルト値が正しく設定されること', () => {
      render(<Slider defaultValue={[50]} />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuenow', '50')
    })

    it('サイズバリアントが適用されること', () => {
      render(<Slider size="sm" defaultValue={[50]} />)
      const root = screen.getByRole('slider').parentElement?.parentElement
      expect(root).toHaveClass('h-4')
    })

    it('無効化された状態が正しく表示されること', () => {
      render(<Slider disabled defaultValue={[50]} />)
      const root = screen.getByRole('slider').parentElement?.parentElement
      expect(root).toHaveClass('disabled:pointer-events-none disabled:opacity-50')
    })
  })

  describe('インタラクション', () => {
    it('値の変更イベントが発火すること', async () => {
      const onValueChange = vi.fn()
      const user = userEvent.setup()
      
      render(<Slider defaultValue={[0]} onValueChange={onValueChange} />)
      const slider = screen.getByRole('slider')
      
      // sliderにフォーカスを与えて、キーボード操作で値を変更する
      slider.focus()
      await user.keyboard('{ArrowRight}')
      
      expect(onValueChange).toHaveBeenCalled()
    })

    it('キーボード操作で値が変更できること', async () => {
      const user = userEvent.setup()
      render(<Slider defaultValue={[50]} step={10} />)
      const slider = screen.getByRole('slider')

      slider.focus()
      await user.keyboard('{ArrowRight}')
      expect(slider).toHaveAttribute('aria-valuenow', '60')

      await user.keyboard('{ArrowLeft}')
      expect(slider).toHaveAttribute('aria-valuenow', '50')
    })
  })

  describe('アクセシビリティ', () => {
    describe('基本的なアクセシビリティ', () => {
      it('axeによる基本的なアクセシビリティ要件を満たす', async () => {
        await runAxeTest(<Slider defaultValue={[50]} />);
      });

      it('キーボードナビゲーションが適切に機能する', () => {
        const { container } = render(<Slider defaultValue={[50]} />);
        runKeyboardNavigationTest(container);
      });

      it('ARIA属性が適切に設定されている', () => {
        const { container } = render(<Slider defaultValue={[50]} />);
        runAriaAttributesTest(container);
      });

      it('フォーカス管理が適切に機能する', () => {
        const { container } = render(<Slider defaultValue={[50]} />);
        runFocusManagementTest(container);
      });

      it('コントラスト要件を満たす', () => {
        const { container } = render(<Slider defaultValue={[50]} />);
        runContrastTest(container);
      });
    });
  })
}) 