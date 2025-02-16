"use client"

/**
 * @file トグルコンポーネント
 * @description オン/オフの状態を切り替えるボタンコンポーネントです
 * 
 * @example
 * ```tsx
 * // 基本的な使用方法
 * <Toggle>Click me</Toggle>
 * 
 * // アウトラインスタイル
 * <Toggle variant="outline">Settings</Toggle>
 * 
 * // サイズバリエーション
 * <Toggle size="sm">Small</Toggle>
 * <Toggle size="lg">Large</Toggle>
 * ```
 */

import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

/**
 * トグルのスタイルバリエーションを定義
 */
const toggleVariants = cva(
	[
		"inline-flex items-center justify-center rounded-md text-sm font-medium",
		"ring-offset-step-1",
		"transition-colors duration-200",
		"hover:bg-step-4 hover:text-step-12",
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-7 focus-visible:ring-offset-2",
		"disabled:pointer-events-none disabled:opacity-50",
		"data-[state=on]:bg-step-4 data-[state=on]:text-step-12",
		"[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
		"gap-2",
	],
	{
		variants: {
			variant: {
				default: "bg-transparent",
				outline: [
					"border border-step-7 bg-transparent",
					"hover:bg-step-4 hover:text-step-12",
				],
			},
			size: {
				default: "h-10 px-3 min-w-10",
				sm: "h-9 px-2.5 min-w-9",
				lg: "h-11 px-5 min-w-11",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
)

/**
 * トグルコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.variant - トグルのバリアント（"default" | "outline"）
 * @param props.size - トグルのサイズ（"default" | "sm" | "lg"）
 * @param props.disabled - 無効化状態
 * @param props.children - トグルの内容
 */
function Toggle({
	className,
	variant,
	size,
	disabled,
	...props
}: ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
	VariantProps<typeof toggleVariants>) {
	return (
		<TogglePrimitive.Root
			data-slot="toggle"
			disabled={disabled}
			aria-disabled={disabled}
			className={cn(toggleVariants({ variant, size, className }))}
			{...props}
		/>
	)
}

// displayName の設定
Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
