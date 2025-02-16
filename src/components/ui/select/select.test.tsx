/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from '.'

describe('Select', () => {
  it('renders select trigger correctly', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
      </Select>
    )

    expect(screen.getByText('Select an option')).toBeInTheDocument()
  })

  it('shows content when clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    )

    const trigger = screen.getByRole('combobox')
    await user.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument()
      expect(screen.getByText('Option 1')).toBeInTheDocument()
      expect(screen.getByText('Option 2')).toBeInTheDocument()
    })
  })

  it('applies custom className to trigger', () => {
    const customClass = 'custom-class'
    render(
      <Select>
        <SelectTrigger className={customClass}>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
      </Select>
    )

    expect(screen.getByRole('combobox')).toHaveClass(customClass)
  })

  it('handles value selection correctly', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    
    render(
      <Select onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    )

    const trigger = screen.getByRole('combobox')
    await user.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument()
    })

    const option = screen.getByRole('option', { name: 'Option 1' })
    await user.click(option)
    
    expect(onValueChange).toHaveBeenCalledWith('option1')
  })

  it('renders group and label correctly', async () => {
    const user = userEvent.setup()
    
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Group 1</SelectLabel>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )

    const trigger = screen.getByRole('combobox')
    await user.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument()
      expect(screen.getByText('Group 1')).toBeInTheDocument()
    })
  })

  it('renders separator correctly', async () => {
    const user = userEvent.setup()
    
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectSeparator data-testid="select-separator" />
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    )

    const trigger = screen.getByRole('combobox')
    await user.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument()
      const separator = screen.getByTestId('select-separator')
      expect(separator).toHaveClass('-mx-1', 'my-1', 'h-px', 'bg-step-6')
    })
  })

  it('handles disabled state correctly', () => {
    render(
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
      </Select>
    )

    const trigger = screen.getByRole('combobox')
    expect(trigger).toBeDisabled()
    expect(trigger).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
  })

  it('applies focus styles correctly', async () => {
    const user = userEvent.setup()
    
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
      </Select>
    )

    const trigger = screen.getByRole('combobox')
    await user.tab()
    
    expect(trigger).toHaveFocus()
    expect(trigger).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-step-6')
  })
}) 