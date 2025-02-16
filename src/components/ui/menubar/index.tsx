"use client"

import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"
import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

/**
 * @file メニューバーコンポーネント
 * @description アプリケーションのメニューバーを提供するコンポーネントです
 * 
 * @example
 * ```tsx
 * // 基本的な使用例
 * <Menubar>
 *   <MenubarMenu>
 *     <MenubarTrigger>ファイル</MenubarTrigger>
 *     <MenubarContent>
 *       <MenubarItem>新規作成</MenubarItem>
 *       <MenubarItem>開く</MenubarItem>
 *       <MenubarSeparator />
 *       <MenubarItem>保存</MenubarItem>
 *     </MenubarContent>
 *   </MenubarMenu>
 * </Menubar>
 * 
 * // サブメニューを含む例
 * <Menubar>
 *   <MenubarMenu>
 *     <MenubarTrigger>編集</MenubarTrigger>
 *     <MenubarContent>
 *       <MenubarSub>
 *         <MenubarSubTrigger>詳細設定</MenubarSubTrigger>
 *         <MenubarSubContent>
 *           <MenubarItem>オプション1</MenubarItem>
 *           <MenubarItem>オプション2</MenubarItem>
 *         </MenubarSubContent>
 *       </MenubarSub>
 *       <MenubarSeparator />
 *       <MenubarItem>元に戻す</MenubarItem>
 *       <MenubarItem>やり直す</MenubarItem>
 *     </MenubarContent>
 *   </MenubarMenu>
 * </Menubar>
 * ```
 */

/**
 * メニューバーのメニューコンポーネント
 */
function MenubarMenu({
  ...props
}: ComponentPropsWithoutRef<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
}

/**
 * メニューバーのグループコンポーネント
 */
function MenubarGroup({
  ...props
}: ComponentPropsWithoutRef<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
}

/**
 * メニューバーのポータルコンポーネント
 */
function MenubarPortal({
  ...props
}: ComponentPropsWithoutRef<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
}

/**
 * メニューバーのラジオグループコンポーネント
 */
function MenubarRadioGroup({
  ...props
}: ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioGroup>) {
  return <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
}

/**
 * メニューバーのサブメニューコンポーネント
 */
function MenubarSub({
  ...props
}: ComponentPropsWithoutRef<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

/**
 * メニューバーのルートコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function Menubar({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>) {
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      className={cn(
        "flex h-10 items-center space-x-1 rounded-md",
        "border border-step-7 bg-step-2",
        "focus-visible:border-step-8",
        className
      )}
      {...props}
    />
  )
}

/**
 * メニューバーのトリガーコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function MenubarTrigger({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-3 py-1.5",
        "text-sm font-medium text-step-11",
        "outline-none border border-transparent",
        "focus:bg-step-4 focus:text-step-12",
        "focus-visible:ring-2 focus-visible:ring-step-6",
        "data-[state=open]:bg-step-4 data-[state=open]:text-step-12",
        className
      )}
      {...props}
    />
  )
}

/**
 * メニューバーのサブメニュートリガーコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.inset - インデントを適用するかどうか
 */
function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5",
        "text-sm text-step-11",
        "outline-none border border-transparent",
        "focus:bg-step-4 focus:text-step-12",
        "focus-visible:ring-2 focus-visible:ring-step-6 focus-visible:border-step-8",
        "data-[state=open]:bg-step-4 data-[state=open]:text-step-12",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto size-4" />
    </MenubarPrimitive.SubTrigger>
  )
}

/**
 * メニューバーのサブメニューコンテンツコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function MenubarSubContent({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md",
        "border border-step-7 bg-step-2 p-1 text-step-11",
        "shadow-md shadow-step-7/10",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * メニューバーのコンテンツコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.align - 水平方向の配置
 * @param props.alignOffset - 配置のオフセット
 * @param props.sideOffset - サイドのオフセット
 */
function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden rounded-md",
          "border border-step-7 bg-step-2 p-1 text-step-11",
          "shadow-md shadow-step-7/10",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
}

/**
 * メニューバーの項目コンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.inset - インデントを適用するかどうか
 */
function MenubarItem({
  className,
  inset,
  ...props
}: ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5",
        "text-sm text-step-11",
        "outline-none border border-transparent",
        "focus:bg-step-4 focus:text-step-12",
        "focus-visible:ring-2 focus-visible:ring-step-6 focus-visible:border-step-8",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
}

/**
 * メニューバーのチェックボックス項目コンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.checked - チェック状態
 */
function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}: ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>) {
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2",
        "text-sm text-step-11",
        "outline-none",
        "focus:bg-step-4 focus:text-step-12",
        "focus-visible:ring-2 focus-visible:ring-step-6 focus-visible:ring-offset-2",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Check className="size-4 text-step-12" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

/**
 * メニューバーのラジオ項目コンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function MenubarRadioItem({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>) {
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2",
        "text-sm text-step-11",
        "outline-none",
        "focus:bg-step-4 focus:text-step-12",
        "focus-visible:ring-2 focus-visible:ring-step-6 focus-visible:ring-offset-2",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Circle className="size-2 fill-step-11 text-step-12" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

/**
 * メニューバーのラベルコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.inset - インデントを適用するかどうか
 */
function MenubarLabel({
  className,
  inset,
  ...props
}: ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      className={cn(
        "px-2 py-1.5 text-sm font-semibold text-step-12",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
}

/**
 * メニューバーの区切り線コンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function MenubarSeparator({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn("-mx-1 my-1 h-px bg-step-6", className)}
      {...props}
    />
  )
}

/**
 * メニューバーのショートカットコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function MenubarShortcut({
  className,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-step-11",
        className
      )}
      {...props}
    />
  )
}

// displayName の設定
Menubar.displayName = MenubarPrimitive.Root.displayName
MenubarMenu.displayName = MenubarPrimitive.Menu.displayName
MenubarGroup.displayName = MenubarPrimitive.Group.displayName
MenubarPortal.displayName = MenubarPrimitive.Portal.displayName
MenubarSub.displayName = MenubarPrimitive.Sub.displayName
MenubarRadioGroup.displayName = MenubarPrimitive.RadioGroup.displayName
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName
MenubarContent.displayName = MenubarPrimitive.Content.displayName
MenubarItem.displayName = MenubarPrimitive.Item.displayName
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName
MenubarLabel.displayName = MenubarPrimitive.Label.displayName
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName
MenubarShortcut.displayName = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
