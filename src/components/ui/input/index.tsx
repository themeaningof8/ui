/**
 * @file 入力フィールドコンポーネント
 * @description ユーザーからのテキスト入力を受け付けるコンポーネントです
 * 
 * @example
 * ```tsx
 * // 基本的な使用方法
 * <Input placeholder="名前を入力" />
 * 
 * // バリデーションエラーの表示
 * <Input aria-invalid="true" />
 * 
 * // 無効化された状態
 * <Input disabled />
 * 
 * // ファイル入力
 * <Input type="file" />
 * ```
 */

import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

/**
 * 入力フィールドのスタイルバリエーションを定義
 */
const inputVariants = cva(
	[
		"flex h-10 w-full rounded-md px-3 py-2 text-base md:text-sm",
		"border border-step-7 bg-step-1",
		"text-step-12 placeholder:text-step-12/50",
		"transition-colors duration-200",
		"file:border-0 file:bg-transparent file:text-sm file:font-medium",
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-6 focus-visible:border-step-8",
		"disabled:cursor-not-allowed disabled:opacity-50",
		"[&::-webkit-calendar-picker-indicator]:filter-step-11",
	],
	{
		variants: {
			variant: {
				default: "",
				error:
					"border-destructive-step-7 focus-visible:ring-destructive-step-7 placeholder:text-destructive-step-11",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
)

/**
 * 入力フィールドコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.type - 入力フィールドのタイプ
 * @param props.variant - 入力フィールドのスタイルバリアント（"default" | "error"）
 */
function Input({
	className,
	type,
	variant,
	...props
}: ComponentPropsWithoutRef<"input"> & VariantProps<typeof inputVariants>) {
	return (
		<input
			data-slot="input"
			type={type}
			className={cn(inputVariants({ variant }), className)}
			{...props}
		/>
	)
}

// displayName の設定
Input.displayName = "Input"

export { Input, inputVariants }
