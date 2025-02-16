/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ToggleGroup, ToggleGroupItem } from '.'
import { describe, it, expect, vi } from 'vitest'

describe('ToggleGroup', () => {
  it('renders toggle group correctly', () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
        <ToggleGroupItem value="item2">Item 2</ToggleGroupItem>
      </ToggleGroup>
    )

    expect(screen.getByRole('group')).toBeInTheDocument()
    expect(screen.getAllByRole('radio')).toHaveLength(2)
  })

  it('applies custom className to group', () => {
    const customClass = 'custom-class'
    render(
      <ToggleGroup type="single" className={customClass}>
        <ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
      </ToggleGroup>
    )

    expect(screen.getByRole('group')).toHaveClass(customClass)
  })

  it('applies custom className to item', () => {
    const customClass = 'custom-class'
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="item1" className={customClass}>
          Item 1
        </ToggleGroupItem>
      </ToggleGroup>
    )

    expect(screen.getByRole('radio')).toHaveClass(customClass)
  })

  it('handles single selection correctly', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    
    render(
      <ToggleGroup type="single" onValueChange={onValueChange}>
        <ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
        <ToggleGroupItem value="item2">Item 2</ToggleGroupItem>
      </ToggleGroup>
    )

    const item1 = screen.getByRole('radio', { name: 'Item 1' })
    await user.click(item1)
    
    expect(onValueChange).toHaveBeenCalledWith('item1')
  })

  it('handles multiple selection correctly', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    
    render(
      <ToggleGroup type="multiple" onValueChange={onValueChange}>
        <ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
        <ToggleGroupItem value="item2">Item 2</ToggleGroupItem>
      </ToggleGroup>
    )

    const item1 = screen.getByRole('button', { name: 'Item 1' })
    const item2 = screen.getByRole('button', { name: 'Item 2' })
    
    await user.click(item1)
    await user.click(item2)
    
    expect(onValueChange).toHaveBeenCalledWith(['item1'])
    expect(onValueChange).toHaveBeenCalledWith(['item1', 'item2'])
  })

  it('handles disabled state correctly', () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="item1" disabled>
          Item 1
        </ToggleGroupItem>
      </ToggleGroup>
    )

    const item = screen.getByRole('radio')
    expect(item).toBeDisabled()
    expect(item).toHaveClass('disabled:pointer-events-none')
    expect(item).toHaveClass('disabled:opacity-50')
  })

  it('applies variant styles correctly', () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="item1" variant="outline">
          Item 1
        </ToggleGroupItem>
      </ToggleGroup>
    )

    const item = screen.getByRole('radio')
    expect(item).toHaveClass('border')
    expect(item).toHaveClass('border-step-7')
    expect(item).toHaveClass('bg-transparent')
    expect(item).toHaveClass('hover:bg-step-4')
    expect(item).toHaveClass('hover:text-step-12')
  })

  it('applies size styles correctly', () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="item1" size="sm">
          Item 1
        </ToggleGroupItem>
      </ToggleGroup>
    )

    const item = screen.getByRole('radio')
    expect(item).toHaveClass('h-9')
    expect(item).toHaveClass('px-2.5')
  })
}) 