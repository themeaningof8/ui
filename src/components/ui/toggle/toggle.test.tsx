/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toggle } from '.'
import { describe, it, expect, vi } from 'vitest'

describe('Toggle', () => {
  it('renders toggle correctly', () => {
    render(<Toggle>Toggle</Toggle>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const customClass = 'custom-class'
    render(<Toggle className={customClass}>Toggle</Toggle>)
    expect(screen.getByRole('button')).toHaveClass(customClass)
  })

  it('handles pressed state correctly', async () => {
    const user = userEvent.setup()
    render(<Toggle>Toggle</Toggle>)
    
    const toggle = screen.getByRole('button')
    await user.click(toggle)
    
    expect(toggle).toHaveAttribute('data-state', 'on')
  })

  it('handles unpressed state correctly', () => {
    render(<Toggle>Toggle</Toggle>)
    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'off')
  })

  it('handles state change correctly', async () => {
    const user = userEvent.setup()
    const onPressedChange = vi.fn()
    
    render(<Toggle onPressedChange={onPressedChange}>Toggle</Toggle>)
    
    const toggle = screen.getByRole('button')
    await user.click(toggle)
    
    expect(onPressedChange).toHaveBeenCalledWith(true)
  })

  it('handles disabled state correctly', () => {
    render(<Toggle disabled>Toggle</Toggle>)
    
    const toggle = screen.getByRole('button')
    expect(toggle).toBeDisabled()
    expect(toggle).toHaveClass('disabled:pointer-events-none')
    expect(toggle).toHaveClass('disabled:opacity-50')
  })

  it('applies focus styles correctly', async () => {
    const user = userEvent.setup()
    
    render(<Toggle>Toggle</Toggle>)
    
    const toggle = screen.getByRole('button')
    await user.tab()
    
    expect(toggle).toHaveFocus()
    expect(toggle).toHaveClass('focus-visible:ring-2')
  })

  it('applies variant styles correctly', () => {
    render(<Toggle variant="outline">Toggle</Toggle>)
    
    const toggle = screen.getByRole('button')
    expect(toggle).toHaveClass('border')
    expect(toggle).toHaveClass('border-step-7')
    expect(toggle).toHaveClass('bg-transparent')
    expect(toggle).toHaveClass('hover:bg-step-4')
    expect(toggle).toHaveClass('hover:text-step-12')
  })

  it('applies size variant styles correctly', () => {
    render(<Toggle size="sm">Toggle</Toggle>)
    
    const toggle = screen.getByRole('button')
    expect(toggle).toHaveClass('h-9')
    expect(toggle).toHaveClass('px-2.5')
  })

  it('applies combined variant styles correctly', () => {
    render(
      <Toggle variant="outline" size="sm">
        Toggle
      </Toggle>
    )
    
    const toggle = screen.getByRole('button')
    expect(toggle).toHaveClass('border')
    expect(toggle).toHaveClass('border-step-7')
    expect(toggle).toHaveClass('bg-transparent')
    expect(toggle).toHaveClass('hover:bg-step-4')
    expect(toggle).toHaveClass('hover:text-step-12')
    expect(toggle).toHaveClass('h-9')
    expect(toggle).toHaveClass('px-2.5')
  })
}) 