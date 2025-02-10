/**
 * @file Progressコンポーネントのテスト
 * @description Progressコンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import { Progress } from '.'

describe('Progress', () => {
  describe('基本機能テスト', () => {
    it('デフォルトの進捗バーが正しくレンダリングされること', () => {
      render(<Progress value={0} />)
      
      const progress = screen.getByRole('progressbar')
      expect(progress).toBeInTheDocument()
      expect(progress).toHaveAttribute('aria-valuenow', '0')
    })

    it('進捗値が正しく表示されること', () => {
      render(<Progress value={50} />)
      
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('aria-valuenow', '50')
    })

    it('最大値が正しく設定されること', () => {
      render(<Progress value={75} max={200} />)
      
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('aria-valuemax', '200')
      expect(progress).toHaveAttribute('aria-valuenow', '75')
    })
  })

  describe('アクセシビリティテスト', () => {
    it('適切なARIA属性が設定されていること', () => {
      render(<Progress value={30} />)
      
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('aria-valuemin', '0')
      expect(progress).toHaveAttribute('aria-valuemax', '100')
      expect(progress).toHaveAttribute('aria-valuenow', '30')
    })

    it('カスタムラベルが設定できること', () => {
      render(
        <Progress
          value={40}
          aria-label="ダウンロードの進捗状況"
        />
      )
      
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('aria-label', 'ダウンロードの進捗状況')
    })

    it('進捗の説明テキストが設定できること', () => {
      render(
        <Progress
          value={60}
          aria-describedby="progress-description"
        />
      )
      
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('aria-describedby', 'progress-description')
    })
  })

  describe('スタイルテスト', () => {
    it('カスタムクラスが適用できること', () => {
      render(<Progress value={50} className="custom-progress" />)
      
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveClass('custom-progress')
    })

    it('進捗インジケーターのスタイルが正しく適用されること', () => {
      render(<Progress value={50} />)
      
      const indicator = screen.getByRole('progressbar').firstChild
      expect(indicator).toHaveStyle({
        transform: 'translateX(-50%)',
      })
    })
  })

  describe('エッジケーステスト', () => {
    it('0%の進捗が正しく表示されること', () => {
      render(<Progress value={0} />)
      
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('aria-valuenow', '0')
      
      const indicator = progress.firstChild
      expect(indicator).toHaveStyle({
        transform: 'translateX(-100%)',
      })
    })

    it('100%の進捗が正しく表示されること', () => {
      render(<Progress value={100} />)
      
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('aria-valuenow', '100')
      
      const indicator = progress.firstChild
      expect(indicator).toHaveStyle({
        transform: 'translateX(0%)',
      })
    })

    it('最大値を超える値が指定された場合、100%として表示されること', () => {
      render(<Progress value={150} max={100} />)
      
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('aria-valuenow', '100')
    })

    it('負の値が指定された場合、0%として表示されること', () => {
      render(<Progress value={-10} />)
      
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('aria-valuenow', '0')
    })
  })
}) 