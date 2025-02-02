/**
 * @file Progress コンポーネント
 * @description アクセシブルな進捗バーコンポーネント。
 * 進行状況を視覚的に表示し、スクリーンリーダーにも対応しています。
 *
 * @example
 * // 基本的な使用方法
 * <Progress value={60} />
 * 
 * // カスタムサイズと色
 * <Progress value={80} className="h-2 w-[300px]" />
 */

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@/lib/cn'
import { tv } from 'tailwind-variants'

/**
 * @description Progressのスタイルバリアント
 */
const progressVariants = tv({
  base: 'relative h-4 w-full overflow-hidden rounded-full bg-base-subtle',
  variants: {
    size: {
      sm: 'h-2',
      md: 'h-4',
      lg: 'h-6'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

const progressIndicatorVariants = tv({
  base: 'h-full w-full flex-1 bg-base-solid transition-all',
  variants: {
    state: {
      indeterminate: 'animate-indeterminate-progress',
      determinate: ''
    }
  },
  defaultVariants: {
    state: 'determinate'
  }
})

/**
 * @description Progressコンポーネントのプロパティ型
 */
export interface ProgressProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, 'value'> {
  /**
   * @description 進捗バーのサイズ
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * @description 進捗値が不定の場合true
   * @default false
   */
  isIndeterminate?: boolean
  /**
   * @description 進捗値（0-100）
   */
  value?: number
}

/**
 * @description Progressコンポーネント
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, size, isIndeterminate = false, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(progressVariants({ size }), className)}
    value={value}
    max={100}
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={isIndeterminate ? undefined : value}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        progressIndicatorVariants({
          state: isIndeterminate ? 'indeterminate' : 'determinate'
        })
      )}
      style={{
        transform: `translateX(-${100 - (value || 0)}%)`
      }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress } 