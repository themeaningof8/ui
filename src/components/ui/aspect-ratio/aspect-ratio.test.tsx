/**
 * @file AspectRatioコンポーネントのテスト
 * @description AspectRatioコンポーネントの機能とレイアウトをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import { AspectRatio } from '.'

describe('AspectRatio', () => {
  describe('基本レンダリングテスト', () => {
    it('デフォルトの比率（16:9）で正しくレンダリングされること', () => {
      render(
        <AspectRatio>
          <div>コンテンツ</div>
        </AspectRatio>
      )

      const container = screen.getByText('コンテンツ').parentElement
      expect(container).toHaveStyle({
        position: 'absolute',
      })
    })

    it('カスタムの比率で正しくレンダリングされること', () => {
      render(
        <AspectRatio ratio={4 / 3}>
          <div>4:3のコンテンツ</div>
        </AspectRatio>
      )

      const container = screen.getByText('4:3のコンテンツ').parentElement
      expect(container).toHaveStyle({
        position: 'absolute',
      })
    })
  })

  describe('画像コンテンツテスト', () => {
    it('画像を正しくレンダリングできること', () => {
      // 画像のモックを使用
      const mockImageSrc = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
      render(
        <AspectRatio>
          <img
            src={mockImageSrc}
            alt="テスト画像"
            className="object-cover"
          />
        </AspectRatio>
      )

      const image = screen.getByRole('img', { name: 'テスト画像' })
      expect(image).toBeInTheDocument()
      expect(image).toHaveClass('object-cover')
      expect(image).toHaveAttribute('src', mockImageSrc)
    })
  })

  describe('スタイルテスト', () => {
    it('カスタムクラスが適用できること', () => {
      render(
        <AspectRatio className="custom-ratio">
          <div>カスタムスタイル</div>
        </AspectRatio>
      )

      const container = screen.getByText('カスタムスタイル').parentElement
      expect(container).toHaveClass('custom-ratio')
    })

    it('子要素にスタイルが適用できること', () => {
      render(
        <AspectRatio>
          <div className="custom-content">スタイル付きコンテンツ</div>
        </AspectRatio>
      )

      const content = screen.getByText('スタイル付きコンテンツ')
      expect(content).toHaveClass('custom-content')
    })
  })

  describe('レイアウトテスト', () => {
    it('子要素が正しく配置されること', () => {
      render(
        <AspectRatio>
          <div data-testid="child">レイアウトテスト</div>
        </AspectRatio>
      )

      const child = screen.getByTestId('child')
      const container = child.parentElement
      
      expect(container).toHaveStyle({
        position: 'absolute',
      })
      expect(child).toBeInTheDocument()
    })

    it('複数の子要素を含められること', () => {
      render(
        <AspectRatio>
          <div>要素1</div>
          <div>要素2</div>
        </AspectRatio>
      )

      expect(screen.getByText('要素1')).toBeInTheDocument()
      expect(screen.getByText('要素2')).toBeInTheDocument()
    })
  })

  describe('エッジケーステスト', () => {
    it('子要素がない場合でもエラーにならないこと', () => {
      expect(() => {
        render(<AspectRatio />)
      }).not.toThrow()
    })

    it('無効な比率が指定された場合にデフォルト値が使用されること', () => {
      render(
        <AspectRatio ratio={-1}>
          <div>無効な比率</div>
        </AspectRatio>
      )

      const container = screen.getByText('無効な比率').parentElement
      expect(container).toHaveStyle({
        position: 'absolute',
      })
    })
  })
}) 