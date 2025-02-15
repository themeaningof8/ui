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
 * ```
 */
import * as React from "react"
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
        outline: "p-2 rounded-md border border-step-7 bg-step-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * パンくずリストのルートコンポーネントです。
 */
const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode
  }
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    aria-label="パンくずリスト"
    className={cn("relative", className)}
    {...props}
  />
))
Breadcrumb.displayName = "Breadcrumb"

/**
 * パンくずリストのリストコンポーネントです。
 */
const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol"> &
    VariantProps<typeof breadcrumbVariants>
>(({ className, variant, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(breadcrumbVariants({ variant }), className)}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

/**
 * パンくずリストの項目コンポーネントです。
 */
const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

/**
 * パンくずリストのリンクコンポーネントです。
 */
const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      className={cn(
        "transition-colors duration-200",
        "text-step-11 hover:text-step-12",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-7 focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

/**
 * パンくずリストの現在のページコンポーネントです。
 */
const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    tabIndex={0}
    className={cn(
      "font-normal text-step-12",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-7 focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

/**
 * パンくずリストのセパレーターコンポーネントです。
 */
const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn(
      "[&>svg]:size-3.5 text-step-11",
      className
    )}
    {...props}
  >
    {children ?? <ChevronRight className="text-step-11" />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

/**
 * パンくずリストの省略記号コンポーネントです。
 */
const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn(
      "flex size-9 items-center justify-center",
      "text-step-11 hover:text-step-12",
      "transition-colors duration-200",
      className
    )}
    {...props}
  >
    <MoreHorizontal className="size-4" />
    <span className="sr-only">その他のページ</span>
  </span>
)
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
