"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { toggleVariants } from "../toggle";

/**
 * トグルグループのルートコンポーネントです。
 * 複数のトグルボタンをグループ化し、単一選択または複数選択を管理します。
 *
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {string} [props.type] - 選択タイプ（"single" | "multiple"）
 * @param {string} [props.value] - 選択された値（単一選択の場合）
 * @param {string[]} [props.value] - 選択された値の配列（複数選択の場合）
 * @param {(value: string) => void} [props.onValueChange] - 値が変更された時のコールバック（単一選択の場合）
 * @param {(value: string[]) => void} [props.onValueChange] - 値が変更された時のコールバック（複数選択の場合）
 * @param {React.ReactNode} props.children - 子要素
 * @param {React.Ref<HTMLDivElement>} ref - 転送されるref
 *
 * @example
 * ```tsx
 * <ToggleGroup type="single" value={value} onValueChange={setValue}>
 *   <ToggleGroupItem value="a">A</ToggleGroupItem>
 *   <ToggleGroupItem value="b">B</ToggleGroupItem>
 * </ToggleGroup>
 * ```
 */
const ToggleGroup = React.forwardRef<
	React.ComponentRef<typeof ToggleGroupPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & {
		className?: string;
	}
>(({ className, ...props }, ref) => (
	<ToggleGroupPrimitive.Root
		ref={ref}
		className={cn("flex items-center justify-center gap-1", className)}
		{...props}
	/>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

/**
 * トグルグループの個々のアイテムコンポーネントです。
 * グループ内の選択可能な個別のトグルボタンとして機能します。
 *
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {string} props.value - アイテムの値
 * @param {string} [props.variant] - トグルのバリアント（"default" | "outline"）
 * @param {string} [props.size] - トグルのサイズ（"default" | "sm" | "lg"）
 * @param {boolean} [props.disabled] - 無効化状態
 * @param {React.ReactNode} props.children - 子要素
 * @param {React.Ref<HTMLButtonElement>} ref - 転送されるref
 */
const ToggleGroupItem = React.forwardRef<
	React.ComponentRef<typeof ToggleGroupPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
		VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
	<ToggleGroupPrimitive.Item
		ref={ref}
		className={cn(toggleVariants({ variant, size, className }))}
		{...props}
	/>
));

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
