/**
 * @file OTPインプットコンポーネントのStorybook
 * @description OTPインプットコンポーネントの使用例を示します
 */

import type { Meta, StoryObj } from '@storybook/react'
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '.'

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
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
}

/**
 * 6桁のOTPインプットの使用例
 */
export const SixDigits: Story = {
  render: () => (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
}

/**
 * 無効化状態のOTPインプットの使用例
 */
export const Disabled: Story = {
  render: () => (
    <InputOTP maxLength={6} disabled>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
} 