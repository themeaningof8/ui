/**
 * Dialogコンポーネントのテスト
 * @module DialogTest
 */

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
} from './dialog'

type DialogProps = React.ComponentProps<typeof Dialog>

describe('Dialog', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
  })

  const renderDialog = ({
    onOpenChange,
    children,
    ...props
  }: Partial<DialogProps & {
    children?: React.ReactNode
  }> = {}) => {
    return render(
      <Dialog onOpenChange={onOpenChange} {...props}>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          {children || (
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
              <DialogDescription>Test Description</DialogDescription>
            </DialogHeader>
          )}
        </DialogContent>
      </Dialog>
    )
  }

  const openDialog = async () => {
    await user.click(screen.getByRole('button', { name: /open dialog/i }))
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeVisible()
    })
  }

  it('renders dialog with all subcomponents and opens when triggered', async () => {
    renderDialog()
    await openDialog()

    // 各コンポーネントが表示されていることを確認
    expect(screen.getByText('Test Dialog')).toBeVisible()
    expect(screen.getByText('Test Description')).toBeVisible()
  })

  it('handles dialog state changes with keyboard interactions', async () => {
    const onOpenChange = vi.fn()
    renderDialog({ onOpenChange })

    // ダイアログを開く
    await openDialog()
    expect(onOpenChange).toHaveBeenCalledWith(true)

    // Escapeキーでダイアログを閉じる
    await user.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })
  })

  it('closes dialog when clicking outside', async () => {
    renderDialog()
    await openDialog()

    // オーバーレイをクリックしてダイアログを閉じる
    await user.click(screen.getByTestId('overlay'))
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('applies custom className to all dialog components', async () => {
    render(
      <Dialog>
        <DialogTrigger className="custom-trigger">Open Dialog</DialogTrigger>
        <DialogContent className="custom-content">
          <DialogHeader className="custom-header">
            <DialogTitle className="custom-title">Title</DialogTitle>
            <DialogDescription className="custom-description">Description</DialogDescription>
          </DialogHeader>
          <DialogFooter className="custom-footer">
            <button type="button">Close</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )

    // トリガーのクラス名を確認
    expect(screen.getByRole('button', { name: /open dialog/i })).toHaveClass('custom-trigger')

    // ダイアログを開いてその他のコンポーネントのクラス名を確認
    await openDialog()
    expect(screen.getByRole('dialog')).toHaveClass('custom-content')
    expect(screen.getByText('Title')).toHaveClass('custom-title')
    expect(screen.getByText('Description')).toHaveClass('custom-description')
  })

  it('forwards refs correctly to all dialog components', async () => {
    const contentRef = React.createRef<HTMLDivElement>()
    const titleRef = React.createRef<HTMLHeadingElement>()
    const descriptionRef = React.createRef<HTMLParagraphElement>()

    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent ref={contentRef}>
          <DialogTitle ref={titleRef}>Title</DialogTitle>
          <DialogDescription ref={descriptionRef}>Description</DialogDescription>
        </DialogContent>
      </Dialog>
    )

    await openDialog()
    
    // refs が正しく設定されていることを確認
    expect(contentRef.current).toBeInstanceOf(HTMLDivElement)
    expect(titleRef.current).toBeInstanceOf(HTMLHeadingElement)
    expect(descriptionRef.current).toBeInstanceOf(HTMLParagraphElement)
  })

  it('handles nested dialogs correctly', async () => {
    render(
      <Dialog>
        <DialogTrigger>Open First Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>First Dialog</DialogTitle>
          <Dialog>
            <DialogTrigger>Open Second Dialog</DialogTrigger>
            <DialogContent>
              <DialogTitle>Second Dialog</DialogTitle>
            </DialogContent>
          </Dialog>
        </DialogContent>
      </Dialog>
    )

    // 最初のダイアログを開く
    await user.click(screen.getByRole('button', { name: /open first dialog/i }))
    await waitFor(() => {
      expect(screen.getByText('First Dialog')).toBeVisible()
    })

    // 2番目のダイアログを開く
    await user.click(screen.getByRole('button', { name: /open second dialog/i }))
    await waitFor(() => {
      expect(screen.getByText('Second Dialog')).toBeVisible()
    })

    // 2番目のダイアログを閉じる
    await user.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByText('Second Dialog')).not.toBeInTheDocument()
      expect(screen.getByText('First Dialog')).toBeVisible()
    })
  })

  describe('DialogOverlay', () => {
    it('renders with custom className', () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogOverlay className="custom-overlay" />
            <div>Content</div>
          </DialogContent>
        </Dialog>
      )
      expect(screen.getByTestId('overlay')).toHaveClass('custom-overlay')
    })
  })

  describe('DialogHeader and DialogFooter', () => {
    it('renders with custom styles and handles events', async () => {
      const handleHeaderClick = vi.fn()
      const handleFooterClick = vi.fn()

      render(
        <Dialog open>
          <DialogContent>
            <DialogHeader className="custom-header" onClick={handleHeaderClick}>
              <DialogTitle>Test Title</DialogTitle>
              <DialogDescription>Test Description</DialogDescription>
            </DialogHeader>
            <DialogFooter className="custom-footer" onClick={handleFooterClick}>
              <button type="button">Close</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )

      const header = screen.getByText('Test Title').closest('div')
      const footer = screen.getByText('Close').closest('div')

      expect(header).toHaveClass('custom-header')
      expect(footer).toHaveClass('custom-footer')

      if (header && footer) {
        await userEvent.click(header)
        await userEvent.click(footer)
      }

      expect(handleHeaderClick).toHaveBeenCalled()
      expect(handleFooterClick).toHaveBeenCalled()
    })
  })

  describe('DialogTitle and DialogDescription', () => {
    it('renders with custom className and forwards ref', () => {
      const titleRef = React.createRef<HTMLHeadingElement>()
      const descriptionRef = React.createRef<HTMLParagraphElement>()

      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle ref={titleRef} className="custom-title">
              Custom Title
            </DialogTitle>
            <DialogDescription ref={descriptionRef} className="custom-description">
              Custom Description
            </DialogDescription>
          </DialogContent>
        </Dialog>
      )

      expect(screen.getByText('Custom Title')).toHaveClass('custom-title')
      expect(screen.getByText('Custom Description')).toHaveClass('custom-description')
      expect(titleRef.current).toBeInstanceOf(HTMLHeadingElement)
      expect(descriptionRef.current).toBeInstanceOf(HTMLParagraphElement)
    })
  })

  describe('Dialog Interactions', () => {
    it('handles complex dialog interactions', async () => {
      const onOpenChange = vi.fn()
      const user = userEvent.setup()

      render(
        <Dialog onOpenChange={onOpenChange}>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Interactive Dialog</DialogTitle>
              <DialogDescription>Test all interactions</DialogDescription>
            </DialogHeader>
            <div>Content</div>
            <DialogFooter>
              <button type="button">Action</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )

      // Open dialog
      await user.click(screen.getByText('Open Dialog'))
      expect(onOpenChange).toHaveBeenCalledWith(true)

      // Verify content
      expect(screen.getByText('Interactive Dialog')).toBeVisible()
      expect(screen.getByText('Test all interactions')).toBeVisible()
      expect(screen.getByText('Action')).toBeVisible()

      // Close with overlay click
      await user.click(screen.getByTestId('overlay'))
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })
  })
}) 