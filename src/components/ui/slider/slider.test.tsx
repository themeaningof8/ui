/**
 * @file Sliderコンポーネントのテスト
 * @description Sliderコンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import { Slider } from '.'
import userEvent from '@testing-library/user-event'

describe('Slider', () => {
  describe('基本機能テスト', () => {
    it('基本的なスライダーが正しくレンダリングされること', () => {
      render(
        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
          aria-label="音量"
        />
      )
      
      const slider = screen.getByRole('slider', { name: '音量' })
      expect(slider).toBeInTheDocument()
      expect(slider).toHaveAttribute('aria-valuenow', '50')
    })

    it('複数のスライダーが正しくレンダリングされること', () => {
      render(
        <Slider
          defaultValue={[25, 75]}
          max={100}
          step={1}
          aria-label="範囲選択"
        />
      )
      
      const sliders = screen.getAllByRole('slider')
      expect(sliders).toHaveLength(2)
      expect(sliders[0]).toHaveAttribute('aria-valuenow', '25')
      expect(sliders[1]).toHaveAttribute('aria-valuenow', '75')
    })

    it('値の変更が正しく動作すること', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      render(
        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
          aria-label="音量"
          onValueChange={onChange}
        />
      )
      
      const slider = screen.getByRole('slider')
      await user.click(slider)
      expect(onChange).toHaveBeenCalled()
    })
  })

  describe('アクセシビリティテスト', () => {
    it('適切なARIA属性が設定されていること', () => {
      render(
        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
          aria-label="音量調整"
        />
      )
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-label', '音量調整')
      expect(slider).toHaveAttribute('aria-valuemin', '0')
      expect(slider).toHaveAttribute('aria-valuemax', '100')
      expect(slider).toHaveAttribute('aria-valuenow', '50')
    })

    it('キーボード操作が正しく動作すること', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      render(
        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
          aria-label="音量"
          onValueChange={onChange}
        />
      )
      
      const slider = screen.getByRole('slider')
      await user.type(slider, '{arrowright}')
      expect(onChange).toHaveBeenCalled()
    })
  })

  describe('スタイルテスト', () => {
    it('デフォルトのスタイルが適用されること', () => {
      render(
        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
        />
      )
      
      const slider = screen.getByRole('slider')
      const track = slider.parentElement
      expect(track).toHaveClass('relative flex w-full touch-none select-none items-center')
    })

    it('カスタムクラスが適用できること', () => {
      render(
        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
          className="custom-slider"
        />
      )
      
      const slider = screen.getByRole('slider')
      const track = slider.parentElement
      expect(track).toHaveClass('custom-slider')
    })
  })

  describe('エッジケーステスト', () => {
    it('最小値と最大値の設定が正しく動作すること', () => {
      render(
        <Slider
          defaultValue={[0]}
          min={-50}
          max={50}
          step={1}
          aria-label="温度"
        />
      )
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuemin', '-50')
      expect(slider).toHaveAttribute('aria-valuemax', '50')
    })

    it('ステップサイズが正しく動作すること', () => {
      render(
        <Slider
          defaultValue={[0]}
          max={100}
          step={10}
          aria-label="ズーム"
        />
      )
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('step', '10')
    })

    it('無効状態が正しく表示されること', () => {
      render(
        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
          disabled
          aria-label="音量"
        />
      )
      
      const slider = screen.getByRole('slider')
      expect(slider).toBeDisabled()
      expect(slider.parentElement).toHaveClass('cursor-not-allowed opacity-50')
    })
  })

  describe('コンテキストテスト', () => {
    it('フォーム内でのスライダーが正しく動作すること', () => {
      render(
        <form>
          <label htmlFor="volume-slider">音量調整</label>
          <Slider
            id="volume-slider"
            defaultValue={[50]}
            max={100}
            step={1}
          />
        </form>
      )
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('id', 'volume-slider')
    })

    it('ラベルとの関連付けが正しく動作すること', () => {
      render(
        <div>
          <label id="volume-label">音量調整</label>
          <Slider
            aria-labelledby="volume-label"
            defaultValue={[50]}
            max={100}
            step={1}
          />
        </div>
      )
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-labelledby', 'volume-label')
    })
  })
}) 