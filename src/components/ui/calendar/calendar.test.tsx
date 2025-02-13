/**
 * @file カレンダーコンポーネントのテスト
 * @description カレンダーコンポーネントの機能をテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import { Calendar } from '.'
import { addDays, addMonths } from 'date-fns'
import { ja } from 'date-fns/locale'

describe('Calendarコンポーネント', () => {
  const today = new Date()

  it('カレンダーが正しくレンダリングされること', () => {
    render(<Calendar mode="single" />)
    
    // 現在の月が表示されていることを確認
    expect(screen.getByRole('grid')).toBeInTheDocument()
    expect(screen.getByText(today.getDate().toString())).toBeInTheDocument()
  })

  it('選択した日付が正しく反映されること', async () => {
    const onSelect = vi.fn()
    const { user } = render(
      <Calendar
        mode="single"
        selected={today}
        onSelect={onSelect}
      />
    )

    // 翌日の日付をクリック
    const tomorrow = addDays(today, 1)
    const tomorrowButton = screen.getByRole('button', {
      name: new RegExp(tomorrow.getDate().toString())
    })
    await user.click(tomorrowButton)

    expect(onSelect).toHaveBeenCalledWith(tomorrow)
  })

  it('月の移動が正しく機能すること', async () => {
    const { user } = render(<Calendar mode="single" />)

    // 現在の月を取得
    const currentMonth = today.toLocaleDateString('ja', { month: 'long' })
    expect(screen.getByText(currentMonth)).toBeInTheDocument()

    // 次の月ボタンをクリック
    const nextButton = screen.getByRole('button', { name: '次の月' })
    await user.click(nextButton)

    // 次の月が表示されていることを確認
    const nextMonth = addMonths(today, 1).toLocaleDateString('ja', { month: 'long' })
    expect(screen.getByText(nextMonth)).toBeInTheDocument()
  })

  it('複数選択モードが正しく機能すること', async () => {
    const onSelect = vi.fn()
    const { user } = render(
      <Calendar
        mode="multiple"
        selected={[today]}
        onSelect={onSelect}
      />
    )

    // 複数の日付を選択
    const tomorrow = addDays(today, 1)
    const tomorrowButton = screen.getByRole('button', {
      name: new RegExp(tomorrow.getDate().toString())
    })
    await user.click(tomorrowButton)

    expect(onSelect).toHaveBeenCalledWith(expect.arrayContaining([today, tomorrow]))
  })

  it('範囲選択モードが正しく機能すること', async () => {
    const onSelect = vi.fn()
    const { user } = render(
      <Calendar
        mode="range"
        onSelect={onSelect}
      />
    )

    // 開始日を選択
    const startDate = screen.getByRole('button', {
      name: new RegExp(today.getDate().toString())
    })
    await user.click(startDate)

    // 終了日を選択
    const endDate = screen.getByRole('button', {
      name: new RegExp(addDays(today, 3).getDate().toString())
    })
    await user.click(endDate)

    expect(onSelect).toHaveBeenCalledWith({
      from: today,
      to: addDays(today, 3)
    })
  })

  it('無効な日付が選択できないこと', async () => {
    const onSelect = vi.fn()
    const { user } = render(
      <Calendar
        mode="single"
        disabled={(date) => date < today}
        onSelect={onSelect}
      />
    )

    // 過去の日付をクリック
    const pastDate = screen.getByRole('button', {
      name: new RegExp(addDays(today, -1).getDate().toString())
    })
    await user.click(pastDate)

    expect(onSelect).not.toHaveBeenCalled()
  })
}) 