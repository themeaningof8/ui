/**
 * @file InputOTPコンポーネントのテスト
 * @description InputOTPコンポーネントの機能をテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '.'

describe('InputOTPコンポーネント', () => {
  it('基本的なOTP入力フィールドが正しくレンダリングされること', () => {
    render(
      <InputOTP maxLength={4} value="" onChange={() => {}}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
    )

    const inputs = screen.getAllByLabelText(/Digit \d+/)
    expect(inputs).toHaveLength(4)
    let index = 0
    for (const input of inputs) {
      expect(input).toHaveAttribute('data-index', index.toString())
      expect(input).toHaveAttribute('aria-label', `Digit ${index + 1}`)
      index++
    }
  })

  it('各スロットが正しいインデックスを持つこと', () => {
    render(
      <InputOTP maxLength={2} value="" onChange={() => {}}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
      </InputOTP>
    )

    const inputs = screen.getAllByLabelText(/Digit \d+/)
    expect(inputs).toHaveLength(2)
    let index = 0
    for (const input of inputs) {
      expect(input).toHaveAttribute('data-index', index.toString())
      index++
    }
  })

  it('カスタムプレースホルダーが正しく表示されること', () => {
    render(
      <InputOTP maxLength={2} value="" onChange={() => {}}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
      </InputOTP>
    )

    const inputs = screen.getAllByLabelText(/Digit \d+/)
    expect(inputs).toHaveLength(2)
    for (const input of inputs) {
      expect(input).toHaveAttribute('placeholder', '○')
    }
  })

  it('無効状態が正しく適用されること', () => {
    render(
      <InputOTP maxLength={2} value="" onChange={() => {}} disabled>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
      </InputOTP>
    )

    const inputs = screen.getAllByLabelText(/Digit \d+/)
    for (const input of inputs) {
      expect(input).toBeDisabled()
    }
  })
}) 