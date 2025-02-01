/**
 * @file Checkbox コンポーネント
 * @description アクセシブルなチェックボックスコンポーネント
 * 
 * @example
 * ```tsx
 * <Checkbox id="terms" />
 * <label htmlFor="terms">利用規約に同意する</label>
 * ```
 */

import * as React from 'react';
import { tv } from 'tailwind-variants';
import { cn } from '@/lib/cn';
import { Check } from 'lucide-react';

/**
 * Checkbox のプロパティを定義
 */
export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'checked' | 'defaultChecked'> {
  /**
   * チェックボックスのサイズ
   * @default "default"
   */
  size?: 'sm' | 'default' | 'lg';
  /**
   * チェックボックスの状態（controlled モード）
   */
  checked?: boolean;
  /**
   * チェックボックスの初期状態（uncontrolled モード）
   */
  defaultChecked?: boolean;
  /**
   * 不確定な状態（一部選択）かどうか
   * @default false
   */
  indeterminate?: boolean;
  /**
   * 値が変更された時のコールバック
   */
  onCheckedChange?: (checked: boolean) => void;
}

const checkboxVariants = tv({
  base: [
    "peer shrink-0 rounded-sm border border-base-ui ring-offset-background",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-base-ui focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=checked]:bg-base-solid data-[state=checked]:text-base-on-solid",
    "data-[state=indeterminate]:bg-base-solid data-[state=indeterminate]:text-base-on-solid",
  ],
  variants: {
    size: {
      sm: "h-4 w-4",
      default: "h-5 w-5",
      lg: "h-6 w-6",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const iconVariants = tv({
  base: "absolute h-full w-full",
  variants: {
    size: {
      sm: "stroke-[3]",
      default: "stroke-2",
      lg: "stroke-2",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

/**
 * Checkbox コンポーネント
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    className, 
    size, 
    checked, 
    defaultChecked,
    indeterminate, 
    onCheckedChange, 
    onChange,
    ...props 
  }, ref) => {
    const [isChecked, setIsChecked] = React.useState(defaultChecked ?? false);
    const [isIndeterminate, setIsIndeterminate] = React.useState(indeterminate ?? false);

    React.useEffect(() => {
      if (indeterminate !== undefined) {
        setIsIndeterminate(indeterminate);
      }
    }, [indeterminate]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked;
      
      // 非制御モードの場合、内部状態を更新
      if (checked === undefined) {
        setIsChecked(newChecked);
      }

      // コールバックを呼び出す
      onCheckedChange?.(newChecked);
      onChange?.(event);
    };

    const isControlled = checked !== undefined;
    const currentChecked = isControlled ? checked : isChecked;

    return (
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          ref={ref}
          checked={currentChecked}
          className={cn(
            checkboxVariants({ size }),
            className
          )}
          onChange={handleChange}
          aria-checked={isIndeterminate ? "mixed" : currentChecked}
          data-state={isIndeterminate ? "indeterminate" : currentChecked ? "checked" : "unchecked"}
          {...props}
        />
        {(currentChecked || isIndeterminate) && (
          <div
            className={cn(
              "pointer-events-none absolute inset-0 flex items-center justify-center",
              isIndeterminate ? "opacity-50" : "opacity-100"
            )}
          >
            <Check className={cn(iconVariants({ size }))} />
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox"; 