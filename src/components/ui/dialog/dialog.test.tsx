/**
 * @file ダイアログコンポーネントのテスト
 * @description ダイアログコンポーネントの機能をテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '.'
import { Button } from '@/components/ui/button'
import { userEvent } from '@testing-library/user-event'

describe('Dialogコンポーネント', () => {
  it('基本的なダイアログが正しくレンダリングされること', async () => {
    const { user } = render(
      <Dialog>
        <DialogTrigger>開く</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>タイトル</DialogTitle>
            <DialogDescription>説明文</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button>閉じる</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )

    // トリガーをクリックする前はダイアログは表示されていない
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    // トリガーをクリック
    await user.click(screen.getByText('開く'))

    // ダイアログが表示される
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('タイトル')).toBeInTheDocument()
    expect(screen.getByText('説明文')).toBeInTheDocument()
  })

  it('カスタムクラス名が正しく適用されること', async () => {
    const { user } = render(
      <Dialog>
        <DialogTrigger className="custom-trigger">開く</DialogTrigger>
        <DialogContent className="custom-content">
          <DialogHeader className="custom-header">
            <DialogTitle className="custom-title">タイトル</DialogTitle>
            <DialogDescription className="custom-description">説明文</DialogDescription>
          </DialogHeader>
          <DialogFooter className="custom-footer">
            <button type="button" data-testid="close-button">閉じる</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )

    await user.click(screen.getByText('開く'))

    expect(screen.getByText('開く')).toHaveClass('custom-trigger')
    expect(screen.getByRole('dialog')).toHaveClass('custom-content')
    expect(screen.getByText('タイトル').parentElement).toHaveClass('custom-header')
    expect(screen.getByText('タイトル')).toHaveClass('custom-title')
    expect(screen.getByText('説明文')).toHaveClass('custom-description')
    expect(screen.getByTestId('close-button').parentElement).toHaveClass('custom-footer')
  })

  it('ダイアログが閉じられること', async () => {
    const { user } = render(
      <Dialog>
        <DialogTrigger>開く</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>タイトル</DialogTitle>
            <DialogDescription>説明文</DialogDescription>
          </DialogHeader>
          <button type="button">閉じる</button>
        </DialogContent>
      </Dialog>
    )

    // ダイアログを開く
    await user.click(screen.getByText('開く'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // ESCキーでダイアログを閉じる
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('オーバーレイをクリックしてダイアログが閉じられること', async () => {
    const user = userEvent.setup()
    render(
      <Dialog>
        <DialogTrigger>開く</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>タイトル</DialogTitle>
            <DialogDescription>説明文</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )

    // ダイアログを開く
    await user.click(screen.getByText('開く'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // オーバーレイをクリック
    const overlay = screen.getByTestId('dialog-overlay')
    await user.click(overlay)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('閉じるボタンをクリックしてダイアログが閉じられること', async () => {
    const user = userEvent.setup()
    render(
      <Dialog>
        <DialogTrigger>開く</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>タイトル</DialogTitle>
            <DialogDescription>説明文</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )

    // ダイアログを開く
    await user.click(screen.getByText('開く'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // 閉じるボタンをクリック
    const closeButton = screen.getByRole('button', { name: '閉じる' })
    await user.click(closeButton)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('ESCキーでダイアログが閉じられること', async () => {
    const user = userEvent.setup()
    render(
      <Dialog>
        <DialogTrigger>開く</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>タイトル</DialogTitle>
            <DialogDescription>説明文</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )

    // ダイアログを開く
    await user.click(screen.getByText('開く'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // ESCキーを押す
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
}) 