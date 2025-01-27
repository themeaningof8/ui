/**
 * Dialogコンポーネントのストーリー
 * @module DialogStories
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
  DialogPortal,
} from './dialog'

const meta = {
  title: 'UI/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a dialog description. You can put any content here.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          Your main content goes here. This can be forms, messages, or any other content.
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const WithCustomStyles: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Styled Dialog</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="bg-black/80 backdrop-blur-sm" />
        <DialogContent className="border-2 border-primary">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-2xl">Custom Styled Dialog</DialogTitle>
            <DialogDescription className="text-gray-600">
              This dialog uses custom styles for each component.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <p>Content with custom styling</p>
          </div>
          <DialogFooter className="border-t pt-4">
            <Button variant="outline" type="button">Cancel</Button>
            <Button type="submit">Continue</Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  ),
}

export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Name
            </label>
            <input
              id="name"
              className="col-span-3 rounded-md border p-2"
              placeholder="Enter your name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right">
              Username
            </label>
            <input
              id="username"
              className="col-span-3 rounded-md border p-2"
              placeholder="Enter your username"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const NestedDialogs: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open First Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>First Dialog</DialogTitle>
          <DialogDescription>
            This dialog contains another dialog.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Second Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Second Dialog</DialogTitle>
                <DialogDescription>
                  This is a nested dialog.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                Nested dialog content
              </div>
              <DialogFooter>
                <Button type="button">Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <DialogFooter>
          <Button type="button">Close First</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const ResponsiveLayout: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Responsive Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-3">
          <DialogTitle>Mobile First Layout</DialogTitle>
          <DialogDescription>
            This dialog demonstrates responsive layout changes.
          </DialogDescription>
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium">Additional Header Content</span>
            <p className="text-sm text-muted-foreground">
              Header content with custom spacing
            </p>
          </div>
        </DialogHeader>
        <div className="py-4">
          <p>Main content area</p>
        </div>
        <DialogFooter className="space-x-2">
          <Button variant="outline" type="button">Cancel</Button>
          <Button type="submit">Continue</Button>
          <Button variant="ghost" type="button">Skip</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const CustomHeaderFooter: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Custom Layout</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="grid grid-cols-[1fr,auto] items-center">
          <div>
            <DialogTitle>Custom Header Layout</DialogTitle>
            <DialogDescription>
              Header with side-by-side content
            </DialogDescription>
          </div>
          <Button variant="ghost" size="icon">
            ⚙️
          </Button>
        </DialogHeader>
        <div className="py-4">
          <p>Main content area</p>
        </div>
        <DialogFooter className="grid grid-cols-2 gap-2">
          <Button variant="outline" type="button" className="w-full">Cancel</Button>
          <Button type="submit" className="w-full">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
} 