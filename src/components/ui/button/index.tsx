/**
 * @file Button
 * @description shadcn/ui 準拠のボタンコンポーネント。Next.js や React Router での利用を想定し、asChild によるリンクラップをサポートします。
 *
 * @remarks
 *   - variant プロパティにより、ボタンの種類（例：primary, secondary など）を切り替えます。
 *   - size プロパティにより、ボタンのサイズ（例：small, medium, large）を指定できます。
 *   - Tailwind CSS v4 および color-scales.css のカラーパレットに基づいたスタイリングが適用されます。
 *   - クラスの結合には tailwind-merge の twMerge を使用しています。
 *
 * @param props - ボタンの各種プロパティ（クリックイベント、クラス名、variant、size など）
 */

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { tv } from 'tailwind-variants';
import { cn } from '@/lib/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * ボタンのスタイルバリエーション
   */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  /**
   * ボタンのサイズ
   */
  size?: 'default' | 'sm' | 'lg' | 'icon';
  /**
   * 子要素をラップするためのフラグ
   */
  asChild?: boolean;
}

export const buttonVariants = tv({
  base: [
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-base-ui focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50"
  ],
  variants: {
    variant: {
      default: [
        "bg-base-solid text-base-on-solid hover:bg-base-solid-hover",
        "shadow hover:shadow-md"
      ],
      destructive: [
        "bg-destructive-solid text-destructive-on-solid hover:bg-destructive-solid-hover",
        "shadow-sm"
      ],
      outline: [
        "border border-base-ui bg-transparent hover:bg-base-hover text-base-high",
        "shadow-sm"
      ],
      secondary: [
        "bg-base-ui text-base-high hover:bg-base-hover",
        "shadow-sm"
      ],
      ghost: "hover:bg-base-hover text-base-high",
      link: "text-base-high underline-offset-4 hover:underline",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

/**
 * Button コンポーネント
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled}
        aria-disabled={disabled}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";