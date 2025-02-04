/**
 * @file Accordionのテスト
 * @description Accordionの機能とアクセシビリティテスト
 */

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { runAccessibilityTest } from '@/tests/wcag3/helpers'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const TestAccordion = () => (
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>セクション1</AccordionTrigger>
      <AccordionContent>
        セクション1のコンテンツです。
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>セクション2</AccordionTrigger>
      <AccordionContent>
        セクション2のコンテンツです。
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)

describe('Accordion', () => {
  const user = userEvent.setup()

  describe('基本機能', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<TestAccordion />)
      expect(screen.getByText('セクション1')).toBeInTheDocument()
      expect(screen.getByText('セクション2')).toBeInTheDocument()
    })

    it('シングルモードで動作する', async () => {
      render(<TestAccordion />)
      const trigger1 = screen.getByText('セクション1')
      const trigger2 = screen.getByText('セクション2')
      const contents = screen.getAllByTestId('accordion-content')
      const content1 = contents[0]
      const content2 = contents[1]
      
      // 最初のパネルを開く
      await user.click(trigger1)
      await waitFor(() => {
        expect(content1).toBeVisible()
        expect(content2).not.toBeVisible()
      })
      
      // 2番目のパネルを開くと最初のパネルは閉じる
      await user.click(trigger2)
      await waitFor(() => {
        expect(content1).not.toBeVisible()
        expect(content2).toBeVisible()
      })
    })
  })

  describe('インタラクション', () => {
    it('クリックで開閉できる', async () => {
      render(<TestAccordion />)
      const trigger = screen.getByText('セクション1')
      const contents = screen.getAllByTestId('accordion-content')
      const content = contents[0]
      
      // 初期状態は非表示
      expect(content).not.toBeVisible()
      
      // クリックで表示
      await user.click(trigger)
      await waitFor(() => {
        expect(content).toBeVisible()
      })
      
      // もう一度クリックで非表示
      await user.click(trigger)
      await waitFor(() => {
        expect(content).not.toBeVisible()
      })
    })

    it('キーボードで操作できる', async () => {
      render(<TestAccordion />)
      const trigger = screen.getByText('セクション1')
      trigger.focus()
      
      await user.keyboard('{Enter}')
      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true')
      })
      
      await user.keyboard(' ')
      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'false')
      })
    })

    it('矢印キーで項目間を移動できる', async () => {
      render(<TestAccordion />)
      const triggers = screen.getAllByRole('button')
      const firstTrigger = triggers[0]
      
      firstTrigger.focus()
      await user.keyboard('{ArrowDown}')
      expect(triggers[1]).toHaveFocus()
      
      await user.keyboard('{ArrowUp}')
      expect(triggers[0]).toHaveFocus()
    })
  })

  describe('アクセシビリティ', () => {
    it('基本的なアクセシビリティ要件を満たす', async () => {
      await runAccessibilityTest(<TestAccordion />, {
        keyboardNavigation: true,
        ariaAttributes: true,
        focusManagement: true,
        contrast: false,
      })
    })

    it('適切なARIA属性が設定されている', async () => {
      render(<TestAccordion />)
      const triggers = screen.getAllByRole('button')
      const contents = screen.getAllByTestId('accordion-content')
      
      // トリガーのARIA属性チェック
      for (const trigger of triggers) {
        expect(trigger).toHaveAttribute('aria-expanded')
        expect(trigger).toHaveAttribute('aria-controls')
      }
      
      // コンテンツのARIA属性チェック
      for (const content of contents) {
        expect(content).toHaveAttribute('aria-labelledby')
      }
    })

    it('展開状態が適切に管理される', async () => {
      render(<TestAccordion />)
      const trigger = screen.getByText('セクション1')
      
      // 初期状態
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
      
      // 展開時
      await user.click(trigger)
      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true')
      })
      
      // 収納時
      await user.click(trigger)
      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'false')
      })
    })

    it('適切なフォーカス順序でナビゲートできる', async () => {
      render(<TestAccordion />)
      const triggers = screen.getAllByRole('button')
      
      await user.tab()
      expect(triggers[0]).toHaveFocus()
      
      await user.tab()
      expect(triggers[1]).toHaveFocus()
    })
  })
}) 