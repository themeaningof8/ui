/**
 * @file パンくずリストコンポーネント
 * @description ウェブサイトのナビゲーション階層を表示するためのコンポーネント
 * 
 * @example
 * ```tsx
 * // 基本的な使用例
 * <Breadcrumb>
 *   <BreadcrumbItem>
 *     <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
 *   </BreadcrumbItem>
 *   <BreadcrumbSeparator />
 *   <BreadcrumbItem>
 *     <BreadcrumbPage>現在のページ</BreadcrumbPage>
 *   </BreadcrumbItem>
 * </Breadcrumb>
 * 
 * // カスタムセパレーターを使用した例
 * <Breadcrumb>
 *   <BreadcrumbItem>
 *     <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
 *   </BreadcrumbItem>
 *   <BreadcrumbSeparator>{'>'}</BreadcrumbSeparator>
 *   <BreadcrumbItem>
 *     <BreadcrumbPage>現在のページ</BreadcrumbPage>
 *   </BreadcrumbItem>
 * </Breadcrumb>
 * ```
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * @interface BreadcrumbProps
 * @description パンくずリストのルートコンポーネントのプロパティ
 * @property {string} [className] - カスタムクラス名
 * @property {React.ReactNode} [children] - 子要素（BreadcrumbItemとBreadcrumbSeparator）
 */
const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ ...props }, ref) => (
  <nav
    ref={ref}
    aria-label="breadcrumb"
    {...props}
  />
))
Breadcrumb.displayName = "Breadcrumb"

/**
 * @interface BreadcrumbItemProps
 * @description パンくずリストの各アイテムのプロパティ
 * @property {string} [className] - カスタムクラス名
 * @property {React.ReactNode} [children] - 子要素（BreadcrumbLinkまたはBreadcrumbPage）
 */
const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-2", className)}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

/**
 * @interface BreadcrumbLinkProps
 * @description パンくずリストのリンク要素のプロパティ
 * @property {string} [className] - カスタムクラス名
 * @property {string} href - リンク先のURL
 * @property {React.ReactNode} [children] - リンクのテキストまたは要素
 */
const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn("transition-colors hover:text-muted-foreground", className)}
    {...props}
  />
))
BreadcrumbLink.displayName = "BreadcrumbLink"

/**
 * @interface BreadcrumbPageProps
 * @description 現在のページを表す要素のプロパティ
 * @property {string} [className] - カスタムクラス名
 * @property {React.ReactNode} [children] - ページ名
 */
const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-current="page"
    className={cn("text-muted-foreground", className)}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

/**
 * @interface BreadcrumbSeparatorProps
 * @description パンくずリストのセパレーター要素のプロパティ
 * @property {string} [className] - カスタムクラス名
 * @property {React.ReactNode} [children] - セパレーターとして表示する要素（デフォルトは'/'）
 */
const BreadcrumbSeparator = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="separator"
    aria-hidden="true"
    className={cn("text-muted-foreground", className)}
    {...props}
  >
    {props.children || "/"}
  </span>
))
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} 