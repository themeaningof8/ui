/**
 * @file Collapsibleのストーリー
 * @description Collapsibleの様々な状態とバリエーションを表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

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
 * @description 基本的なコラプシブルの表示
 */
export const Default: Story = {
  render: () => (
    <Collapsible className="w-[350px]">
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          詳細を表示
          <ChevronDown className="h-4 w-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border p-4 text-sm">
          コラプシブルの内容がここに表示されます。
          クリックして開閉することができます。
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // トリガーボタンの確認
    const trigger = canvas.getByRole('button', { name: '詳細を表示' })
    expect(trigger).toBeInTheDocument()
    
    // 初期状態では内容が非表示
    const content = canvas.getByText(/コラプシブルの内容がここに表示されます。/)
    expect(content).not.toBeVisible()
    
    // トリガーをクリックして内容を表示
    await userEvent.click(trigger)
    expect(content).toBeVisible()
    
    // もう一度クリックして内容を非表示
    await userEvent.click(trigger)
    expect(content).not.toBeVisible()
  },
}

/**
 * @description アニメーション付きのコラプシブル
 */
export const WithAnimation: Story = {
  render: () => (
    <Collapsible className="w-[350px]">
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          アニメーション付き
          <ChevronDown className="h-4 w-4 transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="transition-all data-[state=closed]:animate-collapse data-[state=open]:animate-expand">
        <div className="rounded-md border p-4 text-sm">
          このコンテンツは開閉時にアニメーションが適用されます。
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // トリガーボタンの確認
    const trigger = canvas.getByRole('button', { name: 'アニメーション付き' })
    expect(trigger).toBeInTheDocument()
    
    // アニメーションクラスの確認
    const content = canvas.getByText(/このコンテンツは開閉時にアニメーションが適用されます。/)
    expect(content.parentElement).toHaveClass('transition-all')
  },
}

/**
 * @description カスタムトリガーを使用したコラプシブル
 */
export const WithCustomTrigger: Story = {
  render: () => (
    <Collapsible className="w-[350px]">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          カスタムトリガー
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          カスタマイズされたトリガーボタンを使用しています。
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // カスタムトリガーの確認
    const trigger = canvas.getByRole('button', { name: 'Toggle' })
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveClass('w-9', 'p-0')
    
    // ヘッダーテキストの確認
    expect(canvas.getByText('カスタムトリガー')).toBeVisible()
  },
}

/**
 * @description 複数のコンテンツを含むコラプシブル
 */
export const WithMultipleContent: Story = {
  render: () => (
    <Collapsible className="w-[350px] space-y-2">
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          詳細設定
          <ChevronDown className="h-4 w-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border p-4">
          <h4 className="mb-2 text-sm font-medium">一般設定</h4>
          <p className="text-sm text-muted-foreground">
            基本的な設定オプションです。
          </p>
        </div>
        <div className="rounded-md border p-4">
          <h4 className="mb-2 text-sm font-medium">詳細設定</h4>
          <p className="text-sm text-muted-foreground">
            高度な設定オプションです。
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // トリガーボタンの確認
    const trigger = canvas.getByRole('button', { name: '詳細設定' })
    expect(trigger).toBeInTheDocument()
    
    // 初期状態では内容が非表示
    const content = canvas.getByText('基本的な設定オプションです。')
    expect(content).not.toBeVisible()
    
    // トリガーをクリックして内容を表示
    await userEvent.click(trigger)
    
    // 両方のセクションが表示されることを確認
    expect(canvas.getByText('基本的な設定オプションです。')).toBeVisible()
    expect(canvas.getByText('高度な設定オプションです。')).toBeVisible()
  },
} 