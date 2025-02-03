/**
 * @file アコーディオンコンポーネントのテスト
 * @description アコーディオンコンポーネントの機能とアクセシビリティテスト
 */

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { testAccessibility, keyboardTest, ariaTest } from '@/tests/wcag3/helpers'
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

describe('Accordionコンポーネント', () => {
  const user = userEvent.setup()

  // 基本的なアクセシビリティテスト
  testAccessibility(<TestAccordion />, {
    selectors: {
      contrast: '[role="button"]',
      touchTarget: '[role="button"]',
      focusIndicator: '[role="button"]',
    }
  })

  // アコーディオン固有のアクセシビリティテスト
  describe('アコーディオン固有のアクセシビリティ', () => {
    it('トリガーが適切なARIA属性を持つ', () => {
      render(<TestAccordion />)
      const triggers = screen.getAllByRole('button')
      
      for (const trigger of triggers) {
        ariaTest.hasAttribute(trigger, 'aria-expanded')
        ariaTest.hasAttribute(trigger, 'aria-controls')
      }
    })

    it('コンテンツが適切なARIA属性を持つ', () => {
      render(<TestAccordion />)
      const contents = screen.getAllByTestId('accordion-content')
      
      for (const content of contents) {
        ariaTest.hasAttribute(content, 'aria-labelledby')
      }
    })

    it('展開状態が適切に管理される', async () => {
      render(<TestAccordion />)
      const trigger = screen.getByText('セクション1')
      
      // 初期状態
      ariaTest.hasAttribute(trigger, 'aria-expanded', 'false')
      
      // 展開時
      await user.click(trigger)
      await waitFor(() => {
        ariaTest.hasAttribute(trigger, 'aria-expanded', 'true')
      })
      
      // 収納時
      await user.click(trigger)
      await waitFor(() => {
        ariaTest.hasAttribute(trigger, 'aria-expanded', 'false')
      })
    })
  })

  // キーボード操作のテスト
  describe('キーボード操作', () => {
    it('適切なフォーカス順序でナビゲートできる', async () => {
      render(<TestAccordion />)
      const triggers = screen.getAllByRole('button')
      
      await user.tab()
      expect(triggers[0]).toHaveFocus()
      
      await user.tab()
      expect(triggers[1]).toHaveFocus()
    })

    it('矢印キーで項目間を移動できる', async () => {
      render(<TestAccordion />)
      const triggers = screen.getAllByRole('button')
      const firstTrigger = triggers[0]
      
      firstTrigger.focus()
      await keyboardTest.keyPress(firstTrigger, 'ArrowDown', () => {
        expect(triggers[1]).toHaveFocus()
      })
      
      await keyboardTest.keyPress(triggers[1], 'ArrowUp', () => {
        expect(triggers[0]).toHaveFocus()
      })
    })

    it('Enter/Spaceキーでパネルを開閉できる', async () => {
      render(<TestAccordion />)
      const trigger = screen.getByText('セクション1')
      trigger.focus()
      
      await user.keyboard('{Enter}')
      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true')
      }, { timeout: 1000 })
      
      await user.keyboard(' ')
      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'false')
      }, { timeout: 1000 })
    })
  })

  // 基本機能テスト
  describe('基本機能', () => {
    it('アコーディオンが正しくレンダリングされる', () => {
      render(<TestAccordion />)
      
      expect(screen.getByText('セクション1')).toBeInTheDocument()
      expect(screen.getByText('セクション2')).toBeInTheDocument()
    })

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

    it('single modeで一度に1つのパネルのみ開く', async () => {
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
}) 