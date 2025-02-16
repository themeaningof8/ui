/**
 * @file ドロップダウンメニューコンポーネント
 * @description クリックで表示されるドロップダウンメニューを提供するコンポーネント
 * 
 * @example
 * ```tsx
 * // 基本的な使用例
 * <DropdownMenu>
 *   <DropdownMenuTrigger>メニューを開く</DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>項目1</DropdownMenuItem>
 *     <DropdownMenuItem>項目2</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * 
 * // チェックボックス項目の例
 * <DropdownMenu>
 *   <DropdownMenuTrigger>設定</DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuCheckboxItem>
 *       オプション1
 *     </DropdownMenuCheckboxItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */

"use client"

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"
import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

/**
 * ドロップダウンメニューのサブトリガーコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.inset - 左側にインデントを付けるかどうか
 * @param props.children - トリガーの内容
 */
function DropdownMenuSubTrigger({
	className,
	inset,
	children,
	...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
	inset?: boolean;
}) {
	return (
		<DropdownMenuPrimitive.SubTrigger
			data-slot="dropdown-menu-sub-trigger"
			className={cn(
				"flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm",
				"text-step-11",
				"outline-none",
				"focus:bg-step-4 focus:text-step-12",
				"data-[state=open]:bg-step-4 data-[state=open]:text-step-12",
				inset && "pl-8",
				className,
			)}
			{...props}
		>
			{children}
			<ChevronRight className="ml-auto size-4" />
		</DropdownMenuPrimitive.SubTrigger>
	);
}

/**
 * ドロップダウンメニューのサブコンテンツコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.children - コンテンツの内容
 */
function DropdownMenuSubContent({
	className,
	...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>) {
	return (
		<DropdownMenuPrimitive.SubContent
			data-slot="dropdown-menu-sub-content"
			className={cn(
				"z-50 min-w-[8rem] overflow-hidden rounded-md",
				"border border-step-7 bg-step-2 p-1 text-step-11",
				"shadow-lg shadow-step-7/10",
				"data-[state=open]:animate-in data-[state=closed]:animate-out",
				"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
				"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
				"data-[side=bottom]:slide-in-from-top-2",
				"data-[side=left]:slide-in-from-right-2",
				"data-[side=right]:slide-in-from-left-2",
				"data-[side=top]:slide-in-from-bottom-2",
				className,
			)}
			{...props}
		/>
	);
}

/**
 * ドロップダウンメニューのコンテンツコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.sideOffset - 表示位置のオフセット
 * @param props.children - コンテンツの内容
 */
function DropdownMenuContent({
	className,
	sideOffset = 4,
	...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>) {
	return (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.Content
				data-slot="dropdown-menu-content"
				sideOffset={sideOffset}
				className={cn(
					"z-50 min-w-[8rem] overflow-hidden rounded-md",
					"border border-step-7 bg-step-2 p-1 text-step-11",
					"shadow-md shadow-step-7/10",
					"data-[state=open]:animate-in data-[state=closed]:animate-out",
					"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
					"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
					"data-[side=bottom]:slide-in-from-top-2",
					"data-[side=left]:slide-in-from-right-2",
					"data-[side=right]:slide-in-from-left-2",
					"data-[side=top]:slide-in-from-bottom-2",
					className,
				)}
				{...props}
			/>
		</DropdownMenuPrimitive.Portal>
	);
}

/**
 * ドロップダウンメニューの項目コンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.inset - 左側にインデントを付けるかどうか
 */
function DropdownMenuItem({
	className,
	inset,
	...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
	inset?: boolean;
}) {
	return (
		<DropdownMenuPrimitive.Item
			data-slot="dropdown-menu-item"
			className={cn(
				"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm",
				"text-step-11",
				"outline-none transition-colors",
				"focus:bg-step-4 focus:text-step-12",
				"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				inset && "pl-8",
				className,
			)}
			{...props}
		/>
	);
}

/**
 * ドロップダウンメニューのチェックボックス項目コンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.children - 項目の内容
 * @param props.checked - チェック状態
 */
function DropdownMenuCheckboxItem({
	className,
	children,
	checked,
	...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>) {
	return (
		<DropdownMenuPrimitive.CheckboxItem
			data-slot="dropdown-menu-checkbox-item"
			className={cn(
				"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm",
				"text-step-11",
				"outline-none transition-colors",
				"focus:bg-step-4 focus:text-step-12",
				"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				className,
			)}
			checked={checked}
			{...props}
		>
			<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
				<DropdownMenuPrimitive.ItemIndicator>
					<Check className="size-4 text-step-12" />
				</DropdownMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</DropdownMenuPrimitive.CheckboxItem>
	);
}

/**
 * ドロップダウンメニューのラジオ項目コンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.children - 項目の内容
 */
function DropdownMenuRadioItem({
	className,
	children,
	...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>) {
	return (
		<DropdownMenuPrimitive.RadioItem
			data-slot="dropdown-menu-radio-item"
			className={cn(
				"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm",
				"text-step-11",
				"outline-none transition-colors",
				"focus:bg-step-4 focus:text-step-12",
				"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				className,
			)}
			{...props}
		>
			<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
				<DropdownMenuPrimitive.ItemIndicator>
					<Circle className="size-2 fill-step-12 text-step-12" />
				</DropdownMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</DropdownMenuPrimitive.RadioItem>
	);
}

/**
 * ドロップダウンメニューのラベルコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.inset - 左側にインデントを付けるかどうか
 */
function DropdownMenuLabel({
	className,
	inset,
	...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
	inset?: boolean;
}) {
	return (
		<DropdownMenuPrimitive.Label
			data-slot="dropdown-menu-label"
			className={cn(
				"px-2 py-1.5 text-sm font-semibold",
				"text-step-12",
				inset && "pl-8",
				className,
			)}
			{...props}
		/>
	);
}

/**
 * ドロップダウンメニューのセパレーターコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function DropdownMenuSeparator({
	className,
	...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>) {
	return (
		<DropdownMenuPrimitive.Separator
			data-slot="dropdown-menu-separator"
			className={cn("-mx-1 my-1 h-px bg-step-6", className)}
			{...props}
		/>
	);
}

/**
 * ドロップダウンメニューのショートカットコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.children - ショートカットの内容
 */
function DropdownMenuShortcut({
	className,
	...props
}: ComponentPropsWithoutRef<"span">) {
	return (
		<span
			data-slot="dropdown-menu-shortcut"
			className={cn("ml-auto text-xs tracking-widest text-step-11", className)}
			{...props}
		/>
	);
}

// displayName の設定
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioItem,
	DropdownMenuRadioGroup,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuGroup,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
} 