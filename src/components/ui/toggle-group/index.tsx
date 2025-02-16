"use client";

/**
 * @file トグルグループコンポーネント
 * @description 複数のトグルボタンをグループ化し、単一選択または複数選択を管理するコンポーネントです
 * 
 * @example
 * ```tsx
 * <ToggleGroup type="single" value={value} onValueChange={setValue}>
 *   <ToggleGroupItem value="a">A</ToggleGroupItem>
 *   <ToggleGroupItem value="b">B</ToggleGroupItem>
 * </ToggleGroup>
 * ```
 */

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import type { ComponentPropsWithoutRef } from "react";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { toggleVariants } from "../toggle";

/**
 * トグルグループのルートコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.type - 選択タイプ（"single" | "multiple"）
 * @param props.value - 選択された値（単一選択の場合）または値の配列（複数選択の場合）
 * @param props.onValueChange - 値が変更された時のコールバック
 * @param props.children - 子要素
 */
function ToggleGroup({
	className,
	...props
}: ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & {
	className?: string;
}) {
	return (
		<ToggleGroupPrimitive.Root
			data-slot="toggle-group"
			className={cn("flex items-center justify-center gap-1", className)}
			{...props}
		/>
	);
}

/**
 * トグルグループの個々のアイテムコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.value - アイテムの値
 * @param props.variant - トグルのバリアント（"default" | "outline"）
 * @param props.size - トグルのサイズ（"default" | "sm" | "lg"）
 * @param props.disabled - 無効化状態
 * @param props.children - 子要素
 */
function ToggleGroupItem({
	className,
	variant,
	size,
	...props
}: ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
	VariantProps<typeof toggleVariants>) {
	return (
		<ToggleGroupPrimitive.Item
			data-slot="toggle-group-item"
			className={cn(toggleVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

// displayName の設定
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
