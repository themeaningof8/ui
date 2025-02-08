/**
 * Tabsのストーリー
 * @module TabsStories
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // タブトリガーの確認
    const accountTab = canvas.getByRole('tab', { name: 'Account' })
    const passwordTab = canvas.getByRole('tab', { name: 'Password' })
    const settingsTab = canvas.getByRole('tab', { name: 'Settings' })
    
    // デフォルトでAccountタブが選択されていることを確認
    expect(accountTab).toHaveAttribute('aria-selected', 'true')
    expect(canvas.getByText('Account Settings')).toBeVisible()
    
    // Passwordタブに切り替え
    await userEvent.click(passwordTab)
    expect(passwordTab).toHaveAttribute('aria-selected', 'true')
    expect(accountTab).toHaveAttribute('aria-selected', 'false')
    expect(canvas.getByText('Password Settings')).toBeVisible()
    expect(canvas.queryByText('Account Settings')).not.toBeVisible()
    
    // Settingsタブに切り替え
    await userEvent.click(settingsTab)
    expect(settingsTab).toHaveAttribute('aria-selected', 'true')
    expect(canvas.getByText('General Settings')).toBeVisible()
    expect(canvas.queryByText('Password Settings')).not.toBeVisible()
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // 無効化されたタブの確認
    const disabledTab = canvas.getByRole('tab', { name: 'Disabled' })
    expect(disabledTab).toBeDisabled()
    
    // アクティブなタブの確認
    const activeTab = canvas.getByRole('tab', { name: 'Active' })
    expect(activeTab).toHaveAttribute('aria-selected', 'true')
    
    // アクティブなタブのコンテンツを確認
    const activeContent = canvas.getByText('Active tab content')
    expect(activeContent).toBeVisible()
    
    // 無効化されたタブをクリックしても状態が変わらないことを確認
    await userEvent.click(disabledTab)
    expect(activeTab).toHaveAttribute('aria-selected', 'true')
    expect(activeContent).toBeVisible()
    
    // 有効なタブへの切り替えを確認
    const pendingTab = canvas.getByRole('tab', { name: 'Pending' })
    await userEvent.click(pendingTab)
    expect(pendingTab).toHaveAttribute('aria-selected', 'true')
    
    const pendingContent = canvas.getByText('Pending tab content')
    expect(pendingContent).toBeVisible()
  },
} 