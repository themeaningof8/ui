/**
 * @file カレンダーコンポーネントのストーリー
 * @description カレンダーコンポーネントの使用例を表示します
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Calendar } from '.'
import { addDays } from 'date-fns'

const meta = {
  title: 'UI/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なカレンダーの使用例
 */
export const Default: Story = {
  args: {
    mode: 'single',
    className: 'rounded-md border',
  },
}

/**
 * 選択済みの日付がある場合の使用例
 */
export const Selected: Story = {
  args: {
    mode: 'single',
    selected: new Date(),
    className: 'rounded-md border',
  },
}

/**
 * 複数選択モードの使用例
 */
export const Multiple: Story = {
  args: {
    mode: 'multiple',
    selected: [new Date(), addDays(new Date(), 2), addDays(new Date(), 5)],
    className: 'rounded-md border',
  },
}

/**
 * 範囲選択モードの使用例
 */
export const Range: Story = {
  args: {
    mode: 'range',
    selected: {
      from: new Date(),
      to: addDays(new Date(), 7),
    },
    className: 'rounded-md border',
  },
}

/**
 * 無効な日付を含む使用例
 */
export const WithDisabledDates: Story = {
  args: {
    mode: 'single',
    disabled: (date) => date < new Date(),
    className: 'rounded-md border',
  },
}

/**
 * カスタムスタイルを適用した使用例
 */
export const CustomStyle: Story = {
  args: {
    mode: 'single',
    className: 'rounded-md border bg-muted p-4',
    classNames: {
      month: 'text-lg font-semibold',
      caption: 'flex justify-center pt-1 relative items-center',
      caption_label: 'text-sm font-medium',
      nav: 'space-x-1 flex items-center',
      nav_button: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
      nav_button_previous: 'absolute left-1',
      nav_button_next: 'absolute right-1',
      table: 'w-full border-collapse space-y-1',
      head_row: 'flex',
      head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
      row: 'flex w-full mt-2',
      cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
      day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
      day_selected: 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
      day_today: 'bg-accent text-accent-foreground',
      day_outside: 'text-muted-foreground opacity-50',
      day_disabled: 'text-muted-foreground opacity-50',
      day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
      day_hidden: 'invisible',
    },
  },
} 