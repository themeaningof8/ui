/**
 * @file アコーディオンコンポーネントのストーリー
 * @description アコーディオンコンポーネントの使用例を表示します
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '.'

const meta = {
  title: 'UI/Accordion',
  component: Accordion,
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 単一のアコーディオンアイテムを表示する基本的な使用例
 */
export const Default: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>アコーディオン1</AccordionTrigger>
        <AccordionContent>アコーディオン1の内容</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

/**
 * 複数のアコーディオンアイテムを表示する使用例
 */
export const Multiple: Story = {
  args: {
    type: 'multiple',
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>アコーディオン1</AccordionTrigger>
        <AccordionContent>アコーディオン1の内容</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>アコーディオン2</AccordionTrigger>
        <AccordionContent>アコーディオン2の内容</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>アコーディオン3</AccordionTrigger>
        <AccordionContent>アコーディオン3の内容</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

/**
 * 長いコンテンツを含むアコーディオンの使用例
 */
export const LongContent: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>長いコンテンツ</AccordionTrigger>
        <AccordionContent>
          これは非常に長いコンテンツの例です。アコーディオンは、長いコンテンツを
          効率的に表示するのに適しています。ユーザーは必要な情報のみを展開して
          閲覧することができます。これにより、画面の空間を効率的に使用することが
          できます。
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
} 