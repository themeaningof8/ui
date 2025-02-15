import type { Meta, StoryObj } from '@storybook/react'
import { Label } from '../label'
import { RadioGroup, RadioGroupItem } from '.'

/**
 * `RadioGroup`は、複数の選択肢から1つを選択するためのコンポーネントです。
 * Radix UIのRadio Groupプリミティブをベースに、アクセシビリティと一貫したスタイリングを提供します。
 */
const meta = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof RadioGroup>

/**
 * 基本的な使用例です。
 */
export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="option1" />
        <Label htmlFor="option1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="option2" />
        <Label htmlFor="option2">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="option3" />
        <Label htmlFor="option3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
}

/**
 * 無効化された項目を含む例です。
 */
export const WithDisabledItems: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="r1" />
        <Label htmlFor="r1">Available</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="r2" disabled />
        <Label htmlFor="r2">Disabled</Label>
      </div>
    </RadioGroup>
  ),
}

/**
 * カスタムスタイルを適用した例です。
 */
export const CustomStyle: Story = {
  render: () => (
    <RadioGroup defaultValue="option1" className="bg-step-3 p-4 rounded-lg">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="cs1" className="border-step-7" />
          <Label htmlFor="cs1" className="font-medium">Professional</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="cs2" className="border-step-7" />
          <Label htmlFor="cs2" className="font-medium">Enterprise</Label>
        </div>
      </div>
    </RadioGroup>
  ),
}

/**
 * フォーム内での使用例です。
 */
export const InForm: Story = {
  render: () => (
    <form className="w-[400px] space-y-6">
      <div className="space-y-4">
        <Label>Subscription Plan</Label>
        <RadioGroup defaultValue="monthly">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="monthly">Monthly</Label>
              <div className="text-sm text-step-12">
                $9/month
              </div>
            </div>
            <RadioGroupItem value="monthly" id="monthly" />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="yearly">Yearly</Label>
              <div className="text-sm text-step-11">
                $89/year (Save 20%)
              </div>
            </div>
            <RadioGroupItem value="yearly" id="yearly" />
          </div>
        </RadioGroup>
      </div>
    </form>
  ),
}
