"use client"

import { Toaster as Sonner } from "sonner"
import { cn } from "@/lib/utils"

/**
 * トースト通知を表示するためのコンポーネントです。
 * Sonnerライブラリを使用して、美しいトースト通知を提供します。
 * 
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {string} [props.theme] - トーストのテーマ（"light" | "dark" | "system"）
 * @param {React.ReactNode} props.children - 子要素
 * 
 * @example
 * ```tsx
 * <Toaster />
 * // 使用例
 * toast("メッセージを表示")
 * toast.success("成功メッセージ")
 * toast.error("エラーメッセージ")
 * ```
 */
export function Toaster({ className, ...props }: React.ComponentProps<typeof Sonner>) {
  return (
    <Sonner
      theme="system"
      className={cn("toaster group", className)}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}
