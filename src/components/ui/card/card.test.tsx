/**
 * @file カードコンポーネントのテスト
 * @description カードコンポーネントの機能をテストします
 */

/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '.'
import { describe, it, expect } from 'vitest'

describe('Cardコンポーネント', () => {
  it('基本的なカードが正しくレンダリングされること', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>タイトル</CardTitle>
          <CardDescription>説明</CardDescription>
        </CardHeader>
        <CardContent>コンテンツ</CardContent>
        <CardFooter>フッター</CardFooter>
      </Card>
    )

    expect(screen.getByText('タイトル')).toBeInTheDocument()
    expect(screen.getByText('説明')).toBeInTheDocument()
    expect(screen.getByText('コンテンツ')).toBeInTheDocument()
    expect(screen.getByText('フッター')).toBeInTheDocument()
  })

  it('カスタムクラス名が正しく適用されること', () => {
    const customClass = 'custom-class'
    render(
      <Card className={customClass}>
        <CardContent>コンテンツ</CardContent>
      </Card>
    )

    const card = screen.getByText('コンテンツ').closest('.rounded-lg')
    expect(card).toHaveClass(customClass)
  })

  it('カードが正しい順序で要素を表示すること', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>タイトル</CardTitle>
          <CardDescription>説明</CardDescription>
        </CardHeader>
        <CardContent>コンテンツ</CardContent>
        <CardFooter>フッター</CardFooter>
      </Card>
    )

    const card = screen.getByText('タイトル').closest('.rounded-lg')
    const elements = card?.innerHTML || ''
    
    expect(elements.indexOf('タイトル')).toBeLessThan(elements.indexOf('コンテンツ'))
    expect(elements.indexOf('コンテンツ')).toBeLessThan(elements.indexOf('フッター'))
  })

  it('カードのスタイルが正しく適用されること', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>タイトル</CardTitle>
        </CardHeader>
      </Card>
    )

    const title = screen.getByText('タイトル')
    expect(title).toHaveClass('text-2xl')
    expect(title).toHaveClass('font-semibold')
    expect(title).toHaveClass('leading-none')
    expect(title).toHaveClass('tracking-tight')
    expect(title).toHaveClass('text-step-12')
  })

  it('カードがアクセシブルであること', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>タイトル</CardTitle>
          <CardDescription>説明</CardDescription>
        </CardHeader>
        <CardContent>コンテンツ</CardContent>
      </Card>
    )

    const title = screen.getByText('タイトル')
    const description = screen.getByText('説明')
    
    expect(title).toHaveClass('text-2xl', 'font-semibold', 'leading-none', 'tracking-tight', 'text-step-12')
    expect(description).toHaveClass('text-sm', 'text-step-11')
  })

  it('カードが任意の子要素を受け入れること', () => {
    render(
      <Card>
        <div data-testid="custom-element">カスタム要素</div>
      </Card>
    )

    expect(screen.getByTestId('custom-element')).toBeInTheDocument()
  })
}) 