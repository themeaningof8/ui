import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * 複数行のテキスト入力を可能にするコンポーネントです。
 * モダンなスタイリングとアクセシビリティを備え、レスポンシブなデザインに対応しています。
 * 
 * @component
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} [props.className] - 追加のCSSクラス名
 * @param {string} [props.placeholder] - プレースホルダーテキスト
 * @param {boolean} [props.disabled] - 無効化状態
 * @param {React.Ref<HTMLTextAreaElement>} ref - 転送されるref
 * 
 * @example
 * ```tsx
 * <Textarea
 *   placeholder="Enter your message"
 *   className="min-h-[100px]"
 * />
 * ```
 */
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
