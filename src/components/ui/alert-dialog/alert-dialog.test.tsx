/**
 * @file アラートダイアログコンポーネントのテスト
 * @description アラートダイアログコンポーネントの機能をテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '.'

describe('アラートダイアログコンポーネント', () => {
  it('トリガーをクリックするとダイアログが表示されること', async () => {
    const { user } = render(
      <AlertDialog>
        <AlertDialogTrigger>開く</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確認</AlertDialogTitle>
            <AlertDialogDescription>
              この操作は取り消せません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction>続行</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )

    // 初期状態ではダイアログは表示されていない
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()

    // トリガーをクリック
    await user.click(screen.getByText('開く'))

    // ダイアログが表示される
    expect(screen.getByRole('alertdialog')).toBeInTheDocument()
    expect(screen.getByText('確認')).toBeInTheDocument()
    expect(screen.getByText('この操作は取り消せません。')).toBeInTheDocument()
  })

  it('キャンセルボタンをクリックするとダイアログが閉じること', async () => {
    const { user } = render(
      <AlertDialog>
        <AlertDialogTrigger>開く</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確認</AlertDialogTitle>
            <AlertDialogDescription>
              この操作は取り消せません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction>続行</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )

    // ダイアログを開く
    await user.click(screen.getByText('開く'))
    expect(screen.getByRole('alertdialog')).toBeInTheDocument()

    // キャンセルボタンをクリック
    await user.click(screen.getByText('キャンセル'))
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
  })

  it('アクションボタンをクリックするとダイアログが閉じること', async () => {
    const { user } = render(
      <AlertDialog>
        <AlertDialogTrigger>開く</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確認</AlertDialogTitle>
            <AlertDialogDescription>
              この操作は取り消せません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction>続行</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )

    // ダイアログを開く
    await user.click(screen.getByText('開く'))
    expect(screen.getByRole('alertdialog')).toBeInTheDocument()

    // 続行ボタンをクリック
    await user.click(screen.getByText('続行'))
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
  })
}) 