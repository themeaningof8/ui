/**
 * @file コンテキストメニューコンポーネント
 * @description 右クリックで表示されるコンテキストメニューを提供するコンポーネント
 * 
 * @example
 * ```tsx
 * // 基本的な使用例
 * <ContextMenu>
 *   <ContextMenuTrigger>右クリックエリア</ContextMenuTrigger>
 *   <ContextMenuContent>
 *     <ContextMenuItem>メニュー項目1</ContextMenuItem>
 *     <ContextMenuItem>メニュー項目2</ContextMenuItem>
 *   </ContextMenuContent>
 * </ContextMenu>
 * 
 * // サブメニューを含む例
 * <ContextMenu>
 *   <ContextMenuTrigger>右クリックエリア</ContextMenuTrigger>
 *   <ContextMenuContent>
 *     <ContextMenuSub>
 *       <ContextMenuSubTrigger>サブメニュー</ContextMenuSubTrigger>
 *       <ContextMenuSubContent>
 *         <ContextMenuItem>サブ項目1</ContextMenuItem>
 *         <ContextMenuItem>サブ項目2</ContextMenuItem>
 *       </ContextMenuSubContent>
 *     </ContextMenuSub>
 *   </ContextMenuContent>
 * </ContextMenu>
 * ```
 */

"use client";

import type * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const ContextMenu = ContextMenuPrimitive.Root;

const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

const ContextMenuGroup = ContextMenuPrimitive.Group;

const ContextMenuPortal = ContextMenuPrimitive.Portal;

const ContextMenuSub = ContextMenuPrimitive.Sub;

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

/**
 * コンテキストメニューのコンテンツ部分
 * @param props - コンポーネントのプロパティ
 * @returns コンテキストメニューのコンテンツを表示するコンポーネント
 */
const ContextMenuContent = ({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
			data-slot="content"
      className={cn(
				"z-50 min-w-[8rem] overflow-hidden rounded-md border bg-step-1 p-1 text-step-11 shadow-md",
				"data-[state=open]:animate-in data-[state=closed]:animate-out",
				"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
				"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
				"data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
				"data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
				className,
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
);
ContextMenuContent.displayName = "ContextMenuContent";

/**
 * コンテキストメニューの項目
 * @param props - コンポーネントのプロパティ
 * @returns コンテキストメニューの項目を表示するコンポーネント
 */
const ContextMenuItem = ({
	className,
	inset,
	...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
	inset?: boolean;
}) => (
  <ContextMenuPrimitive.Item
		data-slot="item"
    className={cn(
			"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
			"focus:bg-step-5 focus:text-step-12",
			"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
			className,
    )}
    {...props}
  />
);
ContextMenuItem.displayName = "ContextMenuItem";

/**
 * コンテキストメニューのチェックボックス項目
 * @param props - コンポーネントのプロパティ
 * @returns チェックボックス付きのメニュー項目を表示するコンポーネント
 */
const ContextMenuCheckboxItem = ({
	className,
	children,
	checked,
	...props
}: React.ComponentPropsWithoutRef<
	typeof ContextMenuPrimitive.CheckboxItem
>) => (
  <ContextMenuPrimitive.CheckboxItem
		data-slot="checkbox-item"
    className={cn(
			"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
			"focus:bg-step-5 focus:text-step-12",
			"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="size-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
);
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";

/**
 * コンテキストメニューのラジオ項目
 * @param props - コンポーネントのプロパティ
 * @returns ラジオボタン付きのメニュー項目を表示するコンポーネント
 */
const ContextMenuRadioItem = ({
	className,
	children,
	...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>) => (
  <ContextMenuPrimitive.RadioItem
		data-slot="radio-item"
    className={cn(
			"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
			"focus:bg-step-5 focus:text-step-12",
			"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="size-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
);
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";

/**
 * コンテキストメニューの区切り線
 * @param props - コンポーネントのプロパティ
 * @returns メニュー項目間の区切り線を表示するコンポーネント
 */
const ContextMenuSeparator = ({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>) => (
  <ContextMenuPrimitive.Separator
		data-slot="separator"
    className={cn("-mx-1 my-1 h-px bg-step-6", className)}
    {...props}
  />
);
ContextMenuSeparator.displayName = "ContextMenuSeparator";

/**
 * コンテキストメニューのサブトリガー
 * @param props - コンポーネントのプロパティ
 * @returns サブメニューを開くトリガーを表示するコンポーネント
 */
const ContextMenuSubTrigger = ({
	className,
	inset,
	children,
	...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
	inset?: boolean;
}) => (
  <ContextMenuPrimitive.SubTrigger
		data-slot="sub-trigger"
    className={cn(
			"flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
			"focus:bg-step-5 focus:text-step-12",
			"data-[state=open]:bg-step-5 data-[state=open]:text-step-12",
			"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
			className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto size-4" />
  </ContextMenuPrimitive.SubTrigger>
);
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";

/**
 * コンテキストメニューのサブコンテンツ
 * @param props - コンポーネントのプロパティ
 * @returns サブメニューのコンテンツを表示するコンポーネント
 */
const ContextMenuSubContent = ({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>) => (
  <ContextMenuPrimitive.SubContent
		data-slot="sub-content"
    className={cn(
			"z-50 min-w-[8rem] overflow-hidden rounded-md border bg-step-1 p-1 text-step-11 shadow-lg",
			"data-[state=open]:animate-in data-[state=closed]:animate-out",
			"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
			"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
			"data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
			"data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
			className,
    )}
    {...props}
  />
);
ContextMenuSubContent.displayName = "ContextMenuSubContent";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuRadioGroup,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuGroup,
  ContextMenuPortal,
};
