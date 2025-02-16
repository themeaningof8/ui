/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ScrollArea } from '.'
import { vi } from 'vitest'

describe('ScrollArea', () => {
  it('renders scroll area correctly', () => {
    render(
      <ScrollArea>
        <div>Scrollable content</div>
      </ScrollArea>
    )
    expect(screen.getByTestId('scroll-area')).toBeInTheDocument()
  })

  it('applies custom className to scroll area', () => {
    const customClass = 'custom-class'
    render(
      <ScrollArea className={customClass}>
        <div>Scrollable content</div>
      </ScrollArea>
    )
    const scrollArea = screen.getByTestId('scroll-area')
    expect(scrollArea).toHaveClass(customClass)
  })

  it('renders viewport with correct styles', () => {
    render(
      <ScrollArea>
        <div style={{ height: '1000px' }}>Scrollable content</div>
      </ScrollArea>
    )

    const viewport = screen.getByTestId('scroll-area-viewport')
    expect(viewport).toBeInTheDocument()
    expect(viewport).toHaveStyle({
      'overflow-x': 'hidden',
      'overflow-y': 'scroll'
    })
  })

  it('handles scroll events correctly', () => {
    const onScroll = vi.fn()
    render(
      <ScrollArea onScroll={onScroll}>
        <div style={{ height: '1000px' }}>Scrollable content</div>
      </ScrollArea>
    )

    const viewport = screen.getByTestId('scroll-area-viewport')
    fireEvent.scroll(viewport)
    expect(onScroll).toHaveBeenCalled()
  })

  it('applies correct styles to scroll area', () => {
    render(
      <ScrollArea className="h-[200px]">
        <div style={{ height: '1000px' }}>Scrollable content</div>
      </ScrollArea>
    )
    const scrollArea = screen.getByTestId('scroll-area')
    expect(scrollArea).toHaveClass('relative', 'overflow-hidden')
  })
})