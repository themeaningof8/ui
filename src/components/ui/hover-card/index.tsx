"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"

/**
 * @file ホバーカードコンポーネント
 * @description 要素にホバーした時に表示されるカードコンポーネント
 * 
 * @example
 * ```tsx
 * <HoverCard>
 *   <HoverCardTrigger>ホバーしてください</HoverCardTrigger>
 *   <HoverCardContent>
 *     ホバー時に表示される内容
 *   </HoverCardContent>
 * </HoverCard>
 * ```
 */

/**
 * ホバーカードのルートコンポーネントです。
 * ホバーカード全体のコンテナとして機能します。
 */
const HoverCard = HoverCardPrimitive.Root

/**
 * ホバーカードのトリガーコンポーネントです。
 * ホバーした時にカードを表示する要素として機能します。
 */
const HoverCardTrigger = HoverCardPrimitive.Trigger

/**
 * ホバーカードのコンテンツコンポーネントです。
 * ホバー時に表示される内容を含むコンテナとして機能します。
 * 
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {string} [props.align="center"] - 水平方向の配置
 * @param {number} [props.sideOffset=4] - サイドのオフセット
 * @param {React.ReactNode} props.children - 子要素
 * @param {React.Ref<HTMLDivElement>} ref - 転送されるref
 */
const HoverCardContent = React.forwardRef<
  React.ComponentRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md",
      "border border-step-7 bg-step-2 p-4 text-step-11",
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
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }
