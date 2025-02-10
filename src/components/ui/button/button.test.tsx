/**
 * @file Buttonコンポーネントのテスト
 * @description Buttonコンポーネントの機能、バリアント、アクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import { userEvent } from '@testing-library/user-event'
import { Button } from '.'

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
      render(<Button isLoading>読み込み中...</Button >)
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
      const errorMessage = 'テストエラー'
      const handleAsyncClick = vi.fn().mockRejectedValue(new Error(errorMessage))
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      render(<Button onClick={handleAsyncClick}>エラーテスト</Button>)
      
      const button = screen.getByRole('button')
      await userEvent.click(button)
      
      expect(handleAsyncClick).toHaveBeenCalledTimes(1)
      expect(consoleSpy).toHaveBeenCalled()
      
      consoleSpy.mockRestore()
    })
  })
}) 