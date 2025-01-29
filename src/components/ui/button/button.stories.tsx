/**
 * Buttonコンポーネントのストーリー
 * @module ButtonStories
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '.'

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    asChild: {
      control: 'boolean',
      description: 'Whether to render as a Slot component',
    },
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style of the button',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
}

export const Icon: Story = {
  args: {
    size: 'icon',
    children: '👋',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
}

export const AsChild: Story = {
  render: () => (
    <Button asChild>
      <a href="/">Link as Button</a>
    </Button>
  ),
}

export const WithClassName: Story = {
  args: {
    className: 'custom-class bg-purple-500 text-white',
    children: 'Custom Styled',
  },
}

export const Loading: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button disabled>
        <span className="animate-spin mr-2">⌛</span>
        Loading...
      </Button>
      <Button disabled variant="secondary">
        <span className="animate-spin mr-2">⌛</span>
        Loading...
      </Button>
    </div>
  ),
} 