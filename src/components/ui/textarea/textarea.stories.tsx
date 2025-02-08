/**
 * @file Textareaの Storybook ストーリー
 * @description Textareaの様々な状態とバリエーションを表示します。
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');
    
    // テキストエリアの存在確認
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('placeholder', 'メッセージを入力してください');
    
    // テキスト入力のテスト
    await userEvent.type(textarea, 'こんにちは、世界！');
    expect(textarea).toHaveValue('こんにちは、世界！');
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');
    
    // 初期値の確認
    expect(textarea).toHaveValue('これは初期値として設定されたテキストです。');
    
    // テキストの追加
    await userEvent.type(textarea, '追加のテキスト');
    expect(textarea).toHaveValue('これは初期値として設定されたテキストです。追加のテキスト');
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');
    
    // 無効化状態の確認
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('cursor-not-allowed');
    
    // 入力が無効化されていることを確認
    await userEvent.type(textarea, 'テスト');
    expect(textarea).toHaveValue('');
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');
    
    // 読み取り専用属性の確認
    expect(textarea).toHaveAttribute('readonly');
    
    // 初期値が変更できないことを確認
    await userEvent.type(textarea, 'テスト');
    expect(textarea).toHaveValue('この入力欄は読み取り専用です。');
  },
};

/**
 * エラー状態の Textarea の表示例です。
 */
export const WithError: Story = {
  render: () => (
    <Textarea
      aria-invalid="true"
      className="w-[300px] border-destructive"
      defaultValue="エラーがある入力内容"
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');
    
    // エラー状態のスタイルを確認
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveClass('border-destructive');
    
    // エラー状態でも入力可能なことを確認
    await userEvent.type(textarea, '追加テキスト');
    expect(textarea).toHaveValue('エラーがある入力内容追加テキスト');
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // フォーム要素の確認
    const form = canvas.getByRole('form');
    expect(form).toBeInTheDocument();
    
    // ラベルとテキストエリアの関連付けを確認
    const label = canvas.getByText('メッセージ');
    const textarea = canvas.getByRole('textbox');
    expect(textarea).toHaveAttribute('id', 'message');
    expect(label).toHaveAttribute('for', 'message');
    
    // 必須属性の確認
    expect(textarea).toBeRequired();
    
    // ヘルプテキストの確認
    const helpText = canvas.getByText('ご要望やご質問を詳しく記入してください。');
    expect(helpText).toBeInTheDocument();
    
    // フォーム入力のテスト
    await userEvent.type(textarea, 'テストメッセージ');
    expect(textarea).toHaveValue('テストメッセージ');
  },
}; 