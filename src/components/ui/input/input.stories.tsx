/**
 * @file インプットコンポーネントのStorybook
 * @description インプットコンポーネントの使用例を示します
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '.'

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

/**
 * デフォルトのインプット
 */
export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'テキストを入力してください',
  },
}

/**
 * メールアドレス入力
 */
export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'メールアドレスを入力してください',
  },
}

/**
 * パスワード入力
 */
export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'パスワードを入力してください',
  },
}

/**
 * 無効化状態
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '無効化されています',
  },
}

/**
 * 必須入力
 */
export const Required: Story = {
  args: {
    required: true,
    placeholder: '必須入力項目です',
  },
}

/**
 * 読み取り専用
 */
export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: '読み取り専用のテキスト',
  },
}

/**
 * エラー状態
 */
export const WithError: Story = {
  args: {
    className: 'border-red-500',
    placeholder: 'エラー状態のインプット',
    'aria-invalid': true,
  },
}

/**
 * ラベル付き
 */
export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label
        htmlFor="email"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        メールアドレス
      </label>
      <Input type="email" id="email" placeholder="メールアドレスを入力" />
    </div>
  ),
} 