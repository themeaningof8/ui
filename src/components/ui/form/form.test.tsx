/**
 * @file Formのテスト
 * @description Formの機能とアクセシビリティテスト
 */

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect } from 'vitest'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { runAccessibilityTest } from '@/tests/wcag3/helpers'
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
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-6" 
        aria-label="ユーザー情報フォーム"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ユーザー名</FormLabel>
              <FormControl>
                <Input placeholder="ユーザー名を入力" {...field} aria-required="true" />
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
                <Input type="email" placeholder="example@example.com" {...field} aria-required="true" />
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

describe('Form', () => {
  const user = userEvent.setup()

  describe('基本機能', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<TestForm />)
      expect(screen.getByLabelText('ユーザー名')).toBeInTheDocument()
      expect(screen.getByLabelText('メールアドレス')).toBeInTheDocument()
      expect(screen.getByText('送信')).toBeInTheDocument()
    });

    it('説明文が表示される', () => {
      render(<TestForm />)
      expect(screen.getByText('あなたの表示名です。')).toBeInTheDocument()
      expect(screen.getByText('連絡先として使用されます。')).toBeInTheDocument()
    });

    it('フォームフィールドが適切なスペーシングを持つ', () => {
      render(<TestForm />)
      const form = screen.getByRole('form', { name: 'ユーザー情報フォーム' })
      expect(form).toHaveClass('space-y-6')
      
      const formItems = form.querySelectorAll('.form-item')
      for (const item of formItems) {
        expect(item).toHaveClass('space-y-2')
      }
    });
  });

  describe('インタラクション', () => {
    describe('バリデーション', () => {
      it('無効な入力でエラーメッセージが表示される', async () => {
        const onSubmit = vi.fn()
        render(<TestForm onSubmit={onSubmit} />)
        
        await user.click(screen.getByText('送信'))
  
        await waitFor(() => {
          expect(screen.getByText('ユーザー名は2文字以上である必要があります。')).toBeInTheDocument()
        })
        
        expect(onSubmit).not.toHaveBeenCalled()
      });
  
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
      });
    });

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
      });
    });
  });

  describe('アクセシビリティ', () => {
    it('基本的なアクセシビリティ要件を満たす', async () => {
      await runAccessibilityTest(<TestForm />, {
        keyboardNavigation: true,
        ariaAttributes: true,
        focusManagement: true,
        contrast: false,
        skipFocusableCheck: true,
      });
    });

    it('フォームが適切に構造化されている', () => {
      render(<TestForm />)
      const form = screen.getByRole('form', { name: 'ユーザー情報フォーム' })
      expect(form).toHaveAttribute('aria-label', 'ユーザー情報フォーム')
    });

    it('エラー時にARIAライブリージョンが設定される', async () => {
      render(<TestForm />)
      const user = userEvent.setup()
      
      await user.click(screen.getByText('送信'))
      await user.keyboard('{Enter}')
      
      await waitFor(async () => {
        const errorMessages = await screen.findAllByRole('alert')
        expect(errorMessages[0]).toHaveAttribute('aria-live', 'polite')
      })
    });

    it('必須フィールドが適切にマークされている', () => {
      render(<TestForm />)
      const requiredInputs = screen.getAllByRole('textbox')
      for (const input of requiredInputs) {
        expect(input).toHaveAttribute('aria-required', 'true')
      }
    });

    describe('キーボード操作', () => {
      it('適切なフォーカス順序でナビゲートできる', async () => {
        const { container } = render(<TestForm />)
        const focusableElements = container.querySelectorAll<HTMLElement>(
          'input[name="username"], input[name="email"], button[type="submit"]'
        )
        
        for (const element of focusableElements) {
          element.focus()
          expect(document.activeElement).toBe(element)
        }
      });

      it('Enterキーでフォームを送信できる', async () => {
        render(<TestForm />)
        const submitButton = screen.getByText('送信')
        await user.type(submitButton, '{Enter}')
        expect(screen.getByText('ユーザー名は2文字以上である必要があります。')).toBeInTheDocument()
      });
    });
  });
}); 