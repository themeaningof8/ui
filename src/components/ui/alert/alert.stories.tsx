/**
 * @file AlertのStories
 * @description Alertの使用例とバリエーションを Storybook で表示
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

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
  play: async () => {
    const title = screen.getByText('デフォルトアラート');
    const description = screen.getByText('これはデフォルトのアラートメッセージです。一般的な情報を表示する際に使用します。');
    expect(title).toBeVisible();
    expect(description).toBeVisible();
  }
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
  play: async () => {
    const title = screen.getByText('エラー');
    const description = screen.getByText('エラーが発生しました。入力内容を確認してください。');
    const alertElement = screen.getByRole('alert');
    expect(title).toBeVisible();
    expect(description).toBeVisible();
    // destructive variant が適用されているか確認 (クラス名に 'destructive' が含まれるか)
    expect(alertElement.className).toContain('destructive');
  }
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
  play: async () => {
    const title = screen.getByText('成功');
    const description = screen.getByText('操作が正常に完了しました。');
    expect(title).toBeVisible();
    expect(description).toBeVisible();
  }
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
  play: async () => {
    const title = screen.getByText('警告');
    const description = screen.getByText('この操作は取り消すことができません。注意して実行してください。');
    expect(title).toBeVisible();
    expect(description).toBeVisible();
  }
};

/**
 * @description タイトルのみの Alert
 */
export const TitleOnly: Story = {
  args: {
    children: <AlertTitle>タイトルのみのアラート</AlertTitle>,
  },
  play: async () => {
    const title = screen.getByText('タイトルのみのアラート');
    expect(title).toBeVisible();
  }
};

/**
 * @description 説明文のみの Alert
 */
export const DescriptionOnly: Story = {
  args: {
    children: <AlertDescription>説明文のみのアラートメッセージです。</AlertDescription>,
  },
  play: async () => {
    const description = screen.getByText('説明文のみのアラートメッセージです。');
    expect(description).toBeVisible();
  }
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
  play: async () => {
    const title = screen.getByText('カスタムスタイル');
    const description = screen.getByText('このアラートには最大幅が設定されています。');
    const alertElement = screen.getByRole('alert');
    expect(title).toBeVisible();
    expect(description).toBeVisible();
    expect(alertElement.className).toContain('max-w-[400px]');
  }
}; 