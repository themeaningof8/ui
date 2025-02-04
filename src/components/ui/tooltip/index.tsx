/**
 * @file Tooltip
 * @description ホバーまたはフォーカス時に追加情報を表示するツールチップ
 */
import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/lib/cn';

/**
 * @typedef TooltipProviderProps
 * @property {React.ReactNode} [children] - 子要素
 * @property {number} [delayDuration=700] - ツールチップの表示遅延時間（ミリ秒）
 * @property {boolean} [disableHoverableContent=false] - ホバー可能なコンテンツを無効にするかどうか
 * @property {number} [skipDelayDuration=300] - ツールチップ間の遅延をスキップする時間（ミリ秒）
 */
const TooltipProvider = TooltipPrimitive.Provider;

/**
 * @typedef TooltipProps
 * @property {string} [className] - カスタムクラス名
 * @property {React.ReactNode} [children] - 子要素
 * @property {string} [side='top'] - ツールチップの表示位置（'top' | 'right' | 'bottom' | 'left'）
 * @property {string} [align='center'] - ツールチップの配置（'start' | 'center' | 'end'）
 * @property {number} [sideOffset=4] - ツールチップの表示位置オフセット
 */
const Tooltip = TooltipPrimitive.Root;

/**
 * @description ツールチップのトリガー要素
 */
const TooltipTrigger = TooltipPrimitive.Trigger;

/**
 * @description ツールチップのコンテンツ要素
 */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    data-testid="tooltip-content"
    className={cn(
      'z-50 overflow-hidden rounded-md bg-base-solid px-3 py-1.5 text-sm text-base-on-solid shadow-md',
      'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
));

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }; 