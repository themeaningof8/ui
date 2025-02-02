/**
 * @file Slider コンポーネント
 * @description アクセシブルなスライダーコンポーネント
 * 
 * @example
 * ```tsx
 * <Slider defaultValue={[50]} max={100} step={1} />
 * ```
 */

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/lib/cn'
import { tv } from 'tailwind-variants'

/**
 * @description Sliderのスタイルバリアント
 */
const sliderVariants = tv({
  base: [
    'relative flex w-full touch-none select-none items-center',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  variants: {
    size: {
      sm: 'h-4',
      md: 'h-5',
      lg: 'h-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

/**
 * @description Sliderのトラックスタイルバリアント
 */
const sliderTrackVariants = tv({
  base: 'relative h-2 w-full grow overflow-hidden rounded-full bg-base-ui',
  variants: {
    size: {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

/**
 * @description Sliderのレンジスタイルバリアント
 */
const sliderRangeVariants = tv({
  base: 'absolute h-full bg-base-solid',
})

/**
 * @description Sliderのサムスタイルバリアント
 */
const sliderThumbVariants = tv({
  base: [
    'block rounded-full border-2 border-base-solid bg-base-app ring-offset-background',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-base-ui focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

/**
 * @description Sliderコンポーネント
 */
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    /**
     * @description スライダーのサイズ
     */
    size?: 'sm' | 'md' | 'lg'
  }
>(({ className, size, disabled, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(sliderVariants({ size }), className)}
    disabled={disabled}
    {...props}
  >
    <SliderPrimitive.Track className={cn(sliderTrackVariants({ size }))}>
      <SliderPrimitive.Range className={cn(sliderRangeVariants())} />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className={cn(sliderThumbVariants({ size }))} />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider } 