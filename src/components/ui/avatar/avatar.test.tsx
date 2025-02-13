/**
 * @file アバターコンポーネントのテスト
 * @description アバターコンポーネントの機能をテストします
 */

import { render, screen, waitFor, act } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { Avatar, AvatarImage, AvatarFallback } from '.'

describe('アバターコンポーネント', () => {
  beforeEach(() => {
    // 画像の読み込みをシミュレートするモック
    const originalImage = window.Image
    window.Image = class extends originalImage {
      constructor() {
        super()
        setTimeout(() => {
          if (this.onload) this.onload(new Event('load'))
        }, 0)
      }
    }

    return () => {
      window.Image = originalImage
    }
  })

  it('画像が正しくレンダリングされること', async () => {
    render(
      <Avatar>
        <AvatarImage src="test.jpg" alt="テストユーザー" />
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    )

    await waitFor(() => {
      const image = screen.getByAltText('テストユーザー')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', 'test.jpg')
    })
  })

  it('画像の読み込みに失敗した場合にフォールバックが表示されること', async () => {
    // 画像の読み込み失敗をシミュレート
    window.Image = class extends window.Image {
      constructor() {
        super()
        setTimeout(() => {
          if (this.onerror) this.onerror(new Event('error'))
        }, 0)
      }
    }

    render(
      <Avatar>
        <AvatarImage src="invalid.jpg" alt="テストユーザー" />
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    )

    await waitFor(() => {
      const fallback = screen.getByText('TU')
      expect(fallback).toBeInTheDocument()
    })
  })

  it('カスタムクラス名が正しく適用されること', async () => {
    render(
      <Avatar className="custom-avatar">
        <AvatarImage className="custom-image" src="test.jpg" alt="テストユーザー" />
        <AvatarFallback className="custom-fallback">TU</AvatarFallback>
      </Avatar>
    )

    await waitFor(() => {
      const avatar = screen.getByAltText('テストユーザー').parentElement
      expect(avatar).toHaveClass('custom-avatar')
      
      const image = screen.getByAltText('テストユーザー')
      expect(image).toHaveClass('custom-image')
    })
  })

  it('フォールバックのみでも正しく表示されること', () => {
    render(
      <Avatar>
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    )

    const fallback = screen.getByText('TU')
    expect(fallback).toBeInTheDocument()
  })

  it('delayMsプロパティが機能すること', async () => {
    vi.useFakeTimers()

    render(
      <Avatar>
        <AvatarFallback delayMs={100}>TU</AvatarFallback>
      </Avatar>
    )

    // 初期状態ではフォールバックは表示されない
    expect(screen.queryByText('TU')).not.toBeInTheDocument()

    // 100ms経過後にフォールバックが表示される
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100)
    })

    expect(screen.getByText('TU')).toBeInTheDocument()

    vi.useRealTimers()
  })
}) 