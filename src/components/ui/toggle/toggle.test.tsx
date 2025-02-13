/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toggle } from '@/components/ui/toggle'

describe('Toggle', () => {
  const user = userEvent.setup()

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
    const onPressedChange = vi.fn()
    render(<Toggle onPressedChange={onPressedChange}>Toggle</Toggle>)
    
    const button = screen.getByRole('button')
    await user.click(button)
    expect(onPressedChange).toHaveBeenCalledWith(true)
    expect(button).toHaveAttribute('data-state', 'on')
  })

  it('handles unpressed state correctly', () => {
    render(<Toggle pressed={false}>Toggle</Toggle>)
    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'off')
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
    expect(button).toHaveClass('disabled:pointer-events-none')
    expect(button).toHaveClass('disabled:opacity-50')
  })

  it('applies focus styles correctly', async () => {
    render(<Toggle>Toggle</Toggle>)
    
    const button = screen.getByRole('button')
    await user.tab()
    
    expect(button).toHaveFocus()
    expect(button).toHaveClass('focus-visible:ring-2')
  })

  it('applies hover styles correctly', async () => {
    render(<Toggle>Toggle</Toggle>)
    
    const button = screen.getByRole('button')
    await user.hover(button)
    
    expect(button).toHaveClass('hover:bg-muted')
    expect(button).toHaveClass('hover:text-muted-foreground')
  })

  it('applies variant styles correctly', () => {
    render(
      <>
        <Toggle variant="default">Default</Toggle>
        <Toggle variant="outline">Outline</Toggle>
      </>
    )
    
    const defaultButton = screen.getByText('Default')
    const outlineButton = screen.getByText('Outline')
    
    expect(outlineButton).toBeInTheDocument()
    
    expect(defaultButton).toHaveClass('bg-transparent')
    expect(outlineButton).toHaveClass('border')
    expect(outlineButton).toHaveClass('border-input')
  })

  it('applies size styles correctly', () => {
    render(
      <>
        <Toggle size="sm">Small</Toggle>
        <Toggle size="default">Default</Toggle>
        <Toggle size="lg">Large</Toggle>
      </>
    )
    
    const smallButton = screen.getByText('Small')
    const defaultButton = screen.getByText('Default')
    const largeButton = screen.getByText('Large')
    
    expect(smallButton).toHaveClass('h-9')
    expect(smallButton).toHaveClass('px-2.5')
    expect(defaultButton).toHaveClass('h-10')
    expect(defaultButton).toHaveClass('px-3')
    expect(largeButton).toHaveClass('h-11')
    expect(largeButton).toHaveClass('px-5')
  })
}) 