/**
 * @file ツールチップコンポーネント
 * @description ホバー時に追加情報を表示するコンポーネントです
 * 
 * @example
 * ```tsx
 * // 基本的な使用例
 * <Tooltip>
 *   <TooltipTrigger>ホバーしてください</TooltipTrigger>
 *   <TooltipContent>
 *     ツールチップの内容
 *   </TooltipContent>
 * </Tooltip>
 * 
 * // 遅延表示の設定
 * <TooltipProvider delayDuration={500}>
 *   <Tooltip>
 *     <TooltipTrigger>遅延表示</TooltipTrigger>
 *     <TooltipContent>
 *       500ms後に表示されます
 *     </TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 */

"use client"

import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

/**
 * ツールチップのプロバイダーコンポーネント
 */
const TooltipProvider = TooltipPrimitive.Provider

/**
 * ツールチップのルートコンポーネント
 */
const Tooltip = TooltipPrimitive.Root

/**
 * ツールチップのトリガーコンポーネント
 */
const TooltipTrigger = TooltipPrimitive.Trigger

/**
 * ツールチップのコンテンツコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.sideOffset - サイドのオフセット
 * @param props.children - コンテンツの内容
 */
function TooltipContent({
  className,
  sideOffset = 4,
  ...props
}: ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Content
      data-slot="tooltip-content"
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md px-3 py-1.5 text-sm",
        "border border-step-7 bg-step-2 text-step-12",
        "shadow-md shadow-step-7/10",
        "animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
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
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
