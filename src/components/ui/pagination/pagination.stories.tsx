import type { Meta, StoryObj } from '@storybook/react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '.'

/**
 * `Pagination`は、ページネーションを表示するためのコンポーネントセットです。
 * アクセシビリティに配慮し、レスポンシブなデザインに対応しています。
 */
const meta = {
  title: 'UI/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof Pagination>

/**
 * 基本的なページネーションの例です。
 */
export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" size="default" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" size="default" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
}

/**
 * 多数のページがある場合の例です。
 */
export const WithEllipsis: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" size="default" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon" isActive>
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">6</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" size="default" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
}

/**
 * 最初のページの例です。
 */
export const FirstPage: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" size="default" aria-disabled />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" size="default" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
}

/**
 * 最後のページの例です。
 */
export const LastPage: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" size="default" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">8</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">9</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon" isActive>
            10
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" size="default" aria-disabled />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
}

/**
 * コンパクトなデザインの例です。
 */
export const Compact: Story = {
  render: () => (
    <Pagination>
      <PaginationContent className="gap-0">
        <PaginationItem>
          <PaginationPrevious href="#" size="default" className="rounded-r-none" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            size="icon"
            className="rounded-none border-x-0"
            isActive
          >
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon" className="rounded-none border-r-0">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" size="default" className="rounded-l-none" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
} 