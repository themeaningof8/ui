/**
 * @file カードコンポーネントのテスト
 * @description カードコンポーネントの機能をテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '.'

describe('Cardコンポーネント', () => {
  it('基本的なカードが正しくレンダリングされること', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>タイトル</CardTitle>
          <CardDescription>説明文</CardDescription>
        </CardHeader>
        <CardContent>コンテンツ</CardContent>
        <CardFooter>フッター</CardFooter>
      </Card>
    )

    expect(screen.getByText('タイトル')).toBeInTheDocument()
    expect(screen.getByText('説明文')).toBeInTheDocument()
    expect(screen.getByText('コンテンツ')).toBeInTheDocument()
    expect(screen.getByText('フッター')).toBeInTheDocument()
  })

  it('カスタムクラス名が正しく適用されること', () => {
    render(
      <Card className="custom-card">
        <CardHeader className="custom-header">
          <CardTitle className="custom-title">タイトル</CardTitle>
          <CardDescription className="custom-description">説明文</CardDescription>
        </CardHeader>
        <CardContent className="custom-content">コンテンツ</CardContent>
        <CardFooter className="custom-footer">フッター</CardFooter>
      </Card>
    )

    expect(screen.getByTestId('card')).toHaveClass('custom-card')
    expect(screen.getByTestId('card-header')).toHaveClass('custom-header')
    expect(screen.getByText('タイトル')).toHaveClass('custom-title')
    expect(screen.getByText('説明文')).toHaveClass('custom-description')
    expect(screen.getByTestId('card-content')).toHaveClass('custom-content')
    expect(screen.getByTestId('card-footer')).toHaveClass('custom-footer')
  })

  it('カードが正しい順序で要素を表示すること', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>タイトル</CardTitle>
          <CardDescription>説明文</CardDescription>
        </CardHeader>
        <CardContent>コンテンツ1</CardContent>
        <CardContent>コンテンツ2</CardContent>
        <CardFooter>フッター</CardFooter>
      </Card>
    )

    const elements = screen.getAllByTestId(/^card/)
    expect(elements[0]).toHaveAttribute('data-testid', 'card')
    expect(elements[1]).toHaveAttribute('data-testid', 'card-header')
    expect(elements[2]).toHaveAttribute('data-testid', 'card-content')
    expect(elements[3]).toHaveAttribute('data-testid', 'card-content')
    expect(elements[4]).toHaveAttribute('data-testid', 'card-footer')
  })

  it('カードがアクセシブルであること', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>タイトル</CardTitle>
          <CardDescription>説明文</CardDescription>
        </CardHeader>
        <CardContent>コンテンツ</CardContent>
        <CardFooter>フッター</CardFooter>
      </Card>
    )

    expect(screen.getByRole('heading', { name: 'タイトル' })).toBeInTheDocument()
    expect(screen.getByText('説明文')).toHaveAttribute('aria-description')
  })

  it('カードが任意の子要素を受け入れること', () => {
    render(
      <Card>
        <CardContent>
          <button>ボタン</button>
          <input type="text" placeholder="入力欄" />
          <img src="test.jpg" alt="テスト画像" />
        </CardContent>
      </Card>
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('入力欄')).toBeInTheDocument()
    expect(screen.getByAltText('テスト画像')).toBeInTheDocument()
  })
}) 