import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import * as React from "react"

/**
 * @description コラプシブルコンポーネントの基本コンポーネント群
 */
const Collapsible = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>
>(({ defaultOpen = false, ...props }, ref) => (
  <CollapsiblePrimitive.Root
    ref={ref}
    defaultOpen={defaultOpen}
    {...props}
  />
))
Collapsible.displayName = CollapsiblePrimitive.Root.displayName

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
