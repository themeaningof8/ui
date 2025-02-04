/**
 * @file Toggle
 * @description オン/オフを切り替えることができるトグルスイッチ
 */
import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '@/lib/cn';

/**
 * @typedef ToggleProps
 * @property {string} [className] - カスタムクラス名
 * @property {string} [size='default'] - トグルのサイズ（'sm' | 'default' | 'lg'）
 */
interface ToggleProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}

/**
 * @description トグルスイッチコンポーネント
 * @param {ToggleProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} Toggleコンポーネント
 */
const Toggle = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, ToggleProps>(
  ({ className, size = 'default', ...props }, ref) => {
    const sizes = {
      sm: 'h-4 w-7',
      default: 'h-5 w-9',
      lg: 'h-6 w-11',
    };

    const thumbSizes = {
      sm: 'h-3 w-3',
      default: 'h-4 w-4',
      lg: 'h-5 w-5',
    };

    return (
      <SwitchPrimitives.Root
        className={cn(
          'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors bg-base-ui-bg',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-base-ui focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'data-[state=checked]:bg-accent-solid data-[state=unchecked]:bg-base-bg',
          sizes[size],
          className
        )}
        {...props}
        ref={ref}
      >
        <SwitchPrimitives.Thumb
          className={cn(
            'pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform',
            'data-[state=checked]:translate-x-full data-[state=unchecked]:translate-x-0',
            thumbSizes[size]
          )}
        />
      </SwitchPrimitives.Root>
    );
  }
);

Toggle.displayName = 'Toggle';

export { Toggle }; 