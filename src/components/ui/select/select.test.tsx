/**
 * @file Selectコンポーネントのテスト
 * @description Select関連コンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@/tests/test-utils'
import { userEvent } from '@testing-library/user-event'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from '.'

describe('Select', () => {
  describe('基本機能テスト', () => {
    it('セレクトが正しくレンダリングされること', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">オプション1</SelectItem>
            <SelectItem value="option2">オプション2</SelectItem>
          </SelectContent>
        </Select>
      )

      expect(screen.getByText('選択してください')).toBeInTheDocument()
    })

    it('デフォルト値が正しく表示されること', () => {
      render(
        <Select defaultValue="option1">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">オプション1</SelectItem>
            <SelectItem value="option2">オプション2</SelectItem>
          </SelectContent>
        </Select>
      )

      expect(screen.getByText('オプション1')).toBeInTheDocument()
    })

    it('オプションを選択できること', async () => {
      const user = userEvent.setup()
      
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">オプション1</SelectItem>
            <SelectItem value="option2">オプション2</SelectItem>
          </SelectContent>
        </Select>
      )

      // トリガーをクリック
      await user.click(screen.getByRole('combobox'))

      // オプションを選択
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeVisible()
      })

      await user.click(screen.getByText('オプション2'))

      await waitFor(() => {
        expect(screen.getByRole('combobox')).toHaveTextContent('オプション2')
      })
    })
  })

  describe('グループ化とラベルテスト', () => {
    it('グループとラベルが正しく表示されること', async () => {
      const user = userEvent.setup()
      
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>グループ1</SelectLabel>
              <SelectItem value="option1">オプション1</SelectItem>
              <SelectItem value="option2">オプション2</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>グループ2</SelectLabel>
              <SelectItem value="option3">オプション3</SelectItem>
              <SelectItem value="option4">オプション4</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )

      await user.click(screen.getByRole('combobox'))

      await waitFor(() => {
        expect(screen.getByText('グループ1')).toBeVisible()
        expect(screen.getByText('グループ2')).toBeVisible()
        expect(screen.getByRole('separator')).toBeVisible()
      })
    })
  })

  describe('アクセシビリティテスト', () => {
    it('適切なARIA属性が設定されていること', async () => {
      const user = userEvent.setup()
      
      render(
        <Select>
          <SelectTrigger aria-label="オプションを選択">
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">オプション1</SelectItem>
          </SelectContent>
        </Select>
      )

      const combobox = screen.getByRole('combobox')
      expect(combobox).toHaveAttribute('aria-label', 'オプションを選択')
      expect(combobox).toHaveAttribute('aria-expanded', 'false')

      await user.click(combobox)

      await waitFor(() => {
        const listbox = screen.getByRole('listbox')
        expect(listbox).toBeVisible()
        expect(combobox).toHaveAttribute('aria-expanded', 'true')
      })
    })

    it('キーボード操作が正しく機能すること', async () => {
      const user = userEvent.setup()
      
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">オプション1</SelectItem>
            <SelectItem value="option2">オプション2</SelectItem>
          </SelectContent>
        </Select>
      )

      // Tabキーでフォーカス
      await user.tab()
      expect(screen.getByRole('combobox')).toHaveFocus()

      // Enterキーで開く
      await user.keyboard('{Enter}')
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeVisible()
      })

      // 矢印キーで移動
      await user.keyboard('{ArrowDown}')
      expect(screen.getByText('オプション1')).toHaveFocus()

      // Enterキーで選択
      await user.keyboard('{Enter}')
      await waitFor(() => {
        expect(screen.getByRole('combobox')).toHaveTextContent('オプション1')
      })
    })
  })

  describe('スタイルテスト', () => {
    it('カスタムクラスが適用できること', () => {
      render(
        <Select>
          <SelectTrigger className="custom-trigger">
            <SelectValue className="custom-value" placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent className="custom-content">
            <SelectItem className="custom-item" value="option1">
              オプション1
            </SelectItem>
          </SelectContent>
        </Select>
      )

      expect(screen.getByRole('combobox')).toHaveClass('custom-trigger')
    })

    it('無効状態のスタイルが適用されること', () => {
      render(
        <Select disabled>
          <SelectTrigger>
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">オプション1</SelectItem>
          </SelectContent>
        </Select>
      )

      const trigger = screen.getByRole('combobox')
      expect(trigger).toBeDisabled()
      expect(trigger).toHaveClass('cursor-not-allowed opacity-50')
    })
  })

  describe('エラー処理テスト', () => {
    it('必須項目のバリデーションが機能すること', () => {
      render(
        <Select required>
          <SelectTrigger>
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">オプション1</SelectItem>
          </SelectContent>
        </Select>
      )

      const select = screen.getByRole('combobox')
      expect(select).toBeRequired()
    })

    it('エラー状態が正しく表示されること', () => {
      render(
        <Select>
          <SelectTrigger aria-invalid="true">
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">オプション1</SelectItem>
          </SelectContent>
        </Select>
      )

      const select = screen.getByRole('combobox')
      expect(select).toHaveAttribute('aria-invalid', 'true')
    })
  })
}) 