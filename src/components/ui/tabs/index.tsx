"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

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
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

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
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

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
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
