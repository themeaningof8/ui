/**
 * @file DropdownMenu
 * @description アクセシブルなドロップダウンメニューコンポーネント。キーボード操作とスクリーンリーダーに対応。
 * 
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger>メニューを開く</DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>プロフィール</DropdownMenuItem>
 *     <DropdownMenuItem>設定</DropdownMenuItem>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem>ログアウト</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { tv } from 'tailwind-variants'

/**
 * @description ドロップダウンメニューのルートコンポーネント
 */
const DropdownMenu = DropdownMenuPrimitive.Root

/**
 * @description ドロップダウンメニューのトリガーコンポーネント
 */
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

/**
 * @description ドロップダウンメニューのグループコンポーネント
 */
const DropdownMenuGroup = DropdownMenuPrimitive.Group

/**
 * @description ドロップダウンメニューのポータルコンポーネント
 */
const DropdownMenuPortal = DropdownMenuPrimitive.Portal

/**
 * @description ドロップダウンメニューのサブメニューコンポーネント
 */
const DropdownMenuSub = DropdownMenuPrimitive.Sub

/**
 * @description ドロップダウンメニューのラジオグループコンポーネント
 */
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const dropdownMenuContentVariants = tv({
  base: [
    'z-50 min-w-[8rem] overflow-hidden rounded-md border border-base-ui',
    'bg-base-surface p-1 text-base-fg shadow-md',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[side=bottom]:slide-in-from-top-2',
    'data-[side=left]:slide-in-from-right-2',
    'data-[side=right]:slide-in-from-left-2',
    'data-[side=top]:slide-in-from-bottom-2',
  ],
})

const dropdownMenuSubContentVariants = tv({
  base: [
    'z-50 min-w-[8rem] overflow-hidden rounded-md border border-base-ui',
    'bg-base-surface p-1 text-base-fg shadow-md',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[side=bottom]:slide-in-from-top-2',
    'data-[side=left]:slide-in-from-right-2',
    'data-[side=right]:slide-in-from-left-2',
    'data-[side=top]:slide-in-from-bottom-2',
  ],
})

const dropdownMenuItemVariants = tv({
  base: [
    'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
    'transition-colors focus:bg-base-ui-hover focus:text-base-fg',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  ],
})

const dropdownMenuLabelVariants = tv({
  base: 'px-2 py-1.5 text-sm font-semibold text-base-fg',
})

const dropdownMenuSeparatorVariants = tv({
  base: '-mx-1 my-1 h-px bg-base-ui',
})

const dropdownMenuShortcutVariants = tv({
  base: 'ml-auto text-xs tracking-widest text-base-fg opacity-60',
})

/**
 * @interface DropdownMenuContentProps
 * @description ドロップダウンメニューのコンテンツコンポーネントのプロパティ
 */
interface DropdownMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> {
  /**
   * @property {string} [className] - カスタムクラス名
   */
  className?: string
  /**
   * @property {React.ReactNode} [sideOffset] - サイドオフセット
   */
  sideOffset?: number
}

/**
 * @component DropdownMenuContent
 * @description ドロップダウンメニューのコンテンツコンポーネント
 */
const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={dropdownMenuContentVariants({ className })}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

/**
 * @interface DropdownMenuSubContentProps
 * @description ドロップダウンメニューのサブコンテンツコンポーネントのプロパティ
 */
interface DropdownMenuSubContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent> {
  /**
   * @property {string} [className] - カスタムクラス名
   */
  className?: string
}

/**
 * @component DropdownMenuSubContent
 * @description ドロップダウンメニューのサブコンテンツコンポーネント
 */
const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  DropdownMenuSubContentProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={dropdownMenuSubContentVariants({ className })}
    {...props}
  />
))
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName

/**
 * @interface DropdownMenuItemProps
 * @description ドロップダウンメニューのアイテムコンポーネントのプロパティ
 */
interface DropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  /**
   * @property {string} [className] - カスタムクラス名
   */
  className?: string
  /**
   * @property {boolean} [inset] - インセットの有無
   */
  inset?: boolean
  /**
   * @property {boolean} [disabled] - 無効化の有無
   */
  disabled?: boolean
  /**
   * @property {React.MouseEventHandler<HTMLDivElement>} [onClick] - クリックイベントのハンドラー
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

/**
 * @component DropdownMenuItem
 * @description ドロップダウンメニューのアイテムコンポーネント
 */
const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ className, inset, disabled, onClick, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={dropdownMenuItemVariants({ className })}
    onClick={disabled ? undefined : onClick}
    disabled={disabled}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

/**
 * @interface DropdownMenuLabelProps
 * @description ドロップダウンメニューのラベルコンポーネントのプロパティ
 */
interface DropdownMenuLabelProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> {
  /**
   * @property {string} [className] - カスタムクラス名
   */
  className?: string
  /**
   * @property {boolean} [inset] - インセットの有無
   */
  inset?: boolean
}

/**
 * @component DropdownMenuLabel
 * @description ドロップダウンメニューのラベルコンポーネント
 */
const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  DropdownMenuLabelProps
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={dropdownMenuLabelVariants({ className })}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

/**
 * @interface DropdownMenuSeparatorProps
 * @description ドロップダウンメニューのセパレータコンポーネントのプロパティ
 */
interface DropdownMenuSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> {
  /**
   * @property {string} [className] - カスタムクラス名
   */
  className?: string
}

/**
 * @component DropdownMenuSeparator
 * @description ドロップダウンメニューのセパレータコンポーネント
 */
const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={dropdownMenuSeparatorVariants({ className })}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

/**
 * @interface DropdownMenuShortcutProps
 * @description ドロップダウンメニューのショートカットコンポーネントのプロパティ
 */
interface DropdownMenuShortcutProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * @property {string} [className] - カスタムクラス名
   */
  className?: string
}

/**
 * @component DropdownMenuShortcut
 * @description ドロップダウンメニューのショートカットコンポーネント
 */
const DropdownMenuShortcut = ({
  className,
  ...props
}: DropdownMenuShortcutProps) => {
  return (
    <span className={dropdownMenuShortcutVariants({ className })} {...props} />
  )
}
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

/**
 * @interface DropdownMenuSubTriggerProps
 * @description ドロップダウンメニューのサブトリガーコンポーネントのプロパティ
 */
interface DropdownMenuSubTriggerProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> {
  /**
   * @property {string} [className] - カスタムクラス名
   */
  className?: string
  /**
   * @property {boolean} [inset] - インセットの有無
   */
  inset?: boolean
  /**
   * @property {boolean} [disabled] - 無効化の有無
   */
  disabled?: boolean
}

/**
 * @component DropdownMenuSubTrigger
 * @description ドロップダウンメニューのサブトリガーコンポーネント
 */
const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  DropdownMenuSubTriggerProps
>(({ className, inset, disabled, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={dropdownMenuItemVariants({ className })}
    disabled={disabled}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} 