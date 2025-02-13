/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import { Separator } from '.'
import { describe, it, expect, vi } from 'vitest'

describe('Separator', () => {
  it('renders separator correctly', () => {
    render(<Separator decorative={false} />)
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const customClass = 'custom-class'
    render(<Separator decorative={false} className={customClass} />)
    expect(screen.getByRole('separator')).toHaveClass(customClass)
  })

  it('renders horizontal separator by default', () => {
    render(<Separator decorative={false} />)
    const separator = screen.getByRole('separator')
    expect(separator).toHaveClass('h-[1px]')
    expect(separator).toHaveClass('w-full')
  })

  it('renders vertical separator correctly', () => {
    render(<Separator decorative={false} orientation="vertical" />)
    const separator = screen.getByRole('separator')
    expect(separator).toHaveClass('h-full')
    expect(separator).toHaveClass('w-[1px]')
  })

  it('applies decorative attribute correctly', () => {
    render(<Separator decorative={false} />)
    const separator = screen.getByRole('separator')
    expect(separator).toHaveAttribute('aria-orientation', 'horizontal')
  })

  it('applies base styles correctly', () => {
    render(<Separator decorative={false} />)
    const separator = screen.getByRole('separator')
    expect(separator).toHaveClass('shrink-0')
    expect(separator).toHaveClass('bg-border')
  })

  it('handles orientation change correctly', () => {
    const { rerender } = render(<Separator decorative={false} orientation="horizontal" />)
    let separator = screen.getByRole('separator')
    expect(separator).toHaveClass('h-[1px]')
    expect(separator).toHaveClass('w-full')

    rerender(<Separator decorative={false} orientation="vertical" />)
    separator = screen.getByRole('separator')
    expect(separator).toHaveClass('h-full')
    expect(separator).toHaveClass('w-[1px]')
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Separator ref={ref} />)
    expect(ref).toHaveBeenCalled()
  })
}) 