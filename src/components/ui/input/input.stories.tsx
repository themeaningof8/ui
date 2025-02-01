/**
 * @file Inputコンポーネントのストーリー
 * @description 基本的な入力フィールドの様々なバリエーションを表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './'

/**
 * Inputコンポーネントは、ユーザーからのテキスト入力を受け付けるための基本的なフォーム要素です。
 * アクセシビリティに配慮し、様々な状態や用途に対応できるように設計されています。
 */
const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'シンプルで使いやすい入力フィールドコンポーネント。フォーム要素として広く使用できます。'
      }
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url'],
      description: '入力フィールドのタイプ'
    },
    placeholder: {
      control: 'text',
      description: 'プレースホルダーテキスト'
    },
    disabled: {
      control: 'boolean',
      description: '無効状態の制御'
    },
    required: {
      control: 'boolean',
      description: '必須入力の制御'
    },
    error: {
      control: 'boolean',
      description: 'エラー状態の制御'
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

/**
 * デフォルトの入力フィールド
 */
export const Default: Story = {
  args: {
    placeholder: 'テキストを入力...'
  }
}

/**
 * 無効状態の入力フィールド
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '入力できません'
  }
}

/**
 * 必須入力の入力フィールド
 */
export const Required: Story = {
  args: {
    required: true,
    placeholder: '必須入力項目'
  }
}

/**
 * エラー状態の入力フィールド
 */
export const WithError: Story = {
  args: {
    error: true,
    'aria-invalid': true,
    'aria-describedby': 'error-message',
    placeholder: 'エラーのある入力フィールド'
  },
  decorators: [
    (Story) => (
      <div className="space-y-2">
        <Story />
        <p id="error-message" className="text-sm text-destructive" role="alert">
          エラーメッセージをここに表示
        </p>
      </div>
    )
  ]
}

/**
 * 入力タイプのバリエーション
 */
export const InputTypes: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <Input type="text" placeholder="テキスト入力" />
      <Input type="password" placeholder="パスワード" />
      <Input type="email" placeholder="メールアドレス" />
      <Input type="number" placeholder="数値" />
      <Input type="search" placeholder="検索" />
      <Input type="tel" placeholder="電話番号" />
      <Input type="url" placeholder="URL" />
    </div>
  )
}

/**
 * フォーム内での使用例
 */
export const FormExample: Story = {
  render: () => (
    <form className="space-y-4 w-[300px]" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-2">
        <label htmlFor="username" className="text-sm font-medium">
          ユーザー名
        </label>
        <Input
          id="username"
          placeholder="ユーザー名を入力"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          メールアドレス
        </label>
        <Input
          id="email"
          type="email"
          placeholder="example@example.com"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          パスワード
        </label>
        <Input
          id="password"
          type="password"
          placeholder="パスワードを入力"
          required
        />
      </div>
    </form>
  )
} 