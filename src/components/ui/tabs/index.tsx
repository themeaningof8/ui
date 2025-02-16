/**
 * @file タブコンポーネント
 * @description コンテンツを切り替え可能なタブインターフェースを提供するコンポーネントです
 * 
 * @example
 * ```tsx
 * <Tabs defaultValue="account">
 *   <TabsList>
 *     <TabsTrigger value="account">アカウント</TabsTrigger>
 *     <TabsTrigger value="password">パスワード</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="account">
 *     アカウント設定の内容
 *   </TabsContent>
 *   <TabsContent value="password">
 *     パスワード変更の内容
 *   </TabsContent>
 * </Tabs>
 * ```
 */

"use client"

import * as TabsPrimitive from "@radix-ui/react-tabs"
import type { ComponentPropsWithoutRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * タブのルートコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.defaultValue - デフォルトで選択されるタブの値
 * @param props.value - 選択されているタブの値
 * @param props.onValueChange - タブが変更された時のコールバック
 * @param props.children - 子要素
 */
const Tabs = TabsPrimitive.Root

/**
 * タブリストのスタイルバリエーション
 */
const tabsListVariants = cva(
  [
    "inline-flex h-10 items-center justify-center rounded-md p-1",
    "bg-step-3 text-step-11",
    "ring-offset-step-1",
    "transition-colors duration-200",
  ],
  {
    variants: {
      variant: {
        default: "",
        outline: "border border-step-7",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * タブのリストコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.variant - スタイルバリアント
 * @param props.children - 子要素
 */
function TabsList({
  className,
  variant,
  ...props
}: ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

/**
 * タブトリガーのスタイルバリエーション
 */
const tabsTriggerVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5",
    "text-sm font-medium",
    "ring-offset-step-1",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-7 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[state=active]:bg-step-9 data-[state=active]:text-step-1 data-[state=active]:shadow-sm",
    "data-[state=inactive]:text-step-11 data-[state=inactive]:hover:bg-step-4 data-[state=inactive]:hover:text-step-12",
  ],
  {
    variants: {
      variant: {
        default: "",
        outline: "data-[state=active]:border-b-2 data-[state=active]:border-step-9",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * タブのトリガーコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.variant - スタイルバリアント
 * @param props.value - タブの値
 * @param props.disabled - 無効化状態
 * @param props.children - 子要素
 */
function TabsTrigger({
  className,
  variant,
  ...props
}: ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
  VariantProps<typeof tabsTriggerVariants>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant }), className)}
      {...props}
    />
  )
}

/**
 * タブコンテンツのスタイルバリエーション
 */
const tabsContentVariants = cva(
  [
    "mt-2",
    "ring-offset-step-1",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-7 focus-visible:ring-offset-2",
    "data-[state=inactive]:animate-out data-[state=active]:animate-in",
    "data-[state=inactive]:fade-out-0 data-[state=active]:fade-in-0",
    "data-[state=inactive]:zoom-out-95 data-[state=active]:zoom-in-95",
  ],
  {
    variants: {
      variant: {
        default: "",
        outline: "p-4 border border-step-7 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * タブのコンテンツコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.variant - スタイルバリアント
 * @param props.value - タブの値
 * @param props.children - 子要素
 */
function TabsContent({
  className,
  variant,
  ...props
}: ComponentPropsWithoutRef<typeof TabsPrimitive.Content> &
  VariantProps<typeof tabsContentVariants>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(tabsContentVariants({ variant }), className)}
      {...props}
    />
  )
}

// displayName の設定
TabsList.displayName = TabsPrimitive.List.displayName
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants, tabsContentVariants }
