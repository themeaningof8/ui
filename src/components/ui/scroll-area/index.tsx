"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

/**
 * スクロールエリアのルートコンポーネントです。
 * カスタムスクロールバーを持つスクロール可能な領域を作成します。
 * 
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {React.ReactNode} props.children - 子要素
 * @param {React.Ref<HTMLDivElement>} ref - 転送されるref
 * @param {function} [props.onScroll] - スクロールイベントのハンドラ
 * 
 * @example
 * ```tsx
 * <ScrollArea className="h-[200px]">
 *   <div>Scrollable content</div>
 * </ScrollArea>
 * ```
 */
const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
    onScroll?: (event: React.UIEvent<HTMLDivElement>) => void
  }
>(({ className, children, onScroll, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    data-testid="scroll-area"
    {...props}
  >
    <ScrollAreaPrimitive.Viewport
      className="h-full w-full rounded-[inherit]"
      data-testid="scroll-area-viewport"
      onScroll={onScroll}
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      orientation="vertical"
      className={cn(
        "flex touch-none select-none transition-colors",
        "w-2.5 p-[1px]",
        "hover:bg-accent hover:bg-opacity-10"
      )}
      data-testid="scroll-area-scrollbar-vertical"
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        className={cn(
          "relative flex-1 rounded-full bg-border",
          "hover:bg-accent-foreground",
          "active:bg-accent-foreground/90"
        )}
        data-testid="scroll-area-thumb-vertical"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      orientation="horizontal"
      className={cn(
        "flex touch-none select-none transition-colors",
        "h-2.5 p-[1px]",
        "hover:bg-accent hover:bg-opacity-10"
      )}
      data-testid="scroll-area-scrollbar-horizontal"
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        className={cn(
          "relative flex-1 rounded-full bg-border",
          "hover:bg-accent-foreground",
          "active:bg-accent-foreground/90"
        )}
        data-testid="scroll-area-thumb-horizontal"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

export { ScrollArea }
