"use client"

import * as SliderPrimitive from "@radix-ui/react-slider"
import type { ComponentPropsWithoutRef } from "react"

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
 * スライダーコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.defaultValue - デフォルト値の配列
 * @param props.max - 最大値
 * @param props.min - 最小値
 * @param props.step - ステップ値
 * @param props.onValueChange - 値が変更された時のコールバック
 */
function Slider({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      data-testid="slider-root"
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        data-testid="slider-track"
        className={cn(
          "relative h-2 w-full grow overflow-hidden rounded-full",
          "bg-step-3",
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          data-testid="slider-range"
          className={cn(
            "absolute h-full",
            "bg-step-9",
          )}
        />
      </SliderPrimitive.Track>
      {Array.isArray(props.defaultValue) ? (
        props.defaultValue.map((value, thumbIndex) => (
          <SliderPrimitive.Thumb
            key={value}
            data-slot={`slider-thumb-${thumbIndex}`}
            data-testid={`slider-thumb-${thumbIndex}`}
            className={cn(
              "block size-5 rounded-full",
              "border-2 border-step7 bg-step-1",
              "ring-offset-step-1",
              "transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-7 focus-visible:ring-offset-2",
              "disabled:pointer-events-none disabled:opacity-50",
            )}
          />
        ))
      ) : (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          data-testid="slider-thumb-0"
          className={cn(
            "block size-5 rounded-full",
            "border-2 border-step-7 bg-step-1",
            "ring-offset-1",
            "transition-colors duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-7 focus-visible:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-50",
          )}
        />
      )}
    </SliderPrimitive.Root>
  )
}

// displayName の設定
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
