/**
 * タブコンポーネント
 * @module Tabs
 * @description アクセシブルなタブインターフェースコンポーネント
 */

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/cn'
import { tv } from 'tailwind-variants'

const tabsListVariants = tv({
  base: [
    'inline-flex h-9 items-center justify-center rounded-lg p-1',
    'bg-base-ui text-base-low',
  ],
})

const tabsTriggerVariants = tv({
  base: [
    'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1',
    'text-sm font-medium ring-offset-background transition-all',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ui focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'data-[state=active]:bg-base-app data-[state=active]:text-base-high data-[state=active]:shadow',
    'hover:bg-base-hover hover:text-base-high',
  ],
})

const tabsContentVariants = tv({
  base: [
    'mt-2 ring-offset-background',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ui focus-visible:ring-offset-2',
  ],
})

/**
 * タブのルートコンポーネント
 * @type {React.ForwardRefExoticComponent<TabsPrimitive.TabsProps>}
 */
const Tabs = TabsPrimitive.Root

/**
 * タブリストコンポーネント
 * @type {React.ForwardRefExoticComponent<TabsPrimitive.TabsListProps>}
 */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants(), className)}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

/**
 * タブトリガーコンポーネント
 * @type {React.ForwardRefExoticComponent<TabsPrimitive.TabsTriggerProps>}
 */
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants(), className)}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

/**
 * タブコンテンツコンポーネント
 * @type {React.ForwardRefExoticComponent<TabsPrimitive.TabsContentProps>}
 */
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(tabsContentVariants(), className)}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent } 