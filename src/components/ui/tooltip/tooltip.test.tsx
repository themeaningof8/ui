/**
 * @file Tooltipコンポーネントのテスト
 * @description Tooltipコンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip'
import userEvent from '@testing-library/user-event'

describe('Tooltip', () => {
  describe('基本機能テスト', () => {
    it('基本的なツールチップが正しくレンダリングされること', () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>ホバーしてください</TooltipTrigger>
            <TooltipContent>ツールチップの内容</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      const trigger = screen.getByText('ホバーしてください')
      expect(trigger).toBeInTheDocument()
    })

    it('ホバー時にツールチップが表示されること', async () => {
      const user = userEvent.setup()

      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>ホバーしてください</TooltipTrigger>
            <TooltipContent>ツールチップの内容</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      const trigger = screen.getByText('ホバーしてください')
      await user.hover(trigger)
      
      expect(await screen.findByText('ツールチップの内容')).toBeInTheDocument()
    })

    it('マウスが離れるとツールチップが非表示になること', async () => {
      const user = userEvent.setup()

      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>ホバーしてください</TooltipTrigger>
            <TooltipContent>ツールチップの内容</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      const trigger = screen.getByText('ホバーしてください')
      await user.hover(trigger)
      await user.unhover(trigger)
      
      // ツールチップが非表示になるのを待つ
      await new Promise(resolve => setTimeout(resolve, 300))
      expect(screen.queryByText('ツールチップの内容')).not.toBeInTheDocument()
    })
  })

  describe('アクセシビリティテスト', () => {
    it('適切なARIA属性が設定されていること', async () => {
      const user = userEvent.setup()

      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger aria-label="ヘルプ">?</TooltipTrigger>
            <TooltipContent>ヘルプ情報</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      const trigger = screen.getByLabelText('ヘルプ')
      await user.hover(trigger)
      
      const tooltip = await screen.findByRole('tooltip')
      expect(tooltip).toHaveAttribute('role', 'tooltip')
      expect(trigger).toHaveAttribute('aria-describedby', tooltip.id)
    })

    it('キーボード操作が正しく動作すること', async () => {
      const user = userEvent.setup()

      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Tab キーで移動</TooltipTrigger>
            <TooltipContent>ツールチップの内容</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      await user.tab()
      const trigger = screen.getByText('Tab キーで移動')
      expect(trigger).toHaveFocus()
      
      // フォーカス時にツールチップが表示されることを確認
      expect(await screen.findByText('ツールチップの内容')).toBeInTheDocument()
    })
  })

  describe('スタイルテスト', () => {
    it('デフォルトのスタイルが適用されること', async () => {
      const user = userEvent.setup()

      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>ホバーしてください</TooltipTrigger>
            <TooltipContent>ツールチップの内容</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      const trigger = screen.getByText('ホバーしてください')
      await user.hover(trigger)
      
      const tooltip = await screen.findByRole('tooltip')
      expect(tooltip).toHaveClass('z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2')
    })

    it('カスタムクラスが適用できること', async () => {
      const user = userEvent.setup()

      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>ホバーしてください</TooltipTrigger>
            <TooltipContent className="custom-tooltip">
              ツールチップの内容
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      const trigger = screen.getByText('ホバーしてください')
      await user.hover(trigger)
      
      const tooltip = await screen.findByRole('tooltip')
      expect(tooltip).toHaveClass('custom-tooltip')
    })
  })

  describe('エッジケーステスト', () => {
    it('長いコンテンツが正しく表示されること', async () => {
      const user = userEvent.setup()
      const longText = 'a'.repeat(100)

      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>ホバーしてください</TooltipTrigger>
            <TooltipContent>{longText}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      const trigger = screen.getByText('ホバーしてください')
      await user.hover(trigger)
      
      expect(await screen.findByText(longText)).toBeInTheDocument()
    })

    it('無効状態のトリガーでツールチップが表示されないこと', async () => {
      const user = userEvent.setup()

      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger disabled>ホバーしてください</TooltipTrigger>
            <TooltipContent>ツールチップの内容</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      const trigger = screen.getByText('ホバーしてください')
      await user.hover(trigger)
      
      expect(screen.queryByText('ツールチップの内容')).not.toBeInTheDocument()
    })
  })

  describe('コンテキストテスト', () => {
    it('複数のツールチップが正しく動作すること', async () => {
      const user = userEvent.setup()

      render(
        <TooltipProvider>
          <div className="flex space-x-4">
            <Tooltip>
              <TooltipTrigger>トリガー1</TooltipTrigger>
              <TooltipContent>内容1</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>トリガー2</TooltipTrigger>
              <TooltipContent>内容2</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      )
      
      const trigger1 = screen.getByText('トリガー1')
      const trigger2 = screen.getByText('トリガー2')
      
      await user.hover(trigger1)
      expect(await screen.findByText('内容1')).toBeInTheDocument()
      
      await user.hover(trigger2)
      expect(await screen.findByText('内容2')).toBeInTheDocument()
      expect(screen.queryByText('内容1')).not.toBeInTheDocument()
    })

    it('ツールチップ内のインタラクティブな要素が正しく動作すること', async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()

      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>ホバーしてください</TooltipTrigger>
            <TooltipContent>
              <button type="button" onClick={onClick}>
                クリックしてください
              </button>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      const trigger = screen.getByText('ホバーしてください')
      await user.hover(trigger)
      
      const button = await screen.findByRole('button')
      await user.click(button)
      expect(onClick).toHaveBeenCalled()
    })
  })
}) 