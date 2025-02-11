/**
 * @file Alertコンポーネントのテスト
 * @description Alertコンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import { Alert, AlertTitle, AlertDescription, alertVariants } from '.'
import { cn } from '@/lib/utils'

describe('Alert', () => {
  describe('基本レンダリングテスト', () => {
    it('基本的なアラートが正しくレンダリングされること', () => {
      render(
        <Alert>
          <AlertTitle>アラートのタイトル</AlertTitle>
          <AlertDescription>アラートの説明文</AlertDescription>
        </Alert>
      )

      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByText('アラートのタイトル')).toBeInTheDocument()
      expect(screen.getByText('アラートの説明文')).toBeInTheDocument()
    })

    it('アイコン付きのアラートが正しくレンダリングされること', () => {
      render(
        <Alert>
          <span className="h-4 w-4" aria-hidden="true">⚠️</span>
          <AlertTitle>警告</AlertTitle>
          <AlertDescription>重要な警告メッセージです</AlertDescription>
        </Alert>
      )

      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByText('⚠️')).toBeInTheDocument()
    })
  })

  describe('バリアントテスト', () => {
    it('各バリアントが正しく適用されること', () => {
      const variants = ['default', 'destructive'] as const
      
      for (const variant of variants) {
        const { rerender } = render(
          <Alert variant={variant}>
            <AlertTitle>テストアラート</AlertTitle>
          </Alert>
        )

        const alert = screen.getByRole('alert')
        const expectedClasses = cn(alertVariants({ variant }))
        const actualClasses = cn(alert.className)

        expect(actualClasses).toBe(expectedClasses)

        rerender(<div />)
      }
    })
  })

  describe('アクセシビリティテスト', () => {
    it('適切なARIA属性が設定されていること', () => {
      render(
        <Alert>
          <AlertTitle>アクセシビリティテスト</AlertTitle>
          <AlertDescription>アラートのアクセシビリティをテストします</AlertDescription>
        </Alert>
      )

      const alert = screen.getByRole('alert')
      expect(alert).toHaveAttribute('role', 'alert')
      expect(alert).toHaveAttribute('aria-live', 'polite')
    })

    it('カスタムのARIA属性が設定できること', () => {
      render(
        <Alert aria-label="カスタムラベル" aria-describedby="custom-desc">
          <AlertTitle>カスタム属性テスト</AlertTitle>
          <AlertDescription id="custom-desc">カスタム説明文</AlertDescription>
        </Alert>
      )

      const alert = screen.getByRole('alert')
      expect(alert).toHaveAttribute('aria-label', 'カスタムラベル')
      expect(alert).toHaveAttribute('aria-describedby', 'custom-desc')
    })
  })

  describe('スタイルテスト', () => {
    it('デフォルトのスタイルが適用されていること', () => {
      render(
        <Alert>
          <AlertTitle>スタイルテスト</AlertTitle>
        </Alert>
      )

      const alert = screen.getByRole('alert')
      expect(alert).toHaveClass('relative w-full rounded-lg border px-4 py-3')
    })

    it('カスタムクラスが適用できること', () => {
      render(
        <Alert className="custom-alert">
          <AlertTitle className="custom-title">タイトル</AlertTitle>
          <AlertDescription className="custom-description">説明文</AlertDescription>
        </Alert>
      )

      expect(screen.getByRole('alert')).toHaveClass('custom-alert')
      expect(screen.getByText('タイトル')).toHaveClass('custom-title')
      expect(screen.getByText('説明文')).toHaveClass('custom-description')
    })
  })

  describe('動的コンテンツテスト', () => {
    it('動的に内容を更新できること', () => {
      const { rerender } = render(
        <Alert>
          <AlertTitle>初期タイトル</AlertTitle>
          <AlertDescription>初期説明</AlertDescription>
        </Alert>
      )

      expect(screen.getByText('初期タイトル')).toBeInTheDocument()

      rerender(
        <Alert>
          <AlertTitle>更新後のタイトル</AlertTitle>
          <AlertDescription>更新後の説明</AlertDescription>
        </Alert>
      )

      expect(screen.getByText('更新後のタイトル')).toBeInTheDocument()
      expect(screen.getByText('更新後の説明')).toBeInTheDocument()
    })
  })
}) 