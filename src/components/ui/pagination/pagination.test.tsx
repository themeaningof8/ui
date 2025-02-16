/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '.'

describe('Pagination', () => {
  it('renders basic pagination structure', () => {
    render(
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
            <PaginationNext href="#" size="default" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )

    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('前へ')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('次へ')).toBeInTheDocument()
  })

  it('applies custom className to components', () => {
    const customClass = 'custom-class'
    
    render(
      <Pagination className={customClass}>
        <PaginationContent className={customClass}>
          <PaginationItem className={customClass}>
            <PaginationLink href="#" size="icon" className={customClass}>
              1
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )

    expect(screen.getByRole('navigation')).toHaveClass(customClass)
    expect(screen.getByRole('list')).toHaveClass(customClass)
    expect(screen.getByRole('listitem')).toHaveClass(customClass)
    expect(screen.getByText('1')).toHaveClass(customClass)
  })

  it('renders active page correctly', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" size="icon" isActive>
              1
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )

    const activeLink = screen.getByText('1')
    expect(activeLink).toHaveAttribute('aria-current', 'page')
  })

  it('renders ellipsis correctly', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )

    expect(screen.getByTestId('ellipsis-icon')).toBeInTheDocument()
    expect(screen.getByText('その他のページ')).toBeInTheDocument()
  })

  it('renders previous and next buttons with correct aria-labels', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" size="default" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" size="default" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )

    expect(screen.getByLabelText('前のページへ')).toBeInTheDocument()
    expect(screen.getByLabelText('次のページへ')).toBeInTheDocument()
  })

  it('handles link interactions correctly', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" size="icon" onClick={onClick}>
              1
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )

    const link = screen.getByText('1')
    await user.click(link)
    
    expect(onClick).toHaveBeenCalled()
  })
}) 