/**
 * @file アコーディオンコンポーネントのテスト
 * @description アコーディオンコンポーネントの機能とアクセシビリティをテストします
 */
import { render, screen, waitFor } from '@testing-library/react'
import { expect, describe, it } from 'vitest'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '.'
import userEvent from '@testing-library/user-event'
import { testBasicAccessibility, testWCAG3Compliance, testKeyboardInteraction } from '../../../tests/wcag3/helpers'

describe('アコーディオン', () => {
  const TestAccordion = (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>テスト</AccordionTrigger>
        <AccordionContent>コンテンツ</AccordionContent>
      </AccordionItem>
    </Accordion>
  )

  describe('基本機能', () => {
    it('アコーディオンが正常に開閉する', async () => {
      const user = userEvent.setup()
      render(TestAccordion)

      const trigger = screen.getByRole('button')
      
      // 初期状態では非表示
      expect(trigger).toHaveAttribute('aria-expanded', 'false')

      // 開く
      await user.click(trigger)
      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true')
      })

      // 閉じる
      await user.click(trigger)
      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'false')
      })
    })
  })

  describe('アコーディオントリガー', () => {
    const TestTriggerWrapper = (
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>テスト</AccordionTrigger>
          <AccordionContent>コンテンツ</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    // 基本的なアクセシビリティテスト
    testBasicAccessibility(<AccordionTrigger>テスト</AccordionTrigger>, {
      expectedRole: 'button',
      testDisabled: true,
      useDataDisabled: true,
    })

    // WCAG 3.0メトリクスのコンプライアンステスト
    testWCAG3Compliance(TestTriggerWrapper)

    // キーボード操作のテスト
    testKeyboardInteraction(TestTriggerWrapper, {
      expectedRole: 'button',
      triggerKeys: [' ', 'Enter'],
    })
  })
}) 