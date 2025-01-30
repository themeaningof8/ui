/**
 * @file ダイアログコンポーネントのテストファイル
 * @description ダイアログの基本機能、アクセシビリティ、インタラクション、スタイリングをテスト
 */

import React from 'react'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import '@testing-library/jest-dom'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '.'

describe('Dialog Component', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
  })

  afterEach(() => {
    cleanup()
    // Radix UIのポータル要素をクリーンアップ
    document.body.innerHTML = ''
  })

  /**
   * ダイアログをレンダリングするヘルパー関数
   */
  const renderDialog = ({
    onOpenChange,
    children,
    ...props
  }: {
    onOpenChange?: (open: boolean) => void
    children?: React.ReactNode
  } = {}) => {
    cleanup()
    return render(
      <Dialog onOpenChange={onOpenChange} {...props}>
        <DialogTrigger asChild>
          <button type="button">ダイアログを開く</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>テストダイアログ</DialogTitle>
            <DialogDescription>テストの説明文</DialogDescription>
          </DialogHeader>
          {children || (
            <DialogFooter>
              <button type="button">アクション</button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    )
  }

  /**
   * ダイアログを開くヘルパー関数
   */
  const openDialog = async () => {
    const trigger = screen.getByRole('button', { name: 'ダイアログを開く' })
    await user.click(trigger)
    return waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  }

  describe('基本機能', () => {
    it('トリガーボタンをクリックするとダイアログが開く', async () => {
      renderDialog()
      await openDialog()
      
      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeVisible()
      expect(screen.getByText('テストダイアログ')).toBeVisible()
      expect(screen.getByText('テストの説明文')).toBeVisible()
    })

    it('Escapeキーでダイアログが閉じる', async () => {
      const onOpenChange = vi.fn()
      renderDialog({ onOpenChange })
      await openDialog()

      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it('オーバーレイをクリックするとダイアログが閉じる', async () => {
      const onOpenChange = vi.fn()
      renderDialog({ onOpenChange })
      await openDialog()

      // Radix UIのオーバーレイは[data-state="open"]属性を持つ
      const overlay = document.querySelector('[data-state="open"].fixed.inset-0')
      expect(overlay).toBeInTheDocument()
      
      if (overlay instanceof HTMLElement) {
        await user.click(overlay)
        await waitFor(() => {
          expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        })
        expect(onOpenChange).toHaveBeenCalledWith(false)
      }
    })
  })

  describe('アクセシビリティ', () => {
    it('適切なARIAロールと属性が設定されている', async () => {
      renderDialog()
      
      // トリガーボタンの初期状態を確認
      const triggerButton = screen.getByRole('button', { name: 'ダイアログを開く' })
      expect(triggerButton).toHaveAttribute('aria-haspopup', 'dialog')
      expect(triggerButton).toHaveAttribute('aria-expanded', 'false')

      // ダイアログを開く
      await user.click(triggerButton)

      await waitFor(() => {
        const dialog = screen.getByRole('dialog')
        const titleId = dialog.getAttribute('aria-labelledby')
        const descriptionId = dialog.getAttribute('aria-describedby')

        expect(titleId).toBeDefined()
        expect(descriptionId).toBeDefined()

        // タイトルとディスクリプションが対応するIDを持っていることを確認
        expect(screen.getByText('テストダイアログ')).toHaveAttribute('id', titleId)
        expect(screen.getByText('テストの説明文')).toHaveAttribute('id', descriptionId)

        // トリガーボタンの状態が更新されていることを確認（aria-hiddenの親要素を考慮）
        const expandedTrigger = document.querySelector('[aria-expanded="true"][aria-haspopup="dialog"]')
        expect(expandedTrigger).toBeInTheDocument()
      })
    })

    it('フォーカストラップが機能している', async () => {
      renderDialog()
      
      // ダイアログを開く
      const triggerButton = screen.getByRole('button', { name: 'ダイアログを開く' })
      await user.click(triggerButton)

      await waitFor(() => {
        const dialog = screen.getByRole('dialog')
        expect(dialog).toHaveAttribute('tabindex', '-1')

        // フォーカス可能な要素を取得（閉じるボタンを含む）
        const focusableElements = dialog.querySelectorAll(
          'button:not([aria-hidden="true"]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        expect(focusableElements.length).toBeGreaterThan(0)

        // 最初のフォーカス可能な要素にフォーカスが当たっていることを確認
        const firstFocusableElement = focusableElements[0]
        expect(document.activeElement).toBe(firstFocusableElement)
      })
    })

    describe('DialogTitleとDialogDescriptionのアクセシビリティ要件', () => {
      beforeEach(() => {
        cleanup()
      })

      it('タイトルと説明文が両方ある場合、適切なARIA属性が設定される', async () => {
        cleanup()
        render(
          <Dialog>
            <DialogTrigger asChild>
              <button type="button">開く</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>タイトル</DialogTitle>
                <DialogDescription>説明</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )

        const trigger = screen.getByRole('button', { name: '開く' })
        await user.click(trigger)

        await waitFor(() => {
          const dialog = screen.getByRole('dialog')
          expect(dialog).toHaveAttribute('aria-labelledby')
          expect(dialog).toHaveAttribute('aria-describedby')
          expect(screen.getByText('タイトル')).toBeVisible()
          expect(screen.getByText('説明')).toBeVisible()
        })
      })

      it('タイトルのみの場合、aria-labelledbyが設定される', async () => {
        cleanup()
        render(
          <Dialog>
            <DialogTrigger asChild>
              <button type="button">開く</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>タイトルのみ</DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )

        const trigger = screen.getByRole('button', { name: '開く' })
        await user.click(trigger)

        await waitFor(() => {
          const dialog = screen.getByRole('dialog')
          expect(dialog).toHaveAttribute('aria-labelledby')
          expect(screen.getByText('タイトルのみ')).toBeVisible()
        })
      })

      it('説明文のみの場合でもタイトルが必要', async () => {
        cleanup()
        render(
          <Dialog>
            <DialogTrigger asChild>
              <button type="button">開く</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>必須タイトル</DialogTitle>
                <DialogDescription>説明のみ</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )

        const trigger = screen.getByRole('button', { name: '開く' })
        await user.click(trigger)

        await waitFor(() => {
          const dialog = screen.getByRole('dialog')
          expect(dialog).toHaveAttribute('aria-labelledby')
          expect(dialog).toHaveAttribute('aria-describedby')
          expect(screen.getByText('必須タイトル')).toBeVisible()
          expect(screen.getByText('説明のみ')).toBeVisible()
        })
      })
    })
  })

  describe('カスタマイズ', () => {
    it('カスタムクラス名が適用される', async () => {
      render(
        <Dialog>
          <DialogTrigger asChild>
            <button type="button" className="custom-trigger">ダイアログを開く</button>
          </DialogTrigger>
          <DialogContent className="custom-content">
            <DialogHeader className="custom-header">
              <DialogTitle className="custom-title">タイトル</DialogTitle>
              <DialogDescription className="custom-description">説明</DialogDescription>
            </DialogHeader>
            <DialogFooter className="custom-footer">
              <button type="button">アクション</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )

      const trigger = screen.getByRole('button', { name: 'ダイアログを開く' })
      expect(trigger).toHaveClass('custom-trigger')
      await user.click(trigger)

      await waitFor(() => {
        const dialog = screen.getByRole('dialog')
        expect(dialog).toHaveClass('custom-content')
      })
    })

    it('カスタムコンテンツをレンダリングできる', async () => {
      const CustomContent = () => (
        <>
          <DialogTitle>カスタムタイトル</DialogTitle>
          <DialogDescription>カスタムの説明文</DialogDescription>
          <div>
            <button type="button">カスタムアクション</button>
          </div>
        </>
      )

      renderDialog({ children: <CustomContent /> })
      await openDialog()

      expect(screen.getByText('カスタムタイトル')).toBeVisible()
      expect(screen.getByText('カスタムの説明文')).toBeVisible()
      expect(screen.getByRole('button', { name: 'カスタムアクション' })).toBeVisible()
    })
  })

  describe('コールバック', () => {
    it('onOpenChangeコールバックが正しく呼び出される', async () => {
      const onOpenChange = vi.fn()
      renderDialog({ onOpenChange })

      // ダイアログを開く
      await openDialog()
      expect(onOpenChange).toHaveBeenCalledWith(true)

      // ダイアログを閉じる
      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
      expect(onOpenChange).toHaveBeenLastCalledWith(false)
    })
  })

  describe('Refs', () => {
    it('コンポーネントにrefが正しく転送される', async () => {
      const contentRef = React.createRef<HTMLDivElement>()
      const titleRef = React.createRef<HTMLHeadingElement>()
      const descriptionRef = React.createRef<HTMLParagraphElement>()

      render(
        <Dialog>
          <DialogTrigger asChild>
            <button type="button">ダイアログを開く</button>
          </DialogTrigger>
          <DialogContent ref={contentRef}>
            <DialogTitle ref={titleRef}>タイトル</DialogTitle>
            <DialogDescription ref={descriptionRef}>説明</DialogDescription>
          </DialogContent>
        </Dialog>
      )

      await openDialog()

      await waitFor(() => {
        expect(contentRef.current).toBeInstanceOf(HTMLDivElement)
        expect(titleRef.current).toBeInstanceOf(HTMLHeadingElement)
        expect(descriptionRef.current).toBeInstanceOf(HTMLParagraphElement)
      })
    })
  })
})
