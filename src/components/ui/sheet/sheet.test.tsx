/**
 * @file シートコンポーネントのテスト
 * @description シートコンポーネントの機能をテストします
 */
import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

describe('Sheetコンポーネント', () => {
  it('トリガーが正しくレンダリングされること', () => {
    render(
      <Sheet>
        <SheetTrigger>開く</SheetTrigger>
        <SheetContent>
          <SheetDescription>シートの説明</SheetDescription>
          <div>コンテンツ</div>
        </SheetContent>
      </Sheet>
    )
    expect(screen.getByText('開く')).toBeInTheDocument()
  })

  it('トリガーをクリックするとシートが開くこと', async () => {
    const user = userEvent.setup()
    render(
      <Sheet>
        <SheetTrigger>開く</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>シートタイトル</SheetTitle>
            <SheetDescription>シートの説明</SheetDescription>
          </SheetHeader>
          コンテンツ
        </SheetContent>
      </Sheet>
    )

    await user.click(screen.getByText('開く'))
    expect(screen.getByText('コンテンツ')).toBeInTheDocument()
  })

  it('カスタムクラス名が正しく適用されること', () => {
    render(
      <Sheet>
        <SheetTrigger className="custom-trigger">開く</SheetTrigger>
        <SheetContent className="custom-content">
          <SheetDescription>シートの説明</SheetDescription>
          <div>コンテンツ</div>
        </SheetContent>
      </Sheet>
    )

    expect(screen.getByText('開く')).toHaveClass('custom-trigger')
  })

  it('ヘッダーとフッターが正しくレンダリングされること', async () => {
    const user = userEvent.setup()
    render(
      <Sheet>
        <SheetTrigger>開く</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>タイトル</SheetTitle>
            <SheetDescription>シートの説明</SheetDescription>
          </SheetHeader>
          <div>コンテンツ</div>
          <SheetFooter>
            <button type="button">アクション</button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    )

    await user.click(screen.getByText('開く'))
    expect(screen.getByText('タイトル')).toBeInTheDocument()
    expect(screen.getByText('アクション')).toBeInTheDocument()
  })

  it('閉じるボタンをクリックするとシートが閉じること', async () => {
    const user = userEvent.setup()
    render(
      <Sheet>
        <SheetTrigger>開く</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>シートタイトル</SheetTitle>
            <SheetDescription>シートの説明</SheetDescription>
          </SheetHeader>
          コンテンツ
        </SheetContent>
      </Sheet>
    )

    await user.click(screen.getByText('開く'))
    expect(screen.getByText('コンテンツ')).toBeInTheDocument()

    const closeButton = screen.getByRole('button', { name: '閉じる' })
    await user.click(closeButton)
    
    await waitFor(() => {
      expect(screen.queryByText('コンテンツ')).not.toBeInTheDocument()
    })
  })

  it('オーバーレイをクリックするとシートが閉じること', async () => {
    const user = userEvent.setup()
    render(
      <Sheet>
        <SheetTrigger>開く</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>シートタイトル</SheetTitle>
            <SheetDescription>シートの説明</SheetDescription>
          </SheetHeader>
          コンテンツ
        </SheetContent>
      </Sheet>
    )

    await user.click(screen.getByText('開く'))
    expect(screen.getByText('コンテンツ')).toBeInTheDocument()

    const overlay = screen.getByTestId('sheet-overlay')
    await user.click(overlay)
    await waitFor(() => {
      expect(screen.queryByText('コンテンツ')).not.toBeInTheDocument()
    })
  })

  it('サイドスタイルが正しく適用されること', async () => {
    const user = userEvent.setup()
    render(
      <Sheet>
        <SheetTrigger>開く</SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>シートタイトル</SheetTitle>
            <SheetDescription>シートの説明</SheetDescription>
          </SheetHeader>
          コンテンツ
        </SheetContent>
      </Sheet>
    )

    await user.click(screen.getByText('開く'))
    const content = screen.getByText('コンテンツ').closest('[class*="right-0"]')
    expect(content).toHaveClass('right-0')
  })

  it('閉じるボタンにフォーカススタイルが適用されること', async () => {
    const user = userEvent.setup()
    render(
      <Sheet>
        <SheetTrigger>開く</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>シートタイトル</SheetTitle>
            <SheetDescription>シートの説明</SheetDescription>
          </SheetHeader>
          コンテンツ
        </SheetContent>
      </Sheet>
    )

    await user.click(screen.getByText('開く'))
    const closeButton = screen.getByRole('button', { name: '閉じる' })
    await user.tab()

    expect(closeButton).toHaveFocus()
    expect(closeButton).toHaveClass('focus:ring-2')
  })
}) 