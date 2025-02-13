/**
 * @file カレンダーコンポーネントのテスト
 * @description カレンダーコンポーネントの機能をテストします
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import userEvent from '@testing-library/user-event'
import { Calendar } from '.'
import { addDays, addMonths } from 'date-fns'

describe('Calendarコンポーネント', () => {
  const today = new Date()
  const user = userEvent.setup()

  it('カレンダーが正しくレンダリングされること', () => {
    render(<Calendar mode="single" />)
    
    // 現在の月が表示されていることを確認
    expect(screen.getByRole('grid')).toBeInTheDocument()
    expect(screen.getByText(today.getDate().toString())).toBeInTheDocument()
  })

  it('選択した日付が正しく反映されること', async () => {
    const onSelect = vi.fn()
    render(
      <Calendar
        mode="single"
        selected={today}
        onSelect={onSelect}
      />
    )

    // 翌日の日付をクリック
    const tomorrow = addDays(today, 1)
    const tomorrowButton = screen.getByRole('button', {
      name: new RegExp(`${tomorrow.getDate()}日`, 'i')
    })
    await user.click(tomorrowButton)

    expect(onSelect).toHaveBeenCalled()
  })

  it('月の移動が正しく機能すること', async () => {
    render(<Calendar mode="single" />)

    // 現在の月を取得
    const currentMonth = today.toLocaleDateString('ja', { month: 'long' })
    expect(screen.getByText(currentMonth, { exact: false })).toBeInTheDocument()

    // 次の月ボタンをクリック
    const nextButton = screen.getByLabelText('Go to the Next Month')
    await user.click(nextButton)

    // 次の月が表示されていることを確認
    const nextMonth = addMonths(today, 1).toLocaleDateString('ja', { month: 'long' })
    expect(screen.getByText(nextMonth, { exact: false })).toBeInTheDocument()
  })

  it('複数選択モードが正しく機能すること', async () => {
    const onSelect = vi.fn()
    render(
      <Calendar
        mode="multiple"
        selected={[today]}
        onSelect={onSelect}
      />
    )

    // 複数の日付を選択
    const tomorrow = addDays(today, 1)
    const tomorrowButton = screen.getByRole('button', {
      name: new RegExp(`${tomorrow.getDate()}日`, 'i')
    })
    await user.click(tomorrowButton)

    expect(onSelect).toHaveBeenCalled()
    const calls = onSelect.mock.calls
    expect(calls.length).toBeGreaterThan(0)
    const lastCall = calls[calls.length - 1][0]
    expect(Array.isArray(lastCall)).toBe(true)
    expect(lastCall.length).toBeGreaterThanOrEqual(2)
  })

  it('範囲選択モードが正しく機能すること', async () => {
    const onSelect = vi.fn()
    render(
      <Calendar
        mode="range"
        onSelect={onSelect}
      />
    )

    // 開始日を選択
    const startDate = screen.getByRole('button', {
      name: new RegExp(`${today.getDate()}日`, 'i')
    })
    await user.click(startDate)

    // 終了日を選択
    const endDate = screen.getByRole('button', {
      name: new RegExp(`${addDays(today, 3).getDate()}日`, 'i')
    })
    await user.click(endDate)

    expect(onSelect).toHaveBeenCalled()
    const calls = onSelect.mock.calls
    expect(calls.length).toBeGreaterThan(0)
    const lastCall = calls[calls.length - 1][0]
    expect(lastCall).toHaveProperty('from')
    expect(lastCall).toHaveProperty('to')
    expect(lastCall.from).toBeInstanceOf(Date)
    expect(lastCall.to).toBeInstanceOf(Date)
  })

  it('無効な日付が選択できないこと', async () => {
    const onSelect = vi.fn()
    const yesterday = addDays(today, -1)
    render(
      <Calendar
        mode="single"
        disabled={(date) => date < today}
        onSelect={onSelect}
      />
    )

    // 過去の日付をクリック
    const pastDate = screen.getByRole('button', {
      name: new RegExp(`${yesterday.getDate()}日`, 'i')
    })
    await user.click(pastDate)

    expect(onSelect).not.toHaveBeenCalled()
  })
}) 