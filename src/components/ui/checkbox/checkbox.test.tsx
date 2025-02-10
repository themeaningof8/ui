/**
 * @file Checkboxコンポーネントのテスト
 * @description Checkboxコンポーネントの機能、バリアント、アクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import { userEvent } from '@testing-library/user-event'
import { Checkbox } from '.'

describe('Checkbox', () => {
  describe('基本機能テスト', () => {
    it('Checkboxが正しくレンダリングされること', () => {
      render(< Checkbox id="test-checkbox" />)
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeInTheDocument()
      expect(checkbox).not.toBeChecked()
    })

    it('クリックでチェック状態が変更されること', async () => {
      const user = userEvent.setup()
      render(< Checkbox id="test-checkbox" />)

      const checkbox = screen.getByRole('checkbox')
      await user.click(checkbox)
      expect(checkbox).toBeChecked()

      await user.click(checkbox)
      expect(checkbox).not.toBeChecked()
    })

    it('disabled状態で正しく動作すること', async () => {
      const user = userEvent.setup()
      render(< Checkbox id="test-checkbox" disabled />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeDisabled()

      await user.click(checkbox) // クリックしても状態は変わらない
      expect(checkbox).not.toBeChecked()
    })

    it('defaultChecked propで初期状態をチェック済みにできること', () => {
      render(< Checkbox id="test-checkbox" defaultChecked />)
      expect(screen.getByRole('checkbox')).toBeChecked()
    })

    it('onCheckedChangeイベントが正しく発火すること', async () => {
      const user = userEvent.setup()
      const onCheckedChange = vi.fn()
      render(< Checkbox id="test-checkbox" onCheckedChange={onCheckedChange} />)

      const checkbox = screen.getByRole('checkbox')
      await user.click(checkbox)
      expect(onCheckedChange).toHaveBeenCalledTimes(1)
      expect(onCheckedChange).toHaveBeenCalledWith(true)

      await user.click(checkbox)
      expect(onCheckedChange).toHaveBeenCalledTimes(2)
      expect(onCheckedChange).toHaveBeenCalledWith(false)
    })

    it('indeterminate状態で正しく動作すること', async () => {
      const user = userEvent.setup()
      render(< Checkbox id="test-checkbox" defaultChecked="indeterminate" />)
    
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toHaveAttribute('data-state', 'indeterminate')
    
      await user.click(checkbox)
      expect(checkbox).toBeChecked()
    })
  })

  describe('アクセシビリティテスト', () => {
    it('aria-label属性が設定できること', () => {
      render(< Checkbox id="test-checkbox" aria-label="テストチェックボックス" />)
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-label', 'テストチェックボックス')
    })

    it('name属性が設定できること', () => {
      render(< Checkbox id="test-checkbox" name="test-name" />)
      expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'test-name')
    })

    it('value属性が設定できること', () => {
      render(< Checkbox id="test-checkbox" value="test-value" />)
      expect(screen.getByRole('checkbox')).toHaveAttribute('value', 'test-value')
    })
  })

  describe('スタイルテスト', () => {
    it('カスタムクラスが適用できること', () => {
      render(< Checkbox id="test-checkbox" className="custom-checkbox" />)
      expect(screen.getByRole('checkbox')).toHaveClass('custom-checkbox')
    })
  })
}) 