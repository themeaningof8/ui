/**
 * @file Collapsibleコンポーネントのテスト
 * @description Collapsibleコンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@/tests/test-utils'
import { userEvent } from '@testing-library/user-event'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '.'

describe('Collapsible', () => {
  describe('基本機能テスト', () => {
    it('開閉できること', () => {
      render(
        <Collapsible>
          <CollapsibleTrigger>開閉トリガー</CollapsibleTrigger>
          <CollapsibleContent>コンテンツ</CollapsibleContent>
        </Collapsible>
      )

      const trigger = screen.getByText('開閉トリガー')
      const content = screen.getByText('コンテンツ')

      // 初期状態では非表示
      expect(content).not.toBeVisible()

      // トリガーをクリックして開く
      fireEvent.click(trigger)
      expect(content).toBeVisible()

      // もう一度クリックして閉じる
      fireEvent.click(trigger)
      expect(content).not.toBeVisible()
    })

    it('初期表示状態を指定できること', () => {
      render(
        <Collapsible defaultOpen>
          <CollapsibleTrigger>開閉トリガー</CollapsibleTrigger>
          <CollapsibleContent>コンテンツ</CollapsibleContent>
        </Collapsible>
      )

      const content = screen.getByText('コンテンツ')
      expect(content).toBeVisible()
    })

    it('onOpenChangeイベントが正しく発火すること', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      
      render(
        < Collapsible onOpenChange={onOpenChange}>
          <CollapsibleTrigger>
            <button type="button">開閉</button >
          </CollapsibleTrigger>
          <CollapsibleContent>コンテンツ</CollapsibleContent>
        </Collapsible>
      )

      await user.click(screen.getByRole('button'))
      expect(onOpenChange).toHaveBeenCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(true)

      await user.click(screen.getByRole('button'))
      expect(onOpenChange).toHaveBeenCalledTimes(2)
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })
  })

  describe('アクセシビリティテスト', () => {
    it('トリガーボタンにaria-controls属性が正しく設定されていること', async () => {
      const user = userEvent.setup()
      
      render(
        <Collapsible>
          <CollapsibleTrigger>
            <button type="button">開閉</button >
          </CollapsibleTrigger>
          <CollapsibleContent>コンテンツ</CollapsibleContent>
        </Collapsible>
      )

      const triggerButton = screen.getByRole('button')
      const content = screen.getByText('コンテンツ').parentElement

      expect(triggerButton).toHaveAttribute('aria-controls', content?.id)

      await user.click(triggerButton)
      await waitFor(() => {
        expect(triggerButton).toHaveAttribute('aria-expanded', 'true')
      })

      await user.click(triggerButton)
      await waitFor(() => {
        expect(triggerButton).toHaveAttribute('aria-expanded', 'false')
      })
    })
  })

  describe('スタイルテスト', () => {
    it('カスタムクラスが適用できること', () => {
      render(
        <Collapsible className="custom-collapsible">
          <CollapsibleTrigger className="custom-trigger">開閉トリガー</CollapsibleTrigger>
          <CollapsibleContent className="custom-content">コンテンツ</CollapsibleContent>
        </Collapsible>
      )

      expect(screen.getByRole('button').closest('div')).toHaveClass('custom-collapsible')
      expect(screen.getByText('開閉トリガー')).toHaveClass('custom-trigger')
      expect(screen.getByText('コンテンツ').parentElement).toHaveClass('custom-content')
    })
  })
}) 