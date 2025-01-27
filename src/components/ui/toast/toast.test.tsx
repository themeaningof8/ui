/**
 * Toastコンポーネントのテスト
 * @module ToastTest
 */

import React from 'react'
import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
} from './toast'

describe('Toast', () => {
  const ToastExample = () => (
    <ToastProvider>
      <Toast>
        <ToastTitle>Toast Title</ToastTitle>
        <ToastDescription>Toast Description</ToastDescription>
        <ToastAction altText="Try again" onClick={() => {}}>
          Try again
        </ToastAction>
        <ToastClose aria-label="Close">
          <span className="sr-only">Close</span>
        </ToastClose>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  )

  it('renders toast with all subcomponents', () => {
    render(<ToastExample />)

    // トーストのタイトルと説明が表示されていることを確認
    expect(screen.getByText('Toast Title')).toBeInTheDocument()
    expect(screen.getByText('Toast Description')).toBeInTheDocument()

    // アクションボタンが表示されていることを確認
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()

    // 閉じるボタンが表示されていることを確認
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
  })

  it('handles close action', async () => {
    const { unmount } = render(<ToastExample />)
    
    const closeButton = screen.getByRole('button', { name: /close/i })
    await userEvent.click(closeButton)

    await waitFor(() => {
      expect(screen.queryByText('Toast Title')).not.toBeInTheDocument()
    })
    
    unmount() // クリーンアップを明示的に実行
  })

  it('handles close action', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<ToastExample />)
    
    await act(async () => {
      await user.click(screen.getByRole('button', { name: /close/i }))
    });

    await waitFor(() => {
      expect(screen.queryByText('Toast Title')).not.toBeInTheDocument()
    }, { timeout: 2000 });
    
    unmount()
  })

  it('applies custom className to toast components', () => {
    render(
      <ToastProvider>
        <Toast className="custom-toast" data-testid="toast">
          <ToastTitle className="custom-title">Title</ToastTitle>
          <ToastDescription className="custom-description">Description</ToastDescription>
          <ToastAction className="custom-action" altText="Action">
            Action
          </ToastAction>
          <ToastClose className="custom-close" aria-label="Close">
            <span className="sr-only">Close</span>
          </ToastClose>
        </Toast>
        <ToastViewport className="custom-viewport" />
      </ToastProvider>
    )

    expect(screen.getByTestId('toast')).toHaveClass('custom-toast')
    expect(screen.getByText('Title')).toHaveClass('custom-title')
    expect(screen.getByText('Description')).toHaveClass('custom-description')
    expect(screen.getByRole('button', { name: /action/i })).toHaveClass('custom-action')
    expect(screen.getByRole('button', { name: /close/i })).toHaveClass('custom-close')
  })

  it('forwards refs correctly', () => {
    const toastRef = React.createRef<HTMLLIElement>()
    const titleRef = React.createRef<HTMLDivElement>()
    const descriptionRef = React.createRef<HTMLDivElement>()
    const actionRef = React.createRef<HTMLButtonElement>()
    const closeRef = React.createRef<HTMLButtonElement>()

    render(
      <ToastProvider>
        <Toast ref={toastRef}>
          <ToastTitle ref={titleRef}>Title</ToastTitle>
          <ToastDescription ref={descriptionRef}>Description</ToastDescription>
          <ToastAction ref={actionRef} altText="Action">
            Action
          </ToastAction>
          <ToastClose ref={closeRef} aria-label="Close">
            <span className="sr-only">Close</span>
          </ToastClose>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )

    expect(toastRef.current).toBeInstanceOf(HTMLLIElement)
    expect(titleRef.current).toBeInstanceOf(HTMLDivElement)
    expect(descriptionRef.current).toBeInstanceOf(HTMLDivElement)
    expect(actionRef.current).toBeInstanceOf(HTMLButtonElement)
    expect(closeRef.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('handles dismiss programmatically', async () => {
    const onOpenChange = vi.fn()
    const { rerender } = render(
      <ToastProvider>
        <Toast open={true} onOpenChange={onOpenChange}>
          <ToastTitle>Toast Title</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )

    // トーストを閉じる
    rerender(
      <ToastProvider>
        <Toast open={false} onOpenChange={onOpenChange}>
          <ToastTitle>Toast Title</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )

    // アニメーション完了を待つ
    await waitFor(() => {
      expect(screen.queryByText('Toast Title')).not.toBeInTheDocument()
    }, { timeout: 3000 })
  })

  test('トーストが正常に表示される', async () => {
    const { unmount } = render(
      <ToastProvider>
        <Toast open={true}>
          <ToastTitle>Test Toast</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Test Toast')).toBeVisible()
    })

    await act(async () => {
      unmount()
    })
  })
}) 