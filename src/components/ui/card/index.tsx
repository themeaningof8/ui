/**
 * @file Card
 * @description コンテンツを整理して表示するためのカードコンポーネント群
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>タイトル</CardTitle>
 *     <CardDescription>説明文</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     メインコンテンツ
 *   </CardContent>
 *   <CardFooter>
 *     フッター
 *   </CardFooter>
 * </Card>
 * ```
 */

import type * as React from "react";
import { tv } from "tailwind-variants";
import { cn } from "@/lib/cn";

/**
 * Card のプロパティを定義
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * CardHeader のプロパティを定義
 */
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * CardTitle のプロパティを定義
 */
export interface CardTitleProps
	extends React.HTMLAttributes<HTMLHeadingElement> {}

/**
 * CardDescription のプロパティを定義
 */
export interface CardDescriptionProps
	extends React.HTMLAttributes<HTMLParagraphElement> {}

/**
 * CardContent のプロパティを定義
 */
export interface CardContentProps
	extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * CardFooter のプロパティを定義
 */
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const cardVariants = tv({
	base: [
		"rounded-lg border border-base-ui bg-base-surface text-base-high",
		"shadow-sm",
	],
});

const cardHeaderVariants = tv({
	base: "flex flex-col space-y-1.5 p-6",
});

const cardTitleVariants = tv({
	base: "text-2xl font-semibold leading-none tracking-tight",
});

const cardDescriptionVariants = tv({
	base: "text-sm text-base-low",
});

const cardContentVariants = tv({
	base: "p-6 pt-0",
});

const cardFooterVariants = tv({
	base: "flex items-center p-6 pt-0",
});

/**
 * Card コンポーネント
 */
export function Card({ className, ...props }: CardProps) {
	return (
		<div
			role="article"
			className={cn(cardVariants(), className)}
			{...props}
		/>
	);
}

/**
 * CardHeader コンポーネント
 */
export function CardHeader({ className, ...props }: CardHeaderProps) {
	return <div className={cn(cardHeaderVariants(), className)} {...props} />;
}

/**
 * CardTitle コンポーネント
 */
export function CardTitle({ className, ...props }: CardTitleProps) {
	return <h3 className={cn(cardTitleVariants(), className)} {...props} />;
}

/**
 * CardDescription コンポーネント
 */
export function CardDescription({ className, ...props }: CardDescriptionProps) {
	return <p className={cn(cardDescriptionVariants(), className)} {...props} />;
}

/**
 * CardContent コンポーネント
 */
export function CardContent({ className, ...props }: CardContentProps) {
	return <div className={cn(cardContentVariants(), className)} {...props} />;
}

/**
 * CardFooter コンポーネント
 */
export function CardFooter({ className, ...props }: CardFooterProps) {
	return <div className={cn(cardFooterVariants(), className)} {...props} />;
}
