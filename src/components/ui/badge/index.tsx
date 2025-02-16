/**
 * @file バッジコンポーネント
 * @description ステータス、カテゴリー、またはラベルを表示するためのインラインコンポーネント
 *
 * @example
 * ```tsx
 * // 基本的な使用例
 * <Badge>新着</Badge>
 *
 * // バリアントの使用例
 * <Badge variant="secondary">ドラフト</Badge>
 * <Badge variant="destructive">エラー</Badge>
 * <Badge variant="outline">アウトライン</Badge>
 *
 * // リンクとしての使用例
 * <Badge asChild>
 *   <a href="/new">新機能</a>
 * </Badge>
 *
 * // アイコン付きの使用例
 * <Badge>
 *   <StarIcon className="mr-1 size-3" />
 *   お気に入り
 * </Badge>
 * ```
 */

"use client";

import type { ComponentPropsWithoutRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * @description バッジのスタイルバリエーションを定義
 * @property {string} base - 基本スタイル
 * @property {Object} variants - バリアントスタイル
 * @property {Object} defaultVariants - デフォルトのバリアント
 */
const badgeVariants = cva(
	[
		"inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5",
		"text-xs font-semibold",
		"border transition-colors",
		"focus:outline-none focus:ring-2 focus:ring-step-6",
		"[&_svg]:size-3",
	],
	{
		variants: {
			variant: {
				default: [
					"border-transparent",
					"bg-step-9 text-step-1",
					"hover:bg-step-10",
				],
				secondary: [
					"border-transparent",
					"bg-step-4 text-step-11",
					"hover:bg-step-5",
				],
				destructive: [
					"border-transparent",
					"bg-destructive-step-9 text-destructive-step-1",
					"hover:bg-destructive-step-10",
				],
				outline: [
					"border-step-7",
					"text-step-11",
					"hover:border-step-8 hover:bg-step-2",
				],
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

/**
 * @interface BadgeProps
 * @description バッジコンポーネントのプロパティ
 * @extends VariantProps<typeof badgeVariants>
 * @property {string} [className] - カスタムクラス名
 * @property {ReactNode} [children] - バッジの内容
 * @property {boolean} [asChild] - 子要素をラップするかどうか
 */
export interface BadgeProps
	extends ComponentPropsWithoutRef<"div">,
		VariantProps<typeof badgeVariants> {
	asChild?: boolean;
}

/**
 * @function Badge
 * @description バッジコンポーネント
 * @param {BadgeProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} バッジ要素
 */

function Badge({ className, variant, asChild = false, ...props }: BadgeProps) {
	const Comp = asChild ? Slot : "div";
	return (
		<Comp
			data-slot="badge"
			role="status"
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	);
}

// displayName の設定
Badge.displayName = "Badge";

export { Badge, badgeVariants };
