/**
 * @file HoverCardのストーリー
 * @description HoverCardの様々な状態とバリエーションを表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'

const meta = {
  title: 'UI/HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'centered',
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
        <Button variant="link">@themeaningof8</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar
            src="https://github.com/themeaningof8.png"
            alt="@themeaningof8のプロフィール画像"
            fallback="8"
          />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@themeaningof8</h4>
            <p className="text-sm">
              UIコンポーネントライブラリの開発者。アクセシビリティと使いやすさを重視したコンポーネントを提供しています。
            </p>
            <div className="flex items-center pt-2">
              <span className="text-xs text-base-fg opacity-60">
                2024年1月に参加
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
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
} 