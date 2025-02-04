/**
 * @file Spinner
 * @description 読み込み中を示すスピナー。アクセシブルな役割として role="status" を持ち、視覚的に隠された読み込みメッセージを提供します。
 *
 * @example
 * <Spinner size="md" />
 */

import type * as React from "react";
import { cn } from "@/lib/cn";
import { tv } from "tailwind-variants";

/**
 * @description Spinnerのスタイルバリアント
 */
const spinnerVariants = tv({
	base: "inline-block animate-spin rounded-full border-t-2 border-solid border-current",
	variants: {
		size: {
			sm: "w-4 h-4",
			md: "w-6 h-6",
			lg: "w-8 h-8",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

/**
 * @description Spinnerコンポーネントのプロパティ型
 * @property {string} [size] - スピナーのサイズ（'sm', 'md', 'lg'）
 * @property {string} [className] - 追加のクラス名
 */
export type SpinnerProps = React.HTMLAttributes<HTMLDivElement> & {
	size?: "sm" | "md" | "lg";
};

/**
 * @description Spinnerコンポーネント。読み込み中を示すスピナーをレンダリングします。アクセシビリティ対応として role="status" と視覚的に隠された"Loading..."メッセージを含みます。
 */
const Spinner: React.FC<SpinnerProps> = ({ size, className, ...rest }) => {
	return (
		<div
			className={cn(spinnerVariants({ size }), className)}
			{...rest}
		>
			<span className="sr-only">Loading...</span>
		</div>
	);
};

Spinner.displayName = "Spinner";

export { Spinner };
