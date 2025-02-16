"use client";

/**
 * @file アコーディオンコンポーネント
 * @description 折りたたみ可能なコンテンツを表示するアコーディオンコンポーネントです
 *
 * @example
 * ```tsx
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>アコーディオン1</AccordionTrigger>
 *     <AccordionContent>アコーディオン1の内容</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */

import type { ComponentPropsWithoutRef } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * アコーディオンのルートコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.children - アコーディオンの内容
 */
function Accordion({
	className,
	...props
}: ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>) {
	return (
		<AccordionPrimitive.Root
			data-slot="accordion"
			className={cn("w-full", className)}
			{...props}
		/>
	);
}

/**
 * アコーディオンの各アイテムを表すコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.children - アイテムの内容
 */
function AccordionItem({
	className,
	...props
}: ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>) {
	return (
		<AccordionPrimitive.Item
			data-slot="accordion-item"
			className={cn(
				"border-b last:border-b-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-6 focus-visible:ring-offset-2 focus-visible:rounded-sm",
				className
			)}
			{...props}
		/>
	);
}

/**
 * アコーディオンのトリガー部分のコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.children - トリガーの内容
 * @param ref - 転送されるref
 */
function AccordionTrigger({
	className,
	children,
	...props
}: ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>) {
	return (
		<AccordionPrimitive.Header data-slot="accordion-header" className="flex">
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={cn(
					"flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
					className,
				)}
				{...props}
			>
				{children}
				<ChevronDown className="size-4 shrink-0 transition-transform duration-200" />
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

/**
 * アコーディオンのコンテンツ部分のコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.children - コンテンツの内容
 */
function AccordionContent({
	className,
	children,
	...props
}: ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>) {
	return (
		<AccordionPrimitive.Content
			data-slot="accordion-content"
			className={cn(
				"overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
			)}
			{...props}
		>
			<div className={cn("pb-4 pt-0", className)}>{children}</div>
		</AccordionPrimitive.Content>
	);
}

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
