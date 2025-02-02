/**
 * @file Skeleton コンポーネント
 * @description コンテンツのローディング状態を表示するためのスケルトンコンポーネント。
 * アニメーション付きのプレースホルダーを提供し、データ読み込み中のユーザー体験を向上させます。
 *
 * @example
 * // テキストのスケルトン
 * <Skeleton className="h-4 w-[250px]" />
 * 
 * // アバターのスケルトン
 * <Skeleton className="h-12 w-12 rounded-full" />
 * 
 * // カードのスケルトン
 * <div className="space-y-3">
 *   <Skeleton className="h-[200px] w-full rounded-xl" />
 *   <Skeleton className="h-4 w-[250px]" />
 *   <Skeleton className="h-4 w-[200px]" />
 * </div>
 */

import * as React from 'react'
import { cn } from '@/lib/cn'
import { tv } from 'tailwind-variants'

/**
 * @description Skeletonのスタイルバリアント
 */
const skeletonVariants = tv({
  base: 'animate-pulse rounded-md bg-base-subtle',
})

/**
 * @description Skeletonのプロパティ型
 */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @description スケルトンの高さ（任意）
   * @default 'auto'
   */
  height?: string | number
  /**
   * @description スケルトンの幅（任意）
   * @default 'auto'
   */
  width?: string | number
  /**
   * @description スケルトンの形状（任意）
   * @default false
   */
  isCircle?: boolean
}

/**
 * @description Skeletonコンポーネント
 */
const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, height, width, isCircle = false, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          skeletonVariants(),
          isCircle && 'rounded-full',
          className
        )}
        style={{
          height,
          width,
          ...style,
        }}
        {...props}
      />
    )
  }
)
Skeleton.displayName = 'Skeleton'

export { Skeleton } 