"use client";

/**
 * @file リサイズ可能なパネルコンポーネント
 * @description パネルのサイズを動的に変更できるコンポーネントです
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

import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";
import type { ComponentProps, ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

/**
 * リサイズ可能なパネルのグループコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.children - パネルグループの内容
 */
function ResizablePanelGroup({
	className,
	...props
}: ComponentPropsWithoutRef<typeof ResizablePrimitive.PanelGroup>) {
	return (
		<ResizablePrimitive.PanelGroup
			data-slot="resizable-panel-group"
			className={cn(
				"flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
				className,
			)}
			{...props}
		/>
	);
}

/**
 * リサイズ可能な個別のパネルコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.defaultSize - パネルのデフォルトサイズ（0-100）
 * @param props.minSize - パネルの最小サイズ（0-100）
 * @param props.maxSize - パネルの最大サイズ（0-100）
 * @param props.children - パネルの内容
 */
function ResizablePanel({
	className,
	minSize = 0,
	maxSize = 100,
	defaultSize = 50,
	...props
}: ComponentPropsWithoutRef<typeof ResizablePrimitive.Panel>) {
	return (
		<ResizablePrimitive.Panel
			data-slot="resizable-panel"
			className={cn(
				"flex w-full data-[panel-group-direction=vertical]:h-full",
				className,
			)}
			data-panel-size-constraints={JSON.stringify({ minSize, maxSize })}
			minSize={minSize}
			maxSize={maxSize}
			defaultSize={defaultSize}
			{...props}
		/>
	);
}

/**
 * パネル間のリサイズハンドルコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.withHandle - ハンドルアイコンを表示するかどうか
 */
function ResizableHandle({
	className,
	withHandle,
	...props
}: ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
	withHandle?: boolean;
}) {
	return (
		<ResizablePrimitive.PanelResizeHandle
			data-slot="resizable-handle"
			className={cn(
				"relative flex w-px items-center justify-center",
				"bg-step-6",
				"after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2",
				"focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-step-7 focus-visible:ring-offset-1",
				"data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
				"data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1",
				"data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2",
				"data-[panel-group-direction=vertical]:after:translate-x-0",
				"[&[data-panel-group-direction=vertical]>div]:rotate-90",
				className,
			)}
			{...props}
		>
			{withHandle && (
				<div
					className={cn(
						"z-10 flex h-4 w-3 items-center justify-center rounded-sm",
						"border border-step-7 bg-step-3",
					)}
				>
					<GripVertical className="size-2.5 text-step-11" />
				</div>
			)}
		</ResizablePrimitive.PanelResizeHandle>
	);
}

// displayName の設定
ResizablePanelGroup.displayName = "ResizablePanelGroup";
ResizablePanel.displayName = "ResizablePanel";
ResizableHandle.displayName = "ResizableHandle";

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
