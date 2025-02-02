/**
 * @file Sliderコンポーネントのテスト
 * @description Sliderコンポーネントの機能とアクセシビリティをテスト
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Slider } from '.'

describe('Slider', () => {
  it('デフォルト値が正しく設定されること', () => {
    render(<Slider defaultValue={[50]} />)
    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('aria-valuenow', '50')
  })

  it('サイズバリアントが適用されること', () => {
    render(<Slider size="sm" defaultValue={[50]} />)
    const root = screen.getByRole('slider').parentElement?.parentElement
    expect(root).toHaveClass('h-4')
  })

  it('無効化された状態が正しく表示されること', () => {
    render(<Slider disabled defaultValue={[50]} />)
    const root = screen.getByRole('slider').parentElement?.parentElement
    expect(root).toHaveClass('disabled:pointer-events-none disabled:opacity-50')
  })

  it('値の変更イベントが発火すること', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    
    render(<Slider defaultValue={[0]} onValueChange={onValueChange} />)
    const slider = screen.getByRole('slider')
    
    // sliderにフォーカスを与えて、キーボード操作で値を変更する
    slider.focus()
    await user.keyboard('{ArrowRight}')
    
    expect(onValueChange).toHaveBeenCalled()
  })
}) 