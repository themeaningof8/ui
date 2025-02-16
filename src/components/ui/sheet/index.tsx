"use client"

import type * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * @file シートコンポーネント
 * @description サイドから表示されるパネルコンポーネント
 * 
 * @example
 * ```tsx
 * // 基本的な使用例
 * <Sheet>
 *   <SheetTrigger>開く</SheetTrigger>
 *   <SheetContent>
 *     <SheetHeader>
 *       <SheetTitle>タイトル</SheetTitle>
 *       <SheetDescription>説明文</SheetDescription>
 *     </SheetHeader>
 *     <div>コンテンツ</div>
 *     <SheetFooter>
 *       <button>アクション</button>
 *     </SheetFooter>
 *   </SheetContent>
 * </Sheet>
 * 
 * // カスタムサイズのシート
 * <Sheet>
 *   <SheetTrigger>開く</SheetTrigger>
 *   <SheetContent className="w-[800px] sm:max-w-[800px]">
 *     <SheetHeader>
 *       <SheetTitle>大きいシート</SheetTitle>
 *       <SheetDescription>カスタムサイズのシートです</SheetDescription>
 *     </SheetHeader>
 *     <div>コンテンツ</div>
 *   </SheetContent>
 * </Sheet>
 * 
 * // 異なる方向から表示されるシート
 * <Sheet>
 *   <SheetTrigger>開く</SheetTrigger>
 *   <SheetContent side="left">
 *     <SheetHeader>
 *       <SheetTitle>左からのシート</SheetTitle>
 *       <SheetDescription>左側からスライドインします</SheetDescription>
 *     </SheetHeader>
 *     <div>コンテンツ</div>
 *   </SheetContent>
 * </Sheet>
 * ```
 */

/**
 * シートのバリアントを定義します。
 * サイドからのスライドインの方向を指定します。
 */
const sheetVariants = cva(
  [
    "fixed z-50 gap-4 p-6",
    "bg-step-2 text-step-12",
    "border-step-7",
    "shadow-lg shadow-step-7/10",
    "transition ease-in-out",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:duration-300 data-[state=open]:duration-500",
  ],
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

/**
 * シートのルートコンポーネントです。
 */
const Sheet = SheetPrimitive.Root

/**
 * シートのトリガーコンポーネントです。
 */
function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return (
    <SheetPrimitive.Trigger
      data-slot="sheet-trigger"
      {...props}
    />
  )
}

/**
 * シートのクローズボタンコンポーネントです。
 */
function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return (
    <SheetPrimitive.Close
      data-slot="sheet-close"
      {...props}
    />
  )
}

/**
 * シートのポータルコンポーネントです。
 */
const SheetPortal = SheetPrimitive.Portal

/**
 * シートのオーバーレイコンポーネントです。
 */
function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-step-1/80",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      data-testid="sheet-overlay"
      {...props}
    />
  )
}

/**
 * シートのコンテンツコンポーネントです。
 */
interface SheetContentProps
  extends React.ComponentProps<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

function SheetContent({
  side = "right",
  className,
  children,
  ...props
}: SheetContentProps) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {children}
        <SheetPrimitive.Close
          data-slot="sheet-close-button"
          className={cn(
            "absolute right-4 top-4 rounded-sm",
            "opacity-70 transition-opacity hover:opacity-100",
            "text-step-11 hover:text-step-12",
            "focus:outline-none focus:ring-2 focus:ring-step-6 focus:ring-offset-2",
            "disabled:pointer-events-none",
            "data-[state=open]:bg-step-4"
          )}
        >
          <X className="size-4" />
          <span className="sr-only">閉じる</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

/**
 * シートのヘッダーコンポーネントです。
 */
function SheetHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        "flex flex-col space-y-2 text-center sm:text-left",
        className
      )}
      {...props}
    />
  )
}

/**
 * シートのフッターコンポーネントです。
 */
function SheetFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * シートのタイトルコンポーネントです。
 */
function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        "text-step-12",
        className
      )}
      {...props}
    />
  )
}

/**
 * シートの説明コンポーネントです。
 */
function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-step-11", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
