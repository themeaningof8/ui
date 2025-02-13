import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { type ButtonProps, buttonVariants } from "@/components/ui/button";

/**
 * ページネーションのルートコンポーネントです。
 * ページネーション全体のコンテナとして機能します。
 *
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {React.ReactNode} props.children - 子要素
 */
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
	<nav
		aria-label="pagination"
		className={cn("mx-auto flex w-full justify-center", className)}
		{...props}
	/>
);
Pagination.displayName = "Pagination";

/**
 * ページネーションのコンテンツコンポーネントです。
 * ページネーションアイテムのコンテナとして機能します。
 *
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {React.ReactNode} props.children - 子要素
 * @param {React.Ref<HTMLUListElement>} ref - 転送されるref
 */
const PaginationContent = React.forwardRef<
	HTMLUListElement,
	React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
	<ul
		ref={ref}
		className={cn("flex flex-row items-center gap-1", className)}
		{...props}
	/>
));
PaginationContent.displayName = "PaginationContent";

/**
 * ページネーションのアイテムコンポーネントです。
 * 個々のページネーション要素のコンテナとして機能します。
 *
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {React.ReactNode} props.children - 子要素
 * @param {React.Ref<HTMLLIElement>} ref - 転送されるref
 */
const PaginationItem = React.forwardRef<
	HTMLLIElement,
	React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
	<li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

/**
 * ページネーションリンクのプロパティ型定義です。
 * @typedef {object} PaginationLinkProps
 * @property {boolean} [isActive] - 現在のページかどうか
 * @property {ButtonProps["size"]} size - ボタンのサイズ
 */
type PaginationLinkProps = {
	isActive?: boolean;
} & Pick<ButtonProps, "size"> &
	React.ComponentProps<"a">;

/**
 * ページネーションのリンクコンポーネントです。
 * 個々のページへのリンクとして機能します。
 *
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {boolean} [props.isActive] - 現在のページかどうか
 * @param {ButtonProps["size"]} [props.size="icon"] - ボタンのサイズ
 */
const PaginationLink = ({
	className,
	isActive,
	size = "icon",
	...props
}: PaginationLinkProps) => (
	<a
		aria-current={isActive ? "page" : undefined}
		className={cn(
			buttonVariants({
				variant: isActive ? "outline" : "ghost",
				size,
			}),
			className,
		)}
		{...props}
	/>
);
PaginationLink.displayName = "PaginationLink";

/**
 * 前のページへのリンクコンポーネントです。
 *
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 */
const PaginationPrevious = ({
	className,
	size = "default",
	...props
}: React.ComponentProps<typeof PaginationLink>) => (
	<PaginationLink
		aria-label="Go to previous page"
		className={cn("gap-1 pl-2.5", className)}
		size={size}
		{...props}
	>
		<ChevronLeft className="h-4 w-4" />
		<span>Previous</span>
	</PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

/**
 * 次のページへのリンクコンポーネントです。
 *
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 */
const PaginationNext = ({
	className,
	size = "default",
	...props
}: React.ComponentProps<typeof PaginationLink>) => (
	<PaginationLink
		aria-label="Go to next page"
		className={cn("gap-1 pr-2.5", className)}
		size={size}
		{...props}
	>
		<span>Next</span>
		<ChevronRight className="h-4 w-4" />
	</PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

/**
 * ページネーションの省略記号コンポーネントです。
 * 多数のページがある場合に、ページ番号の省略を表示します。
 *
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 */
const PaginationEllipsis = ({
	className,
	...props
}: React.ComponentProps<"span">) => (
	<span
		aria-hidden
		className={cn("flex h-9 w-9 items-center justify-center", className)}
		{...props}
	>
		<MoreHorizontal className="h-4 w-4" data-testid="ellipsis-icon" />
		<span className="sr-only">More pages</span>
	</span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
};
