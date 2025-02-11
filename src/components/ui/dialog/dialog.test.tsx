/**
 * @file Dialogコンポーネントのテスト
 * @description Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose コンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@/tests/test-utils'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '.'

describe('Dialog', () => {
  describe('基本レンダリングテスト', () => {
    it('すべてのコンポーネントが正しくレンダリングされること', () => {
      render(
        <Dialog>
          <DialogTrigger>ダイアログを開く</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ダイアログのタイトル</DialogTitle>
              <DialogDescription>ダイアログの説明</DialogDescription>
            </DialogHeader>
            <div>ダイアログのコンテンツ</div>
            <DialogFooter>
              <DialogClose>閉じる</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )

      const trigger = screen.getByText('ダイアログを開く')
      expect(trigger).toBeInTheDocument()

      // ダイアログを開く
      fireEvent.click(trigger)

      expect(screen.getByRole('dialog')).toBeInTheDocument()
      expect(screen.getByText('ダイアログのタイトル')).toBeInTheDocument()
      expect(screen.getByText('ダイアログの説明')).toBeInTheDocument()
      expect(screen.getByText('ダイアログのコンテンツ')).toBeInTheDocument()
      expect(screen.getByText('閉じる')).toBeInTheDocument()
    })
  })

  describe('インタラクションテスト', () => {
    it('DialogTrigger をクリックするとダイアログが開くこと', () => {
      const onOpenChange = vi.fn()
      render(
        < Dialog onOpenChange={onOpenChange} >
          <DialogTrigger>ダイアログを開く</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ダイアログのタイトル</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )

      const trigger = screen.getByText('ダイアログを開く')
      fireEvent.click(trigger)
      expect(onOpenChange).toHaveBeenCalledWith(true)
    })

    it('DialogClose をクリックするとダイアログが閉じること', () => {
      const onOpenChange = vi.fn()
      render(
        < Dialog onOpenChange={onOpenChange} >
          <DialogTrigger>ダイアログを開く</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ダイアログのタイトル</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>閉じる</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )

      const trigger = screen.getByText('ダイアログを開く')
      fireEvent.click(trigger)

      const closeButton = screen.getByText('閉じる')
      fireEvent.click(closeButton)
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it('エスケープキーを押すとダイアログが閉じること', () => {
      const onOpenChange = vi.fn()
      render(
        <Dialog onOpenChange={onOpenChange} >
          <DialogTrigger>ダイアログを開く</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ダイアログのタイトル</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )

      const trigger = screen.getByText('ダイアログを開く')
      fireEvent.click(trigger)

      fireEvent.keyDown(document, { key: 'Escape' })
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it('背景をクリックするとダイアログが閉じること', () => {
      const onOpenChange = vi.fn()
      render(
        < Dialog onOpenChange={onOpenChange} >
          <DialogTrigger>ダイアログを開く</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ダイアログのタイトル</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )

      const trigger = screen.getByText('ダイアログを開く')
      fireEvent.click(trigger)

      fireEvent.mouseDown(document.body)
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })
  })

  describe('アクセシビリティテスト', () => {
    it('DialogContent に role="dialog" が設定されていること', () => {
      render(
        <Dialog>
          <DialogTrigger>ダイアログを開く</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ダイアログのタイトル</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )

      const trigger = screen.getByText('ダイアログを開く')
      fireEvent.click(trigger)

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('DialogTitle に id が設定され、DialogContent の aria-labelledby で参照されていること', () => {
      render(
        <Dialog>
          <DialogTrigger>ダイアログを開く</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ダイアログのタイトル</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )

      const trigger = screen.getByText('ダイアログを開く')
      fireEvent.click(trigger)

      const title = screen.getByText('ダイアログのタイトル')
      const dialogContent = screen.getByRole('dialog')
      expect(title).toHaveAttribute('id')
      expect(dialogContent).toHaveAttribute('aria-labelledby', title.getAttribute('id'))
    })

    it('DialogDescription に id が設定され、DialogContent の aria-describedby で参照されていること', () => {
      render(
        <Dialog>
          <DialogTrigger>ダイアログを開く</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ダイアログのタイトル</DialogTitle>
              <DialogDescription>ダイアログの説明</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )

      const trigger = screen.getByText('ダイアログを開く')
      fireEvent.click(trigger)

      const description = screen.getByText('ダイアログの説明')
      const dialogContent = screen.getByRole('dialog')
      expect(description).toHaveAttribute('id')
      expect(dialogContent).toHaveAttribute('aria-describedby', description.getAttribute('id'))
    })
  })
}) 