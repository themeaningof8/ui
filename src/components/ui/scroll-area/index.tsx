/**
 * @file スクロールエリアコンポーネント
 * @description カスタマイズ可能なスクロールバーを持つスクロール可能なエリアを提供するコンポーネントです
 * 
 * @example
 * ```tsx
 * // 基本的な使用例
 * <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
 *   <div>スクロール可能なコンテンツ</div>
 * </ScrollArea>
 * 
 * // スクロールバーを常に表示
 * <ScrollArea type="always">
 *   <div>スクロール可能なコンテンツ</div>
 * </ScrollArea>
 * ```
 */

"use client"

import type { ComponentPropsWithoutRef, UIEvent } from "react"
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { cn } from "@/lib/utils"

/**
 * スクロールエリアのルートコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.children - スクロールエリアの内容
 * @param props.type - スクロールバーの表示タイプ（"auto" | "always" | "scroll" | "hover"）
 * @param props.onScroll - スクロールイベントのハンドラ
 */
function ScrollArea ({
  className,
  children,
  type = 'auto',
  onScroll,
  ...props
}: ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
    onScroll?: (event: UIEvent<HTMLDivElement>) => void
  }) {
  return (
    <ScrollAreaPrimitive.Root
      className={cn("relative overflow-hidden", className)}
      data-slot="scroll-area"
      data-testid="scroll-area"
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        className="size-full rounded-[inherit]"
        data-slot="scroll-area-viewport"
        data-testid="scroll-area-viewport"
        onScroll={onScroll}
        style={{ overflowX: 'hidden', overflowY: 'scroll' }}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

/**
 * スクロールバーコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.orientation - スクロールバーの向き（"vertical" | "horizontal"）
 */
function ScrollBar ({
  className,
  orientation = 'vertical',
  ...props
}: ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      orientation={orientation}
      className={cn(
        'flex touch-none select-none transition-colors',
        orientation === 'vertical' &&
          'h-full w-2.5 border-l border-l-transparent p-[1px]',
        orientation === 'horizontal' &&
          'h-2.5 flex-col border-t border-t-transparent p-[1px]',
        className
      )}
      data-testid="scroll-area-scrollbar"
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        className="relative flex-1 rounded-full bg-step-6"
        data-testid="scroll-area-thumb"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
