"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * ラベルのスタイルバリアントを定義します。
 * デフォルトでは、テキストサイズ、フォントの太さ、行の高さを設定し、
 * 関連する入力要素が無効化された場合のスタイルも定義します。
 */
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

/**
 * フォーム要素に関連付けられたラベルを表示するコンポーネントです。
 * 
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {React.ReactNode} props.children - ラベルのテキストコンテンツ
 * @param {React.Ref<HTMLLabelElement>} ref - 転送されるref
 * 
 * @example
 * ```tsx
 * <Label htmlFor="email">Email</Label>
 * <input type="email" id="email" />
 * ```
 */
const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
