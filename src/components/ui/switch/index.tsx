"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

/**
 * @file スイッチコンポーネント
 * @description オン/オフの状態を切り替えるためのコンポーネント
 * 
 * @example
 * ```tsx
 * // 基本的な使用例
 * <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
 * 
 * // ラベル付きスイッチ
 * <div className="flex items-center space-x-2">
 *   <Switch id="airplane-mode" />
 *   <Label htmlFor="airplane-mode">機内モード</Label>
 * </div>
 * 
 * // 無効化状態のスイッチ
 * <Switch disabled />
 * ```
 */

/**
 * スイッチコンポーネントです。
 * オン/オフの状態を切り替えるために使用します。
 * 
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {boolean} [props.checked] - チェック状態
 * @param {boolean} [props.disabled] - 無効化状態
 * @param {(checked: boolean) => void} [props.onCheckedChange] - 状態が変更された時のコールバック
 * @param {React.Ref<HTMLButtonElement>} ref - 転送されるref
 */
const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full",
      "border-2",
      "transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-6 focus-visible:ring-offset-2 focus-visible:ring-offset-step-1",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-step-9 data-[state=checked]:border-step-9 data-[state=unchecked]:bg-step-6 data-[state=unchecked]:border-step-7",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block size-5 rounded-full",
        "bg-step-1",
        "shadow-lg shadow-step-7/10",
        "ring-0",
        "transition-transform duration-200",
        "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
