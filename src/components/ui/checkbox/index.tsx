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
 *   <label htmlFor="terms">利用規約に同意する</label>
 * </div>
 * 
 * // 状態管理と組み合わせた使用例
 * const [checked, setChecked] = useState(false)
 * <Checkbox
 *   checked={checked}
 *   onCheckedChange={setChecked}
 * />
 * ```
 */

"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * @interface CheckboxProps
 * @description チェックボックスコンポーネントのプロパティ
 * @extends CheckboxPrimitive.CheckboxProps
 * @property {string} [className] - カスタムクラス名
 * @property {boolean} [checked] - チェック状態
 * @property {boolean} [defaultChecked] - デフォルトのチェック状態
 * @property {boolean} [required] - 必須項目かどうか
 * @property {boolean} [disabled] - 無効化状態かどうか
 * @property {(checked: boolean) => void} [onCheckedChange] - チェック状態変更時のコールバック
 */
const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-5 w-5 shrink-0 rounded-sm border border-primary ring-offset-background",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox } 