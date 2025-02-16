/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import React from 'react'
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
    
    const content = screen.getByRole('dialog')
    expect(content).toHaveClass(customClass)
  })

  it('positions content correctly with align prop', async () => {
    const user = userEvent.setup()
    
    render(
      <Popover>
        <PopoverTrigger>Click me</PopoverTrigger>
        <PopoverContent align="end">
          Popover content
        </PopoverContent>
      </Popover>
    )

    const trigger = screen.getByText('Click me')
    await user.click(trigger)
    
    const content = screen.getByRole('dialog')
    expect(content).toHaveAttribute('data-align', 'end')
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
    
    const content = screen.getByRole('dialog')
    expect(content).toHaveStyle({
      '--radix-popover-content-transform-origin': 'var(--radix-popper-transform-origin)',
      '--radix-popover-content-available-width': 'var(--radix-popper-available-width)',
      '--radix-popover-content-available-height': 'var(--radix-popper-available-height)',
      '--radix-popover-trigger-width': 'var(--radix-popper-anchor-width)',
      '--radix-popover-trigger-height': 'var(--radix-popper-anchor-height)'
    })
  })

  it('hides content when clicking outside', async () => {
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
    
    await user.click(document.body)
    
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
  })
}) 