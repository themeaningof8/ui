/**
 * @file Skeletonコンポーネントのテスト
 * @description Skeletonコンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import { Skeleton } from '.'

describe('Skeleton', () => {
  describe('基本機能テスト', () => {
    it('基本的なスケルトンが正しくレンダリングされること', () => {
      render(<Skeleton className="h-4 w-[250px]" />)
      
      const skeleton = screen.getByRole('status')
      expect(skeleton).toBeInTheDocument()
      expect(skeleton).toHaveClass('h-4 w-[250px]')
    })

    it('カスタムサイズのスケルトンが正しくレンダリングされること', () => {
      render(
        <Skeleton
          className="h-12 w-12 rounded-full"
          aria-label="アバター読み込み中"
        />
      )
      
      const skeleton = screen.getByRole('status', { name: 'アバター読み込み中' })
      expect(skeleton).toHaveClass('h-12 w-12 rounded-full')
    })

    it('子要素を含むスケルトンが正しくレンダリングされること', () => {
      render(
        <Skeleton>
          <div>読み込み中のコンテンツ</div>
        </Skeleton>
      )
      
      const skeleton = screen.getByRole('status')
      expect(skeleton).toContainHTML('読み込み中のコンテンツ')
    })
  })

  describe('アクセシビリティテスト', () => {
    it('適切なARIA属性が設定されていること', () => {
      render(
        <Skeleton
          aria-label="コンテンツ読み込み中"
          aria-busy="true"
        />
      )
      
      const skeleton = screen.getByRole('status')
      expect(skeleton).toHaveAttribute('aria-label', 'コンテンツ読み込み中')
      expect(skeleton).toHaveAttribute('aria-busy', 'true')
    })

    it('アニメーション中のARIA属性が正しく設定されること', () => {
      render(<Skeleton />)
      const skeleton = screen.getByRole('status')
      expect(skeleton).toHaveAttribute('data-state', 'loading')
      expect(skeleton).toHaveAttribute('aria-valuemin', '0')
      expect(skeleton).toHaveAttribute('aria-valuemax', '100')
      expect(skeleton).toHaveAttribute('aria-valuenow')
    })
  })

  describe('スタイルテスト', () => {
    it('デフォルトのスタイルが適用されること', () => {
      render(<Skeleton />)
      
      const skeleton = screen.getByRole('status')
      expect(skeleton).toHaveClass('animate-pulse rounded-md bg-muted')
    })

    it('カスタムクラスが適用できること', () => {
      render(
        <Skeleton className="custom-skeleton bg-primary/10" />
      )
      
      const skeleton = screen.getByRole('status')
      expect(skeleton).toHaveClass('custom-skeleton bg-primary/10')
    })

    it('複数のスケルトンが正しくレイアウトされること', () => {
      render(
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      )
      
      const skeletons = screen.getAllByRole('status')
      expect(skeletons).toHaveLength(3)
      expect(skeletons[0]).toHaveClass('h-4 w-[250px]')
      expect(skeletons[1]).toHaveClass('h-4 w-[200px]')
      expect(skeletons[2]).toHaveClass('h-4 w-[150px]')
    })
  })

  describe('コンテキストテスト', () => {
    it('カード内でのスケルトンUIが正しく表示されること', () => {
      render(
        <div className="rounded-lg border p-4">
          <div className="space-y-3">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      )
      
      const skeletons = screen.getAllByRole('status')
      expect(skeletons).toHaveLength(4)
    })

    it('アバタースケルトンが正しく表示されること', () => {
      render(
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
      )
      
      const skeletons = screen.getAllByRole('status')
      expect(skeletons).toHaveLength(3)
      expect(skeletons[0]).toHaveClass('rounded-full')
    })
  })

  describe('エッジケーステスト', () => {
    it('空のスケルトンが正しく表示されること', () => {
      render(<Skeleton />)
      
      const skeleton = screen.getByRole('status')
      expect(skeleton).toBeEmptyDOMElement()
    })

    it('非常に大きなスケルトンが正しく表示されること', () => {
      render(
        <Skeleton className="h-[500px] w-[1000px]" />
      )
      
      const skeleton = screen.getByRole('status')
      expect(skeleton).toHaveClass('h-[500px] w-[1000px]')
    })

    it('ネストされたスケルトンが正しく表示されること', () => {
      render(
        <Skeleton className="p-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </Skeleton>
      )
      
      const skeletons = screen.getAllByRole('status')
      expect(skeletons).toHaveLength(3)
    })
  })
}) 