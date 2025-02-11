/**
 * @file Buttonコンポーネントのテスト
 * @description Buttonコンポーネントの機能、バリアント、アクセシビリティをテストします
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@/tests/test-utils'
import { userEvent } from '@testing-library/user-event'
import { Button, buttonVariants } from '.'
import { cn } from '@/lib/utils'

describe('Button', () => {
  describe('基本機能テスト', () => {
    it('デフォルトボタンが正しくレンダリングされること', () => {
      render(<Button>クリックしてください</Button>)
      const button = screen.getByRole('button', { name: 'クリックしてください' })
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('type', 'button')
    })

    it('クリックイベントが正しく発火すること', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      
      render(<Button onClick={handleClick}>クリックしてください</Button>)
      
      const button = screen.getByRole('button', { name: 'クリックしてください' })
      await user.click(button)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('disabled状態で正しく動作すること', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      
      render(<Button disabled onClick={handleClick}>無効なボタン</Button>)
      
      const button = screen.getByRole('button', { name: '無効なボタン' })
      await user.click(button)
      
      expect(handleClick).not.toHaveBeenCalled()
      expect(button).toBeDisabled()
    })

    it('ローディング表示が正しく動作すること', () => {
      render(<Button isLoading>読み込み中...</Button>)
      const button = screen.getByRole('button', { name: '読み込み中...' })
      expect(button).toBeInTheDocument()
      expect(button).toBeDisabled()
    })

    it('aria属性が正しく設定されること', () => {
      render(<Button aria-label="カスタムボタン">クリック</Button>)
      const button = screen.getByRole('button', { name: 'カスタムボタン' })
      expect(button).toHaveAttribute('aria-label', 'カスタムボタン')
    })

    it('キーボード操作で正しく動作すること', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      
      render(<Button onClick={handleClick}>キーボードテスト</Button>)
      
      const button = screen.getByRole('button')
      await user.tab()
      expect(button).toHaveFocus()
      
      await user.keyboard('[Enter]')
      expect(handleClick).toHaveBeenCalledTimes(1)
      
      await user.keyboard('[Space]')
      expect(handleClick).toHaveBeenCalledTimes(2)
    })
  })

  describe('エラー処理テスト', () => {
    it('非同期クリックハンドラーでエラーが発生した場合も適切に処理されること', async () => {
      const user = userEvent.setup()
      const errorMessage = 'テストエラー'
      const handleAsyncClick = vi.fn().mockRejectedValue(new Error(errorMessage))
      const originalConsoleError = console.error
      const consoleSpy = vi.fn()
      console.error = consoleSpy

      render(<Button onClick={handleAsyncClick}>エラーテスト</Button>)
      
      const button = screen.getByRole('button', { name: 'エラーテスト' })
      await user.click(button)

      await waitFor(() => {
        expect(handleAsyncClick).toHaveBeenCalledTimes(1)
        expect(consoleSpy).toHaveBeenCalledWith(
          'Button click error:',
          expect.any(Error)
        )
      })
      
      console.error = originalConsoleError
    })
  })

  describe('バリアントテスト', () => {
    it('デフォルトバリアントが正しく適用されること', () => {
      render(<Button>デフォルト</Button>)
      const button = screen.getByRole('button')
      const expectedClasses = cn(
        buttonVariants({
          variant: 'default',
          size: 'default'
        })
      )
      expect(button.className).toBe(expectedClasses)
    })

    it('destructiveバリアントが正しく適用されること', () => {
      render(<Button variant="destructive">デストラクティブ</Button>)
      const button = screen.getByRole('button')
      const expectedClasses = cn(
        buttonVariants({
          variant: 'destructive',
          size: 'default'
        })
      )
      expect(button.className).toBe(expectedClasses)
    })

    it('outlineバリアントが正しく適用されること', () => {
      render(<Button variant="outline">アウトライン</Button>)
      const button = screen.getByRole('button')
      const expectedClasses = cn(
        buttonVariants({
          variant: 'outline',
          size: 'default'
        })
      )
      expect(button.className).toBe(expectedClasses)
    })

    it('secondaryバリアントが正しく適用されること', () => {
      render(<Button variant="secondary">セカンダリ</Button>)
      const button = screen.getByRole('button')
      const expectedClasses = cn(
        buttonVariants({
          variant: 'secondary',
          size: 'default'
        })
      )
      expect(button.className).toBe(expectedClasses)
    })

    it('ghostバリアントが正しく適用されること', () => {
      render(<Button variant="ghost">ゴースト</Button>)
      const button = screen.getByRole('button')
      const expectedClasses = cn(
        buttonVariants({
          variant: 'ghost',
          size: 'default'
        })
      )
      expect(button.className).toBe(expectedClasses)
    })

    it('linkバリアントが正しく適用されること', () => {
      render(<Button variant="link">リンク</Button>)
      const button = screen.getByRole('button')
      const expectedClasses = cn(
        buttonVariants({
          variant: 'link',
          size: 'default'
        })
      )
      expect(button.className).toBe(expectedClasses)
    })

    it('サイズバリアントが正しく適用されること', () => {
      const sizes = ['sm', 'default', 'lg', 'icon'] as const
      const { rerender } = render(<Button>サイズテスト</Button>)

      for (const size of sizes) {
        rerender(<Button size={size}>サイズテスト</Button>)
        const button = screen.getByRole('button')
        const expectedClasses = cn(
          buttonVariants({
            size,
            variant: 'default'
          })
        )
        expect(button.className).toBe(expectedClasses)
      }
    })

    it('カスタムクラスが正しく適用されること', () => {
      const customClass = 'custom-class'
      render(<Button className={customClass}>カスタム</Button>)
      const button = screen.getByRole('button')
      const expectedClasses = cn(
        buttonVariants({
          variant: 'default',
          size: 'default'
        }),
        customClass
      )
      expect(button.className).toBe(expectedClasses)
    })

    it('複数のバリアントとカスタムクラスが組み合わせられること', () => {
      const customClass = 'custom-class'
      render(
        <Button
          variant="outline"
          size="lg"
          className={customClass}
        >
          組み合わせ
        </Button>
      )
      const button = screen.getByRole('button')
      const expectedClasses = cn(
        buttonVariants({
          variant: 'outline',
          size: 'lg'
        }),
        customClass
      )
      expect(button.className).toBe(expectedClasses)
    })
  })
}) 