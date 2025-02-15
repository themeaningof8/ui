import type { Meta, StoryObj } from '@storybook/react'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '.'
import { cn } from '@/lib/utils'

/**
 * `NavigationMenu`は、ウェブサイトのナビゲーション構造を作成するためのコンポーネントセットです。
 * Radix UIのNavigation Menuプリミティブをベースに、アクセシビリティと一貫したスタイリングを提供します。
 */
const meta = {
  title: 'UI/NavigationMenu',
  component: NavigationMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NavigationMenu>

export default meta
type Story = StoryObj<typeof NavigationMenu>

/**
 * 基本的なナビゲーションメニューの例です。
 */
export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[400px]">
              <li>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'w-full justify-start'
                  )}
                >
                  Introduction
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'w-full justify-start'
                  )}
                >
                  Installation
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

/**
 * 複数のメニュー項目を持つ例です。
 */
export const MultipleItems: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[400px]">
              <li>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'w-full justify-start'
                  )}
                >
                  Introduction
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[400px]">
              <li>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'w-full justify-start'
                  )}
                >
                  Button
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

/**
 * リッチコンテンツを含むメニューの例です。
 */
export const WithRichContent: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 w-[600px] grid-cols-2">
              <li className="col-span-2">
                <div className="font-medium mb-2">Featured</div>
                <div className="text-sm text-step-11">
                  Discover our most popular resources and guides.
                </div>
              </li>
              <li>
                <NavigationMenuLink
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-step-5 hover:text-step-12 focus:bg-step-5 focus:text-step-12"
                >
                  <div className="text-sm font-medium leading-none">Documentation</div>
                  <p className="text-sm leading-snug text-step-11">
                    Start integrating products and tools
                  </p>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-step-5 hover:text-step-12 focus:bg-step-5 focus:text-step-12"
                >
                  <div className="text-sm font-medium leading-none">API Reference</div>
                  <p className="text-sm leading-snug text-step-11">
                    Detailed API documentation and examples
                  </p>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

/**
 * 無効化された項目を含む例です。
 */
export const WithDisabledItems: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Enabled</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[400px]">
              <li>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'w-full justify-start'
                  )}
                >
                  Active Link
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger disabled>Disabled</NavigationMenuTrigger>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
} 