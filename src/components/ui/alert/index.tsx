/**
 * @file アラートコンポーネント
 * @description ユーザーに重要な情報を通知するためのアラートコンポーネントです
 * 
 * @example
 * ```tsx
 * // デフォルトのアラート
 * <Alert>
 *   <AlertTitle>注意</AlertTitle>
 *   <AlertDescription>この操作は取り消せません。</AlertDescription>
 * </Alert>
 * 
 * // デストラクティブなアラート
 * <Alert variant="destructive">
 *   <AlertTitle>エラー</AlertTitle>
 *   <AlertDescription>処理中にエラーが発生しました。</AlertDescription>
 * </Alert>
 * ```
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * アラートのスタイルバリエーションを定義
 */
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:size-5 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-step-6 bg-step-2 text-step-12 [&>svg]:text-step-11",
        destructive:
          "border-destructive-step-6 bg-destructive-step-2 text-destructive-step-12 [&>svg]:text-destructive-step-11",
        success:
          "border-lime-500 bg-lime-200 text-lime-800 [&>svg]:text-accent-step-11",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * アラートコンポーネントのプロパティ
 * @typedef AlertProps
 * @property {string} [className] - 追加のCSSクラス名
 * @property {string} [variant] - アラートのスタイルバリアント
 */
const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

/**
 * アラートのタイトルコンポーネント
 */
const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "mb-1 font-medium leading-none tracking-tight",
      "text-step-12 data-[variant=destructive]:text-destructive-step-11 data-[variant=success]:text-lime-800",
      className
    )}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

/**
 * アラートの説明コンポーネント
 */
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-sm [&_p]:leading-relaxed",
      "text-step-11 data-[variant=destructive]:text-destructive-step-11 data-[variant=success]:text-lime-800",
      className
    )}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
