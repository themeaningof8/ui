/**
 * @file Textarea
 * @description アクセシブルな複数行テキスト入力コンポーネント
 * 
 * @example
 * ```tsx
 * <Textarea
 *   placeholder="メッセージを入力"
 *   value={message}
 *   onChange={(e) => setMessage(e.target.value)}
 * />
 * ```
 */

import * as React from 'react';
import { cn } from '@/lib/cn';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * エラー状態を示すフラグ
   */
  error?: boolean;
}

/**
 * 複数行のテキスト入力を提供するTextareaコンポーネント
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-base-ui bg-base-app px-3 py-2 text-sm",
          "ring-offset-background placeholder:text-base-low",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-base-ui focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-error focus-visible:ring-error",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea }; 