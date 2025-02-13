/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ToggleGroup, ToggleGroupItem } from '.'

describe('ToggleGroup', () => {
  it('renders toggle group correctly', () => {
    render(
      <ToggleGroup type="single" defaultValue="a">
        <ToggleGroupItem value="a">Option A</ToggleGroupItem>
        <ToggleGroupItem value="b">Option B</ToggleGroupItem>
      </ToggleGroup>
    )

    expect(screen.getByText('Option A')).toBeInTheDocument()
    expect(screen.getByText('Option B')).toBeInTheDocument()
  })

  it('applies custom className to group', () => {
    const customClass = 'custom-class'
    render(
      <ToggleGroup className={customClass} type="single" defaultValue="a">
        <ToggleGroupItem value="a">Option A</ToggleGroupItem>
      </ToggleGroup>
    )

    expect(screen.getByRole('group')).toHaveClass(customClass)
  })

  it('applies custom className to item', () => {
    const customClass = 'custom-class'
    render(
      <ToggleGroup type="single" defaultValue="a">
        <ToggleGroupItem value="a" className={customClass}>
          Option A
        </ToggleGroupItem>
      </ToggleGroup>
    )

    expect(screen.getByRole('radio')).toHaveClass(customClass)
  })

  it('handles single selection correctly', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    
    render(
      <ToggleGroup type="single" defaultValue="a" onValueChange={onValueChange}>
        <ToggleGroupItem value="a">Option A</ToggleGroupItem>
        <ToggleGroupItem value="b">Option B</ToggleGroupItem>
      </ToggleGroup>
    )

    const optionB = screen.getByText('Option B')
    await user.click(optionB)
    
    expect(onValueChange).toHaveBeenCalledWith('b')
  })

  it('handles multiple selection correctly', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    
    render(
      <ToggleGroup type="multiple" defaultValue={['a']} onValueChange={onValueChange}>
        <ToggleGroupItem value="a">Option A</ToggleGroupItem>
        <ToggleGroupItem value="b">Option B</ToggleGroupItem>
      </ToggleGroup>
    )

    const optionB = screen.getByText('Option B')
    await user.click(optionB)
    
    expect(onValueChange).toHaveBeenCalledWith(['a', 'b'])
  })

  it('handles disabled state correctly', () => {
    render(
      <ToggleGroup type="single" defaultValue="a">
        <ToggleGroupItem value="a" disabled>
          Option A
        </ToggleGroupItem>
      </ToggleGroup>
    )

    const button = screen.getByRole('radio')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:pointer-events-none')
  })

  it('applies variant styles correctly', () => {
    render(
      <ToggleGroup type="single" defaultValue="a">
        <ToggleGroupItem value="a" variant="outline">
          Option A
        </ToggleGroupItem>
      </ToggleGroup>
    )

    const button = screen.getByRole('radio')
    expect(button).toHaveClass('border')
    expect(button).toHaveClass('border-input')
    expect(button).toHaveClass('bg-transparent')
  })

  it('applies size styles correctly', () => {
    render(
      <ToggleGroup type="single" defaultValue="a">
        <ToggleGroupItem value="a" size="sm">
          Option A
        </ToggleGroupItem>
      </ToggleGroup>
    )

    expect(screen.getByRole('radio')).toHaveClass('h-9')
  })
}) 