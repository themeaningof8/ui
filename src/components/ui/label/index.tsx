"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * @file ラベルコンポーネント
 * @description フォーム要素に関連付けられたラベルを表示するコンポーネントです
 * 
 * @example
 * ```tsx
 * // 基本的な使用方法
 * <Label htmlFor="email">メールアドレス</Label>
 * <Input id="email" type="email" />
 * 
 * // 必須項目のラベル
 * <Label htmlFor="name" variant="required">お名前</Label>
 * <Input id="name" required />
 * 
 * // エラー状態のラベル
 * <Label htmlFor="password" variant="error">パスワード</Label>
 * <Input id="password" type="password" aria-invalid="true" />
 * ```
 */

/**
 * ラベルのスタイルバリアントを定義します。
 */
const labelVariants = cva(
  [
    "text-sm font-medium leading-none",
    "text-step-12",
    "select-none",
    "transition-colors duration-200",
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    "[&_span]:ml-0.5",
  ],
  {
    variants: {
      variant: {
        default: "",
        required: "",
        error: "text-destructive-step-11",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * フォーム要素に関連付けられたラベルを表示するコンポーネントです。
 * 
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {string} [props.variant] - ラベルのスタイルバリアント
 * @param {React.ReactNode} props.children - ラベルのテキストコンテンツ
 * @param {React.Ref<HTMLLabelElement>} ref - 転送されるref
 */
const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, variant, children, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ variant }), className)}
    {...props}
  >
    {children}
    {variant === "required" && (
      <span className="text-destructive-step-11" aria-hidden="true">
        *
      </span>
    )}
  </LabelPrimitive.Root>
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label, labelVariants }
