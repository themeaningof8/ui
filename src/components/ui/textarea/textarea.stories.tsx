/**
 * @file Textarea コンポーネントの Storybook ストーリー
 * @description Textarea コンポーネントの様々な状態とバリエーションを表示します。
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './';

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルトの Textarea の表示例です。
 */
export const Default: Story = {
  render: () => (
    <Textarea
      placeholder="メッセージを入力してください"
      className="w-[300px]"
    />
  ),
};

/**
 * 初期値が設定された Textarea の表示例です。
 */
export const WithValue: Story = {
  render: () => (
    <Textarea
      defaultValue="これは初期値として設定されたテキストです。"
      className="w-[300px]"
    />
  ),
};

/**
 * 無効化された Textarea の表示例です。
 */
export const Disabled: Story = {
  render: () => (
    <Textarea
      disabled
      placeholder="この入力欄は無効化されています"
      className="w-[300px]"
    />
  ),
};

/**
 * 読み取り専用の Textarea の表示例です。
 */
export const ReadOnly: Story = {
  render: () => (
    <Textarea
      readOnly
      defaultValue="この入力欄は読み取り専用です。"
      className="w-[300px]"
    />
  ),
};

/**
 * エラー状態の Textarea の表示例です。
 */
export const WithError: Story = {
  render: () => (
    <Textarea
      error
      defaultValue="エラーがある入力内容"
      className="w-[300px]"
    />
  ),
};

/**
 * フォーム内での Textarea の使用例です。
 */
export const FormExample: Story = {
  render: () => (
    <form className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          メッセージ
        </label>
        <Textarea
          id="message"
          placeholder="メッセージを入力してください"
          required
        />
        <p className="text-sm text-base-low">
          ご要望やご質問を詳しく記入してください。
        </p>
      </div>
    </form>
  ),
}; 