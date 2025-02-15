/**
 * @file ツールチップコンポーネント
 * @description ホバー時に追加情報を表示するコンポーネントです
 * 
 * @example
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger>Hover me</TooltipTrigger>
 *   <TooltipContent>
 *     Tooltip content
 *   </TooltipContent>
 * </Tooltip>
 * ```
 */

"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

/**
 * ツールチップのプロバイダーコンポーネントです。
 * アプリケーション全体のツールチップの設定を管理します。
 * 
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {React.ReactNode} props.children - 子要素
 * @param {number} [props.delayDuration=700] - 表示までの遅延時間（ミリ秒）
 * @param {number} [props.skipDelayDuration=300] - 連続表示時の遅延をスキップする時間（ミリ秒）
 */
const TooltipProvider = TooltipPrimitive.Provider

/**
 * ツールチップのルートコンポーネントです。
 * ツールチップ全体のコンテナとして機能します。
 */
const Tooltip = TooltipPrimitive.Root

/**
 * ツールチップのトリガーコンポーネントです。
 * ホバー時にツールチップを表示する要素として機能します。
 */
const TooltipTrigger = TooltipPrimitive.Trigger

/**
 * ツールチップのコンテンツコンポーネントです。
 * ホバー時に表示される内容を含むコンテナとして機能します。
 * 
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {string} [props.sideOffset=4] - サイドのオフセット
 * @param {React.ReactNode} props.children - 子要素
 * @param {React.Ref<HTMLDivElement>} ref - 転送されるref
 */
const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
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
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
