/**
 * @file ドロワーコンポーネント
 * @description 画面の端から表示されるパネルコンポーネント
 *
 * @example
 * ```tsx
 * // 基本的な使用例
 * <Drawer>
 *   <DrawerTrigger>開く</DrawerTrigger>
 *   <DrawerContent>
 *     <DrawerHeader>
 *       <DrawerTitle>タイトル</DrawerTitle>
 *       <DrawerDescription>説明文</DrawerDescription>
 *     </DrawerHeader>
 *     <div>コンテンツ</div>
 *     <DrawerFooter>
 *       <button>アクション</button>
 *     </DrawerFooter>
 *   </DrawerContent>
 * </Drawer>
 *
 * // スナップポイントの指定
 * <Drawer snapPoints={[0.5, 1]}>
 *   <DrawerContent>...</DrawerContent>
 * </Drawer>
 *
 * // サイドドロワー
 * <Drawer side="left">
 *   <DrawerContent>...</DrawerContent>
 * </Drawer>
 * ```
 */

"use client";

import type * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

const Drawer = DrawerPrimitive.Root;

function DrawerTrigger({
	className,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
	return (
		<DrawerPrimitive.Trigger
			data-slot="trigger"
			className={cn(
				"inline-flex items-center justify-center rounded-md text-sm font-medium",
				"transition-colors duration-200",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-7 focus-visible:ring-offset-2",
				"disabled:pointer-events-none disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	);
}

const DrawerPortal = DrawerPrimitive.Portal;

function DrawerClose({
	className,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
	return (
		<DrawerPrimitive.Close
			data-slot="close"
			className={cn(
				"inline-flex items-center justify-center rounded-md text-sm font-medium",
				"transition-colors duration-200",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-7 focus-visible:ring-offset-2",
				"disabled:pointer-events-none disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	);
}

/**
 * ドロワーのオーバーレイコンポーネント
 */
function DrawerOverlay({
	className,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
	return (
		<DrawerPrimitive.Overlay
			data-slot="overlay"
			className={cn(
				"fixed inset-0 z-50 bg-step-1/80",
				"data-[state=open]:animate-in data-[state=closed]:animate-out",
				"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
				className,
			)}
			{...props}
			data-testid="drawer-overlay"
		/>
	);
}

/**
 * ドロワーのコンテンツコンポーネント
 */
function DrawerContent({
	className,
	children,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
	return (
		<DrawerPortal>
			<DrawerOverlay />
			<DrawerPrimitive.Content
				data-slot="content"
				className={cn(
					"fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px]",
					"border border-step-6 bg-step-2",
					"shadow-lg backdrop-blur-sm",
					"data-[state=open]:animate-in data-[state=closed]:animate-out",
					"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
					"data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
					"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
					"transition-transform duration-300 ease-in-out",
					className,
				)}
				{...props}
			>
				<div
					data-slot="handle"
					className={cn(
						"mx-auto mt-4 h-2 w-[100px] rounded-full",
						"bg-step-6 transition-colors",
						"hover:bg-step-7 active:bg-step-8",
					)}
				/>
				{children}
			</DrawerPrimitive.Content>
		</DrawerPortal>
	);
}

/**
 * ドロワーのヘッダーコンポーネント
 */
function DrawerHeader({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			data-slot="header"
			className={cn(
				"grid gap-1.5 p-4 text-center sm:text-left",
				"text-step-12",
				className,
			)}
			{...props}
		/>
	);
}

/**
 * ドロワーのフッターコンポーネント
 */
function DrawerFooter({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			data-slot="footer"
			className={cn(
				"mt-auto flex flex-col gap-2 p-4",
				"border-t border-step-6",
				"text-step-11",
				className,
			)}
			{...props}
		/>
	);
}

/**
 * ドロワーのタイトルコンポーネント
 */
function DrawerTitle({
	className,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
	return (
		<DrawerPrimitive.Title
			data-slot="title"
			className={cn(
				"text-lg font-semibold leading-none tracking-tight",
				"text-step-12",
				className,
			)}
			{...props}
		/>
	);
}

/**
 * ドロワーの説明コンポーネント
 */
function DrawerDescription({
	className,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
	return (
		<DrawerPrimitive.Description
			data-slot="description"
			className={cn("text-sm text-step-11", "leading-relaxed", className)}
			{...props}
		/>
	);
}

export {
	Drawer,
	DrawerTrigger,
	DrawerContent,
	DrawerHeader,
	DrawerFooter,
	DrawerTitle,
	DrawerDescription,
	DrawerClose,
	DrawerPortal,
	DrawerOverlay,
};
