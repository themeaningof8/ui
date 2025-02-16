/**
 * @file チェックボックスコンポーネントのテスト
 * @description チェックボックスコンポーネントの機能をテストします
 */

import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from '.'

describe('Checkboxコンポーネント', () => {
  it('基本的なチェックボックスが正しくレンダリングされること', () => {
    render(<Checkbox aria-label="テストチェックボックス" />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('チェック状態が正しく切り替わること', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Checkbox onCheckedChange={onCheckedChange} aria-label="テストチェックボックス" />)

    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)
    expect(onCheckedChange).toHaveBeenCalledWith(true)

    await user.click(checkbox)
    expect(onCheckedChange).toHaveBeenCalledWith(false)
  })

  it('無効状態が正しく適用されること', () => {
    render(<Checkbox disabled aria-label="テストチェックボックス" />)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  it('カスタムクラス名が正しく適用されること', () => {
    render(<Checkbox className="custom-class" aria-label="テストチェックボックス" />)
    expect(screen.getByRole('checkbox')).toHaveClass('custom-class')
  })

  it('ラベルと正しく連携すること', () => {
    render(
      <div>
        <Checkbox id="test-checkbox" aria-label="テストチェックボックス" />
        <label htmlFor="test-checkbox">テストラベル</label>
      </div>
    )
    const checkbox = screen.getByLabelText('テストラベル')
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toHaveAttribute('role', 'checkbox')
  })
}) 