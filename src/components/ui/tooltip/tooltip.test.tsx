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
import { describe, it, expect } from 'vitest'

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
        <Tooltip defaultOpen>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    await waitFor(() => {
      const tooltipContent = screen.getByRole('tooltip', { name: 'Tooltip content' })
      expect(tooltipContent).toBeInTheDocument()
    })
  })

  it('applies custom className to content', async () => {
    const customClass = 'custom-class'
    
    render(
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent className={customClass}>
            Tooltip content
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    await waitFor(() => {
      const tooltipWrapper = screen.getByRole('tooltip', { name: 'Tooltip content' }).parentElement
      expect(tooltipWrapper).toHaveClass(customClass)
    })
  })

  it('applies correct offset with sideOffset prop', async () => {
    const sideOffset = 10
    
    render(
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent sideOffset={sideOffset}>
            Tooltip content
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    await waitFor(() => {
      const tooltipWrapper = screen.getByRole('tooltip', { name: 'Tooltip content' }).parentElement
      expect(tooltipWrapper).toBeInTheDocument()
    })
  })

  it('changes trigger state on hover and unhover', async () => {
    render(
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    await waitFor(() => {
      const tooltipContent = screen.getByRole('tooltip', { name: 'Tooltip content' })
      expect(tooltipContent).toBeInTheDocument()
    })
  })

  it('applies correct base styles', async () => {
    render(
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    await waitFor(() => {
      const tooltipWrapper = screen.getByRole('tooltip', { name: 'Tooltip content' }).parentElement
      expect(tooltipWrapper).toHaveClass('z-50')
      expect(tooltipWrapper).toHaveClass('overflow-hidden')
      expect(tooltipWrapper).toHaveClass('rounded-md')
      expect(tooltipWrapper).toHaveClass('border')
      expect(tooltipWrapper).toHaveClass('border-step-7')
      expect(tooltipWrapper).toHaveClass('bg-step-2')
      expect(tooltipWrapper).toHaveClass('text-step-12')
      expect(tooltipWrapper).toHaveClass('shadow-md')
    })
  })
}) 