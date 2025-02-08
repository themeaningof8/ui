/**
 * @file HoverCardのストーリー
 * @description HoverCardの様々な状態とバリエーションを表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Button } from '@/components/ui/button'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta = {
  title: 'UI/HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'centered',
    onLoad: () => {
      const consoleError = console.error;
      console.error = (...args) => {
        consoleError(...args);
        throw new Error(args.join(' '));
      };
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

/**
 * @description 基本的なHoverCardの表示
 */
export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">ホバーしてください</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">ホバーカードのタイトル</h4>
          <p className="text-sm">
            ホバーカードの説明文をここに記述します。
            ユーザーに対して補足情報を提供します。
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // トリガーボタンの確認
    const triggerButton = canvas.getByRole('button', { name: 'ホバーしてください' })
    expect(triggerButton).toBeInTheDocument()
    
    // ホバー操作
    await userEvent.hover(triggerButton)
    
    // ホバーカードの内容確認
    const hoverCard = document.querySelector('[role="dialog"]') as HTMLElement
    expect(hoverCard).toBeInTheDocument()
    
    // タイトルと説明文の確認
    const hoverContent = within(hoverCard)
    const title = hoverContent.getByText('ホバーカードのタイトル')
    const description = hoverContent.getByText(/ホバーカードの説明文をここに記述します。/)
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    
    // ホバー解除
    await userEvent.unhover(triggerButton)
    expect(hoverCard).not.toBeVisible()
  }
}

/**
 * @description 異なる配置のHoverCardの表示
 */
export const DifferentAlignments: Story = {
  render: () => (
    <div className="flex justify-around w-full">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">左寄せ</Button>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">左寄せの例</h4>
            <p className="text-sm">このカードは左寄せで表示されます。</p>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">中央寄せ</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">中央寄せの例</h4>
            <p className="text-sm">このカードは中央寄せで表示されます。</p>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">右寄せ</Button>
        </HoverCardTrigger>
        <HoverCardContent align="end">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">右寄せの例</h4>
            <p className="text-sm">このカードは右寄せで表示されます。</p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // 各トリガーボタンの確認
    const leftButton = canvas.getByRole('button', { name: '左寄せ' })
    const centerButton = canvas.getByRole('button', { name: '中央寄せ' })
    const rightButton = canvas.getByRole('button', { name: '右寄せ' })
    expect(leftButton).toBeInTheDocument()
    expect(centerButton).toBeInTheDocument()
    expect(rightButton).toBeInTheDocument()
    
    // 左寄せホバーカードのテスト
    await userEvent.hover(leftButton)
    const leftCard = document.querySelector('[role="dialog"]') as HTMLElement
    expect(leftCard).toBeInTheDocument()
    expect(within(leftCard).getByText('左寄せの例')).toBeInTheDocument()
    await userEvent.unhover(leftButton)
    
    // 中央寄せホバーカードのテスト
    await userEvent.hover(centerButton)
    const centerCard = document.querySelector('[role="dialog"]') as HTMLElement
    expect(centerCard).toBeInTheDocument()
    expect(within(centerCard).getByText('中央寄せの例')).toBeInTheDocument()
    await userEvent.unhover(centerButton)
    
    // 右寄せホバーカードのテスト
    await userEvent.hover(rightButton)
    const rightCard = document.querySelector('[role="dialog"]') as HTMLElement
    expect(rightCard).toBeInTheDocument()
    expect(within(rightCard).getByText('右寄せの例')).toBeInTheDocument()
    await userEvent.unhover(rightButton)
  }
}

/**
 * @description カスタムコンテンツを持つHoverCardの表示
 */
export const CustomContent: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">商品情報</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">商品名</h4>
            <p className="text-sm">高品質なUIコンポーネントライブラリ</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">特徴</h4>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li>アクセシビリティ対応</li>
              <li>カスタマイズ可能</li>
              <li>TypeScript対応</li>
              <li>ドキュメント完備</li>
            </ul>
          </div>
          <div className="pt-2">
            <span className="text-sm font-semibold">価格: </span>
            <span className="text-sm">オープンソース</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // トリガーボタンの確認
    const triggerButton = canvas.getByText('商品情報')
    expect(triggerButton).toBeInTheDocument()
    
    // ホバーカードを表示
    await userEvent.hover(triggerButton)
    
    // ホバーカードの内容を確認
    const hoverCard = document.querySelector('[role="dialog"]')
    expect(hoverCard).toBeInTheDocument()
    
    const hoverCardContent = within(hoverCard as HTMLElement)
    
    // 商品情報の確認
    expect(hoverCardContent.getByText('商品名')).toBeInTheDocument()
    expect(hoverCardContent.getByText('高品質なUIコンポーネントライブラリ')).toBeInTheDocument()
    
    // 特徴リストの確認
    const features = hoverCardContent.getAllByRole('listitem')
    expect(features).toHaveLength(4)
    
    // 価格情報の確認
    expect(hoverCardContent.getByText('価格:')).toBeInTheDocument()
    expect(hoverCardContent.getByText('オープンソース')).toBeInTheDocument()
    
    // ホバーを解除
    await userEvent.unhover(triggerButton)
    expect(hoverCard).not.toBeVisible()
  },
} 