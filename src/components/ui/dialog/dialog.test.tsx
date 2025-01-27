/**
 * Dialogコンポーネントのテスト
 * @module DialogTest
 */

import React from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './dialog'

describe('Dialog', () => {
  it('renders dialog with all subcomponents', async () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog Description</DialogDescription>
          </DialogHeader>
          <div>Dialog Content</div>
          <DialogFooter>
            <button type="button">Close</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )

    // トリガーボタンが表示されていることを確認
    const trigger = screen.getByRole('button', { name: /open dialog/i })
    expect(trigger).toBeInTheDocument()

    // ダイアログを開く
    await userEvent.click(trigger)

    // ダイアログの内容が表示されていることを確認
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()

    // タイトルとディスクリプションが表示されていることを確認
    expect(within(dialog).getByText('Dialog Title')).toBeInTheDocument()
    expect(within(dialog).getByText('Dialog Description')).toBeInTheDocument()
    expect(within(dialog).getByText('Dialog Content')).toBeInTheDocument()

    // フッターのボタンが表示されていることを確認
    expect(within(dialog).getByRole('button', { name: /close/i })).toBeInTheDocument()
  })

  it('closes dialog when clicking outside', async () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogContent>
      </Dialog>
    )

    // ダイアログを開く
    await userEvent.click(screen.getByRole('button', { name: /open dialog/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // オーバーレイをクリックしてダイアログを閉じる
    const overlay = screen.getByTestId('dialog-overlay')
    await userEvent.click(overlay)

    // ダイアログが閉じていることを確認
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes dialog when pressing Escape key', async () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogContent>
      </Dialog>
    )

    // ダイアログを開く
    await userEvent.click(screen.getByRole('button', { name: /open dialog/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // Escapeキーを押してダイアログを閉じる
    await userEvent.keyboard('{Escape}')

    // ダイアログが閉じていることを確認
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('applies custom className to dialog components', () => {
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

    const trigger = screen.getByRole('button', { name: /open dialog/i })
    expect(trigger).toHaveClass('custom-trigger')
  })

  it('forwards refs correctly', () => {
    const contentRef = React.createRef<HTMLDivElement>()
    const titleRef = React.createRef<HTMLHeadingElement>()
    const descriptionRef = React.createRef<HTMLParagraphElement>()

    render(
      <Dialog>
        <DialogContent ref={contentRef}>
          <DialogTitle ref={titleRef}>Title</DialogTitle>
          <DialogDescription ref={descriptionRef}>Description</DialogDescription>
        </DialogContent>
      </Dialog>
    )

    expect(contentRef.current).toBeInstanceOf(HTMLDivElement)
    expect(titleRef.current).toBeInstanceOf(HTMLHeadingElement)
    expect(descriptionRef.current).toBeInstanceOf(HTMLParagraphElement)
  })
}) 