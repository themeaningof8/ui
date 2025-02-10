/**
 * @file RadioGroupコンポーネントのテスト
 * @description RadioGroup関連コンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import { userEvent } from '@testing-library/user-event'
import { RadioGroup, RadioGroupItem } from '.'

describe('RadioGroup', () => {
  describe('基本機能テスト', () => {
    it('ラジオグループが正しくレンダリングされること', () => {
      render(
        <RadioGroup defaultValue="option1">
          <div>
            <RadioGroupItem value="option1" id="option1" />
            <label htmlFor="option1">オプション1</label>
          </div>
          <div>
            <RadioGroupItem value="option2" id="option2" />
            <label htmlFor="option2">オプション2</label>
          </div>
        </RadioGroup>
      )

      expect(screen.getByLabelText('オプション1')).toBeInTheDocument()
      expect(screen.getByLabelText('オプション2')).toBeInTheDocument()
    })

    it('デフォルト値が正しく設定されること', () => {
      render(
        <RadioGroup defaultValue="option1">
          <div>
            <RadioGroupItem value="option1" id="option1" />
            <label htmlFor="option1">オプション1</label>
          </div>
          <div>
            <RadioGroupItem value="option2" id="option2" />
            <label htmlFor="option2">オプション2</label>
          </div>
        </RadioGroup>
      )

      const option1 = screen.getByLabelText('オプション1')
      const option2 = screen.getByLabelText('オプション2')

      expect(option1).toBeChecked()
      expect(option2).not.toBeChecked()
    })

    it('選択状態が正しく切り替わること', async () => {
      const user = userEvent.setup()
      
      render(
        <RadioGroup defaultValue="option1">
          <div>
            <RadioGroupItem value="option1" id="option1" />
            <label htmlFor="option1">オプション1</label>
          </div>
          <div>
            <RadioGroupItem value="option2" id="option2" />
            <label htmlFor="option2">オプション2</label>
          </div>
        </RadioGroup>
      )

      const option1 = screen.getByLabelText('オプション1')
      const option2 = screen.getByLabelText('オプション2')

      await user.click(option2)

      expect(option1).not.toBeChecked()
      expect(option2).toBeChecked()
    })
  })

  describe('アクセシビリティテスト', () => {
    it('適切なARIA属性が設定されていること', () => {
      render(
        <RadioGroup defaultValue="option1" aria-label="選択肢">
          <div>
            <RadioGroupItem value="option1" id="option1" />
            <label htmlFor="option1">オプション1</label>
          </div>
          <div>
            <RadioGroupItem value="option2" id="option2" />
            <label htmlFor="option2">オプション2</label>
          </div>
        </RadioGroup>
      )

      const radiogroup = screen.getByRole('radiogroup')
      expect(radiogroup).toHaveAttribute('aria-label', '選択肢')

      const options = screen.getAllByRole('radio')
      for (const option of options) {
        expect(option).toHaveAttribute('aria-checked')
      }
    })

    it('キーボード操作が正しく機能すること', async () => {
      const user = userEvent.setup()
      
      render(
        <RadioGroup defaultValue="option1">
          <div>
            <RadioGroupItem value="option1" id="option1" />
            <label htmlFor="option1">オプション1</label>
          </div>
          <div>
            <RadioGroupItem value="option2" id="option2" />
            <label htmlFor="option2">オプション2</label>
          </div>
          <div>
            <RadioGroupItem value="option3" id="option3" />
            <label htmlFor="option3">オプション3</label>
          </div>
        </RadioGroup>
      )

      // Tabキーでフォーカス
      await user.tab()
      expect(screen.getByLabelText('オプション1')).toHaveFocus()

      // 矢印キーで移動
      await user.keyboard('{ArrowDown}')
      expect(screen.getByLabelText('オプション2')).toHaveFocus()

      await user.keyboard('{ArrowDown}')
      expect(screen.getByLabelText('オプション3')).toHaveFocus()

      // 上矢印で戻る
      await user.keyboard('{ArrowUp}')
      expect(screen.getByLabelText('オプション2')).toHaveFocus()
    })
  })

  describe('スタイルテスト', () => {
    it('カスタムクラスが適用できること', () => {
      render(
        <RadioGroup defaultValue="option1" className="custom-group">
          <div>
            <RadioGroupItem
              value="option1"
              id="option1"
              className="custom-radio"
            />
            <label htmlFor="option1">オプション1</label>
          </div>
        </RadioGroup>
      )

      expect(screen.getByRole('radiogroup')).toHaveClass('custom-group')
      expect(screen.getByRole('radio')).toHaveClass('custom-radio')
    })

    it('無効状態のスタイルが適用されること', () => {
      render(
        <RadioGroup defaultValue="option1">
          <div>
            <RadioGroupItem value="option1" id="option1" disabled />
            <label htmlFor="option1">オプション1</label>
          </div>
        </RadioGroup>
      )

      const radio = screen.getByRole('radio')
      expect(radio).toBeDisabled()
      expect(radio).toHaveClass('cursor-not-allowed opacity-50')
    })
  })

  describe('エラー処理テスト', () => {
    it('必須項目のバリデーションが機能すること', () => {
      render(
        <RadioGroup required>
          <div>
            <RadioGroupItem value="option1" id="option1" />
            <label htmlFor="option1">オプション1</label>
          </div>
        </RadioGroup>
      )

      const radio = screen.getByRole('radio')
      expect(radio).toBeRequired()
    })

    it('無効な値が指定された場合にエラー表示されること', () => {
      render(
        <RadioGroup defaultValue="invalid-value" aria-invalid="true">
          <div>
            <RadioGroupItem value="option1" id="option1" />
            <label htmlFor="option1">オプション1</label>
          </div>
        </RadioGroup>
      )

      const radiogroup = screen.getByRole('radiogroup')
      expect(radiogroup).toHaveAttribute('aria-invalid', 'true')
    })
  })
}) 