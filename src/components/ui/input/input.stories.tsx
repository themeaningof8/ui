/**
 * @file Inputのストーリー
 * @description 基本的な入力フィールドの様々なバリエーションを表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '@/components/ui/input'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

/**
 * Inputは、ユーザーからのテキスト入力を受け付けるための基本的なフォーム要素です。
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
    },
    onLoad: () => {
      const consoleError = console.error;
      console.error = (...args) => {
        consoleError(...args);
        throw new Error(args.join(' '));
      };
    },
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
    'aria-invalid': {
      control: 'boolean',
      description: 'エラー状態の制御（アクセシビリティ対応）'
    },
    className: {
      control: 'text',
      description: 'カスタムクラス名（エラー状態の場合は border-destructive を使用）'
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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('テキストを入力...')
    
    // 入力フィールドの存在確認
    expect(input).toBeInTheDocument()
    expect(input).toBeEnabled()
    
    // テキスト入力のテスト
    await userEvent.type(input, 'テストテキスト')
    expect(input).toHaveValue('テストテキスト')
  },
}

/**
 * 無効状態の入力フィールド
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '入力できません'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('disabled:cursor-not-allowed disabled:opacity-50');
  }
}

/**
 * 必須入力の入力フィールド
 */
export const Required: Story = {
  args: {
    required: true,
    placeholder: '必須入力項目'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('必須入力項目')
    
    // 必須属性の確認
    expect(input).toBeRequired()
    
    // 空の状態で送信した場合の検証
    const form = document.createElement('form')
    form.appendChild(input.cloneNode(true))
    expect(form.checkValidity()).toBe(false)
  },
}

/**
 * エラー状態の入力フィールド
 */
export const WithError: Story = {
  args: {
    'aria-invalid': true,
    'aria-describedby': 'error-message',
    placeholder: 'エラーのある入力フィールド',
    className: 'border-destructive'
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
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('エラーのある入力フィールド')
    
    // エラー状態の確認
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby', 'error-message')
    expect(input).toHaveClass('border-destructive')
    
    // エラーメッセージの確認
    const errorMessage = canvas.getByRole('alert')
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveTextContent('エラーメッセージをここに表示')
  },
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
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // 各タイプの入力フィールドを確認
    const textInput = canvas.getByPlaceholderText('テキスト入力')
    const passwordInput = canvas.getByPlaceholderText('パスワード')
    const emailInput = canvas.getByPlaceholderText('メールアドレス')
    const numberInput = canvas.getByPlaceholderText('数値')
    const searchInput = canvas.getByPlaceholderText('検索')
    const telInput = canvas.getByPlaceholderText('電話番号')
    const urlInput = canvas.getByPlaceholderText('URL')
    
    // 各入力フィールドの存在確認
    expect(textInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(numberInput).toBeInTheDocument()
    expect(searchInput).toBeInTheDocument()
    expect(telInput).toBeInTheDocument()
    expect(urlInput).toBeInTheDocument()
    
    // 各入力フィールドのタイプ確認
    expect(textInput).toHaveAttribute('type', 'text')
    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(numberInput).toHaveAttribute('type', 'number')
    expect(searchInput).toHaveAttribute('type', 'search')
    expect(telInput).toHaveAttribute('type', 'tel')
    expect(urlInput).toHaveAttribute('type', 'url')
    
    // 各入力フィールドでの入力テスト
    await userEvent.type(textInput, 'テストテキスト')
    expect(textInput).toHaveValue('テストテキスト')
    
    await userEvent.type(passwordInput, 'password123')
    expect(passwordInput).toHaveValue('password123')
    
    await userEvent.type(emailInput, 'test@example.com')
    expect(emailInput).toHaveValue('test@example.com')
    
    await userEvent.type(numberInput, '12345')
    expect(numberInput).toHaveValue(12345)
    
    await userEvent.type(searchInput, '検索キーワード')
    expect(searchInput).toHaveValue('検索キーワード')
    
    await userEvent.type(telInput, '090-1234-5678')
    expect(telInput).toHaveValue('090-1234-5678')
    
    await userEvent.type(urlInput, 'https://example.com')
    expect(urlInput).toHaveValue('https://example.com')
  },
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
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // フォーム要素の確認
    const form = canvas.getByRole('form')
    expect(form).toBeInTheDocument()
    
    // ラベルとフィールドの関連付けを確認
    const labels = canvas.getAllByRole('textbox')
    expect(labels).toHaveLength(2) // パスワードフィールドは除外される
    
    // 各フィールドの入力テスト
    const usernameInput = canvas.getByPlaceholderText('ユーザー名を入力')
    const emailInput = canvas.getByPlaceholderText('example@example.com')
    const passwordInput = canvas.getByPlaceholderText('パスワードを入力')
    
    await userEvent.type(usernameInput, 'testuser')
    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'password123')
    
    expect(usernameInput).toHaveValue('testuser')
    expect(emailInput).toHaveValue('test@example.com')
    expect(passwordInput).toHaveValue('password123')
    
    // 必須フィールドの確認
    expect(usernameInput).toBeRequired()
    expect(emailInput).toBeRequired()
    expect(passwordInput).toBeRequired()
  },
} 