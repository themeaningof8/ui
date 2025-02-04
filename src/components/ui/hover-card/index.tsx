/**
 * @file HoverCard コンポーネント
 * @description ホバー時に追加情報を表示するカードコンポーネント。アクセシビリティに配慮し、キーボード操作にも対応。
 * 
 * @example
 * ```tsx
 * <HoverCard>
 *   <HoverCardTrigger>ユーザー名</HoverCardTrigger>
 *   <HoverCardContent>
 *     <div>
 *       <h4>ユーザープロフィール</h4>
 *       <p>詳細情報がここに表示されます</p>
 *     </div>
 *   </HoverCardContent>
 * </HoverCard>
 * ```
 */

import * as React from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import { tv } from 'tailwind-variants'

/**
 * @description HoverCardのルートコンポーネント
 */
const HoverCard = HoverCardPrimitive.Root

/**
 * @description HoverCardのトリガーコンポーネント
 */
const HoverCardTrigger = HoverCardPrimitive.Trigger

const hoverCardContentVariants = tv({
  base: [
    'z-50 w-64 rounded-md border border-base-ui',
    'bg-base-surface p-4 text-base-fg shadow-md outline-none',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[side=bottom]:slide-in-from-top-2',
    'data-[side=left]:slide-in-from-right-2',
    'data-[side=right]:slide-in-from-left-2',
    'data-[side=top]:slide-in-from-bottom-2',
  ],
})

/**
 * @interface HoverCardContentProps
 * @description HoverCardのコンテンツコンポーネントのプロパティ
 */
interface HoverCardContentProps
  extends React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> {
  /**
   * @property {string} [className] - カスタムクラス名
   */
  className?: string
  /**
   * @property {React.ReactNode} [align] - 水平方向の配置
   */
  align?: 'start' | 'center' | 'end'
  /**
   * @property {React.ReactNode} [sideOffset] - サイドオフセット
   */
  sideOffset?: number
}

/**
 * @component HoverCardContent
 * @description HoverCardのコンテンツコンポーネント
 */
const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  HoverCardContentProps
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Portal>
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={hoverCardContentVariants({ className })}
      role="tooltip"
      {...props}
    />
  </HoverCardPrimitive.Portal>
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent } 