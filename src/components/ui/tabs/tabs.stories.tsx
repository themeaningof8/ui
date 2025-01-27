/**
 * Tabsコンポーネントのストーリー
 * @module TabsStories
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="space-y-4 p-4">
          <h4 className="text-sm font-medium">Account Settings</h4>
          <p className="text-sm text-gray-500">
            Update your account settings. Set your preferred language and timezone.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="space-y-4 p-4">
          <h4 className="text-sm font-medium">Password Settings</h4>
          <p className="text-sm text-gray-500">
            Change your password here. After saving, you'll be logged out.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="space-y-4 p-4">
          <h4 className="text-sm font-medium">General Settings</h4>
          <p className="text-sm text-gray-500">
            Configure your general application settings here.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
}

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="active" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <div className="p-4">Active tab content</div>
      </TabsContent>
      <TabsContent value="disabled">
        <div className="p-4">Disabled tab content</div>
      </TabsContent>
      <TabsContent value="pending">
        <div className="p-4">Pending tab content</div>
      </TabsContent>
    </Tabs>
  ),
} 