/**
 * @file Drawerのストーリー
 * @description Drawerの様々な状態とバリエーションを表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta = {
  title: 'UI/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
    onLoad: () => {
      const consoleError = console.error;
      console.error = (...args) => {
        consoleError(...args);
        throw new Error(args.join(' '));
      };
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

/**
 * @description 基本的なドロワーの表示
 */
export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">ドロワーを開く</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>基本的なドロワー</DrawerTitle>
          <DrawerDescription>
            下部から表示されるドロワーコンポーネントです。
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p>ドロワーの内容がここに表示されます。</p>
        </div>
        <DrawerFooter>
          <Button>保存</Button>
          <Button variant="outline">キャンセル</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // トリガーボタンの確認
    const trigger = canvas.getByRole('button', { name: 'ドロワーを開く' })
    expect(trigger).toBeInTheDocument()
    
    // ドロワーを開く
    await userEvent.click(trigger)
    
    // ドロワーの内容を確認
    const drawer = document.querySelector('[role="dialog"]')
    expect(drawer).toBeInTheDocument()
    
    const drawerContent = within(drawer as HTMLElement)
    expect(drawerContent.getByText('基本的なドロワー')).toBeVisible()
    expect(drawerContent.getByText('下部から表示されるドロワーコンポーネントです。')).toBeVisible()
    expect(drawerContent.getByText('ドロワーの内容がここに表示されます。')).toBeVisible()
    
    // フッターボタンの確認
    const buttons = drawerContent.getAllByRole('button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0]).toHaveTextContent('保存')
    expect(buttons[1]).toHaveTextContent('キャンセル')
  },
}

/**
 * @description フォーム付きドロワー
 */
export const WithForm: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>プロフィールを編集</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>プロフィール編集</DrawerTitle>
          <DrawerDescription>
            プロフィール情報を編集できます。
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name">名前</Label>
            <Input
              type="text"
              id="name"
              placeholder="名前を入力"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              type="email"
              id="email"
              placeholder="メールアドレスを入力"
            />
          </div>
        </div>
        <DrawerFooter>
          <Button>変更を保存</Button>
          <Button variant="outline">キャンセル</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // トリガーボタンの確認
    const trigger = canvas.getByRole('button', { name: 'プロフィールを編集' })
    expect(trigger).toBeInTheDocument()
    
    // ドロワーを開く
    await userEvent.click(trigger)
    
    // ドロワーの内容を確認
    const drawer = document.querySelector('[role="dialog"]')
    expect(drawer).toBeInTheDocument()
    
    const drawerContent = within(drawer as HTMLElement)
    
    // フォーム要素の確認
    const nameInput = drawerContent.getByLabelText('名前')
    const emailInput = drawerContent.getByLabelText('メールアドレス')
    expect(nameInput).toBeVisible()
    expect(emailInput).toBeVisible()
    
    // フォームの入力テスト
    await userEvent.type(nameInput, 'テストユーザー')
    await userEvent.type(emailInput, 'test@example.com')
    expect(nameInput).toHaveValue('テストユーザー')
    expect(emailInput).toHaveValue('test@example.com')
    
    // ボタンの確認
    const buttons = drawerContent.getAllByRole('button')
    expect(buttons[0]).toHaveTextContent('変更を保存')
    expect(buttons[1]).toHaveTextContent('キャンセル')
  },
}

/**
 * @description カスタムサイズのドロワー
 */
export const CustomSize: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">カスタムサイズ</Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[50vh]">
        <DrawerHeader>
          <DrawerTitle>カスタムサイズのドロワー</DrawerTitle>
          <DrawerDescription>
            高さを50vhに制限したドロワーです。
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <div className="h-[200px] rounded border-2 border-dashed border-muted-foreground/25 p-4">
            スクロール可能なコンテンツエリア
          </div>
        </div>
        <DrawerFooter>
          <Button>確認</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // トリガーボタンの確認
    const trigger = canvas.getByRole('button', { name: 'カスタムサイズ' })
    expect(trigger).toBeInTheDocument()
    
    // ドロワーを開く
    await userEvent.click(trigger)
    
    // ドロワーの内容を確認
    const drawer = document.querySelector('[role="dialog"]')
    expect(drawer).toBeInTheDocument()
    expect(drawer).toHaveClass('max-h-[50vh]')
    
    const drawerContent = within(drawer as HTMLElement)
    expect(drawerContent.getByText('カスタムサイズのドロワー')).toBeVisible()
    expect(drawerContent.getByText('スクロール可能なコンテンツエリア')).toBeVisible()
  },
} 