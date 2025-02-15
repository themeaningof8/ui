"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

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

/**
 * セパレーターコンポーネントです。
 * コンテンツを視覚的に分離するために使用します。
 * 
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {string} [props.orientation="horizontal"] - セパレーターの向き（"horizontal" | "vertical"）
 * @param {string} [props.decorative] - 装飾的な要素として扱うかどうか
 * @param {React.ReactNode} props.children - 子要素
 * @param {React.Ref<HTMLDivElement>} ref - 転送されるref
 */
const Separator = React.forwardRef<
  React.ComponentRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
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
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
