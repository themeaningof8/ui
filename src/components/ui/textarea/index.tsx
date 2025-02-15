/**
 * @file テキストエリアコンポーネント
 * @description 複数行のテキスト入力を可能にするコンポーネントです
 * 
 * @example
 * ```tsx
 * // 基本的な使用方法
 * <Textarea placeholder="メッセージを入力" />
 * 
 * // 最小の高さを指定
 * <Textarea
 *   placeholder="詳細な説明を入力"
 *   className="min-h-[100px]"
 * />
 * 
 * // エラー状態
 * <Textarea
 *   variant="error"
 *   aria-invalid="true"
 *   placeholder="エラーがあります"
 * />
 * 
 * // 無効化状態
 * <Textarea disabled placeholder="入力できません" />
 * ```
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * テキストエリアのスタイルバリエーションを定義
 */
const textareaVariants = cva(
  [
    "flex min-h-[80px] w-full rounded-md px-3 py-2",
    "text-base md:text-sm",
    "border border-step-7 bg-step-1",
    "text-step-12 placeholder:text-step-11",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-7 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "resize-vertical",
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
 * テキストエリアコンポーネントのプロパティ
 * @typedef TextareaProps
 * @property {string} [className] - 追加のCSSクラス名
 * @property {string} [variant] - テキストエリアのスタイルバリアント
 * @property {string} [placeholder] - プレースホルダーテキスト
 * @property {boolean} [disabled] - 無効化状態
 */
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> &
    VariantProps<typeof textareaVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <textarea
      className={cn(textareaVariants({ variant }), className)}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
