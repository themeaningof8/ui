/**
 * @file Paginationコンポーネント
 * @description ページネーションコンポーネント。ページ間のナビゲーションを提供します。
 */

import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/cn";
import { type ButtonProps, buttonVariants } from "@/components/ui/button";

/**
 * Paginationコンポーネントのプロパティ
 */
export interface PaginationProps extends React.ComponentPropsWithoutRef<"nav"> {
	/**
	 * 総アイテム数
	 */
	total: number;
	/**
	 * 1ページあたりのアイテム数
	 */
	perPage: number;
	/**
	 * 現在のページ番号
	 */
	currentPage: number;
	/**
	 * ページ変更時のコールバック
	 */
	onPageChange: (page: number) => void;
	/**
	 * 無効化状態
	 */
	disabled?: boolean;
}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
	({ className, total, perPage, currentPage, onPageChange, disabled, ...props }, ref) => {
		const totalPages = Math.ceil(total / perPage);
		
		const handlePageClick = (page: number) => {
			if (!disabled && page >= 1 && page <= totalPages) {
				onPageChange(page);
			}
		};

		const renderPageNumbers = () => {
			const pages = [];
			const showEllipsis = totalPages > 7;
			
			if (showEllipsis) {
				if (currentPage <= 4) {
					// 最初のページから4ページ目まで
					for (let i = 1; i <= 5; i++) {
						pages.push(
							<PaginationItem key={i}>
								<PaginationLink
									isActive={currentPage === i}
									onClick={() => handlePageClick(i)}
									disabled={disabled}
								>
									{i}
								</PaginationLink>
							</PaginationItem>
						);
					}
					pages.push(
						<PaginationItem key="ellipsis1">
							<PaginationEllipsis />
						</PaginationItem>
					);
					pages.push(
						<PaginationItem key={totalPages}>
							<PaginationLink
								onClick={() => handlePageClick(totalPages)}
								disabled={disabled}
							>
								{totalPages}
							</PaginationLink>
						</PaginationItem>
					);
				} else if (currentPage >= totalPages - 3) {
					// 最後から4ページ
					pages.push(
						<PaginationItem key={1}>
							<PaginationLink
								onClick={() => handlePageClick(1)}
								disabled={disabled}
							>
								1
							</PaginationLink>
						</PaginationItem>
					);
					pages.push(
						<PaginationItem key="ellipsis2">
							<PaginationEllipsis />
						</PaginationItem>
					);
					for (let i = totalPages - 4; i <= totalPages; i++) {
						pages.push(
							<PaginationItem key={i}>
								<PaginationLink
									isActive={currentPage === i}
									onClick={() => handlePageClick(i)}
									disabled={disabled}
								>
									{i}
								</PaginationLink>
							</PaginationItem>
						);
					}
				} else {
					// 中間ページ
					pages.push(
						<PaginationItem key={1}>
							<PaginationLink
								onClick={() => handlePageClick(1)}
								disabled={disabled}
							>
								1
							</PaginationLink>
						</PaginationItem>
					);
					pages.push(
						<PaginationItem key="ellipsis1">
							<PaginationEllipsis />
						</PaginationItem>
					);
					for (let i = currentPage - 1; i <= currentPage + 1; i++) {
						pages.push(
							<PaginationItem key={i}>
								<PaginationLink
									isActive={currentPage === i}
									onClick={() => handlePageClick(i)}
									disabled={disabled}
								>
									{i}
								</PaginationLink>
							</PaginationItem>
						);
					}
					pages.push(
						<PaginationItem key="ellipsis2">
							<PaginationEllipsis />
						</PaginationItem>
					);
					pages.push(
						<PaginationItem key={totalPages}>
							<PaginationLink
								onClick={() => handlePageClick(totalPages)}
								disabled={disabled}
							>
								{totalPages}
							</PaginationLink>
						</PaginationItem>
					);
				}
			} else {
				// 7ページ以下の場合は全ページを表示
				for (let i = 1; i <= totalPages; i++) {
					pages.push(
						<PaginationItem key={i}>
							<PaginationLink
								isActive={currentPage === i}
								onClick={() => handlePageClick(i)}
								disabled={disabled}
							>
								{i}
							</PaginationLink>
						</PaginationItem>
					);
				}
			}
			return pages;
		};

		return (
			<nav
				ref={ref}
				aria-label="ページネーション"
				className={cn("mx-auto flex w-full justify-center", className)}
				{...props}
			>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={() => handlePageClick(currentPage - 1)}
							disabled={disabled || currentPage === 1}
						/>
					</PaginationItem>
					{renderPageNumbers()}
					<PaginationItem>
						<PaginationNext
							onClick={() => handlePageClick(currentPage + 1)}
							disabled={disabled || currentPage === totalPages}
						/>
					</PaginationItem>
				</PaginationContent>
			</nav>
		);
	}
);
Pagination.displayName = "Pagination";

