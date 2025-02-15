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

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * タブのルートコンポーネントです。
 * タブ全体のコンテナとして機能します。
 * 
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {string} [props.defaultValue] - デフォルトで選択されるタブの値
 * @param {string} [props.value] - 選択されているタブの値
 * @param {(value: string) => void} [props.onValueChange] - タブが変更された時のコールバック
 * @param {React.ReactNode} props.children - 子要素
 * @param {React.Ref<HTMLDivElement>} ref - 転送されるref
 */
const Tabs = TabsPrimitive.Root

/**
 * タブリストのスタイルバリエーションを定義
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
 * タブのリストコンポーネントです。
 * タブのトリガーをグループ化するコンテナとして機能します。
 * 
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {React.ReactNode} props.children - 子要素
 * @param {React.Ref<HTMLDivElement>} ref - 転送されるref
 */
const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
    VariantProps<typeof tabsListVariants>
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant }), className)}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

/**
 * タブトリガーのスタイルバリエーションを定義
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
 * タブのトリガーコンポーネントです。
 * クリックするとタブを切り替える要素として機能します。
 * 
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {string} props.value - タブの値
 * @param {boolean} [props.disabled] - 無効化状態
 * @param {React.ReactNode} props.children - 子要素
 * @param {React.Ref<HTMLButtonElement>} ref - 転送されるref
 */
const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
    VariantProps<typeof tabsTriggerVariants>
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant }), className)}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

/**
 * タブコンテンツのスタイルバリエーションを定義
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
 * タブのコンテンツコンポーネントです。
 * タブが選択された時に表示される内容を含むコンテナとして機能します。
 * 
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {string} props.value - タブの値
 * @param {React.ReactNode} props.children - 子要素
 * @param {React.Ref<HTMLDivElement>} ref - 転送されるref
 */
const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> &
    VariantProps<typeof tabsContentVariants>
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(tabsContentVariants({ variant }), className)}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants, tabsContentVariants }
