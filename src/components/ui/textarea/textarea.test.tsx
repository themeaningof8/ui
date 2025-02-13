/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Textarea } from '.'
import { describe, it, expect, vi } from 'vitest'

describe('Textarea', () => {
  it('renders textarea correctly', () => {
    render(<Textarea placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const customClass = 'custom-class'
    render(<Textarea className={customClass} />)
    expect(screen.getByRole('textbox')).toHaveClass(customClass)
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Textarea ref={ref} />)
    expect(ref).toHaveBeenCalled()
  })

  it('handles user input correctly', async () => {
    const user = userEvent.setup()
    render(<Textarea />)
    const textarea = screen.getByRole('textbox')
    
    await user.type(textarea, 'Hello, World!')
    expect(textarea).toHaveValue('Hello, World!')
  })

  it('applies disabled styles when disabled', () => {
    render(<Textarea disabled />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeDisabled()
    expect(textarea).toHaveClass('disabled:cursor-not-allowed')
    expect(textarea).toHaveClass('disabled:opacity-50')
  })

  it('applies focus styles when focused', async () => {
    const user = userEvent.setup()
    render(<Textarea />)
    const textarea = screen.getByRole('textbox')
    
    await user.click(textarea)
    expect(textarea).toHaveClass('focus-visible:ring-2')
    expect(textarea).toHaveClass('focus-visible:ring-ring')
  })
}) 