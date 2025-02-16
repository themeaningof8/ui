"use client"

/**
 * @file スケルトンコンポーネント
 * @description コンテンツのローディング状態を表示するためのコンポーネント
 * 
 * @example
 * ```tsx
 * // アバター用のスケルトン
 * <Skeleton className="h-12 w-12 rounded-full" />
 * 
 * // テキスト用のスケルトン
 * <Skeleton className="h-4 w-[250px]" />
 * 
 * // カード用のスケルトン
 * <div className="space-y-3">
 *   <Skeleton className="h-[180px] w-full rounded-lg" />
 *   <Skeleton className="h-4 w-[250px]" />
 *   <Skeleton className="h-4 w-[200px]" />
 * </div>
 * ```
 */

import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

/**
 * スケルトンコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function Skeleton({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-md",
        "bg-step-3",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
