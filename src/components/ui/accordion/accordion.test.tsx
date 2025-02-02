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
        <AccordionTrigger>テスト1</AccordionTrigger>
        <AccordionContent>コンテンツ1</AccordionContent>
      </AccordionItem>
    </Accordion>
  )

  const TestAccordionMultiple = (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>テスト1</AccordionTrigger>
        <AccordionContent>コンテンツ1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>テスト2</AccordionTrigger>
        <AccordionContent>コンテンツ2</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>テスト3</AccordionTrigger>
        <AccordionContent>コンテンツ3</AccordionContent>
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
    const wrapTrigger = (trigger: React.ReactElement) => (
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" disabled={(trigger.props as { disabled?: boolean }).disabled}>
          {trigger}
          <AccordionContent>コンテンツ</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    // 基本的なアクセシビリティテスト
    testBasicAccessibility(<AccordionTrigger>テスト</AccordionTrigger>, {
      expectedRole: 'button',
      testDisabled: true,
      useDataDisabled: true,
      wrapper: wrapTrigger,
    })

    // WCAG 3.0メトリクスのコンプライアンステスト
    testWCAG3Compliance(<AccordionTrigger>テスト</AccordionTrigger>, {
      expectedRole: "button",
      focusClasses: {
        outline: "focus-visible:outline-none",
        ring: "focus-visible:ring-2",
        ringColor: "focus-visible:ring-accent-solid",
        ringOffset: "focus-visible:ring-offset-2",
      },
      sizeClasses: {
        height: "h-12",
        width: "w-full",
        padding: ["px-2", "py-4"],
        layout: ["flex", "items-center", "justify-between"],
      },
      wrapper: (trigger) => (
        <Accordion type="single">
          <AccordionItem value="test">
            {trigger}
            <AccordionContent>テストコンテンツ</AccordionContent>
          </AccordionItem>
        </Accordion>
      ),
    })

    // キーボード操作のテスト
    testKeyboardInteraction(TestAccordionMultiple, {
      expectedRole: 'button',
      triggerKeys: [' ', 'Enter'],
      isAccordion: true,
    })
  })
}) 