/**
 * @file Toggleコンポーネントのテスト
 * @description Toggleコンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import { Toggle } from './toggle'
import userEvent from '@testing-library/user-event'

describe('Toggle', () => {
  describe('基本機能テスト', () => {
    it('基本的なトグルが正しくレンダリングされること', () => {
      render(
        <Toggle aria-label="太字">
          <span>B</span>
        </Toggle>
      )
      
      const toggle = screen.getByRole('button', { pressed: false })
      expect(toggle).toBeInTheDocument()
      expect(toggle).toHaveTextContent('B')
    })

    it('デフォルトで押された状態でレンダリングされること', () => {
      render(
        <Toggle defaultPressed aria-label="太字">
          <span>B</span>
        </Toggle>
      )
      
      const toggle = screen.getByRole('button')
      expect(toggle).toHaveAttribute('aria-pressed', 'true')
    })

    it('クリックでトグルが正しく動作すること', async () => {
      const user = userEvent.setup()
      const onPressedChange = vi.fn()

      render(
        <Toggle
          aria-label="太字"
          onPressedChange={onPressedChange}
        >
          <span>B</span>
        </Toggle>
      )
      
      const toggle = screen.getByRole('button')
      await user.click(toggle)
      expect(onPressedChange).toHaveBeenCalledWith(true)
    })
  })

  describe('アクセシビリティテスト', () => {
    it('適切なARIA属性が設定されていること', () => {
      render(
        <Toggle
          aria-label="太字"
          aria-controls="text-editor"
        >
          <span>B</span>
        </Toggle>
      )
      
      const toggle = screen.getByRole('button')
      expect(toggle).toHaveAttribute('aria-label', '太字')
      expect(toggle).toHaveAttribute('aria-controls', 'text-editor')
      expect(toggle).toHaveAttribute('type', 'button')
    })

    it('キーボード操作が正しく動作すること', async () => {
      const user = userEvent.setup()
      const onPressedChange = vi.fn()

      render(
        <Toggle
          aria-label="太字"
          onPressedChange={onPressedChange}
        >
          <span>B</span>
        </Toggle>
      )
      
      const toggle = screen.getByRole('button')
      await user.tab()
      expect(toggle).toHaveFocus()
      
      await user.keyboard('[Space]')
      expect(onPressedChange).toHaveBeenCalledWith(true)
    })
  })

  describe('スタイルテスト', () => {
    it('デフォルトのスタイルが適用されること', () => {
      render(
        <Toggle aria-label="太字">
          <span>B</span>
        </Toggle>
      )
      
      const toggle = screen.getByRole('button')
      expect(toggle).toHaveClass('inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground')
    })

    it('カスタムクラスが適用できること', () => {
      render(
        <Toggle
          className="custom-toggle"
          aria-label="太字"
        >
          <span>B</span>
        </Toggle>
      )
      
      const toggle = screen.getByRole('button')
      expect(toggle).toHaveClass('custom-toggle')
    })

    it('サイズバリアントが正しく適用されること', () => {
      render(
        <Toggle
          size="sm"
          aria-label="太字"
        >
          <span>B</span>
        </Toggle>
      )
      
      const toggle = screen.getByRole('button')
      expect(toggle).toHaveClass('h-9 px-3')
    })
  })

  describe('エッジケーステスト', () => {
    it('無効状態が正しく表示されること', () => {
      render(
        <Toggle
          disabled
          aria-label="太字"
        >
          <span>B</span>
        </Toggle>
      )
      
      const toggle = screen.getByRole('button')
      expect(toggle).toBeDisabled()
      expect(toggle).toHaveClass('disabled:pointer-events-none disabled:opacity-50')
    })

    it('長いコンテンツが正しく表示されること', () => {
      const longText = 'a'.repeat(20)
      render(
        <Toggle aria-label="長いテキスト">
          {longText}
        </Toggle>
      )
      
      expect(screen.getByText(longText)).toBeInTheDocument()
    })
  })

  describe('コンテキストテスト', () => {
    it('ツールバー内でのトグルが正しく動作すること', () => {
      render(
        <div role="toolbar" aria-label="テキストフォーマット">
          <Toggle
            aria-label="太字"
            pressed
          >
            <span>B</span>
          </Toggle>
          <Toggle
            aria-label="斜体"
          >
            <span>I</span>
          </Toggle>
        </div>
      )
      
      const toolbar = screen.getByRole('toolbar')
      const toggles = screen.getAllByRole('button')
      
      expect(toolbar).toBeInTheDocument()
      expect(toggles).toHaveLength(2)
      expect(toggles[0]).toHaveAttribute('aria-pressed', 'true')
      expect(toggles[1]).toHaveAttribute('aria-pressed', 'false')
    })

    it('グループ内でのトグルが正しく動作すること', async () => {
      const user = userEvent.setup()
      const onPressedChange = vi.fn()

      render(
        <div role="group" aria-label="テキストアライメント">
          <Toggle
            aria-label="左揃え"
            onPressedChange={onPressedChange}
          >
            左
          </Toggle>
          <Toggle
            aria-label="中央揃え"
            onPressedChange={onPressedChange}
          >
            中
          </Toggle>
        </div>
      )
      
      const toggles = screen.getAllByRole('button')
      await user.click(toggles[0])
      expect(onPressedChange).toHaveBeenCalledWith(true)
      
      await user.click(toggles[1])
      expect(onPressedChange).toHaveBeenCalledWith(true)
    })
  })
}) 