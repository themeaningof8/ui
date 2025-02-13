/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react'
import { ScrollArea } from '.'
import { vi } from 'vitest'

describe('ScrollArea', () => {
  it('renders scroll area correctly', () => {
    render(
      <ScrollArea className="h-[200px]">
        <div>Scrollable content</div>
      </ScrollArea>
    )

    expect(screen.getByText('Scrollable content')).toBeInTheDocument()
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
      <ScrollArea className="h-[200px]">
        <div style={{ height: '1000px' }}>Scrollable content</div>
      </ScrollArea>
    )

    const viewport = screen.getByTestId('scroll-area-viewport')
    expect(viewport).toBeInTheDocument()
    expect(viewport).toHaveStyle({
      'overflow-x': 'scroll',
      'overflow-y': 'scroll'
    })
  })

  it('handles scroll events correctly', async () => {
    const onScroll = vi.fn()
    const scrollHeight = 1000

    render(
      <ScrollArea className="h-[200px]" onScroll={onScroll}>
        <div style={{ height: `${scrollHeight}px` }}>
          Scrollable content
        </div>
      </ScrollArea>
    )

    const viewport = screen.getByTestId('scroll-area-viewport')
    await fireEvent.scroll(viewport, { target: { scrollTop: scrollHeight / 2 } })

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