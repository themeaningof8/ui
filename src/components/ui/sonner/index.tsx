/**
 * Sonnerコンポーネント
 * @module Sonner
 * @description Sonnerトースト通知コンポーネント
 */

"use client"

import { Toaster as Sonner } from 'sonner'
import { tv } from 'tailwind-variants'

const toastStyles = tv({
  base: [
    'data-[type=success]:bg-accent-app data-[type=success]:text-accent-high',
    'data-[type=error]:bg-destructive-app data-[type=error]:text-destructive-high',
    'data-[type=warning]:bg-base-app data-[type=warning]:text-base-high',
    'group border-base-subtle bg-base-app text-base-high',
    'data-[type=success]:border-accent-subtle',
    'data-[type=error]:border-destructive-subtle',
    'data-[type=warning]:border-base-subtle',
  ],
})

export function Toaster() {
  return (
    <Sonner
      className={toastStyles()}
      toastOptions={{
        classNames: {
          toast: [
            'group rounded-md border p-4 shadow-lg',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[swipe=end]:animate-out data-[state=closed]:fade-out-80',
            'slide-in-from-top-full data-[state=open]:slide-in-from-bottom-full',
          ].join(' '),
          title: 'text-sm font-semibold [&+div]:text-xs',
          description: 'text-sm opacity-90',
          actionButton: [
            'group-data-[type=success]:bg-accent-ui',
            'group-data-[type=error]:bg-destructive-ui',
            'group-data-[type=warning]:bg-base-ui',
          ].join(' '),
          cancelButton: [
            'group-data-[type=success]:bg-accent-ui',
            'group-data-[type=error]:bg-destructive-ui',
            'group-data-[type=warning]:bg-base-ui',
          ].join(' '),
        },
      }}
    />
  )
}

export { toast } from 'sonner'
