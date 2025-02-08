/**
 * @file AlertのStories
 * @description Alertの使用例とバリエーションを Storybook で表示
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Terminal, AlertCircle, Info } from 'lucide-react';
import { within } from '@storybook/testing-library';
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
 * @description デフォルトのアラート
 */
export const Default: Story = {
  render: () => (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>デフォルトアラート</AlertTitle>
      <AlertDescription>
        これはデフォルトのアラートメッセージです。一般的な情報を表示する際に使用します。
      </AlertDescription>
    </Alert>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alert = canvas.getByRole('alert');
    const title = canvas.getByText('デフォルトアラート');
    const description = canvas.getByText('これはデフォルトのアラートメッセージです。一般的な情報を表示する際に使用します。');

    expect(alert).toBeInTheDocument();
    expect(title).toBeVisible();
    expect(description).toBeVisible();
  },
};

/**
 * @description デストラクティブ（エラー）のアラート
 */
export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>エラー</AlertTitle>
      <AlertDescription>
        エラーが発生しました。入力内容を確認してください。
      </AlertDescription>
    </Alert>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alert = canvas.getByRole('alert');
    const title = canvas.getByText('エラー');
    const description = canvas.getByText('エラーが発生しました。入力内容を確認してください。');

    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('border-destructive/50');
    expect(title).toBeVisible();
    expect(description).toBeVisible();
  },
};

/**
 * @description アイコンなしのアラート
 */
export const WithoutIcon: Story = {
  render: () => (
    <Alert>
      <AlertTitle>アイコンなしアラート</AlertTitle>
      <AlertDescription>
        アイコンを使用しないシンプルなアラートメッセージです。
      </AlertDescription>
    </Alert>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alert = canvas.getByRole('alert');
    const title = canvas.getByText('アイコンなしアラート');
    const description = canvas.getByText('アイコンを使用しないシンプルなアラートメッセージです。');

    expect(alert).toBeInTheDocument();
    expect(title).toBeVisible();
    expect(description).toBeVisible();
  },
};

/**
 * @description タイトルのみのアラート
 */
export const TitleOnly: Story = {
  render: () => (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>タイトルのみのアラート</AlertTitle>
    </Alert>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alert = canvas.getByRole('alert');
    const title = canvas.getByText('タイトルのみのアラート');

    expect(alert).toBeInTheDocument();
    expect(title).toBeVisible();
  },
};

/**
 * @description 説明文のみのアラート
 */
export const DescriptionOnly: Story = {
  render: () => (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertDescription>
        説明文のみのアラートメッセージです。
      </AlertDescription>
    </Alert>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alert = canvas.getByRole('alert');
    const description = canvas.getByText('説明文のみのアラートメッセージです。');

    expect(alert).toBeInTheDocument();
    expect(description).toBeVisible();
  },
};

/**
 * @description カスタムスタイルを適用したアラート
 */
export const CustomStyles: Story = {
  render: () => (
    <Alert className="max-w-[400px] border-primary">
      <Info className="h-4 w-4 text-primary" />
      <AlertTitle>カスタムスタイル</AlertTitle>
      <AlertDescription>
        このアラートにはカスタムスタイルが適用されています。
      </AlertDescription>
    </Alert>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alert = canvas.getByRole('alert');
    const title = canvas.getByText('カスタムスタイル');
    const description = canvas.getByText('このアラートにはカスタムスタイルが適用されています。');

    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('max-w-[400px]', 'border-primary');
    expect(title).toBeVisible();
    expect(description).toBeVisible();
  },
}; 