/**
 * アコーディオン
 * @module Accordion
 * @description RadixのAccordionをベースにしたアコーディオンコンポーネント
 */

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'
import { tv } from 'tailwind-variants'

const accordionTriggerVariants = tv({
  base: [
    'flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all',
    'text-base-low',
    '[&[data-state=open]>svg]:rotate-180',
    'data-[state=open]:text-base-high',
    'rounded-md px-2',
    'h-12',
    'min-h-12',
    'min-w-12',
    'w-full',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-accent-solid',
    'focus-visible:ring-offset-2',
  ],
})

const accordionContentVariants = tv({
  base: [
    'overflow-hidden text-sm transition-all',
    'text-base-low',
    'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
    'data-[state=closed]:duration-200 data-[state=open]:duration-200',
  ],
})

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b border-base-subtle', className)}
    {...props}
  />
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, disabled, ...props }, ref) => {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  
  React.useEffect(() => {
    if (triggerRef.current) {
      console.log('Actual trigger dimensions:', {
        offsetWidth: triggerRef.current.offsetWidth,
        offsetHeight: triggerRef.current.offsetHeight
      });
    }
  }, []);

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        disabled={disabled}
        className={cn(
          accordionTriggerVariants(),
          disabled && "pointer-events-none opacity-50",
          "min-h-[48px] min-w-[48px] h-12",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
})
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(accordionContentVariants(), className)}
    data-testid="accordion-content"
    {...props}
  >
    <div className="pb-4 pt-0 px-2 text-base-high">{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } 