/**
 * @file ボタンコンポーネントのテスト
 * @description ボタンコンポーネントの機能をテストします
 */

/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '.'
import { describe, it, expect, vi } from 'vitest'

describe('ボタンコンポーネント', () => {
  it('基本的なボタンが正しくレンダリングされること', () => {
    render(<Button>ボタン</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('variantプロパティが正しく適用されること', () => {
    render(<Button variant="secondary">ボタン</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-step-4')
    expect(button).toHaveClass('text-step-12')
    expect(button).toHaveClass('hover:bg-step-5')
  })

  it('sizeプロパティが正しく適用されること', () => {
    render(<Button size="sm">ボタン</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('h-9')
    expect(button).toHaveClass('px-3')
  })

  it('disabledプロパティが正しく適用されること', () => {
    render(<Button disabled>ボタン</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:pointer-events-none')
    expect(button).toHaveClass('disabled:opacity-50')
  })

  it('カスタムクラス名が正しく適用されること', () => {
    const customClass = 'custom-class'
    render(<Button className={customClass}>ボタン</Button>)
    expect(screen.getByRole('button')).toHaveClass(customClass)
  })

  it('クリックイベントが正しく発火すること', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    
    render(<Button onClick={onClick}>ボタン</Button>)
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(onClick).toHaveBeenCalled()
  })
}) 