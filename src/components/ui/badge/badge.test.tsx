/**
 * @file Badgeコンポーネントのテスト
 * @description Badgeコンポーネントの機能とバリアントをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import { Badge, badgeVariants } from '.'

describe('Badge', () => {
  describe('基本レンダリングテスト', () => {
    it('デフォルトのバッジが正しくレンダリングされること', () => {
      render(<Badge>デフォルトバッジ</Badge>)
      const badge = screen.getByText('デフォルトバッジ')
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveClass(badgeVariants({ variant: 'default' }))
    })
  })

  describe('バリアントテスト', () => {
    it('各バリアントが正しく適用されること', () => {
      const { rerender } = render(<Badge variant="default">デフォルト</Badge>)
      expect(screen.getByText('デフォルト')).toHaveClass(badgeVariants({ variant: 'default' }))

      rerender(<Badge variant="secondary">セカンダリ</Badge>)
      expect(screen.getByText('セカンダリ')).toHaveClass(badgeVariants({ variant: 'secondary' }))

      rerender(<Badge variant="destructive">破壊的</Badge>)
      expect(screen.getByText('破壊的')).toHaveClass(badgeVariants({ variant: 'destructive' }))

      rerender(<Badge variant="outline">アウトライン</Badge>)
      expect(screen.getByText('アウトライン')).toHaveClass(badgeVariants({ variant: 'outline' }))
    })
  })

  describe('スタイルテスト', () => {
    it('カスタムクラスが適用できること', () => {
      render(<Badge className="custom-badge">カスタム</Badge>)
      const badge = screen.getByText('カスタム')
      expect(badge).toHaveClass('custom-badge')
    })
  })
}) 