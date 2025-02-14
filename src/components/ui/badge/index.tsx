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
 * ```
 */

import React from "react";
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * @description バッジのスタイルバリエーションを定義
 * @property {string} base - 基本スタイル
 * @property {Object} variants - バリアントスタイル
 * @property {Object} defaultVariants - デフォルトのバリアント
 */
const badgeVariants = cva(
	"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
				secondary:
					"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive:
					"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
				outline: "text-foreground",
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
 * @property {React.ReactNode} [children] - バッジの内容
 * @property {boolean} [asChild] - 子要素をラップするかどうか
 */
export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {
			asChild?: boolean
		}

/**
 * @function Badge
 * @description バッジコンポーネント
 * @param {BadgeProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} バッジ要素
 */

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
			  role="status"
        className={cn(badgeVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

export { Badge, badgeVariants };
