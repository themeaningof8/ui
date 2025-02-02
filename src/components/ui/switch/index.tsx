/**
 * @file Switch コンポーネント
 * @description トグルスイッチとして機能するコンポーネント。アクセシビリティに配慮し、キーボード操作にも対応。
 * 
 * @example
 * ```tsx
 * <Switch
 *   checked={isEnabled}
 *   onCheckedChange={setIsEnabled}
 *   aria-label="通知を有効にする"
 * />
 * ```
 */

import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'
import { tv } from 'tailwind-variants'

/**
 * @interface SwitchProps
 * @description Switchコンポーネントのプロパティ
 * @extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
 */
interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  /**
   * @property {string} [className] - カスタムクラス名
   */
  className?: string
}

const switchVariants = tv({
  base: [
    'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent',
    'transition-colors focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-base-ui focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:bg-accent-solid data-[state=unchecked]:bg-base-ui-bg',
  ],
})

const thumbVariants = tv({
  base: [
    'pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0',
    'transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
  ],
})

/**
 * @component Switch
 * @description トグルスイッチコンポーネント
 * @param {SwitchProps} props - コンポーネントのプロパティ
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={switchVariants({ className })}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb className={thumbVariants()} />
  </SwitchPrimitives.Root>
))

Switch.displayName = 'Switch'

export { Switch } 