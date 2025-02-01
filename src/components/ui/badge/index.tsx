/**
 * @file Badge コンポーネント
 * @description インタラクティブな要素やステータスを表示するためのバッジコンポーネント
 *
 * @example
 * ```tsx
 * <Badge>New</Badge>
 * <Badge variant="destructive">Error</Badge>
 * <Badge variant="outline">Draft</Badge>
 * ```
 */

import type * as React from "react";
import { tv } from "tailwind-variants";
import { cn } from "@/lib/cn";

/**
 * Badge のバリアントを定義
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * バッジのスタイルバリアント
	 * @default "default"
	 */
	variant?: "default" | "secondary" | "destructive" | "outline";
}

const badgeVariants = tv({
	base: [
		"inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
		"focus:outline-none focus:ring-2 focus:ring-base-ui focus:ring-offset-2",
	],
	variants: {
		variant: {
			default: "bg-base-solid text-base-on-solid hover:bg-base-solid-hover",
			secondary: "bg-base-ui text-base-high hover:bg-base-hover",
			destructive:
				"bg-destructive-solid text-destructive-on-solid hover:bg-destructive-solid-hover",
			outline: "text-base-high border border-base-ui hover:bg-base-hover",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

/**
 * Badge コンポーネント
 * @param props - コンポーネントのプロパティ
 * @returns Badge コンポーネント
 */
export function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}
