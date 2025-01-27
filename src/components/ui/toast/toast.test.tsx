/**
 * Toastコンポーネントのテスト
 * @module ToastTest
 */

import React from 'react'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
        <ToastClose />
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
    render(<ToastExample />)

    // 閉じるボタンをクリック
    await userEvent.click(screen.getByRole('button', { name: /close/i }))

    // トーストが閉じていることを確認
    expect(screen.queryByText('Toast Title')).not.toBeInTheDocument()
  })

  it('handles custom action', async () => {
    const handleAction = jest.fn()
    render(
      <ToastProvider>
        <Toast>
          <ToastAction altText="Custom Action" onClick={handleAction}>
            Custom Action
          </ToastAction>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )

    // アクションボタンをクリック
    await userEvent.click(screen.getByRole('button', { name: /custom action/i }))
    expect(handleAction).toHaveBeenCalledTimes(1)
  })

  it('applies custom className to toast components', () => {
    render(
      <ToastProvider>
        <Toast className="custom-toast">
          <ToastTitle className="custom-title">Title</ToastTitle>
          <ToastDescription className="custom-description">Description</ToastDescription>
          <ToastAction className="custom-action" altText="Action">
            Action
          </ToastAction>
          <ToastClose className="custom-close" />
        </Toast>
        <ToastViewport className="custom-viewport" />
      </ToastProvider>
    )

    expect(screen.getByRole('status')).toHaveClass('custom-toast')
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
          <ToastClose ref={closeRef} />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )

    expect(toastRef.current).toBeInstanceOf(HTMLDivElement)
    expect(titleRef.current).toBeInstanceOf(HTMLDivElement)
    expect(descriptionRef.current).toBeInstanceOf(HTMLDivElement)
    expect(actionRef.current).toBeInstanceOf(HTMLButtonElement)
    expect(closeRef.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('handles swipe to dismiss', async () => {
    render(<ToastExample />)
    const toast = screen.getByRole('status')

    // スワイプジェスチャーをシミュレート
    await act(async () => {
      toast.dispatchEvent(new MouseEvent('pointerdown', {
        clientX: 0,
        clientY: 0,
      }))
      toast.dispatchEvent(new MouseEvent('pointermove', {
        clientX: 200,
        clientY: 0,
      }))
      toast.dispatchEvent(new MouseEvent('pointerup'))
    })

    // トーストが閉じていることを確認
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
}) 