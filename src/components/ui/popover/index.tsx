/**
 * @file Popover コンポーネント
 * @description クリックやホバーでコンテンツを表示するポップオーバーコンポーネント
 * 主な用途：
 * - 追加情報の表示
 * - 詳細設定の表示
 * - コンテキストメニュー
 */

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { tv } from 'tailwind-variants';
import { cn } from '@/lib/cn';

/**
 * @description Popover のバリエーションを定義
 */
const popover = tv({
  slots: {
    content: [
      'z-50 w-72 rounded-md border border-base-subtle bg-base-app p-4 text-base-high shadow-md outline-none',
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    ],
  },
});

/**
 * @description Popover のルートコンポーネント
 */
const Popover = PopoverPrimitive.Root;

/**
 * @description Popover のトリガーコンポーネント
 */
const PopoverTrigger = PopoverPrimitive.Trigger;

/**
 * @interface PopoverContentProps
 * @description Popover のコンテンツ部分のプロパティ
 */
export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  /**
   * @description コンテンツのクラス名
   */
  className?: string;
}

/**
 * @description Popover のコンテンツコンポーネント
 */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => {
  const styles = popover();
  
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(styles.content(), className)}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
});
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

/**
 * @description Popover のクローズボタンコンポーネント
 */
const PopoverClose = PopoverPrimitive.Close;

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
}; 