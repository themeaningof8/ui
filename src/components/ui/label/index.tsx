/**
 * @file ラベルコンポーネント
 * @description フォーム要素のラベルを提供するコンポーネント
 */

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { tv } from "tailwind-variants"
import { cn } from "@/lib/cn"

const labelVariants = tv({
  base: [
    "text-sm font-medium text-base-high",
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  ]
})

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = "Label"

export { Label } 