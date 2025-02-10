import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

/**
 * @description バッジコンポーネントのスタイルバリエーション定義
 * @param variant - バッジの見た目のバリエーション
 */
const badgeVariants = cva(
	"inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-base-ui-border focus:ring-offset-2",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-base-solid text-base-on-solid shadow hover:bg-base-solid-hover",
				secondary:
					"border-transparent bg-base-solid text-base-on-solid hover:bg-base-solid-hover",
				destructive:
					"border-transparent bg-destructive-solid text-destructive-on-solid shadow hover:bg-destructive-solid-hover",
				outline: "border-base-ui-border text-base-high-contrast-text",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}

export { Badge, badgeVariants };
