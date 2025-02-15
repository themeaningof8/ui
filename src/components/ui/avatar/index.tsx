/**
 * @file アバターコンポーネント
 * @description ユーザーのプロフィール画像やフォールバックテキストを表示するためのコンポーネント
 * 
 * @example
 * ```tsx
 * // 基本的な使用例
 * <Avatar>
 *   <AvatarImage src="path/to/image.jpg" alt="ユーザー名" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * 
 * // カスタムスタイルを適用した例
 * <Avatar className="h-16 w-16">
 *   <AvatarImage src="path/to/image.jpg" alt="ユーザー名" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 */

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

/**
 * @interface AvatarProps
 * @description アバターコンポーネントのプロパティ
 * @property {string} [className] - カスタムクラス名
 * @property {React.ReactNode} [children] - 子要素（AvatarImageとAvatarFallback）
 */
const Avatar = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex size-10 shrink-0 overflow-hidden rounded-full border border-step-6",
      className
    )}
    {...props}
  />
))
Avatar.displayName = "Avatar"

/**
 * @interface AvatarImageProps
 * @description アバター画像コンポーネントのプロパティ
 * @property {string} [className] - カスタムクラス名
 * @property {string} src - 画像のURL
 * @property {string} alt - 画像の代替テキスト
 */
const AvatarImage = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = "AvatarImage"

/**
 * @interface AvatarFallbackProps
 * @description アバターフォールバックコンポーネントのプロパティ
 * @property {string} [className] - カスタムクラス名
 * @property {number} [delayMs] - フォールバック表示までの遅延時間（ミリ秒）
 * @property {React.ReactNode} [children] - フォールバックとして表示する内容
 */
const AvatarFallback = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-step-2 text-step-11",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback } 