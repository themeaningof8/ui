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

import * as React from "react";
import type { DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

/**
 * コマンドコンポーネントのプロパティ
 */
const Command = React.forwardRef<
	React.ComponentRef<typeof CommandPrimitive>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
	<CommandPrimitive
		ref={ref}
		className={cn(
			"flex h-full w-full flex-col overflow-hidden rounded-md bg-step-1 text-step-12",
			className,
		)}
		{...props}
	/>
));
Command.displayName = CommandPrimitive.displayName;

/**
 * コマンドダイアログのプロパティ
 */
interface CommandDialogProps extends DialogProps {}

/**
 * コマンドダイアログコンポーネント
 */
const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
	return (
		<Dialog {...props}>
			<DialogContent className="overflow-hidden p-0 shadow-lg">
				<DialogTitle className="sr-only">コマンドパレット</DialogTitle>
				<DialogDescription className="sr-only">
					コマンドを入力して操作を実行できます
				</DialogDescription>
				<Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-step-11 [&_[cmdk-input]]:size-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:size-5">
					{children}
				</Command>
			</DialogContent>
		</Dialog>
	);
};

/**
 * コマンド入力フィールドコンポーネント
 */
const CommandInput = React.forwardRef<
	React.ComponentRef<typeof CommandPrimitive.Input>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
	<div className="flex items-center border-b px-3" cmdk-input-wrapper="">
		<Search className="mr-2 size-4 shrink-0 opacity-50" />
		<CommandPrimitive.Input
			ref={ref}
			className={cn(
				"flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-step-11 disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	</div>
));
CommandInput.displayName = CommandPrimitive.Input.displayName;

/**
 * コマンドリストコンポーネント
 */
const CommandList = React.forwardRef<
	React.ComponentRef<typeof CommandPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
	<CommandPrimitive.List
		ref={ref}
		className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
		{...props}
	/>
));
CommandList.displayName = CommandPrimitive.List.displayName;

/**
 * 空の状態を表示するコンポーネント
 */
const CommandEmpty = React.forwardRef<
	React.ComponentRef<typeof CommandPrimitive.Empty>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
	<CommandPrimitive.Empty
		ref={ref}
		className="py-6 text-center text-sm"
		{...props}
	/>
));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

/**
 * コマンドグループコンポーネント
 */
const CommandGroup = React.forwardRef<
	React.ComponentRef<typeof CommandPrimitive.Group>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
	<CommandPrimitive.Group
		ref={ref}
		className={cn(
			"overflow-hidden p-1 text-step-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-step-11",
			className,
		)}
		{...props}
	/>
));
CommandGroup.displayName = CommandPrimitive.Group.displayName;

/**
 * 区切り線コンポーネント
 */
const CommandSeparator = React.forwardRef<
	React.ComponentRef<typeof CommandPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<CommandPrimitive.Separator
		ref={ref}
		className={cn("-mx-1 h-px bg-step-6", className)}
		{...props}
	/>
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

/**
 * コマンドアイテムコンポーネント
 */
const CommandItem = React.forwardRef<
	React.ComponentRef<typeof CommandPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
	<CommandPrimitive.Item
		ref={ref}
		className={cn(
			"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-step-5 aria-selected:text-step-12 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			className,
		)}
		{...props}
	/>
));
CommandItem.displayName = CommandPrimitive.Item.displayName;

/**
 * ショートカットを表示するコンポーネント
 */
const CommandShortcut = ({
	className,
	...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
	return (
		<span
			className={cn(
				"ml-auto text-xs tracking-widest text-step-11",
				className,
			)}
			{...props}
		/>
	);
};
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
