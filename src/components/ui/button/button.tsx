/**
 * ボタンコンポーネント
 * @module Button
 * @description 様々なスタイルとバリエーションを持つボタンコンポーネント
 */

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/cn'
import { tv, type VariantProps } from 'tailwind-variants'

/**
 * ボタンのスタイル定義
 * @description Tailwind Variantsを使用したボタンのスタイル定義
 * 各バリアントは用途に応じた適切なカラーユーティリティを使用
 */
const buttonVariants = tv({
  base: [
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium',
    'ring-offset-background transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  variants: {
    variant: {
      default: [
        'bg-accent-solid text-accent-on-solid',
        'hover:bg-accent-solid-hover hover:text-accent-on-solid-hover',
        'focus-visible:ring-accent-ui',
      ],
      destructive: [
        'bg-destructive-solid text-destructive-on-solid',
        'hover:bg-destructive-solid-hover hover:text-destructive-on-solid-hover',
        'focus-visible:ring-destructive-ui',
      ],
      outline: [
        'border border-base-subtle bg-base-app text-base-high',
        'hover:bg-base-ui hover:text-base-high',
        'focus-visible:ring-base-ui',
      ],
      secondary: [
        'bg-base-solid text-base-on-solid',
        'hover:bg-base-solid-hover hover:text-base-on-solid-hover',
        'focus-visible:ring-base-ui',
      ],
      ghost: [
        'text-base-high',
        'hover:bg-base-ui hover:text-base-high',
        'focus-visible:ring-base-ui',
      ],
      link: [
        'text-accent-low underline-offset-4',
        'hover:text-accent-high hover:underline',
      ],
    },
    size: {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 rounded-md px-3 text-xs',
      lg: 'h-10 rounded-md px-8',
      icon: 'h-9 w-9',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

/**
 * ボタンの型定義
 * @typedef {Object} ButtonProps
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** asChildがtrueの場合、ボタンの代わりにSlotコンポーネントを使用 */
  asChild?: boolean
}

/**
 * ボタンコンポーネント
 * @param {ButtonProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} ボタンコンポーネント
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants } 