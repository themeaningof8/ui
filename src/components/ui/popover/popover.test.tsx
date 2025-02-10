/**
 * @file Popoverコンポーネントのテスト
 * @description Popover関連コンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@/tests/test-utils'
import { userEvent } from '@testing-library/user-event'
import {
   Popover, PopoverTrigger, PopoverContent, PopoverAnchor
} from '.'

describe('Popover', () => {
  describe('基本機能テスト', () => {
    it('基本的なポップオーバーが正しくレンダリングされること', () => {
      render(
        <Popover>
          <PopoverTrigger>クリックしてください</PopoverTrigger>
          <PopoverContent>
            <p>ポップオーバーの内容</p>
            <PopoverAnchor>閉じる</PopoverAnchor>
          </PopoverContent>
        </Popover>
      )

      expect(screen.getByText('クリックしてください')).toBeInTheDocument()
    })

    it('トリガーをクリックするとコンテンツが表示されること', async () => {
      const user = userEvent.setup()
      
      render(
        <Popover>
          <PopoverTrigger>クリックしてください</PopoverTrigger>
          <PopoverContent>
            <p>ポップオーバーの内容</p>
          </PopoverContent>
        </Popover>
      )

      const trigger = screen.getByText('クリックしてください')
      await user.click(trigger)

      await waitFor(() => {
        expect(screen.getByText('ポップオーバーの内容')).toBeVisible()
      })
    })

    it('閉じるボタンをクリックするとポップオーバーが閉じること', async () => {
      const user = userEvent.setup()
      
      render(
        <Popover>
          <PopoverTrigger>クリックしてください</PopoverTrigger>
          <PopoverContent>
            <p>ポップオーバーの内容</p>
            <PopoverAnchor>閉じる</PopoverAnchor>
          </PopoverContent>
        </Popover>
      )

      // ポップオーバーを開く
      const trigger = screen.getByText('クリックしてください')
      await user.click(trigger)

      // 閉じるボタンをクリック
      const closeButton = screen.getByText('閉じる')
      await user.click(closeButton)

      await waitFor(() => {
        expect(screen.queryByText('ポップオーバーの内容')).not.toBeVisible()
      })
    })
  })

  describe('アクセシビリティテスト', () => {
    it('適切なARIA属性が設定されていること', async () => {
      const user = userEvent.setup()
      
      render(
        <Popover>
          <PopoverTrigger>クリックしてください</PopoverTrigger>
          <PopoverContent>
            <p>ポップオーバーの内容</p>
          </PopoverContent>
        </Popover>
      )

      const trigger = screen.getByRole('button')
      expect(trigger).toHaveAttribute('aria-expanded', 'false')

      await user.click(trigger)

      await waitFor(() => {
        const content = screen.getByRole('dialog')
        expect(content).toHaveAttribute('aria-modal', 'true')
        expect(trigger).toHaveAttribute('aria-expanded', 'true')
      })
    })

    it('キーボード操作が正しく機能すること', async () => {
      const user = userEvent.setup()
      
      render(
        <Popover>
          <PopoverTrigger>クリックしてください</PopoverTrigger>
          <PopoverContent>
            <p>ポップオーバーの内容</p>
            <PopoverAnchor>閉じる</PopoverAnchor>
          </PopoverContent>
        </Popover>
      )

      // Tabキーでフォーカス
      await user.tab()
      expect(screen.getByText('クリックしてください')).toHaveFocus()

      // Enterキーで開く
      await user.keyboard('{Enter}')
      await waitFor(() => {
        expect(screen.getByText('ポップオーバーの内容')).toBeVisible()
      })

      // Escapeキーで閉じる
      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByText('ポップオーバーの内容')).not.toBeVisible()
      })
    })
  })

  describe('スタイルテスト', () => {
    it('カスタムクラスが適用できること', async () => {
      const user = userEvent.setup()
      
      render(
        <Popover>
          <PopoverTrigger className="custom-trigger">クリックしてください</PopoverTrigger>
          <PopoverContent className="custom-content">
            <p>ポップオーバーの内容</p>
          </PopoverContent>
        </Popover>
      )

      expect(screen.getByText('クリックしてください')).toHaveClass('custom-trigger')

      await user.click(screen.getByText('クリックしてください'))

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toHaveClass('custom-content')
      })
    })

    it('サイドとアラインメントが正しく適用されること', async () => {
      const user = userEvent.setup()
      
      render(
        <Popover>
          <PopoverTrigger>クリックしてください</PopoverTrigger>
          <PopoverContent side="right" align="start">
            <p>ポップオーバーの内容</p>
          </PopoverContent>
        </Popover>
      )

      await user.click(screen.getByText('クリックしてください'))

      await waitFor(() => {
        const content = screen.getByRole('dialog')
        expect(content).toHaveAttribute('data-side', 'right')
        expect(content).toHaveAttribute('data-align', 'start')
      })
    })
  })
}) 