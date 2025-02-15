/**
 * @file 入力フィールドコンポーネント
 * @description ユーザーからのテキスト入力を受け付けるコンポーネントです
 * 
 * @example
 * ```tsx
 * // 基本的な使用方法
 * <Input placeholder="名前を入力" />
 * 
 * // バリデーションエラーの表示
 * <Input aria-invalid="true" />
 * 
 * // 無効化された状態
 * <Input disabled />
 * 
 * // ファイル入力
 * <Input type="file" />
 * ```
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * 入力フィールドのスタイルバリエーションを定義
 */
const inputVariants = cva(
  [
    "flex h-10 w-full rounded-md px-3 py-2 text-base md:text-sm",
    "border border-step-7 bg-step-1",
    "text-step-12 placeholder:text-step-12/50",
    "transition-colors duration-200",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-7 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "[&::-webkit-calendar-picker-indicator]:filter-step-11",
  ],
  {
    variants: {
      variant: {
        default: "",
        error:
          "border-destructive-step-7 focus-visible:ring-destructive-step-7 placeholder:text-destructive-step-11",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * 入力フィールドコンポーネントのプロパティ
 * @typedef InputProps
 * @property {string} [className] - 追加のCSSクラス名
 * @property {string} [type] - 入力フィールドのタイプ
 * @property {string} [variant] - 入力フィールドのスタイルバリアント
 */
const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof inputVariants>
>(({ className, type, variant, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(inputVariants({ variant }), className)}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input, inputVariants }
