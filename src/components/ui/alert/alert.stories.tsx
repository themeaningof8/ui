/**
 * @file AlertのStories
 * @description Alertの使用例とバリエーションを Storybook で表示
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const meta = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * @description デフォルトの Alert
 */
export const Default: Story = {
  args: {
    children: (
      <>
        <AlertTitle>デフォルトアラート</AlertTitle>
        <AlertDescription>
          これはデフォルトのアラートメッセージです。一般的な情報を表示する際に使用します。
        </AlertDescription>
      </>
    ),
  },
};

/**
 * @description デストラクティブ（エラー）の Alert
 */
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: (
      <>
        <AlertTitle>エラー</AlertTitle>
        <AlertDescription>
          エラーが発生しました。入力内容を確認してください。
        </AlertDescription>
      </>
    ),
  },
};

/**
 * @description 成功を示す Alert
 */
export const Success: Story = {
  args: {
    variant: 'success',
    children: (
      <>
        <AlertTitle>成功</AlertTitle>
        <AlertDescription>
          操作が正常に完了しました。
        </AlertDescription>
      </>
    ),
  },
};

/**
 * @description 警告を示す Alert
 */
export const Warning: Story = {
  args: {
    variant: 'warning',
    children: (
      <>
        <AlertTitle>警告</AlertTitle>
        <AlertDescription>
          この操作は取り消すことができません。注意して実行してください。
        </AlertDescription>
      </>
    ),
  },
};

/**
 * @description タイトルのみの Alert
 */
export const TitleOnly: Story = {
  args: {
    children: <AlertTitle>タイトルのみのアラート</AlertTitle>,
  },
};

/**
 * @description 説明文のみの Alert
 */
export const DescriptionOnly: Story = {
  args: {
    children: <AlertDescription>説明文のみのアラートメッセージです。</AlertDescription>,
  },
};

/**
 * @description カスタムスタイルを適用した Alert
 */
export const CustomStyles: Story = {
  args: {
    className: 'max-w-[400px]',
    children: (
      <>
        <AlertTitle>カスタムスタイル</AlertTitle>
        <AlertDescription>
          このアラートには最大幅が設定されています。
        </AlertDescription>
      </>
    ),
  },
}; 