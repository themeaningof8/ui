/**
 * @file Switchのテスト
 * @description Switchの機能とアクセシビリティをテスト
 */

import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Switch } from '@/components/ui/switch'
import { 
  runAxeTest,
  runKeyboardNavigationTest,
  runAriaAttributesTest,
  runFocusManagementTest,
  runContrastTest
} from '@/tests/wcag3/helpers'

describe('Switch', () => {
  describe('基本機能', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<Switch aria-label="テストスイッチ" />)
      const switchElement = screen.getByRole('switch')
      expect(switchElement).toBeInTheDocument()
      expect(switchElement).toHaveAttribute('aria-checked', 'false')
    })

    it('無効化状態が適用される', () => {
      render(<Switch aria-label="テストスイッチ" disabled />)
      const switchElement = screen.getByRole('switch')
      expect(switchElement).toBeDisabled()
    })
  })

  describe('インタラクション', () => {
    it('クリックで状態が切り替わる', async () => {
      const handleChange = vi.fn()
      render(
        <Switch
          aria-label="テストスイッチ"
          onCheckedChange={handleChange}
          checked={false}
        />
      )

      const switchElement = screen.getByRole('switch')
      await userEvent.click(switchElement)
      expect(handleChange).toHaveBeenCalledWith(true)
    })

    it('無効化状態でクリックしても状態が変化しない', async () => {
      const handleChange = vi.fn()
      render(
        <Switch
          aria-label="テストスイッチ"
          onCheckedChange={handleChange}
          disabled
        />
      )

      const switchElement = screen.getByRole('switch')
      await userEvent.click(switchElement)
      expect(handleChange).not.toHaveBeenCalled()
    })

    it('カスタムクラスが適用される', () => {
      render(<Switch aria-label="テストスイッチ" className="custom-class" />)
      const switchElement = screen.getByRole('switch')
      expect(switchElement).toHaveClass('custom-class')
    })
  })

  describe('アクセシビリティ', () => {
    describe('基本的なアクセシビリティ', () => {
      it('axeによる基本的なアクセシビリティ要件を満たす', async () => {
        await runAxeTest(<Switch aria-label="テストスイッチ" />);
      });

      it('キーボードナビゲーションが適切に機能する', () => {
        const { container } = render(<Switch aria-label="テストスイッチ" />);
        runKeyboardNavigationTest(container);
      });

      it('ARIA属性が適切に設定されている', () => {
        const { container } = render(<Switch aria-label="テストスイッチ" />);
        runAriaAttributesTest(container);
      });

      it('フォーカス管理が適切に機能する', () => {
        const { container } = render(<Switch aria-label="テストスイッチ" />);
        runFocusManagementTest(container);
      });

      it('コントラスト要件を満たす', () => {
        const { container } = render(<Switch aria-label="テストスイッチ" />);
        runContrastTest(container);
      });
    });

    it('適切なARIA属性が設定される', () => {
      render(<Switch aria-label="テストスイッチ" />)
      const switchElement = screen.getByRole('switch')
      expect(switchElement).toHaveAttribute('role', 'switch')
      expect(switchElement).toHaveAttribute('aria-checked')
      expect(switchElement).toHaveAttribute('aria-label', 'テストスイッチ')
    })

    it('キーボード操作で状態が切り替わる', async () => {
      const handleChange = vi.fn()
      render(
        <Switch
          aria-label="テストスイッチ"
          onCheckedChange={handleChange}
        />
      )

      const switchElement = screen.getByRole('switch')
      await userEvent.tab()
      expect(switchElement).toHaveFocus()

      await userEvent.keyboard('[Space]')
      expect(handleChange).toHaveBeenCalledWith(true)

      await userEvent.keyboard('[Space]')
      expect(handleChange).toHaveBeenCalledWith(false)
    })
  })
}) 