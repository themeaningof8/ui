import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * @description インプットコンポーネント
 */

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-base-ui-border bg-transparent px-3 py-1 text-base text-base-high-contrast-text shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-base-high-contrast-text placeholder:text-base-low-contrast-text focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-base-ui-border disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
