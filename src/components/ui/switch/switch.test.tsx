/**
 * @file Switchコンポーネントのテスト
 * @description Switchコンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import { Switch } from '.'
import userEvent from '@testing-library/user-event'

describe('Switch', () => {
  describe('基本機能テスト', () => {
    it('基本的なスイッチが正しくレンダリングされること', () => {
      render(
        <Switch
          id="airplane-mode"
          aria-label="機内モード"
        />
      )
      
      const switchElement = screen.getByRole('switch', { name: '機内モード' })
      expect(switchElement).toBeInTheDocument()
      expect(switchElement).not.toBeChecked()
    })

    it('デフォルトでチェックされた状態でレンダリングされること', () => {
      render(
        <Switch
          defaultChecked
          id="notifications"
          aria-label="通知"
        />
      )
      
      const switchElement = screen.getByRole('switch')
      expect(switchElement).toBeChecked()
    })

    it('クリックでトグルが正しく動作すること', async () => {
      const user = userEvent.setup()
      const onCheckedChange = vi.fn()

      render(
        <Switch
          id="wifi"
          aria-label="Wi-Fi"
          onCheckedChange={onCheckedChange}
        />
      )
      
      const switchElement = screen.getByRole('switch')
      await user.click(switchElement)
      expect(onCheckedChange).toHaveBeenCalledWith(true)
    })
  })

  describe('アクセシビリティテスト', () => {
    it('適切なARIA属性が設定されていること', () => {
      render(
        <Switch
          id="bluetooth"
          aria-label="Bluetooth"
          aria-describedby="bluetooth-desc"
        />
      )
      
      const switchElement = screen.getByRole('switch')
      expect(switchElement).toHaveAttribute('aria-label', 'Bluetooth')
      expect(switchElement).toHaveAttribute('aria-describedby', 'bluetooth-desc')
      expect(switchElement).toHaveAttribute('role', 'switch')
    })

    it('キーボード操作が正しく動作すること', async () => {
      const user = userEvent.setup()
      const onCheckedChange = vi.fn()

      render(
        <Switch
          id="dark-mode"
          aria-label="ダークモード"
          onCheckedChange={onCheckedChange}
        />
      )
      
      const switchElement = screen.getByRole('switch')
      await user.tab()
      expect(switchElement).toHaveFocus()
      await user.keyboard('[Space]')
      expect(onCheckedChange).toHaveBeenCalledWith(true)
    })
  })

  describe('スタイルテスト', () => {
    it('デフォルトのスタイルが適用されること', () => {
      render(
        <Switch
          id="test-switch"
          aria-label="テストスイッチ"
        />
      )
      
      const switchElement = screen.getByRole('switch')
      expect(switchElement).toHaveClass('peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input')
    })

    it('カスタムクラスが適用できること', () => {
      render(
        <Switch
          id="custom-switch"
          aria-label="カスタムスイッチ"
          className="custom-switch"
        />
      )
      
      const switchElement = screen.getByRole('switch')
      expect(switchElement).toHaveClass('custom-switch')
    })
  })

  describe('エッジケーステスト', () => {
    it('無効状態が正しく表示されること', () => {
      render(
        <Switch
          id="disabled-switch"
          aria-label="無効なスイッチ"
          disabled
        />
      )
      
      const switchElement = screen.getByRole('switch')
      expect(switchElement).toBeDisabled()
      expect(switchElement).toHaveClass('disabled:cursor-not-allowed disabled:opacity-50')
    })

    it('フォーカス状態のスタイルが正しく適用されること', async () => {
      const user = userEvent.setup()

      render(
        <Switch
          id="focus-switch"
          aria-label="フォーカステスト"
        />
      )
      
      const switchElement = screen.getByRole('switch')
      await user.tab()
      expect(switchElement).toHaveFocus()
      expect(switchElement).toHaveClass('focus-visible:ring-2')
    })
  })

  describe('コンテキストテスト', () => {
    it('フォーム内でのスイッチが正しく動作すること', () => {
      render(
        <form>
          <div className="flex items-center space-x-2">
            <Switch id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              利用規約に同意する
            </label>
          </div>
        </form>
      )
      
      const switchElement = screen.getByRole('switch')
      const label = screen.getByText('利用規約に同意する')
      expect(switchElement).toHaveAttribute('id', 'terms')
      expect(label).toHaveAttribute('for', 'terms')
    })

    it('ラベルとの関連付けが正しく動作すること', () => {
      render(
        <div className="flex items-center space-x-2">
          <Switch
            id="marketing"
            aria-labelledby="marketing-label"
          />
          <label
            id="marketing-label"
            htmlFor="marketing"
            className="text-sm font-medium leading-none"
          >
            マーケティングメールを受け取る
          </label>
        </div>
      )
      
      const switchElement = screen.getByRole('switch')
      expect(switchElement).toHaveAttribute('aria-labelledby', 'marketing-label')
    })
  })
}) 