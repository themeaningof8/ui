"use client"

/**
 * @file ダイアログコンポーネント
 * @description モーダルダイアログを提供するコンポーネントです
 * 
 * @example
 * ```tsx
 * // 基本的な使用例
 * <Dialog>
 *   <DialogTrigger>開く</DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>ダイアログのタイトル</DialogTitle>
 *       <DialogDescription>
 *         ダイアログの説明文をここに記載します。
 *       </DialogDescription>
 *     </DialogHeader>
 *     <div className="p-4">
 *       コンテンツをここに配置します。
 *     </div>
 *     <DialogFooter>
 *       <Button onClick={() => {}}>保存</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * 
 * // 確認ダイアログの例
 * <Dialog>
 *   <DialogTrigger asChild>
 *     <Button variant="destructive">削除</Button>
 *   </DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>本当に削除しますか？</DialogTitle>
 *       <DialogDescription>
 *         この操作は取り消すことができません。
 *       </DialogDescription>
 *     </DialogHeader>
 *     <DialogFooter>
 *       <Button variant="outline" onClick={() => {}}>
 *         キャンセル
 *       </Button>
 *       <Button variant="destructive" onClick={() => {}}>
 *         削除
 *       </Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 */


import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import type { ComponentPropsWithoutRef, HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

/**
 * ダイアログのルートコンポーネント
 */
const Dialog = DialogPrimitive.Root

/**
 * ダイアログのトリガーコンポーネント
 */
const DialogTrigger = DialogPrimitive.Trigger

/**
 * ダイアログのポータルコンポーネント
 */
const DialogPortal = DialogPrimitive.Portal

/**
 * ダイアログのオーバーレイコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function DialogOverlay({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      data-testid="dialog-overlay"
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
 * ダイアログのコンテンツコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.children - ダイアログの内容
 */
function DialogContent({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]",
          "gap-4 border border-step-7 bg-step-2 p-6 shadow-lg",
          "duration-200",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
          "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          "sm:rounded-lg",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          data-slot="dialog-close"
          className={cn(
            "absolute right-4 top-4 rounded-sm opacity-70",
            "ring-offset-step-2",
            "transition-opacity",
            "hover:opacity-100",
            "focus:outline-none focus:ring-2 focus:ring-step-7 focus:ring-offset-2",
            "disabled:pointer-events-none",
            "data-[state=open]:bg-step-4 data-[state=open]:text-step-11"
          )}
        >
          <X className="size-4" />
          <span className="sr-only">閉じる</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

/**
 * ダイアログのヘッダーコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function DialogHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className
      )}
      {...props}
    />
  )
}

/**
 * ダイアログのフッターコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function DialogFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * ダイアログのタイトルコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function DialogTitle({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
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
 * ダイアログの説明コンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function DialogDescription({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-sm text-step-11", className)}
      {...props}
    />
  )
}

// displayName の設定
Dialog.displayName = DialogPrimitive.Root.displayName
DialogTrigger.displayName = DialogPrimitive.Trigger.displayName
DialogContent.displayName = DialogPrimitive.Content.displayName
DialogHeader.displayName = "DialogHeader"
DialogFooter.displayName = "DialogFooter"
DialogTitle.displayName = DialogPrimitive.Title.displayName
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} 