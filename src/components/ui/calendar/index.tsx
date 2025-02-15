/**
 * @file カレンダーコンポーネント
 * @description 日付選択のためのカレンダーコンポーネントです
 *
 * @example
 * ```tsx
 * // 単一選択モード
 * <Calendar
 *   mode="single"
 *   selected={date}
 *   onSelect={(date) => setDate(date)}
 * />
 *
 * // 複数選択モード
 * <Calendar
 *   mode="multiple"
 *   selected={dates}
 *   onSelect={(dates) => setDates(dates)}
 * />
 *
 * // 範囲選択モード
 * <Calendar
 *   mode="range"
 *   selected={{ from: startDate, to: endDate }}
 *   onSelect={(range) => {
 *     setStartDate(range?.from)
 *     setEndDate(range?.to)
 *   }}
 * />
 * ```
 */

"use client";

import type * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { ja } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

/**
 * @interface CalendarProps
 * @description カレンダーコンポーネントのプロパティ
 * @extends React.ComponentProps<typeof DayPicker>
 * @property {string} [className] - カスタムクラス名
 * @property {Object} [classNames] - 各要素に適用するクラス名のマップ
 * @property {boolean} [showOutsideDays=true] - 前後の月の日付を表示するかどうか
 * @property {Object} [locale=ja] - 日付のロケール設定
 */
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

/**
 * @function Calendar
 * @description カレンダーコンポーネント
 * @param {CalendarProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} カレンダー要素
 */
function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	locale = ja,
	...props
}: CalendarProps) {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			locale={locale}
			className={cn("p-3", className)}
			classNames={{
				months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
				month: "space-y-4",
				caption: "flex justify-center pt-1 relative items-center",
				caption_label: "text-sm font-medium",
				nav: "space-x-1 flex items-center",
				nav_button: cn(
					buttonVariants({ variant: "outline" }),
					"size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
				),
				nav_button_previous: "absolute left-1",
				nav_button_next: "absolute right-1",
				table: "w-full border-collapse space-y-1",
				head_row: "flex",
				head_cell:
					"text-step-11 rounded-md w-9 font-normal text-[0.8rem]",
				row: "flex w-full mt-2",
				cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-step-5 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
				day: cn(
					buttonVariants({ variant: "ghost" }),
					"size-9 p-0 font-normal aria-selected:opacity-100",
				),
				day_selected:
					"bg-step-9 text-step-1 hover:bg-step-10 focus:bg-step-10 focus:text-step-1",
				day_today: "bg-step-5 text-step-12",
				day_outside: "text-step-11 opacity-50",
				day_disabled: "text-step-11 opacity-50",
				day_range_middle:
					"aria-selected:bg-step-5 aria-selected:text-step-12",
				day_hidden: "invisible",
				...classNames,
			}}
			components={{
				IconLeft: ({ className, ...props }: { className?: string }) => (
					<ChevronLeft className={cn("size-4", className)} {...props} />
				),
				IconRight: ({ className, ...props }: { className?: string }) => (
					<ChevronRight className={cn("size-4", className)} {...props} />
				),
			}}
			{...props}
		/>
	);
}
Calendar.displayName = "Calendar";

export { Calendar };
