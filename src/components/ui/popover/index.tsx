/**
 * @file ポップオーバーコンポーネント
 * @description クリックで追加情報やアクションを表示するポップオーバーコンポーネント
 * 
 * @example
 * ```tsx
 * // 基本的な使用例
 * <Popover>
 *   <PopoverTrigger>クリック</PopoverTrigger>
 *   <PopoverContent>
 *     <h4 className="font-medium">タイトル</h4>
 *     <p className="text-step-11">コンテンツ</p>
 *   </PopoverContent>
 * </Popover>
 * 
 * // カスタム配置
 * <Popover>
 *   <PopoverTrigger>クリック</PopoverTrigger>
 *   <PopoverContent align="start" sideOffset={10}>
 *     コンテンツ
 *   </PopoverContent>
 * </Popover>
 * ```
 */

"use client"

import type * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

/**
 * ポップオーバーのルートコンポーネントです。
 */
const Popover = PopoverPrimitive.Root

/**
 * ポップオーバーのトリガーコンポーネントです。
 */
function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return (
    <PopoverPrimitive.Trigger
      data-slot="trigger"
      {...props}
    />
  )
}

/**
 * ポップオーバーのコンテンツコンポーネントです。
 */
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-72 rounded-md p-4",
          "border border-step-7 bg-step-2 text-step-12",
          "shadow-md shadow-step-7/10",
          "outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

export { Popover, PopoverTrigger, PopoverContent }
