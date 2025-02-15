"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

/**
 * ポップオーバーのルートコンポーネントです。
 * ポップオーバー全体のコンテナとして機能します。
 */
const Popover = PopoverPrimitive.Root

/**
 * ポップオーバーのトリガーコンポーネントです。
 * クリックした時にポップオーバーを表示する要素として機能します。
 */
const PopoverTrigger = PopoverPrimitive.Trigger

/**
 * ポップオーバーのコンテンツコンポーネントです。
 * クリック時に表示される内容を含むコンテナとして機能します。
 * 
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {string} [props.align="center"] - 水平方向の配置
 * @param {number} [props.sideOffset=4] - サイドのオフセット
 * @param {React.ReactNode} props.children - 子要素
 * @param {React.Ref<HTMLDivElement>} ref - 転送されるref
 */
const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      data-side-offset={sideOffset}
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
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
