import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/cn"

/**
 * @description ボタンコンポーネントのスタイルバリエーション定義
 * @param variant - ボタンの見た目のバリエーション
 * @param size - ボタンのサイズバリエーション
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-base-ui-border disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-base-solid text-base-on-solid shadow hover:bg-base-solid-hover",
        destructive:
          "bg-destructive-solid text-destructive-on-solid shadow-sm hover:bg-destructive-solid-hover",
        outline:
          "border border-base-ui-border bg-base-app-bg shadow-sm hover:bg-base-subtle-bg hover:text-base-high-contrast-text",
        secondary:
          "bg-base-subtle-bg text-base-high-contrast-text shadow-sm hover:bg-base-subtle-bg-hover",
        ghost: "hover:bg-base-ui-hover hover:text-base-high-contrast-text",
        link: "text-base-high-contrast-text underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
