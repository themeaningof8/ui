"use client"

import type { ComponentPropsWithoutRef } from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * @file ラジオグループコンポーネント
 * @description 複数の選択肢から1つを選択するためのコンポーネント
 * 
 * @example
 * ```tsx
 * // 基本的な使用例
 * <RadioGroup defaultValue="option1">
 *   <div className="flex items-center space-x-2">
 *     <RadioGroupItem value="option1" id="option1" />
 *     <Label htmlFor="option1">オプション1</Label>
 *   </div>
 *   <div className="flex items-center space-x-2">
 *     <RadioGroupItem value="option2" id="option2" />
 *     <Label htmlFor="option2">オプション2</Label>
 *   </div>
 * </RadioGroup>
 * 
 * // 無効化された項目を含む例
 * <RadioGroup defaultValue="option1">
 *   <div className="flex items-center space-x-2">
 *     <RadioGroupItem value="option1" id="r1" />
 *     <Label htmlFor="r1">利用可能</Label>
 *   </div>
 *   <div className="flex items-center space-x-2">
 *     <RadioGroupItem value="option2" id="r2" disabled />
 *     <Label htmlFor="r2">無効</Label>
 *   </div>
 * </RadioGroup>
 * 
 * // カスタムスタイルの例
 * <RadioGroup defaultValue="option1" className="space-y-4">
 *   <div className="flex items-center space-x-2">
 *     <RadioGroupItem value="option1" id="cs1" />
 *     <Label htmlFor="cs1" className="font-medium">プロフェッショナル</Label>
 *   </div>
 *   <div className="flex items-center space-x-2">
 *     <RadioGroupItem value="option2" id="cs2" />
 *     <Label htmlFor="cs2" className="font-medium">エンタープライズ</Label>
 *   </div>
 * </RadioGroup>
 * ```
 */

/**
 * ラジオグループのルートコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.defaultValue - デフォルトで選択される値
 * @param props.value - 現在選択されている値
 * @param props.onValueChange - 値が変更された時のコールバック
 * @param props.disabled - グループ全体の無効化状態
 * @param props.required - 必須選択かどうか
 */
function RadioGroup({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-2", className)}
      {...props}
    />
  )
}

/**
 * ラジオグループの個々のアイテムコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.value - アイテムの値
 * @param props.disabled - 無効化状態
 * @param props.required - 必須選択かどうか
 */
function RadioGroupItem({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "aspect-square size-5 rounded-full",
        "border-2 border-step-7 text-step-1",
        "ring-offset-step-1",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-6 focus-visible:border-step-8",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:border-step-8 data-[state=checked]:bg-step-2 data-[state=checked]:text-step-9",
        "hover:border-step-7",
        "active:scale-95",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className={cn(
          "flex items-center justify-center text-current",
          "transition-opacity duration-200",
          "data-[state=checked]:animate-in data-[state=checked]:zoom-in-75",
          "data-[state=unchecked]:animate-out data-[state=unchecked]:zoom-out-75"
        )}
      >
        <Circle className="size-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

// displayName の設定
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
