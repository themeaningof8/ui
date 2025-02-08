/**
 * Accordionのストーリー
 * @see https://storybook.js.org/docs/writing-stories
 */
import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

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
      <AccordionItem value="item-2">
        <AccordionTrigger>質問2</AccordionTrigger>
        <AccordionContent>
          回答内容2
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
  play: async () => {
    const trigger1 = screen.getByText('よくある質問');
    const trigger2 = screen.getByText('質問2');

    await userEvent.click(trigger1);
    const content1 = await screen.findByText('回答内容がここに入ります。コンポーネントの動作確認用テキストです。');
    await expect(content1).toBeVisible();

    await userEvent.click(trigger2);
    await waitFor(() => {
      expect(content1).not.toBeVisible();
    });
    const content2 = await screen.findByText('回答内容2');
    await expect(content2).toBeVisible();

    await userEvent.click(trigger2);
    await waitFor(() => {
      expect(content2).not.toBeVisible();
    });
  }
} 