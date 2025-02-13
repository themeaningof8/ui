/**
 * @file アスペクト比コンポーネント
 * @description 指定したアスペクト比で子要素を表示するコンポーネントです
 * 
 * @example
 * ```tsx
 * // 16:9のアスペクト比で画像を表示
 * <AspectRatio ratio={16 / 9}>
 *   <img src="example.jpg" alt="画像" className="object-cover" />
 * </AspectRatio>
 * 
 * // 4:3のアスペクト比でビデオを表示
 * <AspectRatio ratio={4 / 3}>
 *   <video src="example.mp4" />
 * </AspectRatio>
 * ```
 */

import * as React from "react"
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

import { cn } from "@/lib/utils"

/**
 * アスペクト比コンポーネントのプロパティ
 * @typedef AspectRatioProps
 * @property {number} ratio - アスペクト比（幅/高さ）
 * @property {string} [className] - 追加のCSSクラス名
 * @property {React.ReactNode} children - 表示するコンテンツ
 */
const AspectRatio = React.forwardRef<
  React.ComponentRef<typeof AspectRatioPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AspectRatioPrimitive.Root
    ref={ref}
    className={cn("relative w-full", className)}
    {...props}
  />
))
AspectRatio.displayName = "AspectRatio"

export { AspectRatio } 