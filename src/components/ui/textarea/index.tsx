/**
 * @file テキストエリアコンポーネント
 * @description 複数行のテキスト入力を受け付けるコンポーネントです
 * 
 * @example
 * ```tsx
 * // 基本的な使用例
 * <Textarea placeholder="メッセージを入力" />
 * 
 * // エラー状態
 * <Textarea variant="error" placeholder="エラーメッセージ" />
 * 
 * // 無効化状態
 * <Textarea disabled placeholder="入力できません" />
 * 
 * // リサイズ可能
 * <Textarea className="resize-y" placeholder="高さを調整可能" />
 * ```
 */

import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

/**
 * テキストエリアのスタイルバリエーションを定義
 */
const textareaVariants = cva(
  [
    "flex min-h-[80px] w-full rounded-md px-3 py-2 text-base md:text-sm",
    "border bg-step-1 text-step-12",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-6 focus-visible:border-step-8",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: "border-step-7 focus-visible:ring-step-6 placeholder:text-step-12/50",
        error: "border-destructive-step-7 focus-visible:ring-destructive-step-7 placeholder:text-destructive-step-11",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * テキストエリアコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.variant - テキストエリアのスタイルバリアント（"default" | "error"）
 */
function Textarea({
  className,
  variant,
  ...props
}: ComponentPropsWithoutRef<"textarea"> & VariantProps<typeof textareaVariants>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ variant }), className)}
      {...props}
    />
  )
}

// displayName の設定
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
