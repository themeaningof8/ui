/**
 * @file Paginationのストーリー
 * @description Paginationの様々な状態とバリエーションを表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from '@/components/ui/pagination'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import {
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'

const meta = {
	title: 'UI/Pagination',
	component: Pagination,
	argTypes: {
		className: {
			control: 'text',
			description: '追加のクラス名',
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

/**
 * @description 基本的なページネーションの表示
 */
export const Default: Story = {
	args: {},
	render: () => (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href="#" />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#" isActive>
						1
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">2</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">3</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext href="#" />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement)
		
		// ページネーションの存在確認
		const pagination = canvas.getByRole('navigation')
		expect(pagination).toBeInTheDocument()
		
		// 現在のページが1であることを確認
		const currentPage = canvas.getByRole('link', { current: 'page' })
		expect(currentPage).toHaveTextContent('1')
		
		// すべてのボタンが有効であることを確認
		const buttons = canvas.getAllByRole('link')
		for (const button of buttons) {
			expect(button).not.toBeDisabled()
		}
	},
}

/**
 * @description 多数のページがある場合の表示
 */
export const ManyPages: Story = {
	args: {},
	render: () => (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href="#" />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">1</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#" isActive>
						50
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">100</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext href="#" />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement)
		
		// ページネーションの存在確認
		const pagination = canvas.getByRole('navigation')
		expect(pagination).toBeInTheDocument()
		
		// 現在のページが50であることを確認
		const currentPage = canvas.getByRole('link', { current: 'page' })
		expect(currentPage).toHaveTextContent('50')
		
		// すべてのボタンが有効であることを確認
		const buttons = canvas.getAllByRole('link')
		for (const button of buttons) {
			expect(button).not.toBeDisabled()
		}
	},
}

/**
 * @description 最初のページの表示
 */
export const FirstPage: Story = {
	args: {},
	render: () => (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href="#" aria-disabled="true" />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#" isActive>
						1
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">2</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">3</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext href="#" />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement)
		
		// ページネーションの存在確認
		const pagination = canvas.getByRole('navigation')
		expect(pagination).toBeInTheDocument()
		
		// 現在のページが1であることを確認
		const currentPage = canvas.getByRole('link', { current: 'page' })
		expect(currentPage).toHaveTextContent('1')
		
		// 前へボタンが無効化されていることを確認
		const previousButton = canvas.getByText('Previous').closest('a')
		expect(previousButton).toHaveAttribute('aria-disabled', 'true')
		
		// 次へボタンが有効であることを確認
		const nextButton = canvas.getByText('Next').closest('a')
		expect(nextButton).not.toHaveAttribute('aria-disabled')
	},
}

/**
 * @description 最後のページの表示
 */
export const LastPage: Story = {
	args: {},
	render: () => (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href="#" />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">8</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">9</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#" isActive>
						10
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext href="#" aria-disabled="true" />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement)
		
		// ページネーションの存在確認
		const pagination = canvas.getByRole('navigation')
		expect(pagination).toBeInTheDocument()
		
		// 現在のページが10であることを確認
		const currentPage = canvas.getByRole('link', { current: 'page' })
		expect(currentPage).toHaveTextContent('10')
		
		// 前へボタンが有効であることを確認
		const previousButton = canvas.getByText('Previous').closest('a')
		expect(previousButton).not.toHaveAttribute('aria-disabled')
		
		// 次へボタンが無効化されていることを確認
		const nextButton = canvas.getByText('Next').closest('a')
		expect(nextButton).toHaveAttribute('aria-disabled', 'true')
	},
}

/**
 * @description 無効化された状態の表示
 */
export const Disabled: Story = {
	args: {},
	render: () => (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href="#" aria-disabled="true" />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#" aria-disabled="true">
						1
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#" aria-disabled="true">
						2
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#" aria-disabled="true">
						3
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext href="#" aria-disabled="true" />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement)
		
		// ページネーションの存在確認
		const pagination = canvas.getByRole('navigation')
		expect(pagination).toBeInTheDocument()
		
		// すべてのボタンが無効化されていることを確認
		const buttons = canvas.getAllByRole('link')
		for (const button of buttons) {
			expect(button).toHaveAttribute('aria-disabled', 'true')
		}
	},
}

/**
 * @description カスタムページサイズの表示
 */
export const CustomPageSize: Story = {
	args: {},
	render: () => (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href="#" />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#" isActive>
						1
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">2</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">3</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">4</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">5</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext href="#" />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement)
		
		// ページネーションの存在確認
		const pagination = canvas.getByRole('navigation')
		expect(pagination).toBeInTheDocument()
		
		// 現在のページが1であることを確認
		const currentPage = canvas.getByRole('link', { current: 'page' })
		expect(currentPage).toHaveTextContent('1')
		
		// すべてのボタンが有効であることを確認
		const buttons = canvas.getAllByRole('link')
		for (const button of buttons) {
			expect(button).not.toBeDisabled()
		}
	},
} 