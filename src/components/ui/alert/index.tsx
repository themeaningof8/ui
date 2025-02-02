/**
 * @file Alert コンポーネント
 * @description ユーザーに対して重要な情報、警告、エラーなどを表示するためのコンポーネント
 * 主な用途：
 * - 情報通知（information）
 * - 警告表示（warning）
 * - エラー表示（error）
 * - 成功通知（success）
 */

import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/cn';

/**
 * @description Alert のバリエーションを定義
 */
const alert = tv({
  base: 'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-base-high',
  variants: {
    variant: {
      default: 'bg-base-app text-base-high border-base-subtle',
      destructive: 'border-destructive-subtle text-destructive-high [&>svg]:text-destructive-high bg-destructive-app',
      success: 'border-accent-subtle text-accent-high [&>svg]:text-accent-high bg-accent-app',
      warning: 'border-base-subtle text-base-high [&>svg]:text-base-high bg-base-app',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

/**
 * @interface AlertProps
 * @description Alert コンポーネントのプロパティ
 */
export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alert> {
  /**
   * @description Alert の種類を指定
   * @default 'default'
   */
  variant?: 'default' | 'destructive' | 'success' | 'warning';
}

/**
 * @description Alert のルートコンポーネント
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alert({ variant }), className)}
      {...props}
    />
  )
);
Alert.displayName = 'Alert';

/**
 * @description Alert のタイトルコンポーネント
 */
const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

/**
 * @description Alert の説明文コンポーネント
 */
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription }; 