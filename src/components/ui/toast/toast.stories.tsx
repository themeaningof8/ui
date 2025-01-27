/**
 * Toastコンポーネントのストーリー
 * @module ToastStories
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button/button'
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './toast'

const meta = {
  title: 'UI/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
        <ToastViewport />
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof Toast>

export const Default: Story = {
  render: () => (
    <Toast>
      <ToastTitle>Notification</ToastTitle>
      <ToastDescription>Your message has been sent successfully.</ToastDescription>
      <ToastClose />
    </Toast>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Toast>
      <ToastTitle>Error</ToastTitle>
      <ToastDescription>There was a problem with your request.</ToastDescription>
      <ToastAction altText="Try again" onClick={() => console.log('Retrying...')}>
        Try again
      </ToastAction>
      <ToastClose />
    </Toast>
  ),
}

export const Success: Story = {
  render: () => (
    <Toast className="border-green-500 bg-green-50">
      <ToastTitle className="text-green-800">Success</ToastTitle>
      <ToastDescription className="text-green-600">
        Your changes have been saved successfully.
      </ToastDescription>
      <ToastClose className="text-green-800" />
    </Toast>
  ),
}

export const ErrorToast: Story = {
  render: () => (
    <Toast className="border-red-500 bg-red-50">
      <ToastTitle className="text-red-800">Error</ToastTitle>
      <ToastDescription className="text-red-600">
        An error occurred while processing your request.
      </ToastDescription>
      <ToastAction altText="Try again" onClick={() => console.log('Retrying...')}>
        Try again
      </ToastAction>
      <ToastClose className="text-red-800" />
    </Toast>
  ),
}

export const Interactive: Story = {
  render: () => {
    const showToast = () => {
      // Note: This is just for demonstration.
      // In a real application, you would use a proper toast management system.
      console.log('Show toast')
    }

    return (
      <div className="flex gap-2">
        <Button onClick={showToast}>Show Toast</Button>
      </div>
    )
  },
} 