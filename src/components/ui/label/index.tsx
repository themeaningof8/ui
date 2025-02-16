"use client"

import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

/**
 * @file ラベルコンポーネント
 * @description フォーム要素に関連付けられたラベルを提供するコンポーネントです
 * 
 * @example
 * ```tsx
 * // 基本的な使用例
 * <Label htmlFor="email">メールアドレス</Label>
 * <Input id="email" type="email" />
 * 
 * // 必須項目のラベル
 * <Label htmlFor="name" required>
 *   名前
 *   <span className="text-destructive-step-11">*</span>
 * </Label>
 * 
 * // 無効化状態のラベル
 * <Label htmlFor="disabled-input" disabled>
 *   無効化された入力
 * </Label>
 * ```
 */

/**
 * ラベルのスタイルバリエーションを定義
 */
const labelVariants = cva(
  [
    "text-sm font-medium leading-none",
    "text-step-12",
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  ]
)

/**
 * ラベルコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.htmlFor - 関連付けるフォーム要素のID
 * @param props.required - 必須項目かどうか
 * @param props.disabled - 無効化状態かどうか
 */
function Label({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(labelVariants(), className)}
      {...props}
    />
  )
}

// displayName の設定
Label.displayName = LabelPrimitive.Root.displayName

export { Label, labelVariants }
