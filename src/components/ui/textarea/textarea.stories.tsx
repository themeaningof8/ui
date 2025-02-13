import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from '.'

/**
 * `Textarea`は、複数行のテキスト入力を可能にするコンポーネントです。
 * モダンなスタイリングとアクセシビリティを備え、レスポンシブなデザインに対応しています。
 */
const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof Textarea>

/**
 * 基本的な使用例です。
 */
export const Default: Story = {
  args: {
    placeholder: 'Type your message here.',
  },
}

/**
 * 無効化された状態の例です。
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled textarea',
    value: 'This textarea is disabled',
  },
}

/**
 * ラベル付きの例です。
 */
export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <label htmlFor="message" className="text-sm font-medium">
        Your message
      </label>
      <Textarea
        id="message"
        placeholder="Type your message here."
        className="min-h-[100px]"
      />
    </div>
  ),
}

/**
 * バリデーションエラーがある状態の例です。
 */
export const WithError: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <label htmlFor="message-error" className="text-sm font-medium">
        Your message
      </label>
      <Textarea
        id="message-error"
        placeholder="Type your message here."
        className="border-red-500"
      />
      <p className="text-sm text-red-500">Message is required.</p>
    </div>
  ),
}

/**
 * 文字数カウンター付きの例です。
 */
export const WithCharacterCount: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <label htmlFor="message-with-count" className="text-sm font-medium">
        Your message
      </label>
      <div className="relative">
        <Textarea
          id="message-with-count"
          placeholder="Type your message here."
          className="pr-12"
          maxLength={100}
        />
        <div className="absolute bottom-2 right-2 text-sm text-gray-400">
          0/100
        </div>
      </div>
    </div>
  ),
}

/**
 * 自動リサイズの例です。
 */
export const AutoResize: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <label htmlFor="auto-resize" className="text-sm font-medium">
        Auto-resizing textarea
      </label>
      <Textarea
        id="auto-resize"
        placeholder="Type your message here."
        className="min-h-[100px] resize-y"
      />
    </div>
  ),
} 