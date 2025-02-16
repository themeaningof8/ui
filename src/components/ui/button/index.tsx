/**
 * @file ボタンコンポーネント
 * @description 様々なスタイルとサイズを持つボタンコンポーネントです
 * 
 * @example
 * ```tsx
 * // デフォルトのボタン
 * <Button>クリック</Button>
 * 
 * // バリアントの指定
 * <Button variant="destructive">削除</Button>
 * 
 * // サイズの指定
 * <Button size="lg">大きいボタン</Button>
 *
 * // アイコン付きボタン
 * <Button>
 *   <Icon className="mr-2" />
 *   アイコン付き
 * </Button>
 *
 * // ローディング状態
 * <Button disabled>
 *   <Spinner className="mr-2" />
 *   読み込み中...
 * </Button>
 * ```
 */

"use client";

import type * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * ボタンのスタイルバリエーションを定義
 */
const buttonVariants = cva(
	[
		"inline-flex items-center justify-center gap-2",
		"whitespace-nowrap rounded-md text-sm font-medium",
		"transition-all duration-200 border border-transparent",
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-6",
		"disabled:pointer-events-none disabled:opacity-50",
		"[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
		"active:scale-95",
	],
  {
    variants: {
      variant: {
				default: [
					"bg-step-9 text-step-1",
					"hover:bg-step-10",
					"active:bg-step-11",
          "focus-visible:border-step-8",
				],
				destructive: [
					"bg-destructive-step-9 text-destructive-step-1",
					"hover:bg-destructive-step-10",
					"active:bg-destructive-step-10",
          "focus-visible:ring-destructive-step-6 focus-visible:border-destructive-step-8",
				],
				outline: [
					"border border-step-7 bg-step-1",
					"hover:bg-step-4 hover:text-step-12",
					"active:bg-step-5",
          "focus-visible:border-step-8",
				],
				secondary: [
					"bg-step-4 text-step-12",
					"hover:bg-step-5",
					"active:bg-step-6",
          "focus-visible:border-step-8",
				],
				ghost: ["hover:bg-step-4 hover:text-step-12", "active:bg-step-5", "focus-visible:border-step-8"],
				link: [
					"text-step-9 underline-offset-4",
					"hover:underline hover:text-step-10",
					"active:text-step-11",
          "focus-visible:border-step-8",
				],
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
	},
);

/**
 * ボタンコンポーネントのプロパティ
 * @typedef ButtonProps
 * @property {boolean} [asChild] - 子要素をボタンとして扱うかどうか
 * @property {string} [className] - 追加のCSSクラス名
 * @property {React.ReactNode} [children] - ボタンの内容
 * @property {"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"} [variant] - ボタンのスタイルバリアント
 * @property {"default" | "sm" | "lg" | "icon"} [size] - ボタンのサイズ
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

/**
 * ボタンコンポーネント
 * @param props - コンポーネントのプロパティ
 */
function Button({
	className,
	variant,
	size,
	asChild = false,
	type = "button",
	...props
}: ButtonProps) {
	const Comp = asChild ? Slot : "button";
    return (
      <Comp
			data-slot="button"
			type={type}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
	);
  }

// displayName の設定
Button.displayName = "Button";

export { Button, buttonVariants };
