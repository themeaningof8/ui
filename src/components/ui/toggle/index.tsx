"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * トグルのバリアントを定義します。
 * サイズとバリエーションの組み合わせを提供します。
 */
const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3 min-w-10",
        sm: "h-9 px-2.5 min-w-9",
        lg: "h-11 px-5 min-w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * トグルコンポーネントです。
 * オン/オフの状態を切り替えるボタンとして機能します。
 * 
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {string} [props.variant] - トグルのバリアント（"default" | "outline"）
 * @param {string} [props.size] - トグルのサイズ（"default" | "sm" | "lg"）
 * @param {boolean} [props.pressed] - 押下状態
 * @param {boolean} [props.disabled] - 無効化状態
 * @param {(pressed: boolean) => void} [props.onPressedChange] - 状態が変更された時のコールバック
 * @param {React.ReactNode} props.children - 子要素
 * @param {React.Ref<HTMLButtonElement>} ref - 転送されるref
 * 
 * @example
 * ```tsx
 * <Toggle>Click me</Toggle>
 * ```
 */
const Toggle = React.forwardRef<
  React.ComponentRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
