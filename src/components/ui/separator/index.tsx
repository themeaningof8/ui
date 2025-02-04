/**
 * @file Separator
 * @description コンテンツを視覚的に分離するためのセパレーター
 *
 * @example
 * ```tsx
 * <Separator />
 * <Separator orientation="vertical" />
 * <Separator decorative />
 * ```
 */

import type * as React from "react";
import { tv } from "tailwind-variants";
import { cn } from "@/lib/cn";

/**
 * Separator のプロパティを定義
 */
export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * セパレーターの向き
	 * @default "horizontal"
	 */
	orientation?: "horizontal" | "vertical";
	/**
	 * 装飾的なセパレーターかどうか
	 * @description 装飾的な場合、スクリーンリーダーで読み上げられません
	 * @default false
	 */
	decorative?: boolean;
}

const separatorVariants = tv({
	base: "shrink-0 bg-base-ui",
	variants: {
		orientation: {
			horizontal: "h-[1px] w-full",
			vertical: "h-full w-[1px]",
		},
	},
	defaultVariants: {
		orientation: "horizontal",
	},
});

/**
 * Separator コンポーネント
 * @param props - コンポーネントのプロパティ
 * @returns Separator コンポーネント
 */
export function Separator({
	className,
	orientation = "horizontal",
	decorative = false,
	...props
}: SeparatorProps) {
	return (
		<div
			role={decorative ? "none" : "separator"}
			aria-orientation={orientation === "vertical" ? "vertical" : undefined}
			className={cn(separatorVariants({ orientation }), className)}
			{...props}
		/>
	);
}
