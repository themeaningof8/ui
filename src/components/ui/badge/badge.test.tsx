/**
 * @file バッジコンポーネントのテスト
 * @description バッジコンポーネントの機能をテストします
 */
import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge, badgeVariants } from '.'

describe('Badgeコンポーネント', () => {
  it('デフォルトのバッジが正しくレンダリングされる', () => {
    render(<Badge>デフォルト</Badge>)
    const badge = screen.getByText('デフォルト')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveAttribute('role', 'status')
    expect(badge).toHaveClass(badgeVariants({ variant: 'default' }))
    
  })

  it('セカンダリバリアントが正しく適用される', () => {
    render(<Badge variant="secondary">セカンダリ</Badge>)
    const badge = screen.getByText('セカンダリ')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveAttribute('role', 'status')
    expect(badge).toHaveClass(badgeVariants({ variant: 'secondary' }))
  })

  it('デストラクティブバリアントが正しく適用される', () => {
    render(<Badge variant="destructive">デストラクティブ</Badge>)
    const badge = screen.getByText('デストラクティブ')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveAttribute('role', 'status')
    expect(badge).toHaveClass(badgeVariants({ variant: 'destructive' }))
  })

  it('アウトラインバリアントが正しく適用される', () => {
    render(<Badge variant="outline">アウトライン</Badge>)
    const badge = screen.getByText('アウトライン')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveAttribute('role', 'status')
    expect(badge).toHaveClass(badgeVariants({ variant: 'outline' }))
  })

  it('カスタムクラス名が正しく適用される', () => {
    render(<Badge className="custom-class">カスタム</Badge>)
    const badge = screen.getByText('カスタム')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('custom-class')
  })

  it('リンクとして機能する場合、正しくレンダリングされる', () => {
    render(
      <Badge>
        <a href="/test">リンク</a>
      </Badge>
    )
    const link = screen.getByRole('link', { name: 'リンク' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
  })
}) 