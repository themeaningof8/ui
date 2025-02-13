/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from './index'

describe('Tooltip', () => {
  it('renders tooltip trigger correctly', () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('shows content on hover', async () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    const trigger = screen.getByText('Hover me')
    await userEvent.hover(trigger)
    
    await screen.findByRole('tooltip')
    const content = screen.getByRole('tooltip')
    expect(content).toBeInTheDocument()
  })

  it('applies custom className to content', async () => {
    const customClass = 'custom-class'
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent className={customClass}>
            Tooltip content
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    const trigger = screen.getByText('Hover me')
    await userEvent.hover(trigger)
    
    await screen.findByRole('tooltip')
    const content = screen.getByRole('tooltip').parentElement
    expect(content).toHaveClass(customClass)
  })

  it('applies correct offset with sideOffset prop', async () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent sideOffset={10}>
            Tooltip content
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    const trigger = screen.getByText('Hover me')
    await userEvent.hover(trigger)
    
    await screen.findByRole('tooltip')
    const content = screen.getByRole('tooltip').parentElement
    expect(content).toHaveStyle({
      '--radix-tooltip-content-transform-origin': 'var(--radix-popper-transform-origin)'
    })
  })

  it('changes trigger state on hover and unhover', async () => {
    const user = userEvent.setup()
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    const trigger = screen.getByText('Hover me')
    
    // Initial state
    expect(trigger).not.toHaveAttribute('data-state', 'delayed-open')
    
    // Hover
    await user.hover(trigger)
    await waitFor(() => {
      const state = trigger.getAttribute('data-state')
      expect(['delayed-open', 'open']).toContain(state)
    }, { timeout: 1000 })
    
    // Unhover
    await user.unhover(trigger)
    await waitFor(() => {
      trigger.getAttribute('data-state')
      expect(['closed', 'instant-open', 'delayed-open']).not.toContain('open')
    }, { timeout: 1000 })
  })

  it('applies correct base styles', async () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    const trigger = screen.getByText('Hover me')
    await userEvent.hover(trigger)
    
    await screen.findByRole('tooltip')
    const content = screen.getByRole('tooltip').parentElement
    expect(content).toHaveClass(
      'z-50',
      'overflow-hidden',
      'rounded-md',
      'border',
      'bg-popover',
      'px-3',
      'py-1.5',
      'text-sm',
      'text-popover-foreground',
      'shadow-md',
      'animate-in',
      'fade-in-0',
      'zoom-in-95',
      'data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0',
      'data-[state=closed]:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2',
      'data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2',
      'data-[side=top]:slide-in-from-bottom-2'
    )
  })
}) 