/**
 * @file NavigationMenuのストーリー
 * @description NavigationMenuの様々な状態とバリエーションを表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta = {
  title: 'UI/NavigationMenu',
  component: NavigationMenu,
  parameters: {
    layout: 'centered',
    onLoad: () => {
      const consoleError = console.error;
      console.error = (...args) => {
        consoleError(...args);
        throw new Error(args.join(' '));
      };
    },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // メニュートリガーの確認
    const triggers = canvas.getAllByRole('button')
    expect(triggers).toHaveLength(3)
    expect(triggers[0]).toHaveTextContent('製品')
    expect(triggers[1]).toHaveTextContent('会社情報')
    expect(triggers[2]).toHaveTextContent('準備中')
    
    // 製品メニューの操作テスト
    await userEvent.click(triggers[0])
    const productContent = document.querySelector('[role="region"]')
    expect(productContent).toBeInTheDocument()
    
    // 製品メニューの内容確認
    const productLinks = within(productContent as HTMLElement).getAllByRole('link')
    expect(productLinks).toHaveLength(4)
    expect(productLinks[0]).toHaveTextContent('製品の特徴')
    expect(productLinks[1]).toHaveTextContent('製品A')
    expect(productLinks[2]).toHaveTextContent('製品B')
    expect(productLinks[3]).toHaveTextContent('製品C')
    
    // 会社情報メニューの操作テスト
    await userEvent.click(triggers[1])
    const companyContent = document.querySelector('[role="region"]')
    expect(companyContent).toBeInTheDocument()
    
    // 会社情報メニューの内容確認
    const companyLinks = within(companyContent as HTMLElement).getAllByRole('link')
    expect(companyLinks).toHaveLength(3)
    expect(companyLinks[0]).toHaveTextContent('会社概要')
    expect(companyLinks[1]).toHaveTextContent('採用情報')
    expect(companyLinks[2]).toHaveTextContent('お問い合わせ')
    
    // 無効化されたメニューの確認
    expect(triggers[2]).toBeDisabled()
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // メニュートリガーの確認
    const triggers = canvas.getAllByRole('button')
    expect(triggers).toHaveLength(2)
    expect(triggers[0]).toHaveTextContent('メニュー1')
    expect(triggers[1]).toHaveTextContent('メニュー2')
    
    // メニュー1の操作テスト
    await userEvent.click(triggers[0])
    const menu1Content = document.querySelector('[role="region"]')
    expect(menu1Content).toBeInTheDocument()
    
    // メニュー1の内容確認
    const menu1Links = within(menu1Content as HTMLElement).getAllByRole('link')
    expect(menu1Links).toHaveLength(3)
    expect(menu1Links[0]).toHaveTextContent('リンク1')
    expect(menu1Links[1]).toHaveTextContent('リンク2')
    expect(menu1Links[2]).toHaveTextContent('リンク3')
    
    // メニュー2の操作テスト
    await userEvent.click(triggers[1])
    const menu2Content = document.querySelector(
      '[data-testid="menu-content-2"]'
    )
    expect(menu2Content).toBeInTheDocument()
    
    // メニュー2の内容確認
    const menu2Links = within(menu2Content as HTMLElement).getAllByRole('link')
    expect(menu2Links).toHaveLength(2)
    expect(menu2Links[0]).toHaveTextContent('リンク4')
    expect(menu2Links[1]).toHaveTextContent('リンク5')
    
    // キーボード操作のテスト
    await userEvent.tab() // 最初のトリガーにフォーカス
    expect(triggers[0]).toHaveFocus()
    
    await userEvent.keyboard('{Enter}') // メニューを開く
    const menu1LinksAfterKeyboard = within(menu1Content as HTMLElement).getAllByRole('link')
    expect(menu1LinksAfterKeyboard[0]).toBeVisible()
  },
} 