/**
 * PaginationContentコンポーネントのプロパティ
 */
const PaginationContent = React.forwardRef<
	HTMLUListElement,
	React.ComponentPropsWithoutRef<"ul">
>(({ className, ...props }, ref) => (
	<ul
		ref={ref}
		className={cn("flex flex-row items-center gap-1", className)}
		{...props}
	/>
));
PaginationContent.displayName = "PaginationContent";

/**
 * PaginationItemコンポーネントのプロパティ
 */
const PaginationItem = React.forwardRef<
	HTMLLIElement,
	React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
	<li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

/**
 * PaginationLinkコンポーネントのプロパティ
 */
type PaginationLinkProps = {
	/**
	 * アクティブ状態
	 */
	isActive?: boolean;
	/**
	 * 無効化状態
	 */
	disabled?: boolean;
} & Pick<ButtonProps, "size"> &
	React.ComponentPropsWithoutRef<"button">;

const PaginationLink = React.forwardRef<HTMLButtonElement, PaginationLinkProps>(
	({ className, isActive, disabled, size = "icon", onClick, ...props }, ref) => (
		<button
			ref={ref}
			type="button"
			aria-current={isActive ? "page" : undefined}
			className={cn(
				buttonVariants({
					variant: isActive ? "outline" : "ghost",
					size,
				}),
				className
			)}
			onClick={(e) => {
				if (!disabled && onClick) {
					onClick(e);
				}
			}}
			disabled={disabled}
			{...props}
		/>
	)
);
PaginationLink.displayName = "PaginationLink";

/**
 * PaginationPreviousコンポーネントのプロパティ
 */
const PaginationPrevious = React.forwardRef<HTMLButtonElement, PaginationLinkProps>(
	({ className, ...props }, ref) => (
		<PaginationLink
			ref={ref}
			aria-label="前のページ"
			size="default"
			className={cn("gap-1 pl-2.5", className)}
			{...props}
		>
			<ChevronLeft className="h-4 w-4" />
			<span>前へ</span>
		</PaginationLink>
	)
);
PaginationPrevious.displayName = "PaginationPrevious";

/**
 * PaginationNextコンポーネントのプロパティ
 */
const PaginationNext = React.forwardRef<HTMLButtonElement, PaginationLinkProps>(
	({ className, ...props }, ref) => (
		<PaginationLink
			ref={ref}
			aria-label="次のページ"
			size="default"
			className={cn("gap-1 pr-2.5", className)}
			{...props}
		>
			<span>次へ</span>
			<ChevronRight className="h-4 w-4" />
		</PaginationLink>
	)
);
PaginationNext.displayName = "PaginationNext";

/**
 * PaginationEllipsisコンポーネントのプロパティ
 */
const PaginationEllipsis = React.forwardRef<
	HTMLSpanElement,
	React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
	<span
		ref={ref}
		role="presentation"
		className={cn("flex h-9 w-9 items-center justify-center", className)}
		{...props}
	>
		<MoreHorizontal className="h-4 w-4" />
		<span className="sr-only">More pages</span>
	</span>
));
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
