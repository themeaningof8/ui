"use client"

import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

/**
 * @file ホバーカードコンポーネント
 * @description マウスホバー時に追加情報を表示するカードコンポーネントです
 * 
 * @example
 * ```tsx
 * // 基本的な使用例
 * <HoverCard>
 *   <HoverCardTrigger>ユーザー名</HoverCardTrigger>
 *   <HoverCardContent>
 *     <div className="flex gap-4 p-4">
 *       <Avatar>
 *         <AvatarImage src="user-avatar.jpg" />
 *         <AvatarFallback>UN</AvatarFallback>
 *       </Avatar>
 *       <div className="space-y-2">
 *         <h4 className="text-sm font-semibold">@username</h4>
 *         <p className="text-sm text-step-11">
 *           ユーザーの詳細情報をここに表示
 *         </p>
 *       </div>
 *     </div>
 *   </HoverCardContent>
 * </HoverCard>
 * 
 * // 遅延表示の設定
 * <HoverCard openDelay={200} closeDelay={300}>
 *   <HoverCardTrigger>製品情報</HoverCardTrigger>
 *   <HoverCardContent>
 *     <div className="p-4">
 *       <h4 className="mb-2 font-medium">製品の詳細</h4>
 *       <p className="text-sm text-step-11">
 *         製品に関する追加情報をここに表示
 *       </p>
 *     </div>
 *   </HoverCardContent>
 * </HoverCard>
 */

/**
 * ホバーカードのルートコンポーネント
 */
const HoverCard = HoverCardPrimitive.Root

/**
 * ホバーカードのトリガーコンポーネント
 */
const HoverCardTrigger = HoverCardPrimitive.Trigger

/**
 * ホバーカードのコンテンツコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.align - 水平方向の配置
 * @param props.sideOffset - サイドのオフセット
 * @param props.alignOffset - 配置のオフセット
 */
function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  alignOffset = 0,
  ...props
}: ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Content
      data-slot="hover-card-content"
      align={align}
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      className={cn(
        "z-50 w-64 p-3 rounded-md",
        "border border-step-7 bg-step-2 text-step-12",
        "shadow-md shadow-step-7/10",
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
  )
}

// displayName の設定
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }
