/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { Progress } from '.'

describe('Progress', () => {
  it('renders progress bar correctly', () => {
    render(<Progress value={50} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const customClass = 'custom-class'
    render(<Progress value={50} className={customClass} />)
    expect(screen.getByRole('progressbar')).toHaveClass(customClass)
  })

  it('sets correct progress value', () => {
    render(<Progress value={50} />)
    const indicator = screen.getByRole('progressbar').querySelector('div')
    expect(indicator).toHaveStyle({ transform: 'translateX(-50%)' })
  })

  it('handles zero value correctly', () => {
    render(<Progress value={0} />)
    const indicator = screen.getByRole('progressbar').querySelector('div')
    expect(indicator).toHaveStyle({ transform: 'translateX(-100%)' })
  })

  it('handles full value correctly', () => {
    render(<Progress value={100} />)
    const indicator = screen.getByRole('progressbar').querySelector('div')
    expect(indicator).toHaveStyle({ transform: 'translateX(-0%)' })
  })

  it('handles undefined value correctly', () => {
    render(<Progress />)
    const indicator = screen.getByRole('progressbar').querySelector('div')
    expect(indicator).toHaveStyle({ transform: 'translateX(-100%)' })
  })

  it('applies correct base styles', () => {
    render(<Progress value={50} />)
    const progress = screen.getByRole('progressbar')
    expect(progress).toHaveClass('relative', 'w-full', 'overflow-hidden', 'rounded-full', 'bg-step-3')
  })

  it('applies correct indicator styles', () => {
    render(<Progress value={50} />)
    const indicator = screen.getByRole('progressbar').querySelector('div')
    expect(indicator).toHaveClass('h-full', 'w-full', 'flex-1', 'transition-all', 'bg-step-9', 'duration-200')
  })
}) 