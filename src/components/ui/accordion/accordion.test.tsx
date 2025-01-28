import { render, screen, waitFor } from '@testing-library/react'
import { expect } from 'vitest'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordion'
import userEvent from '@testing-library/user-event'

test('アコーディオンが正常に開閉する', async () => {
  const user = userEvent.setup()

  render(
    <Accordion type="single">
      <AccordionItem value="item-1">
        <AccordionTrigger>テスト</AccordionTrigger>
        <AccordionContent>コンテンツ</AccordionContent>
      </AccordionItem>
    </Accordion>
  )

  const trigger = screen.getByRole('button')
  
  await user.click(trigger)

  await waitFor(() => {
    expect(screen.getByText('コンテンツ')).toBeVisible()
  })
}) 