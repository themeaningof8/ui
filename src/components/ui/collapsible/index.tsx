/**
 * @file コラプシブルコンポーネント
 * @description 開閉可能なコンテンツを表示するコンポーネント
 * 
 * @example
 * ```tsx
 * // 基本的な使用例
 * <Collapsible>
 *   <CollapsibleTrigger>開閉ボタン</CollapsibleTrigger>
 *   <CollapsibleContent>表示/非表示のコンテンツ</CollapsibleContent>
 * </Collapsible>
 * 
 * // デフォルトで開いた状態
 * <Collapsible defaultOpen>
 *   <CollapsibleTrigger>開閉ボタン</CollapsibleTrigger>
 *   <CollapsibleContent>表示/非表示のコンテンツ</CollapsibleContent>
 * </Collapsible>
 * 
 * // 無効化状態
 * <Collapsible disabled>
 *   <CollapsibleTrigger>開閉ボタン</CollapsibleTrigger>
 *   <CollapsibleContent>表示/非表示のコンテンツ</CollapsibleContent>
 * </Collapsible>
 * 
 * // エラー状態
 * <Collapsible>
 *   <CollapsibleTrigger variant="error">開閉ボタン</CollapsibleTrigger>
 *   <CollapsibleContent>表示/非表示のコンテンツ</CollapsibleContent>
 * </Collapsible>
 * ```
 */

"use client"

import * as React from 'react'
import type { ElementRef, ComponentPropsWithoutRef } from 'react'
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from '@/lib/utils'

/**
 * トリガーのスタイルバリエーションを定義
 */
const triggerVariants = cva(
  [
    "inline-flex items-center justify-between w-full",
    "rounded-md px-4 py-2 text-sm font-medium",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-7 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-step-2 text-step-11 hover:bg-step-3",
          "data-[state=open]:bg-step-3",
        ],
        error: [
          "bg-destructive-step-2 text-destructive-step-11",
          "hover:bg-destructive-step-3",
          "focus-visible:ring-destructive-step-7",
          "data-[state=open]:bg-destructive-step-3",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * コラプシブルコンポーネントのプロパティ
 * @typedef {Object} CollapsibleProps
 * @property {boolean} [defaultOpen] - デフォルトで開いた状態にするかどうか
 * @property {boolean} [disabled] - 無効化状態にするかどうか
 * @property {string} [className] - カスタムクラス名
 */
const Collapsible = React.forwardRef<
  ElementRef<typeof CollapsiblePrimitive.Root>,
  ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Root
    ref={ref}
    data-slot="collapsible"
    className={cn("w-full", className)}
    {...props}
  />
))
Collapsible.displayName = "Collapsible"

/**
 * コラプシブルのトリガーコンポーネントのプロパティ
 * @typedef {Object} CollapsibleTriggerProps
 * @property {boolean} [asChild] - 子要素をトリガーとして使用するかどうか
 * @property {string} [className] - カスタムクラス名
 * @property {"default" | "error"} [variant] - スタイルバリアント
 */
function CollapsibleTrigger({
  className,
  variant,
  ...props
}: ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger> & VariantProps<typeof triggerVariants>) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      className={cn(triggerVariants({ variant }), className)}
      {...props}
    />
  )
}
CollapsibleTrigger.displayName = "CollapsibleTrigger"

/**
 * コラプシブルのコンテンツコンポーネントのプロパティ
 * @typedef {Object} CollapsibleContentProps
 * @property {React.ReactNode} children - 子要素
 * @property {string} [className] - カスタムクラス名
 */
function CollapsibleContent({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>) {
  return (
    <CollapsiblePrimitive.Content
      data-slot="collapsible-content"
      className={cn(
        "overflow-hidden",
        "transition-all duration-300 ease-in-out",
        "data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
        className
      )}
      {...props}
    >
      <div className="space-y-2">{children}</div>
    </CollapsiblePrimitive.Content>
  )
}
CollapsibleContent.displayName = "CollapsibleContent"

export { Collapsible, CollapsibleTrigger, CollapsibleContent, triggerVariants } 