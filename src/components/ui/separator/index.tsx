"use client"

/**
 * @file セパレーターコンポーネント
 * @description コンテンツを視覚的に分離するためのコンポーネント
 * 
 * @example
 * ```tsx
 * // 水平方向のセパレーター
 * <Separator className="my-4" />
 * 
 * // 垂直方向のセパレーター
 * <Separator orientation="vertical" className="mx-4 h-4" />
 * ```
 */

import * as SeparatorPrimitive from "@radix-ui/react-separator"
import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

/**
 * セパレーターコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.orientation - セパレーターの向き（"horizontal" | "vertical"）
 * @param props.decorative - 装飾的な要素として扱うかどうか
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        "shrink-0 bg-step-6",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
}

// displayName の設定
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
