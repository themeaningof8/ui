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
 * ```
 */

"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * チェックボックスのスタイルバリエーションを定義
 */
const checkboxVariants = cva(
  [
    "peer size-5 shrink-0 rounded-sm",
    "border-2 border-step-7 bg-step-1",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-7 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=checked]:border-step-9 data-[state=checked]:bg-step-9 data-[state=checked]:text-step-1",
    "data-[state=indeterminate]:border-step-9 data-[state=indeterminate]:bg-step-9 data-[state=indeterminate]:text-step-1",
  ],
  {
    variants: {
      variant: {
        default: "",
        error: [
          "border-destructive-step-7",
          "focus-visible:ring-destructive-step-7",
          "data-[state=checked]:border-destructive-step-9",
          "data-[state=checked]:bg-destructive-step-9",
          "data-[state=indeterminate]:border-destructive-step-9",
          "data-[state=indeterminate]:bg-destructive-step-9",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * @interface CheckboxProps
 * @description チェックボックスコンポーネントのプロパティ
 * @extends CheckboxPrimitive.CheckboxProps
 * @property {string} [className] - カスタムクラス名
 * @property {string} [variant] - チェックボックスのスタイルバリアント
 * @property {boolean} [checked] - チェック状態
 * @property {boolean} [defaultChecked] - デフォルトのチェック状態
 * @property {boolean} [required] - 必須項目かどうか
 * @property {boolean} [disabled] - 無効化状態かどうか
 * @property {(checked: boolean) => void} [onCheckedChange] - チェック状態変更時のコールバック
 */
const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> &
    VariantProps<typeof checkboxVariants>
>(({ className, variant, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants({ variant }), className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        "flex items-center justify-center text-current",
        "data-[state=indeterminate]:opacity-75"
      )}
    >
      <Check className="size-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox, checkboxVariants } 