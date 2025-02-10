/**
 * @file Cardコンポーネントのテスト
 * @description Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter コンポーネントの機能とアクセシビリティをテストします
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

describe('Card', () => {
  describe('基本レンダリングテスト', () => {
    it('すべてのコンポーネントが正しくレンダリングされること', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>カードのタイトル</CardTitle>
            <CardDescription>カードの説明文</CardDescription>
          </CardHeader>
          <CardContent>カードのコンテンツ</CardContent>
          <CardFooter>カードのフッター</CardFooter>
        </Card>
      )

      expect(screen.getByRole('article')).toBeInTheDocument()
      expect(screen.getByText('カードのタイトル')).toBeInTheDocument()
      expect(screen.getByText('カードの説明文')).toBeInTheDocument()
      expect(screen.getByText('カードのコンテンツ')).toBeInTheDocument()
      expect(screen.getByText('カードのフッター')).toBeInTheDocument()
    })

    it('CardHeader, CardContent, CardFooter がなくても Card がレンダリングできること', () => {
      render(<Card>シンプルなカード</Card>)
      expect(screen.getByText('シンプルなカード')).toBeInTheDocument()
    })
  })

  describe('スタイルテスト', () => {
    it('カスタムクラスが適用できること', () => {
      render(
        <Card className="custom-card">
          <CardHeader className="custom-header">
            <CardTitle className="custom-title">カスタムタイトル</CardTitle>
            <CardDescription className="custom-description">カスタム説明</CardDescription>
          </CardHeader>
          <CardContent className="custom-content">カスタムコンテンツ</CardContent>
          <CardFooter className="custom-footer">カスタムフッター</CardFooter>
        </Card>
      )

      expect(screen.getByRole('article')).toHaveClass('custom-card')
      expect(screen.getByText('カスタムタイトル').parentElement).toHaveClass('custom-header')
      expect(screen.getByText('カスタムタイトル')).toHaveClass('custom-title')
      expect(screen.getByText('カスタム説明')).toHaveClass('custom-description')
      expect(screen.getByText('カスタムコンテンツ')).toHaveClass('custom-content')
      expect(screen.getByText('カスタムフッター')).toHaveClass('custom-footer')
    })
  })
}) 