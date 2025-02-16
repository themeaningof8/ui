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
 * 
 * // インタラクティブな要素を含むカード
 * <Card>
 *   <CardHeader>
 *     <CardTitle>アカウント作成</CardTitle>
 *     <CardDescription>以下のフォームに必要事項を入力してください。</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <form>
 *       <input type="text" placeholder="名前" />
 *       <input type="email" placeholder="メールアドレス" />
 *     </form>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>作成</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */

"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * カードのルートコンポーネント
 * @description コンテンツをグループ化して表示するためのコンテナコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - カスタムクラス名
 * @param props.children - カードの内容
 */
function Card({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="card"
      role="article"
      className={cn(
        "rounded-lg border border-step-7 bg-step-2 text-step-12 shadow-sm not-prose",
        "transition-colors duration-200",
        "hover:border-step-8",
        "focus-visible:outline-none focus-visible:border-step-8 focus-visible:ring-2 focus-visible:ring-step-6 focus-visible:border-step-8",
        className
      )}
      {...props}
    />
  )
}

/**
 * カードのヘッダー部分
 * @description タイトルと説明文を含むヘッダーセクション
 * @param props - コンポーネントのプロパティ
 * @param props.className - カスタムクラス名
 * @param props.children - ヘッダーの内容
 */
function CardHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
}

/**
 * カードのタイトル部分
 * @description カードの主要な見出しを表示
 * @param props - コンポーネントのプロパティ
 * @param props.className - カスタムクラス名
 * @param props.children - タイトルの内容
 */
function CardTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight text-step-12",
        "transition-colors duration-200",
        className
      )}
      {...props}
    />
  )
}

/**
 * カードの説明部分
 * @description タイトルを補足する説明文を表示
 * @param props - コンポーネントのプロパティ
 * @param props.className - カスタムクラス名
 * @param props.children - 説明の内容
 */
function CardDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn(
        "text-sm text-step-11",
        "transition-colors duration-200",
        className
      )}
      {...props}
    />
  )
}

/**
 * カードのメインコンテンツ部分
 * @description カードの主要なコンテンツを表示
 * @param props - コンポーネントのプロパティ
 * @param props.className - カスタムクラス名
 * @param props.children - メインコンテンツの内容
 */
function CardContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  )
}

/**
 * カードのフッター部分
 * @description アクションボタンなどを配置するフッターセクション
 * @param props - コンポーネントのプロパティ
 * @param props.className - カスタムクラス名
 * @param props.children - フッターの内容
 */
function CardFooter({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center p-6 pt-0",
        "transition-colors duration-200",
        className
      )}
      {...props}
    />
  )
}

Card.displayName = "Card"
CardHeader.displayName = "CardHeader"
CardFooter.displayName = "CardFooter"
CardTitle.displayName = "CardTitle"
CardDescription.displayName = "CardDescription"
CardContent.displayName = "CardContent"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} 