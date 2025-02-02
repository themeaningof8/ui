/**
 * @file RadioGroupコンポーネントのストーリー
 * @description RadioGroupコンポーネントの様々な状態とバリエーションを表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup, RadioGroupItem, RadioGroupItemText } from '.'

const meta = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
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
        <RadioGroupItemText htmlFor="option1">オプション1</RadioGroupItemText>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="option2" />
        <RadioGroupItemText htmlFor="option2">オプション2</RadioGroupItemText>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="option3" />
        <RadioGroupItemText htmlFor="option3">オプション3</RadioGroupItemText>
      </div>
    </RadioGroup>
  ),
}

/**
 * @description 無効化されたオプションを含むラジオグループの表示
 */
export const WithDisabledOption: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="option1" />
        <RadioGroupItemText htmlFor="option1">オプション1</RadioGroupItemText>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="option2" disabled />
        <RadioGroupItemText htmlFor="option2">オプション2（無効）</RadioGroupItemText>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="option3" />
        <RadioGroupItemText htmlFor="option3">オプション3</RadioGroupItemText>
      </div>
    </RadioGroup>
  ),
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
            <RadioGroupItemText htmlFor="option1">オプション1</RadioGroupItemText>
            <p className="text-sm text-base-low">
              オプション1の詳細な説明をここに記載します。
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="option2" />
          <div className="grid gap-1.5 leading-none">
            <RadioGroupItemText htmlFor="option2">オプション2</RadioGroupItemText>
            <p className="text-sm text-base-low">
              オプション2の詳細な説明をここに記載します。
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option3" id="option3" />
          <div className="grid gap-1.5 leading-none">
            <RadioGroupItemText htmlFor="option3">オプション3</RadioGroupItemText>
            <p className="text-sm text-base-low">
              オプション3の詳細な説明をここに記載します。
            </p>
          </div>
        </div>
      </div>
    </RadioGroup>
  ),
} 