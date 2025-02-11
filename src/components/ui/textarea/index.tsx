import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * @description テキストエリアコンポーネント
 */

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-base-ui-border bg-transparent px-3 py-2 text-base text-base-high-contrast-text shadow-sm placeholder:text-base-low-contrast-text focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-base-ui-border disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
