import type { Meta, StoryObj } from '@storybook/react'
import { Settings2, X } from 'lucide-react'
import { Button } from '../button'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '.'

/**
 * `Popover`は、クリックした時に追加情報やアクションを表示するためのコンポーネントです。
 * Radix UIのPopoverプリミティブをベースに、アクセシビリティと一貫したスタイリングを提供します。
 */
const meta = {
  title: 'UI/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof Popover>

/**
 * 基本的な使用例です。
 */
export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

/**
 * 設定パネルの例です。
 */
export const Settings: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings2 className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium leading-none">Settings</h4>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="width">Width</label>
              <input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="height">Height</label>
              <input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

/**
 * カスタム配置の例です。
 */
export const CustomPlacement: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Custom Placement</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start" sideOffset={10}>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Custom Placement</h4>
            <p className="text-sm text-muted-foreground">
              This popover is aligned to the start and has a side offset of 10 pixels.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

/**
 * フォーム要素を含む例です。
 */
export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Edit Profile</h4>
            <p className="text-sm text-muted-foreground">
              Make changes to your profile here.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                defaultValue="John Doe"
                className="col-span-2 h-8 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                defaultValue="john@example.com"
                className="col-span-2 h-8 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
              />
            </div>
          </div>
          <Button type="submit">Save changes</Button>
        </form>
      </PopoverContent>
    </Popover>
  ),
} 