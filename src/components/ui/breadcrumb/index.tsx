/**
 * @file パンくずリストコンポーネント
 * @description ウェブサイトのナビゲーション階層を表示するためのコンポーネント
 * 
 * @example
 * ```tsx
 * // 基本的な使用例
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>現在のページ</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * 
 * // カスタムセパレーターを使用した例
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator>{'>'}</BreadcrumbSeparator>
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>現在のページ</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * 
 * // アイコン付きの使用例
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">
 *         <HomeIcon className="size-4" />
 *         <span className="sr-only">ホーム</span>
 *       </BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/docs">ドキュメント</BreadcrumbLink>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 */

"use client"

import type * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * パンくずリストのスタイルバリエーションを定義
 */
const breadcrumbVariants = cva(
  [
    "flex flex-wrap items-center gap-1.5 sm:gap-2.5",
    "break-words text-sm",
    "text-step-11",
  ],
  {
    variants: {
      variant: {
        default: "",
        outline: [
          "rounded-md p-2",
          "border border-step-7",
          "bg-step-2",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * パンくずリストのルートコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.separator - カスタムセパレーター
 */
function Breadcrumb({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"nav"> & {
  separator?: React.ReactNode
}) {
  return (
    <nav
      data-slot="breadcrumb"
      aria-label="パンくずリスト"
      className={cn("relative", className)}
      {...props}
    />
  )
}

/**
 * パンくずリストのリストコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.variant - スタイルバリアント
 */
function BreadcrumbList({
  className,
  variant,
  ...props
}: React.ComponentPropsWithoutRef<"ol"> &
  VariantProps<typeof breadcrumbVariants>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(breadcrumbVariants({ variant }), className)}
      {...props}
    />
  )
}

/**
 * パンくずリストの項目コンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function BreadcrumbItem({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

/**
 * パンくずリストのリンクコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.asChild - 子要素をラップするかどうか
 */
function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "a"
  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(
        "inline-flex items-center gap-1.5",
        "transition-colors duration-200",
        "text-step-11 hover:text-step-12",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-6 focus-visible:rounded-sm",
        "[&_svg]:size-4 [&_svg]:text-step-11/50",
        className
      )}
      {...props}
    />
  )
}

/**
 * パンくずリストの現在のページコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function BreadcrumbPage({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      tabIndex={0}
      className={cn(
        "font-normal text-step-11",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-6 focus-visible:rounded-sm",
        "[&>svg]:size-3.5 [&>svg]:text-step-11/50", 
        className
      )}
      {...props}
    />
  )
}

/**
 * パンくずリストのセパレーターコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.children - カスタムセパレーター
 */
function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "[&>svg]:size-3.5 [&>svg]:text-step-11/50 text-step-11",
        className
      )}
      {...props}
    >
      {children ?? <ChevronRight className="text-step-11" />}
    </li>
  )
}

/**
 * パンくずリストの省略記号コンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex size-9 items-center justify-center",
        "text-step-11 hover:text-step-12",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-6", 
        className
      )}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">その他のページ</span>
    </span>
  )
}

// displayName の設定
Breadcrumb.displayName = "Breadcrumb"
BreadcrumbList.displayName = "BreadcrumbList"
BreadcrumbItem.displayName = "BreadcrumbItem"
BreadcrumbLink.displayName = "BreadcrumbLink"
BreadcrumbPage.displayName = "BreadcrumbPage"
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  breadcrumbVariants,
}
