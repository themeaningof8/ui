/**
 * @file フォームのストーリー
 * @description フォームの使用例を表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'ユーザー名は2文字以上である必要があります。',
  }),
  email: z.string().email({
    message: '有効なメールアドレスを入力してください。',
  }),
})

const meta = {
  title: 'UI/Form',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'react-hook-formとzodを使用した型安全なフォーム'
      }
    }
  },
  tags: ['autodocs']
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なフォームの例
 */
export const Basic: Story = {
  render: () => {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: '',
        email: '',
      },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values)
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-[400px]">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ユーザー名</FormLabel>
                <FormControl>
                  <Input placeholder="ユーザー名を入力" {...field} />
                </FormControl>
                <FormDescription>
                  あなたの表示名です。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="example@example.com" {...field} />
                </FormControl>
                <FormDescription>
                  連絡先として使用されます。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="bg-base-solid hover:bg-base-solid-hover text-base-on-solid px-4 py-2 rounded-md"
          >
            送信
          </button>
        </form>
      </Form>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // フォームの存在確認
    const form = canvas.getByRole('form')
    expect(form).toBeInTheDocument()
    
    // 入力フィールドの確認
    const usernameInput = canvas.getByPlaceholderText('ユーザー名を入力')
    const emailInput = canvas.getByPlaceholderText('example@example.com')
    expect(usernameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    
    // ラベルの確認
    const usernameLabel = canvas.getByText('ユーザー名')
    const emailLabel = canvas.getByText('メールアドレス')
    expect(usernameLabel).toBeInTheDocument()
    expect(emailLabel).toBeInTheDocument()
    
    // 説明文の確認
    const usernameDescription = canvas.getByText('あなたの表示名です。')
    const emailDescription = canvas.getByText('連絡先として使用されます。')
    expect(usernameDescription).toBeInTheDocument()
    expect(emailDescription).toBeInTheDocument()
    
    // フォームの入力テスト
    await userEvent.type(usernameInput, 'testuser')
    await userEvent.type(emailInput, 'test@example.com')
    
    expect(usernameInput).toHaveValue('testuser')
    expect(emailInput).toHaveValue('test@example.com')
  }
}

/**
 * エラー状態のフォームの例
 */
export const WithErrors: Story = {
  render: () => {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: 'a',
        email: 'invalid-email',
      },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values)
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-[400px]">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ユーザー名</FormLabel>
                <FormControl>
                  <Input aria-invalid="true" className="border-destructive" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input type="email" aria-invalid="true" className="border-destructive" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="bg-base-solid hover:bg-base-solid-hover text-base-on-solid px-4 py-2 rounded-md"
          >
            送信
          </button>
        </form>
      </Form>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // エラー状態の入力フィールドの確認
    const usernameInput = canvas.getByDisplayValue('a')
    const emailInput = canvas.getByDisplayValue('invalid-email')
    expect(usernameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    
    // エラー状態のクラスを確認
    expect(usernameInput).toHaveAttribute('aria-invalid', 'true')
    expect(emailInput).toHaveAttribute('aria-invalid', 'true')
    expect(usernameInput).toHaveClass('border-destructive')
    expect(emailInput).toHaveClass('border-destructive')
    
    // エラーメッセージの確認
    const submitButton = canvas.getByRole('button', { name: '送信' })
    await userEvent.click(submitButton)
    
    const usernameError = await canvas.findByText('ユーザー名は2文字以上である必要があります。')
    const emailError = await canvas.findByText('有効なメールアドレスを入力してください。')
    expect(usernameError).toBeInTheDocument()
    expect(emailError).toBeInTheDocument()
  }
}

/**
 * 無効状態のフィールドを含むフォームの例
 */
export const WithDisabledFields: Story = {
  render: () => {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: 'readonly-user',
        email: 'readonly@example.com',
      },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values)
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-[400px]">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ユーザー名</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormDescription>
                  このフィールドは編集できません。
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input type="email" disabled {...field} />
                </FormControl>
                <FormDescription>
                  このフィールドは編集できません。
                </FormDescription>
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="bg-base-solid hover:bg-base-solid-hover text-base-on-solid px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled
          >
            送信
          </button>
        </form>
      </Form>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // 無効状態の入力フィールドの確認
    const usernameInput = canvas.getByDisplayValue('readonly-user')
    const emailInput = canvas.getByDisplayValue('readonly@example.com')
    expect(usernameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    
    // 無効状態の属性を確認
    expect(usernameInput).toBeDisabled()
    expect(emailInput).toBeDisabled()
    
    // 説明文の確認
    const descriptions = canvas.getAllByText('このフィールドは編集できません。')
    expect(descriptions).toHaveLength(2)
    for (const description of descriptions) {
      expect(description).toBeInTheDocument()
    }
    
    // 送信ボタンの無効状態を確認
    const submitButton = canvas.getByRole('button', { name: '送信' })
    expect(submitButton).toBeDisabled()
    expect(submitButton).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed')
  }
} 