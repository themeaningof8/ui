/**
 * @file フォームコンポーネントのテスト
 * @description フォームコンポーネントの機能をテストします
 */

import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '.'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'ユーザー名は2文字以上である必要があります。',
  }),
})

const TestForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} data-testid="test-form">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ユーザー名</FormLabel>
              <FormControl>
                <input {...field} />
              </FormControl>
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
  it('バリデーションエラーが正しく表示されること', async () => {
    const user = userEvent.setup()
    render(<TestForm />)

    const input = screen.getByLabelText('ユーザー名')
    await user.type(input, 'a')

    const submitButton = screen.getByText('送信')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('ユーザー名は2文字以上である必要があります。')).toBeInTheDocument()
    })
  })
}) 