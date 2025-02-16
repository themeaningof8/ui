/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { RadioGroup, RadioGroupItem } from '.'

describe('RadioGroup', () => {
  it('renders radio group correctly', () => {
    render(
      <RadioGroup defaultValue="option1">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="option1" />
          <label htmlFor="option1">Option 1</label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="option2" />
          <label htmlFor="option2">Option 2</label>
        </div>
      </RadioGroup>
    )

    expect(screen.getByLabelText('Option 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument()
  })

  it('applies custom className to radio group', () => {
    const customClass = 'custom-class'
    render(
      <RadioGroup className={customClass} defaultValue="option1">
        <RadioGroupItem value="option1" />
      </RadioGroup>
    )

    expect(screen.getByRole('radiogroup')).toHaveClass(customClass)
  })

  it('applies custom className to radio item', () => {
    const customClass = 'custom-class'
    render(
      <RadioGroup defaultValue="option1">
        <RadioGroupItem value="option1" className={customClass} />
      </RadioGroup>
    )

    expect(screen.getByRole('radio')).toHaveClass(customClass)
  })

  it('handles value change correctly', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    render(
      <RadioGroup onValueChange={onValueChange} defaultValue="option1">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="option1" />
          <label htmlFor="option1">Option 1</label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="option2" />
          <label htmlFor="option2">Option 2</label>
        </div>
      </RadioGroup>
    )

    const option2 = screen.getByLabelText('Option 2')
    await user.click(option2)

    expect(onValueChange).toHaveBeenCalledWith('option2')
  })

  it('handles disabled state correctly', () => {
    render(
      <RadioGroup defaultValue="option1">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="option1" disabled />
          <label htmlFor="option1">Option 1</label>
        </div>
      </RadioGroup>
    )

    expect(screen.getByRole('radio')).toBeDisabled()
    expect(screen.getByRole('radio')).toHaveClass('disabled:cursor-not-allowed')
  })

  it('shows selected state correctly', () => {
    render(
      <RadioGroup defaultValue="option1">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="option1" />
          <label htmlFor="option1">Option 1</label>
        </div>
      </RadioGroup>
    )

    const radio = screen.getByRole('radio')
    expect(radio).toBeChecked()
    expect(radio.querySelector('.text-current')).toBeInTheDocument()
  })

  it('applies focus styles correctly', async () => {
    const user = userEvent.setup()
    
    render(
      <RadioGroup defaultValue="option1">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="option1" />
          <label htmlFor="option1">Option 1</label>
        </div>
      </RadioGroup>
    )

    const radio = screen.getByRole('radio')
    await user.tab()
    
    expect(radio).toHaveFocus()
    expect(radio).toHaveClass('focus-visible:ring-2')
  })
}) 