/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Switch } from '.'
import { describe, it, expect, vi } from 'vitest'

describe('Switch', () => {
  it('renders switch correctly', () => {
    render(<Switch />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const customClass = 'custom-class'
    render(<Switch className={customClass} />)
    expect(screen.getByRole('switch')).toHaveClass(customClass)
  })

  it('handles checked state correctly', () => {
    render(<Switch checked />)
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'checked')
  })

  it('handles unchecked state correctly', () => {
    render(<Switch checked={false} />)
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'unchecked')
  })

  it('handles state change correctly', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    
    render(<Switch onCheckedChange={onCheckedChange} />)
    
    const switchElement = screen.getByRole('switch')
    await user.click(switchElement)
    
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it('handles disabled state correctly', () => {
    render(<Switch disabled />)
    
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toBeDisabled()
    expect(switchElement).toHaveClass('disabled:cursor-not-allowed')
    expect(switchElement).toHaveClass('disabled:opacity-50')
  })

  it('applies focus styles correctly', async () => {
    const user = userEvent.setup()
    
    render(<Switch />)
    
    const switchElement = screen.getByRole('switch')
    await user.tab()
    
    expect(switchElement).toHaveFocus()
    expect(switchElement).toHaveClass('focus-visible:ring-2')
  })

  it('renders thumb with correct styles', () => {
    render(<Switch />)
    
    const thumb = screen.getByRole('switch').querySelector('[class*="pointer-events-none"]')
    expect(thumb).toBeInTheDocument()
    expect(thumb).toHaveClass('rounded-full')
    expect(thumb).toHaveClass('bg-step-1')
  })

  it('applies correct transition styles', () => {
    render(<Switch />)
    
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toHaveClass('transition-colors')
    
    const thumb = switchElement.querySelector('[class*="pointer-events-none"]')
    expect(thumb).toHaveClass('transition-transform')
  })

  it('applies correct thumb position based on state', () => {
    render(
      <>
        <Switch checked />
        <Switch checked={false} />
      </>
    )
    
    const [checkedThumb, uncheckedThumb] = screen.getAllByRole('switch')
      .map(el => el.querySelector('[class*="pointer-events-none"]'))
    
    expect(checkedThumb).toHaveClass('data-[state=checked]:translate-x-5')
    expect(uncheckedThumb).toHaveClass('data-[state=unchecked]:translate-x-0')
  })
}) 