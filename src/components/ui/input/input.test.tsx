/**
 * @file 入力フィールドコンポーネントのテスト
 * @description 入力フィールドコンポーネントの機能をテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '.'

describe('Inputコンポーネント', () => {
  it('入力フィールドが正しくレンダリングされること', () => {
    render(<Input placeholder="テキストを入力" />)
    expect(screen.getByPlaceholderText('テキストを入力')).toBeInTheDocument()
  })

  it('入力値が正しく更新されること', async () => {
    const user = userEvent.setup()
    render(<Input placeholder="テキストを入力" />)

    const input = screen.getByPlaceholderText('テキストを入力')
    await user.type(input, 'テスト入力')
    expect(input).toHaveValue('テスト入力')
  })

  it('disabled状態が正しく適用されること', () => {
    render(<Input disabled placeholder="テキストを入力" />)
    expect(screen.getByPlaceholderText('テキストを入力')).toBeDisabled()
  })

  it('カスタムクラスが適用されること', () => {
    render(<Input className="custom-input" placeholder="テキストを入力" />)
    expect(screen.getByPlaceholderText('テキストを入力')).toHaveClass('custom-input')
  })

  it('type属性が正しく適用されること', () => {
    render(<Input type="password" placeholder="パスワードを入力" />)
    expect(screen.getByPlaceholderText('パスワードを入力')).toHaveAttribute('type', 'password')
  })
}) 