/**
 * @file AlertDialogコンポーネントのテスト
 * @description AlertDialogコンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@/tests/test-utils'
import { userEvent } from '@testing-library/user-event'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '.'

describe('AlertDialog', () => {
  describe('基本機能テスト', () => {
    it('トリガーをクリックするとダイアログが開くこと', async () => {
      const user = userEvent.setup()

      render(
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button type="button">開く</button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>確認</AlertDialogTitle>
              <AlertDialogDescription>
                この操作は取り消せません。続行しますか？
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>キャンセル</AlertDialogCancel>
              <AlertDialogAction>続行</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByText('開く'))

      await waitFor(() => {
        expect(screen.getByRole('alertdialog')).toBeVisible()
      })
    })

    it('ダイアログが開いている状態でEscapeキーを押すとダイアログが閉じること', async () => {
      const user = userEvent.setup()

      render(
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button type="button">開く</button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>確認</AlertDialogTitle>
              <AlertDialogDescription>
                この操作は取り消せません。続行しますか？
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>キャンセル</AlertDialogCancel>
              <AlertDialogAction>続行</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByText('開く'))
      await user.keyboard('{Escape}')

      await waitFor(() => {
        expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
      })
    })

    it('キャンセルボタンをクリックするとダイアログが閉じること', async () => {
      const user = userEvent.setup()

      render(
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button type="button">開く</button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>確認</AlertDialogTitle>
              <AlertDialogDescription>
                この操作は取り消せません。続行しますか？
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>キャンセル</AlertDialogCancel>
              <AlertDialogAction>続行</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByText('開く'))
      await user.click(screen.getByText('キャンセル'))

      await waitFor(() => {
        expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
      })
    })

    it('続行ボタンをクリックできること', async () => {
      const user = userEvent.setup()
      const onAction = vi.fn()

      render(
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button type="button">開く</button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>確認</AlertDialogTitle>
              <AlertDialogDescription>
                この操作は取り消せません。続行しますか？
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>キャンセル</AlertDialogCancel>
              <AlertDialogAction onClick={onAction}>続行</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByText('開く'))
      await user.click(screen.getByText('続行'))

      expect(onAction).toHaveBeenCalledTimes(1)
    })
  })

  describe('アクセシビリティテスト', () => {
    it('aria-labelledby と aria-describedby が正しく設定されていること', async () => {
      const user = userEvent.setup()

      render(
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button type="button">開く</button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>確認</AlertDialogTitle>
              <AlertDialogDescription>
                この操作は取り消せません。続行しますか？
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>キャンセル</AlertDialogCancel>
              <AlertDialogAction>続行</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByText('開く'))

      const dialog = screen.getByRole('alertdialog')
      expect(dialog).toHaveAttribute('aria-labelledby')
      expect(dialog).toHaveAttribute('aria-describedby')
    })
  })

  describe('スタイルテスト', () => {
    it('カスタムクラスが適用できること', async () => {
      const user = userEvent.setup()

      render(
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button type="button">開く</button>
          </AlertDialogTrigger>
          <AlertDialogContent className="custom-content">
            <AlertDialogHeader className="custom-header">
              <AlertDialogTitle className="custom-title">スタイルテスト</AlertDialogTitle>
              <AlertDialogDescription className="custom-description">
                カスタムクラスのテストです
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="custom-footer">
              <AlertDialogCancel className="custom-cancel">キャンセル</AlertDialogCancel>
              <AlertDialogAction className="custom-action">続行</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByText('開く'))

      await waitFor(() => {
        expect(screen.getByRole('alertdialog')).toHaveClass('custom-content')
        expect(screen.getByText('スタイルテスト').parentElement).toHaveClass('custom-header')
        expect(screen.getByText('スタイルテスト')).toHaveClass('custom-title')
        expect(screen.getByText('カスタムクラスのテストです')).toHaveClass('custom-description')
        expect(screen.getByText('キャンセル').parentElement).toHaveClass('custom-footer')
        expect(screen.getByText('キャンセル')).toHaveClass('custom-cancel')
        expect(screen.getByText('続行')).toHaveClass('custom-action')
      })
    })
  })
}) 