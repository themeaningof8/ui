/**
 * @file Switchコンポーネントのテスト
 * @description Switchコンポーネントの機能とアクセシビリティをテスト
 */

import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Switch } from '.'

describe('Switch', () => {
  it('正しくレンダリングされること', () => {
    render(<Switch aria-label="テストスイッチ" />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('チェック状態が変更できること', async () => {
    const handleChange = vi.fn()
    render(
      <Switch
        aria-label="テストスイッチ"
        onCheckedChange={handleChange}
        checked={false}
      />,
    )

    const switchElement = screen.getByRole('switch')
    await userEvent.click(switchElement)

    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('無効化された状態で操作できないこと', async () => {
    const handleChange = vi.fn()
    render(
      <Switch
        aria-label="テストスイッチ"
        onCheckedChange={handleChange}
        disabled
      />,
    )

    const switchElement = screen.getByRole('switch')
    await userEvent.click(switchElement)

    expect(handleChange).not.toHaveBeenCalled()
    expect(switchElement).toBeDisabled()
  })

  it('アクセシビリティ属性が正しく設定されていること', () => {
    render(<Switch aria-label="テストスイッチ" checked />)
    
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toHaveAttribute('aria-checked', 'true')
    expect(switchElement).toHaveAttribute('aria-label', 'テストスイッチ')
  })

  it('ラベルと正しく関連付けられること', () => {
    render(
      <div>
        <Switch id="test-switch" aria-label="テストスイッチ" />
        <label htmlFor="test-switch">テストスイッチ</label>
      </div>,
    )

    const switchElement = screen.getByRole('switch')
    const label = screen.getByText('テストスイッチ')

    expect(switchElement).toHaveAttribute('id', 'test-switch')
    expect(label).toHaveAttribute('for', 'test-switch')
  })
}) 