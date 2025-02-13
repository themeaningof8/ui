/**
 * @file スライダーコンポーネントのテスト
 * @description スライダーコンポーネントの機能をテストします
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Slider } from '.'

describe('Sliderコンポーネント', () => {
  const user = userEvent.setup()

  it('スライダーが正しくレンダリングされること', () => {
    render(<Slider defaultValue={[50]} max={100} step={1} />)
    expect(screen.getByTestId('slider-thumb-0')).toBeInTheDocument()
    expect(screen.getByTestId('slider-track')).toBeInTheDocument()
    expect(screen.getByTestId('slider-range')).toBeInTheDocument()
  })

  it('カスタムクラス名が正しく適用されること', () => {
    const customClass = 'custom-class'
    render(<Slider defaultValue={[50]} max={100} step={1} className={customClass} />)
    expect(screen.getByTestId('slider-root')).toHaveClass(customClass)
  })

  it('値の変更が正しく処理されること', async () => {
    const onValueChange = vi.fn()
    render(
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        onValueChange={onValueChange}
      />
    )

    const slider = screen.getByTestId('slider-thumb-0')
    await user.click(slider)
    await user.keyboard('[ArrowRight]')
    expect(onValueChange).toHaveBeenCalled()
  })

  it('最小値と最大値が正しく設定されること', () => {
    render(<Slider defaultValue={[50]} min={0} max={100} step={1} />)
    
    const slider = screen.getByTestId('slider-thumb-0')
    expect(slider).toHaveAttribute('aria-valuemin', '0')
    expect(slider).toHaveAttribute('aria-valuemax', '100')
    expect(slider).toHaveAttribute('aria-valuenow', '50')
  })

  it('ステップ値が正しく処理されること', () => {
    render(
      <Slider defaultValue={[50]} max={100} step={10} />
    )
    
    const slider = screen.getByTestId('slider-thumb-0')
    expect(slider).toHaveAttribute('aria-valuenow', '50')
  })

  it('無効状態が正しく処理されること', () => {
    render(<Slider defaultValue={[50]} max={100} step={1} disabled />)
    const root = screen.getByTestId('slider-root')
    expect(root).toHaveAttribute('data-disabled')
    const thumb = screen.getByTestId('slider-thumb-0')
    expect(thumb).toHaveClass('disabled:pointer-events-none')
    expect(thumb).toHaveClass('disabled:opacity-50')
  })

  it('トラックとレンジが正しくレンダリングされること', () => {
    render(
      <Slider defaultValue={[50]} max={100} step={1} />
    )
    
    const track = screen.getByTestId('slider-track')
    const range = screen.getByTestId('slider-range')
    
    expect(track).toBeInTheDocument()
    expect(range).toBeInTheDocument()
    expect(track).toHaveClass('relative')
    expect(range).toHaveClass('absolute')
  })

  it('複数のつまみが正しく処理されること', () => {
    render(
      <Slider defaultValue={[25, 75]} max={100} step={1} />
    )
    
    const thumb1 = screen.getByTestId('slider-thumb-0')
    const thumb2 = screen.getByTestId('slider-thumb-1')
    expect(thumb1).toHaveAttribute('aria-valuenow', '25')
    expect(thumb2).toHaveAttribute('aria-valuenow', '75')
  })

  it('クリックで値が更新されること', async () => {
    const onValueChange = vi.fn()
    render(
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        onValueChange={onValueChange}
      />
    )
    const track = screen.getByTestId('slider-track')
    await user.click(track)
    expect(onValueChange).toHaveBeenCalled()
  })
}) 