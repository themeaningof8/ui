/**
 * @file コラプシブルコンポーネントのストーリー
 * @description コラプシブルコンポーネントの使用例を表示します
 */

import type { Meta, StoryObj } from '@storybook/react'
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '.'

const meta = {
  title: 'UI/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なコラプシブルの使用例
 */
export const Default: Story = {
  render: () => (
    <Collapsible className="w-[350px] space-y-2">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between">
          クリックして開閉
          <ChevronsUpDown className="size-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="rounded-md border px-4 py-3">
          コンテンツ1
        </div>
        <div className="rounded-md border px-4 py-3">
          コンテンツ2
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

/**
 * デフォルトで開いた状態のコラプシブルの使用例
 */
export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen className="w-[350px] space-y-2">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between">
          デフォルトで開いた状態
          <ChevronsUpDown className="size-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="rounded-md border px-4 py-3">
          コンテンツ1
        </div>
        <div className="rounded-md border px-4 py-3">
          コンテンツ2
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

/**
 * 無効化状態のコラプシブルの使用例
 */
export const Disabled: Story = {
  render: () => (
    <Collapsible disabled className="w-[350px] space-y-2">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between" disabled>
          無効化状態
          <ChevronsUpDown className="size-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="rounded-md border px-4 py-3">
          コンテンツ1
        </div>
        <div className="rounded-md border px-4 py-3">
          コンテンツ2
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

/**
 * カスタムスタイルを適用したコラプシブルの使用例
 */
export const CustomStyle: Story = {
  render: () => (
    <Collapsible className="w-[350px] rounded-lg border p-2">
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between hover:bg-step-4"
        >
          カスタムスタイル
          <ChevronsUpDown className="size-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="rounded-md bg-step-2 px-4 py-3">
          カスタムコンテンツ1
        </div>
        <div className="rounded-md bg-step-2 px-4 py-3">
          カスタムコンテンツ2
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
} 