/**
 * @file カードコンポーネント
 * @description コンテンツをグループ化して表示するためのカードコンポーネントです
 * 
 * @example
 * ```tsx
 * // 基本的な使用例
 * <Card>
 *   <CardHeader>
 *     <CardTitle>タイトル</CardTitle>
 *     <CardDescription>説明文</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     メインコンテンツ
 *   </CardContent>
 *   <CardFooter>
 *     フッターコンテンツ
 *   </CardFooter>
 * </Card>
 * ```
 */

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * @interface CardProps
 * @description カードのルートコンポーネントのプロパティ
 * @property {string} [className] - カスタムクラス名
 * @property {React.ReactNode} [children] - カードの内容
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    data-testid="card"
    {...props}
  />
))
Card.displayName = "Card"

/**
 * @interface CardHeaderProps
 * @description カードのヘッダー部分のプロパティ
 * @property {string} [className] - カスタムクラス名
 * @property {React.ReactNode} [children] - ヘッダーの内容
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    data-testid="card-header"
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

/**
 * @interface CardTitleProps
 * @description カードのタイトル部分のプロパティ
 * @property {string} [className] - カスタムクラス名
 * @property {React.ReactNode} [children] - タイトルの内容
 */
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

/**
 * @interface CardDescriptionProps
 * @description カードの説明部分のプロパティ
 * @property {string} [className] - カスタムクラス名
 * @property {React.ReactNode} [children] - 説明の内容
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    aria-description="true"
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

/**
 * @interface CardContentProps
 * @description カードのメインコンテンツ部分のプロパティ
 * @property {string} [className] - カスタムクラス名
 * @property {React.ReactNode} [children] - メインコンテンツの内容
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pt-0", className)}
    data-testid="card-content"
    {...props}
  />
))
CardContent.displayName = "CardContent"

/**
 * @interface CardFooterProps
 * @description カードのフッター部分のプロパティ
 * @property {string} [className] - カスタムクラス名
 * @property {React.ReactNode} [children] - フッターの内容
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    data-testid="card-footer"
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} 