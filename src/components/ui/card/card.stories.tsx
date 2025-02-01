/**
 * @file Card コンポーネントの Storybook 設定
 * @description Card コンポーネントの様々な使用例を表示します。
 */
import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './';
import { Button } from '../button';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルトのカード表示
 */
export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>カードタイトル</CardTitle>
        <CardDescription>カードの説明文をここに記載します。</CardDescription>
      </CardHeader>
      <CardContent>
        <p>カードのメインコンテンツ部分です。</p>
      </CardContent>
      <CardFooter>
        <p>フッター部分です。</p>
      </CardFooter>
    </Card>
  ),
};

/**
 * アクションを含むカード
 */
export const WithActions: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>アカウント設定</CardTitle>
        <CardDescription>プロフィールや通知設定を変更できます。</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">メールアドレス</p>
            <p className="text-sm text-base-low">example@example.com</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">通知設定</p>
            <p className="text-sm text-base-low">すべての通知を受け取る</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">キャンセル</Button>
        <Button>保存</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * 画像を含むカード
 */
export const WithImage: Story = {
  render: () => (
    <Card className="w-[350px]">
      <img
        src="https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?w=350&h=175&fit=crop"
        alt="カードの画像"
        className="w-full h-[175px] object-cover"
      />
      <CardHeader>
        <CardTitle>美しい風景</CardTitle>
        <CardDescription>自然の素晴らしさを感じる一枚</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-base-low">
          山々の雄大な景色が広がる素晴らしい風景写真です。
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" className="w-full">
          詳細を見る
        </Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * 複数のカードを並べた例
 */
export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>カード1</CardTitle>
          <CardDescription>説明1</CardDescription>
        </CardHeader>
        <CardContent>コンテンツ1</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>カード2</CardTitle>
          <CardDescription>説明2</CardDescription>
        </CardHeader>
        <CardContent>コンテンツ2</CardContent>
      </Card>
    </div>
  ),
}; 