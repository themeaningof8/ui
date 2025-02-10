/**
 * @file ScrollAreaコンポーネントのテスト
 * @description ScrollArea関連コンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen, } from '@/tests/test-utils'
import { userEvent } from '@testing-library/user-event'
import {
  ScrollArea,
  ScrollBar,
} from '.'

describe('ScrollArea', () => {
  describe('基本機能テスト', () => {
    it('スクロールエリアが正しくレンダリングされること', () => {
      render(
        <ScrollArea className="h-[200px] w-[350px]">
          <div style={{ height: '500px' }}>
            スクロール可能なコンテンツ
          </div>
        </ScrollArea>
      )

      expect(screen.getByText('スクロール可能なコンテンツ')).toBeInTheDocument()
    })

    it('スクロールバーが表示されること', () => {
      render(
        <ScrollArea className="h-[200px] w-[350px]">
          <div style={{ height: '500px' }}>
            スクロール可能なコンテンツ
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      )

      expect(screen.getByRole('scrollbar')).toBeInTheDocument()
    })

    it('水平スクロールバーが表示されること', () => {
      render(
        <ScrollArea className="h-[200px] w-[350px]">
          <div style={{ width: '500px' }}>
            横にスクロール可能なコンテンツ
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )

      const scrollbar = screen.getByRole('scrollbar')
      expect(scrollbar).toHaveAttribute('aria-orientation', 'horizontal')
    })
  })

  describe('インタラクティブ機能テスト', () => {
    it('スクロールバーをドラッグしてスクロールできること', async () => {
      const user = userEvent.setup()
      
      render(
        <ScrollArea className="h-[200px] w-[350px]">
          <div style={{ height: '500px' }}>
            スクロール可能なコンテンツ
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      )

      const scrollbar = screen.getByRole('scrollbar')
      const thumb = scrollbar.querySelector('[role="thumb"]')

      if (thumb) {
        await user.pointer({ target: thumb, keys: '[MouseLeft>]' })
        await user.pointer({ target: thumb, coords: { x: 0, y: 100 } })
        await user.pointer({ target: thumb, keys: '[/MouseLeft]' })
      }
    })

    it('マウスホイールでスクロールできること', async () => {
      const user = userEvent.setup()
      
      render(
        <ScrollArea className="h-[200px] w-[350px]">
          <div style={{ height: '500px' }}>
            スクロール可能なコンテンツ
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      )

      const content = screen.getByText('スクロール可能なコンテンツ')
      await user.wheel(content, { deltaY: 100 })
    })
  })

  describe('アクセシビリティテスト', () => {
    it('適切なARIA属性が設定されていること', () => {
      render(
        <ScrollArea className="h-[200px] w-[350px]">
          <div style={{ height: '500px' }}>
            スクロール可能なコンテンツ
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      )

      const scrollbar = screen.getByRole('scrollbar')
      expect(scrollbar).toHaveAttribute('aria-orientation', 'vertical')
      expect(scrollbar).toHaveAttribute('aria-valuemin', '0')
      expect(scrollbar).toHaveAttribute('aria-valuemax', '100')
    })

    it('キーボード操作が正しく機能すること', async () => {
      const user = userEvent.setup()
      
      render(
        <ScrollArea className="h-[200px] w-[350px]">
          <div style={{ height: '500px' }}>
            スクロール可能なコンテンツ
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      )

      const scrollbar = screen.getByRole('scrollbar')
      
      await user.tab()
      expect(scrollbar).toHaveFocus()

      await user.keyboard('{ArrowDown}')
      await user.keyboard('{ArrowUp}')
      await user.keyboard('{PageDown}')
      await user.keyboard('{PageUp}')
      await user.keyboard('{Home}')
      await user.keyboard('{End}')
    })
  })

  describe('スタイルテスト', () => {
    it('カスタムクラスが適用できること', () => {
      render(
        <ScrollArea className="custom-scroll-area">
          <div>コンテンツ</div>
          <ScrollBar className="custom-scrollbar" orientation="vertical" />
        </ScrollArea>
      )

      expect(screen.getByRole('region')).toHaveClass('custom-scroll-area')
      expect(screen.getByRole('scrollbar')).toHaveClass('custom-scrollbar')
    })

    it('スクロールバーの表示/非表示が切り替わること', () => {
      const { rerender } = render(
        <ScrollArea>
          <div style={{ height: '100px' }}>
            スクロール不要なコンテンツ
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      )

      let scrollbar = screen.getByRole('scrollbar')
      expect(scrollbar).toHaveAttribute('data-state', 'hidden')

      rerender(
        <ScrollArea>
          <div style={{ height: '500px' }}>
            スクロール可能なコンテンツ
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      )

      scrollbar = screen.getByRole('scrollbar')
      expect(scrollbar).toHaveAttribute('data-state', 'visible')
    })
  })

  describe('エッジケーステスト', () => {
    it('コンテンツが空の場合でも正しく動作すること', () => {
      render(
        <ScrollArea>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      )

      expect(screen.getByRole('region')).toBeInTheDocument()
    })

    it('大きなコンテンツでも正しく動作すること', () => {
      render(
        <ScrollArea className="h-[200px] w-[350px]">
          <div style={{ height: '10000px' }}>
            非常に長いコンテンツ
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      )

      const scrollbar = screen.getByRole('scrollbar')
      expect(scrollbar).toBeInTheDocument()
      expect(scrollbar).toHaveAttribute('data-state', 'visible')
    })
  })
}) 