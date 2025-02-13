/**
 * @file アコーディオンコンポーネントのテスト
 * @description アコーディオンコンポーネントの機能をテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '.'

describe('アコーディオンコンポーネント', () => {
  it('アコーディオンが正しくレンダリングされること', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>アコーディオン1</AccordionTrigger>
          <AccordionContent>アコーディオン1の内容</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    
    expect(screen.getByRole('button', { name: 'アコーディオン1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'アコーディオン1' })).toHaveAttribute('data-state', 'closed')
  })

  it('アコーディオンが開閉できること', async () => {
    const { user } = render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>アコーディオン1</AccordionTrigger>
          <AccordionContent>アコーディオン1の内容</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    const trigger = screen.getByRole('button', { name: 'アコーディオン1' })

    // 初期状態では閉じている
    expect(trigger).toHaveAttribute('data-state', 'closed')

    // クリックして開く
    await user.click(trigger)
    expect(trigger).toHaveAttribute('data-state', 'open')

    // もう一度クリックして閉じる
    await user.click(trigger)
    expect(trigger).toHaveAttribute('data-state', 'closed')
  })

  it('複数のアコーディオンアイテムが正しく動作すること', async () => {
    const { user } = render(
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>アコーディオン1</AccordionTrigger>
          <AccordionContent>アコーディオン1の内容</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>アコーディオン2</AccordionTrigger>
          <AccordionContent>アコーディオン2の内容</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    const trigger1 = screen.getByRole('button', { name: 'アコーディオン1' })
    const trigger2 = screen.getByRole('button', { name: 'アコーディオン2' })

    // 初期状態では両方とも閉じている
    expect(trigger1).toHaveAttribute('data-state', 'closed')
    expect(trigger2).toHaveAttribute('data-state', 'closed')

    // 1つ目を開く
    await user.click(trigger1)
    expect(trigger1).toHaveAttribute('data-state', 'open')
    expect(trigger2).toHaveAttribute('data-state', 'closed')

    // 2つ目も開く
    await user.click(trigger2)
    expect(trigger1).toHaveAttribute('data-state', 'open')
    expect(trigger2).toHaveAttribute('data-state', 'open')
  })
}) 