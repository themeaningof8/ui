/**
 * @file NavigationMenuコンポーネントのストーリー
 * @description NavigationMenuコンポーネントの様々な状態とバリエーションを表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '.'

const meta = {
  title: 'UI/NavigationMenu',
  component: NavigationMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NavigationMenu>

export default meta
type Story = StoryObj<typeof meta>

/**
 * @description 基本的なナビゲーションメニューの表示
 */
export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>製品</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <div className="row-span-3">
                <NavigationMenuLink className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-base-ui/50 to-base-ui p-6 no-underline outline-none focus:shadow-md">
                  <div className="mb-2 mt-4 text-lg font-medium">
                    製品の特徴
                  </div>
                  <p className="text-sm leading-tight text-base-low">
                    私たちの製品の主な特徴と利点をご紹介します。
                  </p>
                </NavigationMenuLink>
              </div>
              <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-base-ui hover:text-base-high focus:bg-base-ui focus:text-base-high">
                <div className="text-sm font-medium leading-none">製品A</div>
                <p className="line-clamp-2 text-sm leading-snug text-base-low">
                  高性能な製品Aの詳細説明
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-base-ui hover:text-base-high focus:bg-base-ui focus:text-base-high">
                <div className="text-sm font-medium leading-none">製品B</div>
                <p className="line-clamp-2 text-sm leading-snug text-base-low">
                  使いやすい製品Bの詳細説明
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-base-ui hover:text-base-high focus:bg-base-ui focus:text-base-high">
                <div className="text-sm font-medium leading-none">製品C</div>
                <p className="line-clamp-2 text-sm leading-snug text-base-low">
                  革新的な製品Cの詳細説明
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>会社情報</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
              <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-base-ui hover:text-base-high focus:bg-base-ui focus:text-base-high">
                <div className="text-sm font-medium leading-none">会社概要</div>
                <p className="line-clamp-2 text-sm leading-snug text-base-low">
                  私たちの会社の歴史と理念
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-base-ui hover:text-base-high focus:bg-base-ui focus:text-base-high">
                <div className="text-sm font-medium leading-none">採用情報</div>
                <p className="line-clamp-2 text-sm leading-snug text-base-low">
                  一緒に働く仲間を募集しています
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-base-ui hover:text-base-high focus:bg-base-ui focus:text-base-high">
                <div className="text-sm font-medium leading-none">お問い合わせ</div>
                <p className="line-clamp-2 text-sm leading-snug text-base-low">
                  ご質問やご相談はこちら
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger disabled>準備中</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-4">
              <p className="text-sm text-base-low">
                このセクションは現在準備中です。
              </p>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

/**
 * @description シンプルなナビゲーションメニューの表示
 */
export const Simple: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>メニュー1</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-2 p-4">
              <NavigationMenuLink className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-base-ui hover:text-base-high focus:bg-base-ui focus:text-base-high">
                リンク1
              </NavigationMenuLink>
              <NavigationMenuLink className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-base-ui hover:text-base-high focus:bg-base-ui focus:text-base-high">
                リンク2
              </NavigationMenuLink>
              <NavigationMenuLink className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-base-ui hover:text-base-high focus:bg-base-ui focus:text-base-high">
                リンク3
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>メニュー2</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-2 p-4">
              <NavigationMenuLink className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-base-ui hover:text-base-high focus:bg-base-ui focus:text-base-high">
                リンク4
              </NavigationMenuLink>
              <NavigationMenuLink className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-base-ui hover:text-base-high focus:bg-base-ui focus:text-base-high">
                リンク5
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
} 