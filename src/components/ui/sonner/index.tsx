"use client"

/**
 * @file トースト通知コンポーネント
 * @description Sonnerライブラリを使用して、美しいトースト通知を提供するコンポーネント
 * 
 * @example
 * ```tsx
 * // 基本的な使用例
 * <Toaster />
 * 
 * // トースト通知の表示
 * toast("メッセージを表示")
 * toast.success("成功メッセージ")
 * toast.error("エラーメッセージ")
 * 
 * // カスタマイズされたトースト
 * toast("カスタムトースト", {
 *   description: "詳細な説明文",
 *   action: {
 *     label: "元に戻す",
 *     onClick: () => console.log("アクション実行")
 *   }
 * })
 * ```
 */

import { Toaster as Sonner } from "sonner"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

/**
 * トースト通知を表示するためのコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.theme - トーストのテーマ（"light" | "dark" | "system"）
 * @param props.children - 子要素
 */
function Toaster({ className, ...props }: ComponentProps<typeof Sonner>) {
  return (
    <Sonner
      data-slot="toaster"
      theme="system"
      className={cn("toaster group", className)}
      toastOptions={{
        classNames: {
          toast: cn(
            "group toast group-[.toaster]:border-step-7",
            "group-[.toaster]:bg-step-2 group-[.toaster]:text-step-12",
            "group-[.toaster]:shadow-lg group-[.toaster]:shadow-step-7/10"
          ),
          description: "group-[.toast]:text-step-11",
          actionButton: cn(
            "group-[.toast]:bg-step-9",
            "group-[.toast]:text-step-1",
            "group-[.toast]:hover:bg-step-10"
          ),
          cancelButton: cn(
            "group-[.toast]:bg-step-3",
            "group-[.toast]:text-step-11",
            "group-[.toast]:hover:bg-step-4",
            "group-[.toast]:hover:text-step-12"
          ),
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
