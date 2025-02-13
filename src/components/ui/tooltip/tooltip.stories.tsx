import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './index'

/**
 * `Tooltip`は、要素にホバーした時に追加情報を表示するためのコンポーネントです。
 * Radix UIのTooltipプリミティブをベースに、アクセシビリティと一貫したスタイリングを提供します。
 */
const meta = {
  title: 'UI/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof Tooltip>

/**
 * 基本的な使用例です。
 */
export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  ),
}

/**
 * カスタム配置の例です。
 */
export const CustomPlacement: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>This tooltip appears on top</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>This tooltip appears on bottom</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>This tooltip appears on left</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>This tooltip appears on right</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}

/**
 * カスタムオフセットの例です。
 */
export const CustomOffset: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent sideOffset={10}>
        <p>This tooltip has a custom offset</p>
      </TooltipContent>
    </Tooltip>
  ),
}

/**
 * リッチコンテンツの例です。
 */
export const RichContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover for details</Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-[300px]">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Tooltip Title</h4>
          <p className="text-sm text-muted-foreground">
            This is a tooltip with rich content. It can contain multiple lines of text,
            headings, and other elements.
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  ),
}

/**
 * 遅延表示の例です。
 */
export const WithDelay: Story = {
  render: () => (
    <TooltipProvider delayDuration={1000}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Delayed tooltip</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This tooltip appears after 1 second</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
} 