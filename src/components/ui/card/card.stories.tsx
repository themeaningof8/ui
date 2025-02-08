/**
 * @file Cardの Storybook 設定
 * @description Cardの様々な使用例を表示します。
 */
import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // タイトルと説明文の確認
    const title = canvas.getByText('カードタイトル');
    const description = canvas.getByText('カードの説明文をここに記載します。');
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    
    // コンテンツとフッターの確認
    const content = canvas.getByText('カードのメインコンテンツ部分です。');
    const footer = canvas.getByText('フッター部分です。');
    expect(content).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // ヘッダー部分の確認
    const title = canvas.getByText('アカウント設定');
    const description = canvas.getByText('プロフィールや通知設定を変更できます。');
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    
    // コンテンツ部分の確認
    const emailLabel = canvas.getByText('メールアドレス');
    const emailValue = canvas.getByText('example@example.com');
    const notificationLabel = canvas.getByText('通知設定');
    const notificationValue = canvas.getByText('すべての通知を受け取る');
    expect(emailLabel).toBeInTheDocument();
    expect(emailValue).toBeInTheDocument();
    expect(notificationLabel).toBeInTheDocument();
    expect(notificationValue).toBeInTheDocument();
    
    // ボタンの確認
    const cancelButton = canvas.getByText('キャンセル');
    const saveButton = canvas.getByText('保存');
    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toHaveClass('variant-outline');
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 画像の確認
    const image = canvas.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', 'カードの画像');
    expect(image).toHaveClass('w-full', 'h-[175px]', 'object-cover');
    
    // テキストコンテンツの確認
    const title = canvas.getByText('美しい風景');
    const description = canvas.getByText('自然の素晴らしさを感じる一枚');
    const content = canvas.getByText('山々の雄大な景色が広がる素晴らしい風景写真です。');
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    
    // ボタンの確認
    const button = canvas.getByText('詳細を見る');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('w-full');
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // グリッドコンテナの確認
    const container = canvas.getByRole('generic');
    expect(container).toHaveClass('grid', 'grid-cols-2', 'gap-4');
    
    // 各カードの確認
    const titles = canvas.getAllByRole('heading');
    expect(titles).toHaveLength(2);
    expect(titles[0]).toHaveTextContent('カード1');
    expect(titles[1]).toHaveTextContent('カード2');
    
    const descriptions = canvas.getAllByText(/説明[12]/);
    expect(descriptions).toHaveLength(2);
    
    const contents = canvas.getAllByText(/コンテンツ[12]/);
    expect(contents).toHaveLength(2);
  },
}; 