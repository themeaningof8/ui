/**
 * @file フォームコンポーネントのテスト
 * @description フォームコンポーネントの機能テスト
 */

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect } from 'vitest'
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
} from './'
import { Input } from '../input'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'ユーザー名は2文字以上である必要があります。',
  }),
  email: z.string().email({
    message: '有効なメールアドレスを入力してください。',
  }),
})

const TestForm = ({ onSubmit = vi.fn() }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
    },
    mode: 'onChange',
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        <button type="submit">送信</button>
      </form>
    </Form>
  )
}

describe('Formコンポーネント', () => {
  const user = userEvent.setup()

  describe('基本機能', () => {
    it('フォームが正しくレンダリングされる', () => {
      render(<TestForm />)
      
      expect(screen.getByLabelText('ユーザー名')).toBeInTheDocument()
      expect(screen.getByLabelText('メールアドレス')).toBeInTheDocument()
      expect(screen.getByText('送信')).toBeInTheDocument()
    })

    it('説明文が表示される', () => {
      render(<TestForm />)
      
      expect(screen.getByText('あなたの表示名です。')).toBeInTheDocument()
      expect(screen.getByText('連絡先として使用されます。')).toBeInTheDocument()
    })
  })

  describe('バリデーション', () => {
    it('無効な入力でエラーメッセージが表示される', async () => {
      const onSubmit = vi.fn()
      render(<TestForm onSubmit={onSubmit} />)
      
      await user.click(screen.getByText('送信'))

      await waitFor(() => {
        expect(screen.getByText('ユーザー名は2文字以上である必要があります。')).toBeInTheDocument()
      })
      
      expect(onSubmit).not.toHaveBeenCalled()
    })

    it('無効なメールアドレスでエラーメッセージが表示される', async () => {
      const onSubmit = vi.fn()
      render(<TestForm onSubmit={onSubmit} />)
      
      const usernameInput = screen.getByLabelText('ユーザー名')
      const emailInput = screen.getByLabelText('メールアドレス')
      
      await user.type(usernameInput, 'test')
      await user.type(emailInput, 'invalid-email')

      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent('有効なメールアドレスを入力してください。')
      }, { timeout: 3000 })
      
      expect(onSubmit).not.toHaveBeenCalled()
    })
  })

  describe('フォーム送信', () => {
    it('有効な入力で送信が成功する', async () => {
      const onSubmit = vi.fn()
      render(<TestForm onSubmit={onSubmit} />)
      
      await user.type(screen.getByLabelText('ユーザー名'), 'testuser')
      await user.type(screen.getByLabelText('メールアドレス'), 'test@example.com')
      await user.click(screen.getByText('送信'))

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(
          {
            username: 'testuser',
            email: 'test@example.com',
          },
          expect.anything()
        )
      })
    })
  })

  describe('アクセシビリティ', () => {
    it('フォームフィールドが適切にラベル付けされている', () => {
      render(<TestForm />)
      
      const usernameInput = screen.getByLabelText('ユーザー名')
      const emailInput = screen.getByLabelText('メールアドレス')

      expect(usernameInput).toHaveAttribute('aria-describedby')
      expect(emailInput).toHaveAttribute('aria-describedby')
    })

    it('エラー時にaria-invalid属性が設定される', async () => {
      render(<TestForm />)
      
      await user.click(screen.getByText('送信'))

      await waitFor(() => {
        expect(screen.getByLabelText('ユーザー名')).toHaveAttribute('aria-invalid', 'true')
      })
    })
  })
}) 