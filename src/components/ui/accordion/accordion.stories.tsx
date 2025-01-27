/**
 * Accordionコンポーネントのストーリー
 * @see https://storybook.js.org/docs/writing-stories
 */
import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordion'

const meta: Meta<typeof Accordion> = {
  title: 'UI/Accordion',
  component: Accordion,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Accordion>

export const Primary: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>よくある質問</AccordionTrigger>
        <AccordionContent>
          回答内容がここに入ります。コンポーネントの動作確認用テキストです。
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  args: {
    type: 'single',
    collapsible: true,
  },
  parameters: {
    docs: {
      story: {
        height: '300px',
      },
    },
  },
} 