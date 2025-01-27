import { render, screen } from '@testing-library/react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordion'

test('アコーディオンが正常に開閉する', async () => {
  render(
    <Accordion type="single">
      <AccordionItem value="item-1">
        <AccordionTrigger>テスト</AccordionTrigger>
        <AccordionContent>コンテンツ</AccordionContent>
      </AccordionItem>
    </Accordion>
  )

  expect(screen.getByText('テスト')).toBeInTheDocument()
}) 