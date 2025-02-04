/**
 * @file RadioGroup
 * @description アクセシブルなラジオグループコンポーネント
 * 
 * @example
 * ```tsx
 * <RadioGroup defaultValue="option1">
 *   <div className="flex items-center space-x-2">
 *     <RadioGroupItem value="option1" id="option1" />
 *     <RadioGroupItemText htmlFor="option1">オプション1</RadioGroupItemText>
 *   </div>
 *   <div className="flex items-center space-x-2">
 *     <RadioGroupItem value="option2" id="option2" />
 *     <RadioGroupItemText htmlFor="option2">オプション2</RadioGroupItemText>
 *   </div>
 * </RadioGroup>
 * ```
 */

import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Circle } from 'lucide-react'
import { cn } from '@/lib/cn'
import { tv } from 'tailwind-variants'

/**
 * @description RadioGroupのスタイルバリアント
 */
const radioGroupVariants = tv({
  base: 'grid gap-2',
})

/**
 * @description RadioGroupItemのスタイルバリアント
 */
const radioGroupItemVariants = tv({
  base: [
    'aspect-square h-4 w-4 rounded-full border border-base-ui text-base-high',
    'ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-base-ui focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
})

/**
 * @description RadioGroupItemTextのスタイルバリアント
 */
const radioGroupItemTextVariants = tv({
  base: [
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    'text-base-high',
  ],
})

/**
 * @description RadioGroupのルートコンポーネント
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn(radioGroupVariants(), className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

/**
 * @description RadioGroupのアイテムコンポーネント
 */
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(radioGroupItemVariants(), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

/**
 * @description RadioGroupのテキストコンポーネント
 */
const RadioGroupItemText = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & {
    /**
     * @description 関連付けるラジオボタンのID
     */
    htmlFor: string
  }
>(({ className, htmlFor, ...props }, ref) => {
  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={cn(radioGroupItemTextVariants(), className)}
      {...props}
    />
  )
})
RadioGroupItemText.displayName = 'RadioGroupItemText'

export { RadioGroup, RadioGroupItem, RadioGroupItemText } 