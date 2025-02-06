/**
 * @file Skeletonのテスト
 * @description Skeletonの機能とアクセシビリティをテスト
 */

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  runAxeTest,
  runKeyboardNavigationTest,
  runAriaAttributesTest,
  runFocusManagementTest,
  runContrastTest
} from '@/tests/wcag3/helpers'

describe('Skeleton', () => {
  describe('基本機能', () => {
    it('基本的なスケルトンが表示されること', () => {
      render(<Skeleton data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      
      expect(skeleton).toBeInTheDocument()
      expect(skeleton).toHaveClass('animate-pulse')
      expect(skeleton).toHaveClass('bg-base-subtle')
    })

    it('カスタムサイズが適用されること', () => {
      const height = '100px'
      const width = '200px'
      render(<Skeleton data-testid="skeleton" height={height} width={width} />)
      const skeleton = screen.getByTestId('skeleton')
      
      expect(skeleton).toHaveStyle({ height, width })
    })

    it('円形のスケルトンが表示されること', () => {
      render(<Skeleton data-testid="skeleton" isCircle />)
      const skeleton = screen.getByTestId('skeleton')
      
      expect(skeleton).toHaveClass('rounded-full')
    })

    it('カスタムクラス名が適用されること', () => {
      const customClass = 'custom-class'
      render(<Skeleton data-testid="skeleton" className={customClass} />)
      const skeleton = screen.getByTestId('skeleton')
      
      expect(skeleton).toHaveClass(customClass)
    })
  })

  describe('アクセシビリティ', () => {
    describe('基本的なアクセシビリティ', () => {
      it('axeによる基本的なアクセシビリティ要件を満たす', async () => {
        await runAxeTest(<Skeleton />);
      });

      it('キーボードナビゲーションが適切に機能する', () => {
        const { container } = render(<Skeleton />);
        runKeyboardNavigationTest(container);
      });

      it('ARIA属性が適切に設定されている', () => {
        const { container } = render(<Skeleton />);
        runAriaAttributesTest(container);
      });

      it('フォーカス管理が適切に機能する', () => {
        const { container } = render(<Skeleton />);
        runFocusManagementTest(container);
      });

      it('コントラスト要件を満たす', () => {
        const { container } = render(<Skeleton />);
        runContrastTest(container);
      });
    });
    it('アニメーションの低減設定に対応している', () => {
      render(<Skeleton data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('motion-reduce:animate-none')
    })
  })
}) 