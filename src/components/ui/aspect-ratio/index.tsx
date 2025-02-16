/**
 * @file アスペクト比コンポーネント
 * @description 指定したアスペクト比で子要素を表示するコンポーネントです
 * 
 * @example
 * ```tsx
 * // 16:9のアスペクト比で画像を表示
 * <AspectRatio ratio={16 / 9}>
 *   <img
 *     src="example.jpg"
 *     alt="画像"
 *     className="object-cover"
 *     loading="lazy"
 *   />
 * </AspectRatio>
 * 
 * // 4:3のアスペクト比でビデオを表示
 * <AspectRatio ratio={4 / 3}>
 *   <video
 *     src="example.mp4"
 *     controls
 *     preload="metadata"
 *   />
 * </AspectRatio>
 * 
 * // カスタムスタイルの適用
 * <AspectRatio
 *   ratio={1}
 *   className="border-2 border-step-7 hover:border-step-8"
 * >
 *   <div className="flex items-center justify-center">
 *     正方形のコンテンツ
 *   </div>
 * </AspectRatio>
 * ```
 */

"use client"

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

/**
 * アスペクト比コンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.ratio - アスペクト比（幅/高さ）
 * @param props.className - 追加のCSSクラス名
 * @param props.children - 表示するコンテンツ
 */
function AspectRatio({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>) {
  return (
    <AspectRatioPrimitive.Root
      data-slot="aspect-ratio"
      className={cn(
        "relative w-full overflow-hidden rounded-lg",
        "bg-step-2",
        "ring-1 ring-step-6/20",
        "[&_img]:size-full [&_img]:object-cover",
        "[&_video]:size-full [&_video]:object-cover",
        className
      )}
      {...props}
    />
  )
}

// displayName の設定
AspectRatio.displayName = "AspectRatio"

export { AspectRatio } 