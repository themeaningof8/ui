/**
 * @file アラートダイアログコンポーネント
 * @description 重要な操作の確認を行うためのダイアログコンポーネントです
 * 
 * @example
 * ```tsx
 * <AlertDialog>
 *   <AlertDialogTrigger>開く</AlertDialogTrigger>
 *   <AlertDialogContent>
 *     <AlertDialogHeader>
 *       <AlertDialogTitle>確認</AlertDialogTitle>
 *       <AlertDialogDescription>
 *         この操作は取り消せません。
 *       </AlertDialogDescription>
 *     </AlertDialogHeader>
 *     <AlertDialogFooter>
 *       <AlertDialogCancel>キャンセル</AlertDialogCancel>
 *       <AlertDialogAction>続行</AlertDialogAction>
 *     </AlertDialogFooter>
 *   </AlertDialogContent>
 * </AlertDialog>
 * ```
 */

"use client"

import type { ComponentPropsWithoutRef, HTMLAttributes } from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

/**
 * アラートダイアログのルートコンポーネント
 */
const AlertDialog = AlertDialogPrimitive.Root

/**
 * アラートダイアログのトリガーコンポーネント
 */
const AlertDialogTrigger = AlertDialogPrimitive.Trigger

/**
 * アラートダイアログのポータルコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.children - ポータルの内容
 */
function AlertDialogPortal({
  ...props
}: AlertDialogPrimitive.AlertDialogPortalProps) {
  return <AlertDialogPrimitive.Portal {...props} />
}

/**
 * アラートダイアログのオーバーレイコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function AlertDialogOverlay({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "fixed inset-0 z-50",
        "bg-step-1/80",
        "backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * アラートダイアログのコンテンツコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.children - コンテンツの内容
 */
function AlertDialogContent({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]",
          "gap-4 border border-step-7 bg-step-2 p-6 shadow-lg",
          "duration-200",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
          "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          "sm:rounded-lg md:w-full",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

/**
 * アラートダイアログのヘッダーコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function AlertDialogHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "flex flex-col space-y-2 text-center sm:text-left",
        className
      )}
      {...props}
    />
  )
}

/**
 * アラートダイアログのフッターコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function AlertDialogFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * アラートダイアログのタイトルコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function AlertDialogTitle({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
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
 * アラートダイアログの説明コンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function AlertDialogDescription({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("text-sm text-step-11", className)}
      {...props}
    />
  )
}

/**
 * アラートダイアログのアクションボタンコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function AlertDialogAction({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action
      data-slot="alert-dialog-action"
      className={cn(buttonVariants(), className)}
      {...props}
    />
  )
}

/**
 * アラートダイアログのキャンセルボタンコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function AlertDialogCancel({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      data-slot="alert-dialog-cancel"
      className={cn(
        buttonVariants({ variant: "outline" }),
        "mt-2 sm:mt-0",
        className
      )}
      {...props}
    />
  )
}

// displayName の設定
AlertDialog.displayName = "AlertDialog"
AlertDialogTrigger.displayName = "AlertDialogTrigger"
AlertDialogPortal.displayName = "AlertDialogPortal"
AlertDialogOverlay.displayName = "AlertDialogOverlay"
AlertDialogContent.displayName = "AlertDialogContent"
AlertDialogHeader.displayName = "AlertDialogHeader"
AlertDialogFooter.displayName = "AlertDialogFooter"
AlertDialogTitle.displayName = "AlertDialogTitle"
AlertDialogDescription.displayName = "AlertDialogDescription"
AlertDialogAction.displayName = "AlertDialogAction"
AlertDialogCancel.displayName = "AlertDialogCancel"

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
