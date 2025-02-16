/**
 * @file コマンドコンポーネント
 * @description コマンドパレットを提供するコンポーネント
 *
 * @example
 * ```tsx
 * // 基本的な使用例
 * <Command>
 *   <CommandInput placeholder="検索..." />
 *   <CommandList>
 *     <CommandEmpty>結果が見つかりません</CommandEmpty>
 *     <CommandGroup heading="提案">
 *       <CommandItem>アイテム1</CommandItem>
 *       <CommandItem>アイテム2</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 *
 * // ダイアログモードでの使用例
 * <CommandDialog>
 *   <CommandInput placeholder="コマンドを入力..." />
 *   <CommandList>
 *     <CommandItem>アイテム1</CommandItem>
 *   </CommandList>
 * </CommandDialog>
 * ```
 */

"use client";

import type * as React from "react";
import type { DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

/**
 * コマンドのルートコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.children - コマンドの内容
 */
function Command({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive>) {
	return (
	<CommandPrimitive
			data-slot="command"
		className={cn(
			"flex h-full w-full flex-col overflow-hidden rounded-md bg-step-1 text-step-12",
			className,
		)}
		{...props}
	/>
	);
}

/**
 * コマンドダイアログコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.children - ダイアログの内容
 */
function CommandDialog({ children, ...props }: DialogProps) {
	return (
		<Dialog {...props}>
			<DialogContent className="overflow-hidden p-0 shadow-lg">
				<DialogTitle className="sr-only">コマンドパレット</DialogTitle>
				<DialogDescription className="sr-only">
					コマンドを入力して操作を実行できます
				</DialogDescription>
				<Command
					data-slot="command-dialog"
					className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-step-11 [&_[cmdk-input]]:size-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:size-5"
				>
					{children}
				</Command>
			</DialogContent>
		</Dialog>
	);
}

/**
 * コマンド入力フィールドコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function CommandInput({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>) {
	return (
		<div
			data-slot="command-input-wrapper"
			className="flex items-center border-b px-3"
			cmdk-input-wrapper=""
		>
		<Search className="mr-2 size-4 shrink-0 opacity-50" />
		<CommandPrimitive.Input
				data-slot="command-input"
			className={cn(
				"flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-step-11 disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	</div>
	);
}

/**
 * コマンドリストコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.children - リストの内容
 */
function CommandList({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>) {
	return (
	<CommandPrimitive.List
			data-slot="command-list"
			className={cn(
				"max-h-[300px] overflow-y-auto overflow-x-hidden",
				className,
			)}
		{...props}
	/>
	);
}

/**
 * 空の状態を表示するコンポーネント
 * @param props - コンポーネントのプロパティ
 */
function CommandEmpty(
	props: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>,
) {
	return (
	<CommandPrimitive.Empty
			data-slot="command-empty"
		className="py-6 text-center text-sm"
		{...props}
	/>
	);
}

/**
 * コマンドグループコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.children - グループの内容
 */
function CommandGroup({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>) {
	return (
	<CommandPrimitive.Group
			data-slot="command-group"
		className={cn(
			"overflow-hidden p-1 text-step-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-step-11",
			className,
		)}
		{...props}
	/>
	);
}

/**
 * 区切り線コンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function CommandSeparator({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>) {
	return (
	<CommandPrimitive.Separator
			data-slot="command-separator"
		className={cn("-mx-1 h-px bg-step-6", className)}
		{...props}
	/>
	);
}

/**
 * コマンドアイテムコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.children - アイテムの内容
 */
function CommandItem({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>) {
	return (
	<CommandPrimitive.Item
			data-slot="command-item"
		className={cn(
			"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-step-5 aria-selected:text-step-12 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			className,
		)}
		{...props}
	/>
	);
}

/**
 * ショートカットを表示するコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.children - ショートカットの内容
 */
function CommandShortcut({
	className,
	...props
}: React.HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			data-slot="command-shortcut"
			className={cn("ml-auto text-xs tracking-widest text-step-11", className)}
			{...props}
		/>
	);
}

// displayName の設定
Command.displayName = CommandPrimitive.displayName;
CommandInput.displayName = CommandPrimitive.Input.displayName;
CommandList.displayName = CommandPrimitive.List.displayName;
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;
CommandGroup.displayName = CommandPrimitive.Group.displayName;
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;
CommandItem.displayName = CommandPrimitive.Item.displayName;
CommandShortcut.displayName = "CommandShortcut";

export {
	Command,
	CommandDialog,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandShortcut,
	CommandSeparator,
};
