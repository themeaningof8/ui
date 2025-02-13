/**
 * @file カードコンポーネントのストーリー
 * @description カードコンポーネントの使用例を表示します
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '.'

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なカードの使用例
 */
export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>カードタイトル</CardTitle>
        <CardDescription>カードの説明文がここに入ります。</CardDescription>
      </CardHeader>
      <CardContent>
        <p>カードのメインコンテンツがここに入ります。</p>
      </CardContent>
      <CardFooter>
        <p>カードのフッターコンテンツ</p>
      </CardFooter>
    </Card>
  ),
}

/**
 * インタラクティブな要素を含むカードの使用例
 */
export const Interactive: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>アカウント作成</CardTitle>
        <CardDescription>以下のフォームに必要事項を入力してください。</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="name">名前</label>
            <input
              id="name"
              type="text"
              placeholder="名前を入力"
              className="rounded-md border p-2"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="email">メールアドレス</label>
            <input
              id="email"
              type="email"
              placeholder="メールアドレスを入力"
              className="rounded-md border p-2"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">キャンセル</Button>
        <Button>作成</Button>
      </CardFooter>
    </Card>
  ),
}

/**
 * 画像を含むカードの使用例
 */
export const WithImage: Story = {
  render: () => (
    <Card className="w-[350px]">
      <img
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        alt="カード画像"
        className="aspect-video w-full object-cover"
      />
      <CardHeader>
        <CardTitle>美しい風景</CardTitle>
        <CardDescription>自然の素晴らしさを感じる一枚</CardDescription>
      </CardHeader>
      <CardContent>
        <p>この写真は、美しい自然の風景を切り取ったものです。</p>
      </CardContent>
      <CardFooter>
        <Button variant="secondary">詳細を見る</Button>
      </CardFooter>
    </Card>
  ),
}

/**
 * カスタムスタイルを適用したカードの使用例
 */
export const CustomStyle: Story = {
  render: () => (
    <Card className="w-[350px] bg-primary text-primary-foreground">
      <CardHeader>
        <CardTitle className="text-2xl">特別なカード</CardTitle>
        <CardDescription className="text-primary-foreground/90">
          カスタムスタイルを適用した特別なデザイン
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>独自のスタイリングを施したカードコンテンツです。</p>
        <div className="rounded bg-primary-foreground/10 p-2">
          ハイライトされたコンテンツ
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" className="w-full">
          アクション
        </Button>
      </CardFooter>
    </Card>
  ),
} 