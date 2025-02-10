/**
 * @file Sheetコンポーネントのテスト
 * @description Sheetコンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@/tests/test-utils'
import { userEvent } from '@testing-library/user-event'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '.'

describe('Sheet', () => {
  describe('基本機能テスト', () => {
    it('トリガーをクリックするとSheetが開くこと', async () => {
      const user = userEvent.setup()
      
      render(
        <Sheet>
          <SheetTrigger asChild>
            <button type="button">シートを開く</button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>シートのタイトル</SheetTitle>
              <SheetDescription>シートの説明文</SheetDescription>
            </SheetHeader>
            <div>シートのコンテンツ</div>
            <SheetFooter>
              <SheetClose asChild>
                <button type="button">閉じる</button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )

      const trigger = screen.getByText('シートを開く')
      await user.click(trigger)

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
        expect(screen.getByText('シートのタイトル')).toBeInTheDocument()
        expect(screen.getByText('シートの説明文')).toBeInTheDocument()
        expect(screen.getByText('シートのコンテンツ')).toBeInTheDocument()
      })
    })

    it('閉じるボタンをクリックするとSheetが閉じること', async () => {
      const user = userEvent.setup()
      
      render(
        <Sheet defaultOpen>
          <SheetTrigger asChild>
            <button type="button">シートを開く</button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>シートのタイトル</SheetTitle>
            </SheetHeader>
            <SheetClose asChild>
              <button type="button">閉じる</button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      )

      const closeButton = screen.getByText('閉じる')
      await user.click(closeButton)

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })
  })

  describe('アクセシビリティテスト', () => {
    it('適切なARIA属性が設定されていること', async () => {
      const user = userEvent.setup()
      
      render(
        <Sheet>
          <SheetTrigger asChild>
            <button type="button">シートを開く</button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>アクセシブルなタイトル</SheetTitle>
              <SheetDescription>アクセシブルな説明</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )

      const trigger = screen.getByText('シートを開く')
      await user.click(trigger)

      await waitFor(() => {
        const dialog = screen.getByRole('dialog')
        expect(dialog).toHaveAttribute('aria-modal', 'true')
        expect(dialog).toHaveAttribute('role', 'dialog')
      })
    })

    it('Escapeキーで閉じることができること', async () => {
      const user = userEvent.setup()
      
      render(
        <Sheet defaultOpen>
          <SheetTrigger asChild>
            <button type="button">シートを開く</button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle>シートのタイトル</SheetTitle>
          </SheetContent>
        </Sheet>
      )

      const dialog = screen.getByRole('dialog')
      await user.keyboard('{Escape}')

      await waitFor(() => {
        expect(dialog).not.toBeInTheDocument()
      })
    })
  })

  describe('表示位置テスト', () => {
    it('各サイドから表示できること', async () => {
      const positions = ['top', 'right', 'bottom', 'left'] as const
      const user = userEvent.setup()

      for (const position of positions) {
        const { rerender } = render(
          <Sheet>
            <SheetTrigger asChild>
              <button type="button">{position}から表示</button>
            </SheetTrigger>
            <SheetContent side={position}>
              <SheetTitle>{position}サイドのシート</SheetTitle>
            </SheetContent>
          </Sheet>
        )

        const trigger = screen.getByText(`${position}から表示`)
        await user.click(trigger)

        await waitFor(() => {
          const dialog = screen.getByRole('dialog')
          expect(dialog).toHaveAttribute('data-side', position)
          expect(screen.getByText(`${position}サイドのシート`)).toBeInTheDocument()
        })

        // 次のテストのために閉じる
        await user.keyboard('{Escape}')
        rerender(<div />)
      }
    })
  })

  describe('オーバーレイテスト', () => {
    it('オーバーレイをクリックするとSheetが閉じること', async () => {
      const user = userEvent.setup()
      
      render(
        <Sheet defaultOpen>
          <SheetContent>
            <SheetTitle>シートのタイトル</SheetTitle>
          </SheetContent>
        </Sheet>
      )

      // オーバーレイは[role="presentation"]を持つ要素
      const overlay = screen.getByRole('presentation')
      await user.click(overlay)

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })
  })
}) 