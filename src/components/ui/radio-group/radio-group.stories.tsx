/**
 * @file RadioGroupのストーリー
 * @description RadioGroupの様々な状態とバリエーションを表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    onLoad: () => {
      const consoleError = console.error;
      console.error = (...args) => {
        consoleError(...args);
        throw new Error(args.join(' '));
      };
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

/**
 * @description 基本的なラジオグループの表示
 */
export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="option1" />
        <Label htmlFor="option1">オプション1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="option2" />
        <Label htmlFor="option2">オプション2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="option3" />
        <Label htmlFor="option3">オプション3</Label>
      </div>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const radioButtons = canvas.getAllByRole('radio')
    
    // 3つのラジオボタンが存在することを確認
    expect(radioButtons).toHaveLength(3)
    
    // デフォルト値の確認
    expect(radioButtons[0]).toBeChecked()
    expect(radioButtons[1]).not.toBeChecked()
    expect(radioButtons[2]).not.toBeChecked()
    
    // ラジオボタンの切り替えをテスト
    await userEvent.click(radioButtons[1])
    expect(radioButtons[0]).not.toBeChecked()
    expect(radioButtons[1]).toBeChecked()
    expect(radioButtons[2]).not.toBeChecked()
    
    // ラベルとの関連付けを確認
    const labels = canvas.getAllByText(/オプション[123]/)
    expect(labels).toHaveLength(3)
    for (const [index, label] of labels.entries()) {
      expect(label).toHaveAttribute('for', `option${index + 1}`)
    }
  },
}

/**
 * @description 無効化されたオプションを含むラジオグループの表示
 */
export const WithDisabledOption: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="option1" />
        <Label htmlFor="option1">オプション1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="option2" disabled />
        <Label htmlFor="option2" className="text-base-low">オプション2（無効）</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="option3" />
        <Label htmlFor="option3">オプション3</Label>
      </div>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const radioButtons = canvas.getAllByRole('radio')
    
    // 無効化されたオプションの確認
    expect(radioButtons[1]).toBeDisabled()
    expect(radioButtons[1]).toHaveClass('cursor-not-allowed', 'opacity-50')
    
    // 無効化されたオプションはクリックしてもチェックされないことを確認
    await userEvent.click(radioButtons[1])
    expect(radioButtons[0]).toBeChecked()
    expect(radioButtons[1]).not.toBeChecked()
    
    // 有効なオプションは選択可能なことを確認
    await userEvent.click(radioButtons[2])
    expect(radioButtons[0]).not.toBeChecked()
    expect(radioButtons[2]).toBeChecked()
  },
}

/**
 * @description 説明付きのラジオグループの表示
 */
export const WithDescription: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="grid gap-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="option1" />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="option1">オプション1</Label>
            <p className="text-sm text-base-low">
              オプション1の詳細な説明をここに記載します。
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="option2" />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="option2">オプション2</Label>
            <p className="text-sm text-base-low">
              オプション2の詳細な説明をここに記載します。
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option3" id="option3" />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="option3">オプション3</Label>
            <p className="text-sm text-base-low">
              オプション3の詳細な説明をここに記載します。
            </p>
          </div>
        </div>
      </div>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const radioButtons = canvas.getAllByRole('radio')
    
    // ラジオボタンと説明文の存在確認
    expect(radioButtons).toHaveLength(3)
    
    // 説明文の確認
    const descriptions = canvas.getAllByText(/オプション[123]の詳細な説明をここに記載します。/)
    expect(descriptions).toHaveLength(3)
    
    // キーボード操作のテスト
    await userEvent.tab() // 最初のラジオボタンにフォーカス
    expect(radioButtons[0]).toHaveFocus()
    
    await userEvent.keyboard('[ArrowDown]') // 次のオプションに移動
    expect(radioButtons[1]).toHaveFocus()
    expect(radioButtons[1]).toBeChecked()
    
    await userEvent.keyboard('[ArrowUp]') // 前のオプションに戻る
    expect(radioButtons[0]).toHaveFocus()
    expect(radioButtons[0]).toBeChecked()
  },
} 