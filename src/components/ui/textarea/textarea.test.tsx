/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Textarea } from '.'
import { describe, it, expect, vi } from 'vitest'

describe('Textarea', () => {
  it('renders textarea correctly', () => {
    render(<Textarea />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const customClass = 'custom-class'
    render(<Textarea className={customClass} />)
    expect(screen.getByRole('textbox')).toHaveClass(customClass)
  })
  it('handles user input correctly', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    
    render(<Textarea onChange={onChange} />)
    
    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'test')
    
    expect(onChange).toHaveBeenCalled()
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
    await user.tab()
    
    expect(textarea).toHaveFocus()
    expect(textarea).toHaveClass('focus-visible:ring-2')
    expect(textarea).toHaveClass('focus-visible:ring-step-6')
  })
}) 