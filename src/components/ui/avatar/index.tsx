/**
 * @file アバターコンポーネント
 * @description ユーザーのプロフィール画像やフォールバックテキストを表示するためのコンポーネント
 * 
 * @example
 * ```tsx
 * // 基本的な使用例
 * <Avatar>
 *   <AvatarImage
 *     src="path/to/image.jpg"
 *     alt="ユーザー名"
 *     loading="lazy"
 *   />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * 
 * // カスタムスタイルを適用した例
 * <Avatar className="size-16">
 *   <AvatarImage
 *     src="path/to/image.jpg"
 *     alt="ユーザー名"
 *     loading="lazy"
 *   />
 *   <AvatarFallback delayMs={600}>JD</AvatarFallback>
 * </Avatar>
 * 
 * // グループ内のアバター
 * <div className="flex -space-x-2">
 *   <Avatar className="border-2 border-step-1">
 *     <AvatarImage src="user1.jpg" alt="ユーザー1" />
 *     <AvatarFallback>U1</AvatarFallback>
 *   </Avatar>
 *   <Avatar className="border-2 border-step-1">
 *     <AvatarImage src="user2.jpg" alt="ユーザー2" />
 *     <AvatarFallback>U2</AvatarFallback>
 *   </Avatar>
 * </div>
 * ```
 */

"use client"

import * as AvatarPrimitive from "@radix-ui/react-avatar"
import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

/**
 * アバターコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.children - 子要素（AvatarImageとAvatarFallback）
 */
function Avatar({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full",
        "size-10",
        "border border-step-6",
        "bg-step-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * アバター画像コンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.src - 画像のURL
 * @param props.alt - 画像の代替テキスト
 * @param props.loading - 画像の読み込み方法
 */
function AvatarImage({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full",
        "object-cover",
        className
      )}
      {...props}
    />
  )
}

/**
 * アバターフォールバックコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.delayMs - フォールバック表示までの遅延時間（ミリ秒）
 * @param props.children - フォールバックとして表示する内容
 */
function AvatarFallback({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center",
        "rounded-full",
        "bg-step-2 text-step-11",
        "text-sm font-medium",
        className
      )}
      {...props}
    />
  )
}

// displayName の設定
Avatar.displayName = "Avatar"
AvatarImage.displayName = "AvatarImage"
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback } 