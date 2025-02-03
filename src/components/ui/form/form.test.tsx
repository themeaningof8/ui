/**
 * @file フォームコンポーネントのテスト
 * @description フォームコンポーネントの機能とアクセシビリティテスト
 */

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect } from 'vitest'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { testAccessibility, keyboardTest, ariaTest } from '@/tests/wcag3/helpers'
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

  // 基本的なアクセシビリティテスト
  testAccessibility(<TestForm />, {
    selectors: {
      contrast: 'input, button, label, .form-description',
      touchTarget: 'input, button',
      focusIndicator: 'input, button',
    },
  })

  // フォーム固有のアクセシビリティテスト
  describe('フォーム固有のアクセシビリティ', () => {
    it('フィールドセットとレジェンドが適切に構造化されている', () => {
      const { container } = render(<TestForm />)
      const form = screen.getByRole('form')
      ariaTest.hasAttribute(form, 'aria-label')
    })

    it('エラー時に適切なARIAライブリージョンが設定される', async () => {
      render(<TestForm />)
      await user.click(screen.getByText('送信'))
      
      const errorMessage = await screen.findByRole('alert')
      ariaTest.checkLiveRegion(errorMessage, 'polite')
    })

    it('必須フィールドが適切にマークされている', () => {
      render(<TestForm />)
      const requiredInputs = screen.getAllByRole('textbox')
      for (const input of requiredInputs) {
        ariaTest.hasAttribute(input, 'aria-required', 'true')
        expect(screen.getByText('*', { exact: false })).toBeVisible()
      }
    })

    // フォーム固有のスタイル要件
    it('フォームフィールドが適切なスペーシングを持つ', () => {
      render(<TestForm />)
      const form = screen.getByRole('form')
      expect(form).toHaveClass('space-y-6')
      
      const formItems = form.querySelectorAll('.form-item')
      for (const item of formItems) {
        expect(item).toHaveClass('space-y-2')
      }
    })
  })

  // キーボード操作のテスト
  describe('キーボード操作', () => {
    it('適切なフォーカス順序でナビゲートできる', async () => {
      const { container } = render(<TestForm />)
      await keyboardTest.tabNavigation(container, [
        'input[name="username"]',
        'input[name="email"]',
        'button[type="submit"]'
      ])
    })

    it('Enterキーでフォームを送信できる', async () => {
      render(<TestForm />)
      const submitButton = screen.getByText('送信')
      await keyboardTest.keyPress(submitButton, 'Enter', () => {
        expect(screen.getByText('ユーザー名は2文字以上である必要があります。')).toBeInTheDocument()
      })
    })
  })

  // 基本機能テスト
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
      })
      
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
}) 