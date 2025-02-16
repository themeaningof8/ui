/**
 * @file チェックボックスコンポーネント
 * @description 選択状態を切り替えるためのチェックボックスコンポーネント
 * 
 * @example
 * ```tsx
 * // 基本的な使用例
 * <Checkbox id="terms" />
 * 
 * // ラベルと組み合わせた使用例
 * <div className="flex items-center space-x-2">
 *   <Checkbox id="terms" />
 *   <Label htmlFor="terms">利用規約に同意する</Label>
 * </div>
 * 
 * // 状態管理と組み合わせた使用例
 * const [checked, setChecked] = useState(false)
 * <Checkbox
 *   checked={checked}
 *   onCheckedChange={setChecked}
 * />
 * 
 * // エラー状態の使用例
 * <Checkbox variant="error" aria-invalid="true" />
 * 
 * // 中間状態（indeterminate）の使用例
 * <Checkbox checked="indeterminate" />
 * 
 * // カスタムサイズの使用例
 * <Checkbox className="size-6" />
 * ```
 */

"use client"

import type * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check, Minus } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * チェックボックスのスタイルバリエーションを定義
 */
const checkboxVariants = cva(
  [
    "peer size-5 shrink-0 rounded-sm",
    "border border-step-7 bg-step-1",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:border-step-8 focus-visible:ring-2 focus-visible:ring-step-5",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=checked]:border-step-9 data-[state=checked]:bg-step-9 data-[state=checked]:text-step-1",
    "data-[state=indeterminate]:border-step-9 data-[state=indeterminate]:bg-step-9 data-[state=indeterminate]:text-step-1",
    "hover:border-step-8",
    "active:scale-95",
  ],
  {
    variants: {
      variant: {
        default: [
          "hover:bg-step-3",
          "data-[state=checked]:hover:bg-step-10",
          "data-[state=indeterminate]:hover:bg-step-10",
        ],
        error: [
          "border-destructive-step-7",
          "focus-visible:ring-destructive-step-7",
          "data-[state=checked]:border-destructive-step-9",
          "data-[state=checked]:bg-destructive-step-9",
          "data-[state=indeterminate]:border-destructive-step-9",
          "data-[state=indeterminate]:bg-destructive-step-9",
          "hover:border-destructive-step-8",
          "data-[state=checked]:hover:bg-destructive-step-10",
          "data-[state=indeterminate]:hover:bg-destructive-step-10",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * チェックボックスコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - カスタムクラス名
 * @param props.variant - チェックボックスのスタイルバリアント（"default" | "error"）
 * @param props.checked - チェック状態（true | false | "indeterminate"）
 * @param props.defaultChecked - デフォルトのチェック状態
 * @param props.required - 必須項目かどうか
 * @param props.disabled - 無効化状態かどうか
 * @param props.onCheckedChange - チェック状態変更時のコールバック
 */
function Checkbox({
  className,
  variant,
  ...props
}: React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> &
  VariantProps<typeof checkboxVariants>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      aria-invalid={variant === "error"}
      className={cn(checkboxVariants({ variant }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={cn(
          "flex items-center justify-center text-current",
          "transition-opacity duration-200",
          "data-[state=checked]:animate-in data-[state=checked]:zoom-in-75",
          "data-[state=unchecked]:animate-out data-[state=unchecked]:zoom-out-75",
          "data-[state=indeterminate]:opacity-75",
        )}
      >
        {props.checked === "indeterminate" ? (
          <Minus className="size-3.5" />
        ) : (
          <Check className="size-3.5" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

// displayName の設定
Checkbox.displayName = "Checkbox"

export { Checkbox, checkboxVariants } 