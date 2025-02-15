"use client"

import * as React from "react"
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
 * シート全体のコンテナとして機能します。
 */
const Sheet = SheetPrimitive.Root

/**
 * シートのトリガーコンポーネントです。
 * クリックした時にシートを表示する要素として機能します。
 */
const SheetTrigger = SheetPrimitive.Trigger

/**
 * シートのクローズボタンコンポーネントです。
 * シートを閉じるボタンとして機能します。
 */
const SheetClose = SheetPrimitive.Close

/**
 * シートのポータルコンポーネントです。
 * シートをDOMツリーの特定の場所にレンダリングします。
 */
const SheetPortal = SheetPrimitive.Portal

/**
 * シートのオーバーレイコンポーネントです。
 * シートの背景として機能し、クリックするとシートを閉じます。
 * 
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {React.ReactNode} props.children - 子要素
 * @param {React.Ref<HTMLDivElement>} ref - 転送されるref
 */
const SheetOverlay = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-step-1/80",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    data-testid="sheet-overlay"
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

/**
 * シートのコンテンツコンポーネントです。
 * シートの内容を含むコンテナとして機能します。
 * 
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.side="right"] - シートが表示される方向
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {React.ReactNode} props.children - 子要素
 * @param {React.Ref<HTMLDivElement>} ref - 転送されるref
 */
interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close
        className={cn(
          "absolute right-4 top-4 rounded-sm",
          "opacity-70 transition-opacity hover:opacity-100",
          "text-step-11 hover:text-step-12",
          "focus:outline-none focus:ring-2 focus:ring-step-7 focus:ring-offset-2",
          "disabled:pointer-events-none",
          "data-[state=open]:bg-step-4"
        )}
      >
        <X className="size-4" />
        <span className="sr-only">閉じる</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

/**
 * シートのヘッダーコンポーネントです。
 * シートのヘッダー部分として機能します。
 * 
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {React.ReactNode} props.children - 子要素
 */
const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

/**
 * シートのフッターコンポーネントです。
 * シートのフッター部分として機能します。
 * 
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {React.ReactNode} props.children - 子要素
 */
const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

/**
 * シートのタイトルコンポーネントです。
 * シートのタイトルとして機能します。
 * 
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {React.ReactNode} props.children - 子要素
 * @param {React.Ref<HTMLHeadingElement>} ref - 転送されるref
 */
const SheetTitle = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      "text-step-12",
      className
    )}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

/**
 * シートの説明コンポーネントです。
 * シートの説明文として機能します。
 * 
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {React.ReactNode} props.children - 子要素
 * @param {React.Ref<HTMLParagraphElement>} ref - 転送されるref
 */
const SheetDescription = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-step-11", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

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
