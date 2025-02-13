"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

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
 * 
 * @example
 * ```tsx
 * <Slider defaultValue={[50]} max={100} step={1} />
 * ```
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
      className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary"
      data-testid="slider-track"
    >
      <SliderPrimitive.Range className="absolute h-full bg-primary" data-testid="slider-range" />
    </SliderPrimitive.Track>
    {Array.isArray(props.defaultValue) ? (
      props.defaultValue.map((value, thumbIndex) => (
        <SliderPrimitive.Thumb
          key={value} // 使用する値をキーとして設定
          className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          data-testid={`slider-thumb-${thumbIndex}`}
        />
      ))
    ) : (
      <SliderPrimitive.Thumb
        className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        data-testid="slider-thumb"
      />
    )}
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
