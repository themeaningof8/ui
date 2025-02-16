/**
 * @file アラートコンポーネント
 * @description ユーザーに重要な情報を通知するためのアラートコンポーネントです
 * 
 * @example
 * ```tsx
 * // デフォルトのアラート
 * <Alert>
 *   <AlertTitle>注意</AlertTitle>
 *   <AlertDescription>この操作は取り消せません。</AlertDescription>
 * </Alert>
 * 
 * // デストラクティブなアラート
 * <Alert variant="destructive">
 *   <AlertTitle>エラー</AlertTitle>
 *   <AlertDescription>処理中にエラーが発生しました。</AlertDescription>
 * </Alert>
 * ```
 */

import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * アラートのスタイルバリエーションを定義
 */
const alertVariants = cva(
	"relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:size-5 [&>svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "border-step-6 bg-step-2 text-step-12 [&>svg]:text-step-11",
				destructive:
					"border-destructive-step-6 bg-destructive-step-2 text-destructive-step-12 [&>svg]:text-destructive-step-11",
				success:
					"border-lime-500 bg-lime-200 text-lime-800 [&>svg]:text-accent-step-11",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

/**
 * アラートコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.variant - アラートのスタイルバリアント（"default" | "destructive" | "success"）
 * @param props.children - アラートの内容
 */
function Alert({
	className,
	variant,
	...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>) {
	return (
		<div
			data-slot="alert"
			role="alert"
			className={cn(alertVariants({ variant }), className)}
			{...props}
		/>
	);
}

/**
 * アラートのタイトルコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.children - タイトルの内容
 */
function AlertTitle({
	className,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h5
			data-slot="alert-title"
			className={cn(
				"mb-1 font-medium leading-none tracking-tight",
				"text-step-12 data-[variant=destructive]:text-destructive-step-11 data-[variant=success]:text-lime-800",
				className,
			)}
			{...props}
		/>
	);
}

/**
 * アラートの説明コンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.children - 説明の内容
 */
function AlertDescription({
	className,
	...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
	return (
		<div
			data-slot="alert-description"
			className={cn(
				"text-sm [&_p]:leading-relaxed",
				"text-step-11 data-[variant=destructive]:text-destructive-step-11 data-[variant=success]:text-lime-800",
				className,
			)}
			{...props}
		/>
	);
}

Alert.displayName = "Alert";
AlertTitle.displayName = "AlertTitle";
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
