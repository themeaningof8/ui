/**
 * @file Input
 * @description 基本的な入力フィールドを提供するコンポーネント
 */

import * as React from "react"
import { tv } from "tailwind-variants"
import { cn } from "@/lib/cn"

const inputVariants = tv({
  base: [
    // 基本レイアウト
    "flex h-10 w-full rounded-md border px-3 py-2 text-sm",
    // カラー設定
    "bg-base-app text-base-high border-base-ui",
    // ファイル入力の設定
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
    // プレースホルダー
    "placeholder:text-base-low",
    // フォーカス状態
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-base-ui focus-visible:ring-offset-2",
    // 無効状態
    "disabled:cursor-not-allowed disabled:opacity-50"
  ],
  variants: {
    error: {
      true: [
        "border-destructive-ui",
        "hover:border-destructive-hover",
        "focus-visible:border-destructive-hover",
        "focus-visible:ring-destructive-ui",
        "placeholder:text-destructive-low"
      ],
      false: ""
    }
  },
  defaultVariants: {
    error: false
  }
})

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & {
    error?: boolean
  }
>(({ className, type, error, required, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(inputVariants({ error }), className)}
      ref={ref}
      aria-invalid={error}
      aria-required={required}
      {...props}
    />
  )
})

Input.displayName = "Input"

export { Input }
