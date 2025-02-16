"use client"

import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"
import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

/**
 * @file ナビゲーションメニューコンポーネント
 * @description ウェブサイトのナビゲーション構造を提供するコンポーネントです
 * 
 * @example
 * ```tsx
 * // 基本的な使用例
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>
 *       <NavigationMenuTrigger>はじめに</NavigationMenuTrigger>
 *       <NavigationMenuContent>
 *         <ul className="grid gap-3 p-4 w-[400px]">
 *           <li>
 *             <NavigationMenuLink href="/docs">
 *               ドキュメント
 *             </NavigationMenuLink>
 *           </li>
 *         </ul>
 *       </NavigationMenuContent>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 * </NavigationMenu>
 * 
 * // 複数のメニュー項目
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>
 *       <NavigationMenuTrigger>製品</NavigationMenuTrigger>
 *       <NavigationMenuContent>
 *         <div className="grid gap-4 p-6 w-[500px]">
 *           <NavigationMenuLink href="/products/feature1">
 *             機能1
 *           </NavigationMenuLink>
 *           <NavigationMenuLink href="/products/feature2">
 *             機能2
 *           </NavigationMenuLink>
 *         </div>
 *       </NavigationMenuContent>
 *     </NavigationMenuItem>
 *     <NavigationMenuItem>
 *       <NavigationMenuLink href="/about">
 *         会社概要
 *       </NavigationMenuLink>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 * </NavigationMenu>
 * ```
 */

/**
 * ナビゲーションメニューのトリガースタイルを定義
 */
const navigationMenuTriggerStyle = cva(
  [
    "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2",
    "text-sm font-medium",
    "bg-step-1 text-step-12",
    "transition-colors duration-200",
    "hover:bg-step-4 hover:text-step-12",
    "focus:bg-step-4 focus:text-step-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-step-7 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[active]:bg-step-4/50 data-[state=open]:bg-step-4/50",
  ]
)

/**
 * ナビゲーションメニューコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function NavigationMenu({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      className={cn(
        "relative z-10 flex max-w-max flex-1 items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  )
}

/**
 * ナビゲーションメニューのリストコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function NavigationMenuList({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center space-x-1",
        className
      )}
      {...props}
    />
  )
}

/**
 * ナビゲーションメニューの項目コンポーネント
 */
const NavigationMenuItem = NavigationMenuPrimitive.Item

/**
 * ナビゲーションメニューのトリガーコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function NavigationMenuTrigger({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}{" "}
      <ChevronDown
        className="relative top-[1px] ml-1 size-3 text-step-11/50 transition duration-200 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

/**
 * ナビゲーションメニューのコンテンツコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function NavigationMenuContent({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "left-0 top-0 w-full",
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out",
        "data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out",
        "data-[motion=from-end]:slide-in-from-right-52",
        "data-[motion=from-start]:slide-in-from-left-52",
        "data-[motion=to-end]:slide-out-to-right-52",
        "data-[motion=to-start]:slide-out-to-left-52",
        "md:absolute md:w-auto",
        className
      )}
      {...props}
    />
  )
}

/**
 * ナビゲーションメニューのリンクコンポーネント
 */
const NavigationMenuLink = NavigationMenuPrimitive.Link

/**
 * ナビゲーションメニューのビューポートコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function NavigationMenuViewport({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div className={cn("absolute left-0 top-full flex justify-center")}>
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "origin-top-center relative mt-1.5",
          "h-[var(--radix-navigation-menu-viewport-height)]",
          "w-full overflow-hidden rounded-md",
          "border border-step-7 bg-step-1 text-step-12",
          "shadow-lg shadow-step-7/10",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90",
          "md:w-[var(--radix-navigation-menu-viewport-width)]",
          className
        )}
        {...props}
      />
    </div>
  )
}

/**
 * ナビゲーションメニューのインジケーターコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function NavigationMenuIndicator({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out",
        "data-[state=hidden]:fade-out data-[state=visible]:fade-in",
        className
      )}
      {...props}
    >
      <div
        data-slot="navigation-menu-indicator-arrow"
        className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-step-7 shadow-md"
      />
    </NavigationMenuPrimitive.Indicator>
  )
}

// displayName の設定
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName
NavigationMenuItem.displayName = NavigationMenuPrimitive.Item.displayName
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName
NavigationMenuLink.displayName = NavigationMenuPrimitive.Link.displayName
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}
