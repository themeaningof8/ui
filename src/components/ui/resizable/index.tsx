"use client"

import * as React from "react"
import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

/**
 * リサイズ可能なパネルのルートコンポーネントです。
 * 複数のパネルをグループ化し、リサイズ可能な領域を作成します。
 * 
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {React.ReactNode} props.children - 子要素
 * @param {React.Ref<HTMLDivElement>} ref - 転送されるref
 * 
 * @example
 * ```tsx
 * <ResizablePanelGroup>
 *   <ResizablePanel>Panel 1</ResizablePanel>
 *   <ResizableHandle />
 *   <ResizablePanel>Panel 2</ResizablePanel>
 * </ResizablePanelGroup>
 * ```
 */
const ResizablePanelGroup = React.forwardRef<
  React.ComponentRef<typeof ResizablePrimitive.PanelGroup>,
  React.ComponentPropsWithoutRef<typeof ResizablePrimitive.PanelGroup>
>(({ className, ...props }, ref) => (
  <ResizablePrimitive.PanelGroup
    ref={ref}
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
))
ResizablePanelGroup.displayName = "ResizablePanelGroup"

/**
 * リサイズ可能なパネルコンポーネントです。
 * リサイズ可能な個別のパネルとして機能します。
 * 
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {number} [props.defaultSize] - パネルのデフォルトサイズ
 * @param {number} [props.minSize] - パネルの最小サイズ
 * @param {number} [props.maxSize] - パネルの最大サイズ
 * @param {React.ReactNode} props.children - 子要素
 * @param {React.Ref<HTMLDivElement>} ref - 転送されるref
 */
const ResizablePanel = React.forwardRef<
  React.ComponentRef<typeof ResizablePrimitive.Panel>,
  React.ComponentPropsWithoutRef<typeof ResizablePrimitive.Panel>
>(({ className, minSize = 0, maxSize = 100, defaultSize = 50, ...props }, ref) => (
  <ResizablePrimitive.Panel
    ref={ref}
    className={cn(
      "flex w-full data-[panel-group-direction=vertical]:h-full",
      className
    )}
    data-panel-size-constraints={JSON.stringify({ minSize, maxSize })}
    minSize={minSize}
    maxSize={maxSize}
    defaultSize={defaultSize}
    {...props}
  />
))
ResizablePanel.displayName = "ResizablePanel"

/**
 * リサイズハンドルコンポーネントです。
 * パネル間のリサイズ操作を可能にするハンドルとして機能します。
 * 
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {boolean} [props.withHandle] - ハンドルアイコンを表示するかどうか
 */
type ResizableHandleProps = React.ComponentProps<
  typeof ResizablePrimitive.PanelResizeHandle
> & {
  withHandle?: boolean
}

const ResizableHandle = ({
  className,
  withHandle,
  ...props
}: ResizableHandleProps) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)
ResizableHandle.displayName = "ResizableHandle"

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
