"use client"

import { Toaster as Sonner } from "sonner"

/**
 * @description トースト通知コンポーネント
 */

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-base-app-bg group-[.toaster]:text-base-high-contrast-text group-[.toaster]:border-base-ui-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-base-low-contrast-text",
          actionButton:
            "group-[.toast]:bg-base-solid group-[.toast]:text-base-on-solid",
          cancelButton:
            "group-[.toast]:bg-base-ui-bg group-[.toast]:text-base-high-contrast-text",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
