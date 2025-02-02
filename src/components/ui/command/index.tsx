/**
 * @file Command コンポーネント
 * @description コマンドパレットコンポーネント。キーボードショートカットと検索機能を提供します。
 * 
 * @example
 * ```tsx
 * <Command>
 *   <CommandInput placeholder="コマンドを検索..." />
 *   <CommandList>
 *     <CommandEmpty>結果が見つかりません</CommandEmpty>
 *     <CommandGroup heading="提案">
 *       <CommandItem>カレンダー</CommandItem>
 *       <CommandItem>検索</CommandItem>
 *       <CommandItem>設定</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 * ```
 */

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/cn";
import { tv } from "tailwind-variants";

/**
 * コマンドの型定義
 */
export interface CommandType {
  /** コマンドの一意な識別子 */
  id: string;
  /** コマンドのラベル */
  label: string;
  /** コマンドのカテゴリ */
  category?: string;
  /** コマンドの実行アクション */
  action: () => void;
  /** コマンドの重要度 */
  severity?: "low" | "medium" | "high";
  /** コマンドのキーボードショートカット */
  shortcut?: string[];
  /** コマンドの説明 */
  description?: string;
  /** コマンドのアイコン */
  icon?: React.ReactNode;
}

const commandVariants = tv({
  base: "flex h-full w-full flex-col overflow-hidden rounded-md bg-base-app text-base-high",
});

const commandInputWrapperVariants = tv({
  base: "flex items-center border-b border-base-ui px-3",
});

const commandInputVariants = tv({
  base: [
    "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none",
    "placeholder:text-base-low disabled:cursor-not-allowed disabled:opacity-50",
  ],
});

const commandListVariants = tv({
  base: [
    "max-h-[300px] overflow-y-auto overflow-x-hidden",
    "scrollbar-thin scrollbar-track-base-ui scrollbar-thumb-base-ui-hover",
  ],
});

const commandEmptyVariants = tv({
  base: "py-6 text-center text-sm text-base-low",
});

const commandGroupVariants = tv({
  base: "overflow-hidden p-1 text-base-high [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-base-low",
});

const commandSeparatorVariants = tv({
  base: "-mx-1 h-px bg-base-ui",
});

const commandItemVariants = tv({
  base: [
    "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
    "aria-selected:bg-base-ui aria-selected:text-base-high",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  ],
});

const commandShortcutVariants = tv({
  base: "ml-auto text-xs tracking-widest text-base-low",
});

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(commandVariants(), className)}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
  children: React.ReactNode;
}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-base-low [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className={commandInputWrapperVariants()} cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(commandInputVariants(), className)}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn(commandListVariants(), className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={commandEmptyVariants()}
    {...props}
  />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(commandGroupVariants(), className)}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn(commandSeparatorVariants(), className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(commandItemVariants(), className)}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(commandShortcutVariants(), className)}
      {...props}
    />
  );
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}; 