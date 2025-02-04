/**
 * @file RadioGroupのテスト
 * @description RadioGroupの機能とアクセシビリティをテスト
 */

import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RadioGroup, RadioGroupItem, RadioGroupItemText } from '@/components/ui/radio-group'

describe('RadioGroup', () => {
  it('デフォルト値が正しく設定されること', () => {
    render(
      <RadioGroup defaultValue="option1">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="option1" />
          <RadioGroupItemText htmlFor="option1">オプション1</RadioGroupItemText>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="option2" />
          <RadioGroupItemText htmlFor="option2">オプション2</RadioGroupItemText>
        </div>
      </RadioGroup>,
    )

    const option1 = screen.getByRole('radio', { name: 'オプション1' })
    const option2 = screen.getByRole('radio', { name: 'オプション2' })

    expect(option1).toBeChecked()
    expect(option2).not.toBeChecked()
  })

  it('値を変更できること', async () => {
    render(
      <RadioGroup defaultValue="option1">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="option1" />
          <RadioGroupItemText htmlFor="option1">オプション1</RadioGroupItemText>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="option2" />
          <RadioGroupItemText htmlFor="option2">オプション2</RadioGroupItemText>
        </div>
      </RadioGroup>,
    )

    const option1 = screen.getByRole('radio', { name: 'オプション1' })
    const option2 = screen.getByRole('radio', { name: 'オプション2' })

    expect(option1).toBeChecked()
    expect(option2).not.toBeChecked()

    await userEvent.click(option2)

    expect(option1).not.toBeChecked()
    expect(option2).toBeChecked()

    await userEvent.click(option1)

    expect(option1).toBeChecked()
    expect(option2).not.toBeChecked()
  })

  it('無効化されたラジオボタンがクリックできないこと', async () => {
    render(
      <RadioGroup defaultValue="option1">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="option1" />
          <RadioGroupItemText htmlFor="option1">オプション1</RadioGroupItemText>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="option2" disabled />
          <RadioGroupItemText htmlFor="option2">オプション2</RadioGroupItemText>
        </div>
      </RadioGroup>,
    )

    const option1 = screen.getByRole('radio', { name: 'オプション1' })
    const option2 = screen.getByRole('radio', { name: 'オプション2' })

    await userEvent.click(option2)

    expect(option1).toBeChecked()
    expect(option2).not.toBeChecked()
    expect(option2).toBeDisabled()
  })
}) 