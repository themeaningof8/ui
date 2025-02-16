/**
 * @file ページネーションコンポーネント
 * @description ページ分割されたコンテンツのナビゲーションを提供するコンポーネント
 * 
 * @example
 * ```tsx
 * <Pagination>
 *   <PaginationContent>
 *     <PaginationItem>
 *       <PaginationPrevious href="#" />
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationLink href="#" isActive>1</PaginationLink>
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationLink href="#">2</PaginationLink>
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationNext href="#" />
 *     </PaginationItem>
 *   </PaginationContent>
 * </Pagination>
 * ```
 */

import type { ComponentPropsWithoutRef } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { type ButtonProps, buttonVariants } from "@/components/ui/button";

/**
 * ページネーションのルートコンポーネントです。
 * ページネーション全体のコンテナとして機能します。
 */
function Pagination({ className, ...props }: ComponentPropsWithoutRef<"nav">) {
	return (
		<nav
			data-slot="root"
			aria-label="pagination"
			className={cn("mx-auto flex w-full justify-center", className)}
			{...props}
		/>
	);
}

/**
 * ページネーションのコンテンツコンポーネントです。
 * ページネーションアイテムのコンテナとして機能します。
 */
function PaginationContent({
	className,
	...props
}: ComponentPropsWithoutRef<"ul">) {
	return (
		<ul
			data-slot="content"
			className={cn("flex flex-row items-center gap-1", className)}
			{...props}
		/>
	);
}

/**
 * ページネーションのアイテムコンポーネントです。
 * 個々のページネーション要素のコンテナとして機能します。
 */
function PaginationItem({
	className,
	...props
}: ComponentPropsWithoutRef<"li">) {
	return (
		<li
			data-slot="item"
			className={cn("", className)}
			{...props}
		/>
	);
}

/**
 * ページネーションリンクのプロパティ型定義です。
 */
type PaginationLinkProps = {
	isActive?: boolean;
} & Pick<ButtonProps, "size"> &
	ComponentPropsWithoutRef<"a">;

/**
 * ページネーションのリンクコンポーネントです。
 * 個々のページへのリンクとして機能します。
 */
function PaginationLink({
	className,
	isActive,
	size = "icon",
	...props
}: PaginationLinkProps) {
	return (
		<a
			data-slot="link"
			aria-current={isActive ? "page" : undefined}
			className={cn(
				buttonVariants({
					variant: isActive ? "outline" : "ghost",
					size,
				}),
				"text-step-12",
				"hover:bg-step-4 hover:text-step-12",
				"focus-visible:ring-step-6",
				"disabled:text-step-11",
				isActive && [
					"border-step-7 bg-step-2",
					"hover:bg-step-4 hover:text-step-12",
				],
				className
			)}
			{...props}
		/>
	);
}

/**
 * 前のページへのリンクコンポーネントです。
 */
function PaginationPrevious({
	className,
	size = "default",
	...props
}: ComponentPropsWithoutRef<typeof PaginationLink>) {
	return (
		<PaginationLink
			data-slot="previous"
			aria-label="前のページへ"
			size={size}
			className={cn("gap-1 pl-2.5", className)}
			{...props}
		>
			<ChevronLeft className="size-4" />
			<span>前へ</span>
		</PaginationLink>
	);
}

/**
 * 次のページへのリンクコンポーネントです。
 */
function PaginationNext({
	className,
	size = "default",
	...props
}: ComponentPropsWithoutRef<typeof PaginationLink>) {
	return (
		<PaginationLink
			data-slot="next"
			aria-label="次のページへ"
			size={size}
			className={cn("gap-1 pr-2.5", className)}
			{...props}
		>
			<span>次へ</span>
			<ChevronRight className="size-4" />
		</PaginationLink>
	);
}

/**
 * ページネーションの省略記号コンポーネントです。
 * 多数のページがある場合に、ページ番号の省略を表示します。
 */
function PaginationEllipsis({
	className,
	...props
}: ComponentPropsWithoutRef<"span">) {
	return (
		<span
			data-slot="ellipsis"
			aria-hidden
			className={cn(
				"flex h-9 w-9 items-center justify-center",
				"text-step-11",
				className
			)}
			{...props}
		>
			<MoreHorizontal className="size-4" data-testid="ellipsis-icon" />
			<span className="sr-only">その他のページ</span>
		</span>
	);
}

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
};
