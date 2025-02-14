/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toggle, toggleVariants } from '@/components/ui/toggle'
import { vi } from 'vitest'

describe('Toggle', () => {
  const user = userEvent.setup()

  it('renders toggle correctly', () => {
    render(<Toggle>Toggle</Toggle>)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass(toggleVariants())
  })

  it('applies custom className', () => {
    const customClass = 'custom-class'
    render(<Toggle className={customClass}>Toggle</Toggle>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass(customClass)
  })

  it('handles pressed state correctly', async () => {
    const onPressedChange = vi.fn()
    render(<Toggle onPressedChange={onPressedChange}>Toggle</Toggle>)
    
    const button = screen.getByRole('button')
    await user.click(button)
    expect(onPressedChange).toHaveBeenCalledWith(true)
    expect(button).toHaveAttribute('data-state', 'on')
  })

  it('handles unpressed state correctly', () => {
    render(<Toggle pressed={false}>Toggle</Toggle>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('data-state', 'off')
  })

  it('handles state change correctly', async () => {
    const onPressedChange = vi.fn()
    render(<Toggle onPressedChange={onPressedChange}>Toggle</Toggle>)
    
    const button = screen.getByRole('button')
    await user.click(button)
    expect(onPressedChange).toHaveBeenCalledWith(true)
  })

  it('handles disabled state correctly', () => {
    render(<Toggle disabled>Toggle</Toggle>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-disabled', 'true')
    expect(button).toHaveClass(toggleVariants())
  })

  it('applies focus styles correctly', async () => {
    render(<Toggle>Toggle</Toggle>)
    
    const button = screen.getByRole('button')
    await user.tab()
    
    expect(button).toHaveFocus()
    expect(button).toHaveClass('focus-visible:ring-2')
  })

  it('applies variant styles correctly', () => {
    const variant = 'outline'
    render(<Toggle variant={variant}>Toggle</Toggle>)
    
    const button = screen.getByRole('button')
    const expectedClasses = [
      'border',
      'border-input',
      'bg-transparent',
      'hover:bg-accent',
      'hover:text-accent-foreground'
    ]
    for (const className of expectedClasses) {
      expect(button).toHaveClass(className)
    }
  })

  it('applies size variant styles correctly', () => {
    const size = 'sm'
    render(<Toggle size={size}>Toggle</Toggle>)
    
    const button = screen.getByRole('button')
    const variantClasses = toggleVariants({ size })
    expect(button.className).toContain(variantClasses)
  })

  it('applies combined variant styles correctly', () => {
    const variant = 'outline'
    const size = 'sm'
    render(<Toggle variant={variant} size={size}>Toggle</Toggle>)
    
    const button = screen.getByRole('button')
    const expectedClasses = [
      'border',
      'border-input',
      'bg-transparent',
      'hover:bg-accent',
      'hover:text-accent-foreground',
      'h-9',
      'px-2.5',
      'min-w-9'
    ]
    for (const className of expectedClasses) {
      expect(button).toHaveClass(className)
    }
  })
}) 