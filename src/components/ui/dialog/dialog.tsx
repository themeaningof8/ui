/**
 * ダイアログコンポーネント
 * @module Dialog
 * @description アクセシブルなモーダルダイアログコンポーネント
 */

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/lib/cn'
import { tv } from 'tailwind-variants'

const dialogOverlayVariants = tv({
  base: [
    'fixed inset-0 z-50',
    'bg-overlay',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  ],
})

const dialogContentVariants = tv({
  base: [
    'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]',
    'gap-4 border p-6 shadow-lg duration-200',
    'bg-base-app border-base-subtle',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
    'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
    'sm:rounded-lg',
  ],
})

const dialogHeaderVariants = tv({
  base: 'flex flex-col space-y-1.5 text-center sm:text-left',
})

const dialogFooterVariants = tv({
  base: 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
})

const dialogTitleVariants = tv({
  base: 'text-lg font-semibold leading-none tracking-tight text-base-high',
})

const dialogDescriptionVariants = tv({
  base: 'text-sm text-base-low',
})

/**
 * ダイアログのルートコンポーネント
 * @type {React.FC<DialogPrimitive.DialogProps>}
 */
const Dialog = DialogPrimitive.Root

/**
 * ダイアログのトリガーコンポーネント
 * @type {React.FC<DialogPrimitive.DialogTriggerProps>}
 */
const DialogTrigger = DialogPrimitive.Trigger

/**
 * ダイアログのポータルコンポーネント
 * @type {React.FC<DialogPrimitive.DialogPortalProps>}
 */
const DialogPortal = DialogPrimitive.Portal

/**
 * ダイアログのオーバーレイコンポーネント
 * @type {React.ForwardRefExoticComponent<DialogPrimitive.DialogOverlayProps>}
 */
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(dialogOverlayVariants(), className)}
    data-testid="overlay"
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

/**
 * ダイアログのコンテンツコンポーネント
 * @type {React.ForwardRefExoticComponent<DialogPrimitive.DialogContentProps>}
 */
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(dialogContentVariants(), className)}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

/**
 * ダイアログのヘッダーコンポーネント
 * @type {React.FC<React.HTMLAttributes<HTMLDivElement>>}
 */
const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(dialogHeaderVariants(), className)} {...props} />
)
DialogHeader.displayName = 'DialogHeader'

/**
 * ダイアログのフッターコンポーネント
 * @type {React.FC<React.HTMLAttributes<HTMLDivElement>>}
 */
const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(dialogFooterVariants(), className)} {...props} />
)
DialogFooter.displayName = 'DialogFooter'

/**
 * ダイアログのタイトルコンポーネント
 * @type {React.ForwardRefExoticComponent<DialogPrimitive.DialogTitleProps>}
 */
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(dialogTitleVariants(), className)}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

/**
 * ダイアログの説明コンポーネント
 * @type {React.ForwardRefExoticComponent<DialogPrimitive.DialogDescriptionProps>}
 */
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(dialogDescriptionVariants(), className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} 