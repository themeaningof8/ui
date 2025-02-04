/**
 * @file Paginationのストーリー
 * @description Paginationの様々な状態とバリエーションを表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from '@/components/ui/pagination'

const meta = {
  title: 'UI/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

/**
 * @description 基本的なページネーションの表示
 */
export const Default: Story = {
  args: {
    total: 100,
    perPage: 10,
    currentPage: 1,
    onPageChange: (page: number) => console.log(`ページ ${page} に移動`),
  },
}

/**
 * @description 多数のページがある場合の表示
 */
export const ManyPages: Story = {
  args: {
    total: 1000,
    perPage: 10,
    currentPage: 50,
    onPageChange: (page: number) => console.log(`ページ ${page} に移動`),
  },
}

/**
 * @description 最初のページの表示
 */
export const FirstPage: Story = {
  args: {
    total: 100,
    perPage: 10,
    currentPage: 1,
    onPageChange: (page: number) => console.log(`ページ ${page} に移動`),
  },
}

/**
 * @description 最後のページの表示
 */
export const LastPage: Story = {
  args: {
    total: 100,
    perPage: 10,
    currentPage: 10,
    onPageChange: (page: number) => console.log(`ページ ${page} に移動`),
  },
}

/**
 * @description 無効化された状態の表示
 */
export const Disabled: Story = {
  args: {
    total: 100,
    perPage: 10,
    currentPage: 5,
    disabled: true,
    onPageChange: (page: number) => console.log(`ページ ${page} に移動`),
  },
}

/**
 * @description カスタムページサイズの表示
 */
export const CustomPerPage: Story = {
  args: {
    total: 100,
    perPage: 20,
    currentPage: 3,
    onPageChange: (page: number) => console.log(`ページ ${page} に移動`),
  },
} 