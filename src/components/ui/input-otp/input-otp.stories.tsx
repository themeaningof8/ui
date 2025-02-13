/**
 * @file OTPインプットコンポーネントのStorybook
 * @description OTPインプットコンポーネントの使用例を示します
 */

import type { Meta, StoryObj } from '@storybook/react'
import { InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '.'

const meta = {
  title: 'UI/InputOTP',
  component: InputOTPGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InputOTPGroup>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なOTPインプットの使用例
 */
export const Default: Story = {
  render: () => (
    <InputOTPGroup>
      <InputOTPSlot />
      <InputOTPSeparator />
      <InputOTPSlot />
      <InputOTPSeparator />
      <InputOTPSlot />
      <InputOTPSeparator />
      <InputOTPSlot />
    </InputOTPGroup>
  ),
}

/**
 * 6桁のOTPインプットの使用例
 */
export const SixDigits: Story = {
  render: () => (
    <InputOTPGroup>
      <InputOTPSlot />
      <InputOTPSeparator />
      <InputOTPSlot />
      <InputOTPSeparator />
      <InputOTPSlot />
      <InputOTPSeparator />
      <InputOTPSlot />
      <InputOTPSeparator />
      <InputOTPSlot />
      <InputOTPSeparator />
      <InputOTPSlot />
    </InputOTPGroup>
  ),
}

/**
 * カスタムスタイルを適用したOTPインプットの使用例
 */
export const CustomStyle: Story = {
  render: () => (
    <InputOTPGroup className="gap-4">
      <InputOTPSlot className="h-12 w-12 rounded-xl border-2" />
      <InputOTPSeparator className="text-muted-foreground" />
      <InputOTPSlot className="h-12 w-12 rounded-xl border-2" />
      <InputOTPSeparator className="text-muted-foreground" />
      <InputOTPSlot className="h-12 w-12 rounded-xl border-2" />
      <InputOTPSeparator className="text-muted-foreground" />
      <InputOTPSlot className="h-12 w-12 rounded-xl border-2" />
    </InputOTPGroup>
  ),
}

/**
 * 無効化状態のOTPインプットの使用例
 */
export const Disabled: Story = {
  render: () => (
    <InputOTPGroup>
      <InputOTPSlot disabled />
      <InputOTPSeparator />
      <InputOTPSlot disabled />
      <InputOTPSeparator />
      <InputOTPSlot disabled />
      <InputOTPSeparator />
      <InputOTPSlot disabled />
    </InputOTPGroup>
  ),
} 