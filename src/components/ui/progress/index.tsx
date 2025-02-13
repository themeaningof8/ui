"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

/**
 * @file プログレスバーコンポーネント
 * @description 進行状況を視覚的に表示するコンポーネント
 */

/**
 * プログレスバーのコンポーネントです。
 * 進行状況を視覚的に表示するために使用します。
 * 
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {number} [props.value] - 進行状況の値（0-100）
 * @param {React.ReactNode} props.children - 子要素
 * @param {React.Ref<HTMLDivElement>} ref - 転送されるref
 * 
 * @example
 * ```tsx
 * <Progress value={60} />
 * ```
 */
const Progress = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: value === 100 ? 'translateX(0%)' : `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
