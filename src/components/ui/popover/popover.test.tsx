/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '.'

describe('Popover', () => {
  it('renders popover trigger correctly', () => {
    render(
      <Popover>
        <PopoverTrigger>Click me</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    )

    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('shows content on click', async () => {
    const user = userEvent.setup()
    
    render(
      <Popover>
        <PopoverTrigger>Click me</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    )

    const trigger = screen.getByText('Click me')
    await user.click(trigger)
    
    expect(screen.getByText('Popover content')).toBeInTheDocument()
  })

  it('applies custom className to content', async () => {
    const user = userEvent.setup()
    const customClass = 'custom-class'
    
    render(
      <Popover>
        <PopoverTrigger>Click me</PopoverTrigger>
        <PopoverContent className={customClass}>
          Popover content
        </PopoverContent>
      </Popover>
    )

    const trigger = screen.getByText('Click me')
    await user.click(trigger)
    
    expect(screen.getByText('Popover content')).toHaveClass(customClass)
  })

  it('positions content correctly with align prop', async () => {
    const user = userEvent.setup()
    
    render(
      <Popover>
        <PopoverTrigger>Click me</PopoverTrigger>
        <PopoverContent align="start">
          Popover content
        </PopoverContent>
      </Popover>
    )

    const trigger = screen.getByText('Click me')
    await user.click(trigger)
    
    expect(screen.getByText('Popover content')).toHaveAttribute('data-align', 'start')
  })

  it('applies correct offset with sideOffset prop', async () => {
    const user = userEvent.setup()
    
    render(
      <Popover>
        <PopoverTrigger>Click me</PopoverTrigger>
        <PopoverContent sideOffset={10}>
          Popover content
        </PopoverContent>
      </Popover>
    )

    const trigger = screen.getByText('Click me')
    await user.click(trigger)
    
    expect(screen.getByText('Popover content')).toHaveAttribute('data-side-offset', '10')
  })

  it('hides content when clicking outside', async () => {
    const user = userEvent.setup()
    
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <Popover>
          <PopoverTrigger>Click me</PopoverTrigger>
          <PopoverContent>Popover content</PopoverContent>
        </Popover>
      </div>
    )

    const trigger = screen.getByText('Click me')
    await user.click(trigger)
    
    expect(screen.getByText('Popover content')).toBeInTheDocument()
    
    const outside = screen.getByTestId('outside')
    await user.click(outside)
    
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
  })
}) 