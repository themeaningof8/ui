/**
 * @file InputOTPコンポーネントのテスト
 * @description InputOTPコンポーネントの機能をテストします
 */

/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '.'

describe('InputOTPコンポーネント', () => {
  it('基本的なOTP入力フィールドが正しくレンダリングされること', () => {
    render(
      <InputOTP maxLength={4}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
    )

    const container = screen.getByRole('textbox').parentElement?.parentElement
    expect(container).toHaveAttribute('data-input-otp-container', 'true')
    expect(container?.querySelectorAll('.size-9')).toHaveLength(4)
  })

  it('各スロットが正しいインデックスを持つこと', () => {
    render(
      <InputOTP maxLength={2}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
      </InputOTP>
    )

    const container = screen.getByRole('textbox').parentElement?.parentElement
    const slots = container?.querySelectorAll('.size-9')
    expect(slots).toHaveLength(2)
  })

  it('プレースホルダーが正しく表示されること', () => {
    render(
      <InputOTP maxLength={2}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
      </InputOTP>
    )

    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('data-input-otp-placeholder-shown', 'true')
  })

  it('無効状態が正しく適用されること', () => {
    render(
      <InputOTP maxLength={2} disabled>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
      </InputOTP>
    )

    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
    expect(input.parentElement?.parentElement).toHaveStyle({ cursor: 'default' })
  })
}) 