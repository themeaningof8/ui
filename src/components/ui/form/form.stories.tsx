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
                  <Input error {...field} />
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
                  <Input type="email" error {...field} />
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
  }
} 