/**
 * @file コラプシブルコンポーネント
 * @description 開閉可能なコンテンツを表示するコンポーネント
 * @example
 * ```tsx
 * // 基本的な使用例
 * <Collapsible>
 *   <CollapsibleTrigger>開閉ボタン</CollapsibleTrigger>
 *   <CollapsibleContent>表示/非表示のコンテンツ</CollapsibleContent>
 * </Collapsible>
 * 
 * // デフォルトで開いた状態
 * <Collapsible defaultOpen>
 *   <CollapsibleTrigger>開閉ボタン</CollapsibleTrigger>
 *   <CollapsibleContent>表示/非表示のコンテンツ</CollapsibleContent>
 * </Collapsible>
 * 
 * // 無効化状態
 * <Collapsible disabled>
 *   <CollapsibleTrigger>開閉ボタン</CollapsibleTrigger>
 *   <CollapsibleContent>表示/非表示のコンテンツ</CollapsibleContent>
 * </Collapsible>
 * ```
 */

import * as React from 'react'
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { cn } from '@/lib/utils'

/**
 * コラプシブルコンポーネントのプロパティ
 * @typedef {Object} CollapsibleProps
 * @property {boolean} [defaultOpen] - デフォルトで開いた状態にするかどうか
 * @property {boolean} [disabled] - 無効化状態にするかどうか
 * @property {string} [className] - カスタムクラス名
 */
const Collapsible = CollapsiblePrimitive.Root

/**
 * コラプシブルのトリガーコンポーネントのプロパティ
 * @typedef {Object} CollapsibleTriggerProps
 * @property {boolean} [asChild] - 子要素をトリガーとして使用するかどうか
 * @property {string} [className] - カスタムクラス名
 */
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

/**
 * コラプシブルのコンテンツコンポーネントのプロパティ
 * @typedef {Object} CollapsibleContentProps
 * @property {React.ReactNode} children - 子要素
 * @property {string} [className] - カスタムクラス名
 */
const CollapsibleContent = React.forwardRef<
  React.ComponentRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleContent
    ref={ref}
    className={cn(
      'animate-collapsible-down data-[state=closed]:animate-collapsible-up',
      className
    )}
    {...props}
  >
    {children}
  </CollapsiblePrimitive.CollapsibleContent>
))
CollapsibleContent.displayName = 'CollapsibleContent'

export { Collapsible, CollapsibleTrigger, CollapsibleContent } 