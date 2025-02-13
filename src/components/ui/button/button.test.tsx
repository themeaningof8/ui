/**
 * @file ボタンコンポーネントのテスト
 * @description ボタンコンポーネントの機能をテストします
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '.'

describe('ボタンコンポーネント', () => {
  it('基本的なボタンが正しくレンダリングされること', () => {
    render(<Button>テスト</Button>)
    expect(screen.getByRole('button', { name: 'テスト' })).toBeInTheDocument()
  })

  it('variantプロパティが正しく適用されること', () => {
    render(<Button variant="secondary">セカンダリ</Button>)
    const button = screen.getByRole('button', { name: 'セカンダリ' })
    expect(button).toHaveClass('bg-secondary')
  })

  it('sizeプロパティが正しく適用されること', () => {
    render(<Button size="sm">小さい</Button>)
    const button = screen.getByRole('button', { name: '小さい' })
    expect(button).toHaveClass('h-9 px-3')
  })

  it('disabledプロパティが正しく適用されること', () => {
    render(<Button disabled>無効</Button>)
    const button = screen.getByRole('button', { name: '無効' })
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:pointer-events-none disabled:opacity-50')
  })

  it('カスタムクラス名が正しく適用されること', () => {
    render(<Button className="custom-class">カスタム</Button>)
    const button = screen.getByRole('button', { name: 'カスタム' })
    expect(button).toHaveClass('custom-class')
  })

  it('クリックイベントが正しく発火すること', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>クリック</Button>)
    
    await user.click(screen.getByRole('button', { name: 'クリック' }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
}) 