/**
 * @file Breadcrumb コンポーネント
 * @description アクセシブルなパンくずリストコンポーネント。現在のページの階層構造を表示し、ナビゲーションを提供します。
 *
 * @example
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/products">製品</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>製品詳細</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 */

import * as React from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { tv } from 'tailwind-variants'

/**
 * @description Breadcrumbのスタイルバリアント
 */
const breadcrumbVariants = tv({
  base: 'inline-flex items-center gap-1 text-sm text-base-high'
})

/**
 * @description Breadcrumbのプロパティ型
 */
export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<'nav'> {
  /**
   * @description Breadcrumbの子要素
   */
  children: React.ReactNode
}

/**
 * @description Breadcrumbコンポーネント
 */
const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="パンくずリスト"
        className={cn(breadcrumbVariants(), className)}
        {...props}
      >
        {children}
      </nav>
    )
  }
)
Breadcrumb.displayName = 'Breadcrumb'

/**
 * @description BreadcrumbListのプロパティ型
 */
export interface BreadcrumbListProps extends React.ComponentPropsWithoutRef<'ol'> {
  /**
   * @description BreadcrumbListの子要素
   */
  children: React.ReactNode
}

/**
 * @description BreadcrumbListコンポーネント
 */
const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <ol ref={ref} className={cn('flex items-center gap-1', className)} {...props}>
        {children}
      </ol>
    )
  }
)
BreadcrumbList.displayName = 'BreadcrumbList'

/**
 * @description BreadcrumbItemのプロパティ型
 */
export interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<'li'> {
  /**
   * @description BreadcrumbItemの子要素
   */
  children: React.ReactNode
}

/**
 * @description BreadcrumbItemコンポーネント
 */
const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <li ref={ref} className={cn('inline-flex items-center gap-1', className)} {...props}>
        {children}
      </li>
    )
  }
)
BreadcrumbItem.displayName = 'BreadcrumbItem'

/**
 * @description BreadcrumbLinkのプロパティ型
 */
export interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  /**
   * @description リンクのテキスト
   */
  children: React.ReactNode
  /**
   * @description リンク先のURL
   */
  href: string
}

/**
 * @description BreadcrumbLinkコンポーネント
 */
const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn('text-base-high hover:text-base-high/80', className)}
        {...props}
      >
        {children}
      </a>
    )
  }
)
BreadcrumbLink.displayName = 'BreadcrumbLink'

/**
 * @description BreadcrumbPageのプロパティ型
 */
export interface BreadcrumbPageProps extends React.ComponentPropsWithoutRef<'span'> {
  /**
   * @description 現在のページ名
   */
  children: React.ReactNode
}

/**
 * @description BreadcrumbPageコンポーネント
 */
const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn('text-base-low cursor-default', className)}
        aria-current="page"
        {...props}
      >
        {children}
      </span>
    )
  }
)
BreadcrumbPage.displayName = 'BreadcrumbPage'

/**
 * @description BreadcrumbSeparatorのプロパティ型
 */
export interface BreadcrumbSeparatorProps extends React.ComponentPropsWithoutRef<'span'> {
  /**
   * @description セパレーターとして表示する要素（デフォルトは ChevronRight アイコン）
   */
  children?: React.ReactNode
}

/**
 * @description BreadcrumbSeparatorコンポーネント
 */
const BreadcrumbSeparator = React.forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
  ({ children = <ChevronRight className="h-4 w-4" />, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn('text-base-low', className)}
        aria-hidden="true"
        {...props}
      >
        {children}
      </span>
    )
  }
)
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} 