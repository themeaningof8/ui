"use client"

import * as ProgressPrimitive from "@radix-ui/react-progress"
import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

/**
 * @file プログレスコンポーネント
 * @description 進行状況を視覚的に表示するコンポーネントです
 * 
 * @example
 * ```tsx
 * // 基本的な使用例
 * <Progress value={40} />
 * 
 * // カスタムサイズ
 * <Progress value={60} className="h-2 w-[300px]" />
 * 
 * // 不確定な進行状態
 * <Progress value={null} />
 * 
 * // ラベル付きプログレスバー
 * <div className="space-y-1">
 *   <Label>アップロード進捗</Label>
 *   <Progress value={80} />
 * </div>
 * ```
 */

/**
 * プログレスコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.value - 進行状況の値（0-100）
 * @param props.max - 最大値（デフォルト: 100）
 */
function Progress({
  className,
  value,
  max = 100,
  ...props
}: ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>) {
  const percentage = value != null ? Math.min(Math.max(value, 0), max) : null

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full",
        "border border-step-7 bg-step-3",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "h-full w-full flex-1 transition-all",
          "bg-step-9",
          "duration-200",
          percentage === null && [
            "animate-progress-indeterminate",
            "duration-1500 ease-in-out infinite",
            "bg-gradient-to-r from-step-9/30 via-step-9 to-step-9/30",
          ]
        )}
        style={{
          transform: percentage != null ? `translateX(-${100 - percentage}%)` : 'translateX(-100%)',
        }}
      />
    </ProgressPrimitive.Root>
  )
}

// displayName の設定
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
