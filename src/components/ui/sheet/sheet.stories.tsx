/**
 * @file Sheetのストーリー
 * @description Sheetの様々な状態とバリエーションを表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta = {
  title: 'UI/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

/**
 * @description 基本的なシートの表示
 */
export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>シートを開く</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>シートのタイトル</SheetTitle>
          <SheetDescription>
            シートの説明文をここに記述します。
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          シートのメインコンテンツをここに配置します。
        </div>
        <SheetFooter>
          <Button type="submit">保存</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // トリガーボタンの確認
    const triggerButton = canvas.getByText('シートを開く')
    expect(triggerButton).toBeInTheDocument()
    
    // シートを開く
    await userEvent.click(triggerButton)
    
    // シートの内容を確認
    const dialog = document.querySelector('[role="dialog"]')
    expect(dialog).toBeInTheDocument()
    
    const dialogContent = within(dialog as HTMLElement)
    expect(dialogContent.getByText('シートのタイトル')).toBeVisible()
    expect(dialogContent.getByText('シートの説明文をここに記述します。')).toBeVisible()
    expect(dialogContent.getByText('シートのメインコンテンツをここに配置します。')).toBeVisible()
    
    // 閉じるボタンの確認
    const closeButton = dialogContent.getByRole('button', { name: 'Close' })
    expect(closeButton).toBeVisible()
    
    // シートを閉じる
    await userEvent.click(closeButton)
    expect(dialog).not.toBeVisible()
  },
}

/**
 * @description 異なる表示位置のシート
 */
export const Positions: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button>上部から表示</Button>
        </SheetTrigger>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>上部シート</SheetTitle>
            <SheetDescription>上部から表示されるシートです。</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      
      <Sheet>
        <SheetTrigger asChild>
          <Button>右側から表示</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>右側シート</SheetTitle>
            <SheetDescription>右側から表示されるシートです。</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      
      <Sheet>
        <SheetTrigger asChild>
          <Button>下部から表示</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>下部シート</SheetTitle>
            <SheetDescription>下部から表示されるシートです。</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      
      <Sheet>
        <SheetTrigger asChild>
          <Button>左側から表示</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>左側シート</SheetTitle>
            <SheetDescription>左側から表示されるシートです。</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // 各方向のトリガーボタンを取得
    const topButton = canvas.getByRole('button', { name: '上部から表示' })
    const rightButton = canvas.getByRole('button', { name: '右側から表示' })
    const bottomButton = canvas.getByRole('button', { name: '下部から表示' })
    const leftButton = canvas.getByRole('button', { name: '左側から表示' })
    
    // 上部シートのテスト
    await userEvent.click(topButton)
    let dialog = document.querySelector('[role="dialog"]')
    expect(dialog).toBeInTheDocument()
    let dialogContent = within(dialog as HTMLElement)
    expect(dialogContent.getByText('上部シート')).toBeVisible()
    expect(dialogContent.getByText('上部から表示されるシートです。')).toBeVisible()
    await userEvent.click(dialogContent.getByRole('button', { name: 'Close' }))
    
    // 右側シートのテスト
    await userEvent.click(rightButton)
    dialog = document.querySelector('[role="dialog"]')
    expect(dialog).toBeInTheDocument()
    dialogContent = within(dialog as HTMLElement)
    expect(dialogContent.getByText('右側シート')).toBeVisible()
    expect(dialogContent.getByText('右側から表示されるシートです。')).toBeVisible()
    await userEvent.click(dialogContent.getByRole('button', { name: 'Close' }))
    
    // 下部シートのテスト
    await userEvent.click(bottomButton)
    dialog = document.querySelector('[role="dialog"]')
    expect(dialog).toBeInTheDocument()
    dialogContent = within(dialog as HTMLElement)
    expect(dialogContent.getByText('下部シート')).toBeVisible()
    expect(dialogContent.getByText('下部から表示されるシートです。')).toBeVisible()
    await userEvent.click(dialogContent.getByRole('button', { name: 'Close' }))
    
    // 左側シートのテスト
    await userEvent.click(leftButton)
    dialog = document.querySelector('[role="dialog"]')
    expect(dialog).toBeInTheDocument()
    dialogContent = within(dialog as HTMLElement)
    expect(dialogContent.getByText('左側シート')).toBeVisible()
    expect(dialogContent.getByText('左側から表示されるシートです。')).toBeVisible()
    await userEvent.click(dialogContent.getByRole('button', { name: 'Close' }))
  },
}

/**
 * @description カスタムコンテンツを含むシート
 */
export const WithCustomContent: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>設定を開く</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>設定</SheetTitle>
          <SheetDescription>
            アプリケーションの設定を変更できます。
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium">通知</span>
            <Button variant="outline" size="sm">設定</Button>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium">プライバシー</span>
            <Button variant="outline" size="sm">設定</Button>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium">セキュリティ</span>
            <Button variant="outline" size="sm">設定</Button>
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline">キャンセル</Button>
          <Button>変更を保存</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // トリガーボタンの確認
    const trigger = canvas.getByRole('button', { name: '設定を開く' })
    expect(trigger).toBeInTheDocument()
    
    // シートを開く
    await userEvent.click(trigger)
    
    // シートの内容を確認
    const sheet = document.querySelector('[role="dialog"]')
    expect(sheet).toBeInTheDocument()
    
    const sheetContent = within(sheet as HTMLElement)
    
    // ヘッダーの確認
    expect(sheetContent.getByText('設定')).toBeVisible()
    expect(sheetContent.getByText('アプリケーションの設定を変更できます。')).toBeVisible()
    
    // 設定項目の確認
    const settingLabels = ['通知', 'プライバシー', 'セキュリティ']
    for (const label of settingLabels) {
      const settingRow = sheetContent.getByText(label)
      expect(settingRow).toBeVisible()
      const settingButton = settingRow.nextElementSibling
      expect(settingButton).toHaveTextContent('設定')
      expect(settingButton).toHaveClass('variant-outline')
    }
    
    // フッターボタンの確認
    const buttons = sheetContent.getAllByRole('button')
    const footerButtons = buttons.slice(-2)
    expect(footerButtons[0]).toHaveTextContent('キャンセル')
    expect(footerButtons[1]).toHaveTextContent('変更を保存')
    
    // シートを閉じる
    const closeButton = sheetContent.getByRole('button', { name: 'Close' })
    await userEvent.click(closeButton)
    expect(sheet).not.toBeVisible()
  },
} 