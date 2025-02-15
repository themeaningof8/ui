"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

/**
 * @file スライダーコンポーネント
 * @description 数値範囲から値を選択するためのコンポーネント
 * 
 * @example
 * ```tsx
 * // 基本的な使用例
 * <Slider defaultValue={[50]} max={100} step={1} />
 * 
 * // 複数のつまみを持つスライダー
 * <Slider defaultValue={[25, 75]} max={100} step={1} />
 * 
 * // カスタマイズされたスライダー
 * <Slider
 *   defaultValue={[50]}
 *   max={100}
 *   step={1}
 *   className="w-[60%]"
 * />
 * ```
 */

/**
 * スライダーコンポーネントです。
 * 数値範囲から値を選択するために使用します。
 * 
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {number[]} [props.defaultValue] - デフォルト値の配列
 * @param {number} [props.max] - 最大値
 * @param {number} [props.min] - 最小値
 * @param {number} [props.step] - ステップ値
 * @param {(value: number[]) => void} [props.onValueChange] - 値が変更された時のコールバック
 * @param {React.ReactNode} props.children - 子要素
 * @param {React.Ref<HTMLSpanElement>} ref - 転送されるref
 */
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    data-testid="slider-root"
    {...props}
  >
    <SliderPrimitive.Track
      className={cn(
        "relative h-2 w-full grow overflow-hidden rounded-full",
        "bg-step-3",
      )}
      data-testid="slider-track"
    >
      <SliderPrimitive.Range
        className={cn(
          "absolute h-full",
          "bg-step-9",
        )}
        data-testid="slider-range"
      />
    </SliderPrimitive.Track>
    {Array.isArray(props.defaultValue) ? (
      props.defaultValue.map((value, thumbIndex) => (
        <SliderPrimitive.Thumb
          key={value}
          className={cn(
            "block size-5 rounded-full",
            "border-2 border-step-9 bg-step-1",
            "ring-offset-step-1",
            "transition-colors duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-7 focus-visible:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-50",
          )}
          data-testid={`slider-thumb-${thumbIndex}`}
        />
      ))
    ) : (
      <SliderPrimitive.Thumb
        className={cn(
          "block size-5 rounded-full",
          "border-2 border-step-9 bg-step-1",
          "ring-offset-step-1",
          "transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-7 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
        )}
        data-testid="slider-thumb"
      />
    )}
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
