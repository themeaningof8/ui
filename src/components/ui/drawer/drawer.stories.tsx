/**
 * @file ドロワーコンポーネントのストーリー
 * @description ドロワーコンポーネントの使用例を表示します
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from '.'

const meta = {
  title: 'UI/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なドロワーの使用例
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
            これは基本的なドロワーコンポーネントの例です。
            画面の端から表示されるパネルとして機能します。
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p>ドロワーのコンテンツをここに配置します。</p>
        </div>
        <DrawerFooter>
          <Button>アクション</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

/**
 * フォームを含むドロワーの使用例
 */
export const WithForm: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">フォームを開く</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>新規作成</DrawerTitle>
          <DrawerDescription>
            新しいアイテムを作成します。
            必要な情報を入力してください。
          </DrawerDescription>
        </DrawerHeader>
        <form className="p-4 space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">名前</label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border rounded-md"
              placeholder="名前を入力"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">説明</label>
            <textarea
              id="description"
              className="w-full p-2 border rounded-md"
              placeholder="説明を入力"
              rows={3}
            />
          </div>
        </form>
        <DrawerFooter>
          <Button type="submit">保存</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

/**
 * カスタムサイズのドロワーの使用例
 */
export const CustomSize: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">大きいドロワーを開く</Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-[800px]">
        <DrawerHeader>
          <DrawerTitle>大きいドロワー</DrawerTitle>
          <DrawerDescription>
            このドロワーは通常よりも幅が広くなっています。
            より多くのコンテンツを表示する必要がある場合に適しています。
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium">セクション1</h3>
            <p className="text-sm text-muted-foreground">
              左側のコンテンツエリアです。
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">セクション2</h3>
            <p className="text-sm text-muted-foreground">
              右側のコンテンツエリアです。
            </p>
          </div>
        </div>
        <DrawerFooter>
          <Button>完了</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
} 