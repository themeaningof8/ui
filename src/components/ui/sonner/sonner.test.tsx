/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '.'
import { toast } from 'sonner'

// モックの作成
vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn(),
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('Toaster', () => {
  it('renders toaster correctly', () => {
    render(
      <ThemeProvider attribute="class">
        <Toaster />
      </ThemeProvider>
    )
    
    expect(screen.getByRole('region')).toBeInTheDocument()
  })

  it('applies base styles correctly', async () => {
    render(
      <ThemeProvider attribute="class">
        <Toaster />
      </ThemeProvider>
    )
    
    toast('Test message')
    
    await waitFor(() => {
      const toastList = screen.getByRole('list')
      expect(toastList).toHaveClass('toaster')
      expect(toastList).toHaveClass('group')
    })
  })

  it('displays toast message correctly', async () => {
    render(
      <ThemeProvider attribute="class">
        <Toaster />
      </ThemeProvider>
    )
    
    toast('Test message')
    
    await waitFor(() => {
      expect(screen.getByText('Test message')).toBeInTheDocument()
    })
  })

  it('displays success toast correctly', async () => {
    render(
      <ThemeProvider attribute="class">
        <Toaster />
      </ThemeProvider>
    )
    
    toast.success('Success message')
    
    await waitFor(() => {
      expect(screen.getByText('Success message')).toBeInTheDocument()
    })
  })

  it('displays error toast correctly', async () => {
    render(
      <ThemeProvider attribute="class">
        <Toaster />
      </ThemeProvider>
    )
    
    toast.error('Error message')
    
    await waitFor(() => {
      expect(screen.getByText('Error message')).toBeInTheDocument()
    })
  })

  it('applies custom className correctly', async () => {
    const customClass = 'custom-class'
    render(
      <ThemeProvider attribute="class">
        <Toaster className={customClass} />
      </ThemeProvider>
    )
    
    toast('Test message')
    
    await waitFor(() => {
      const toastList = screen.getByRole('list')
      expect(toastList).toHaveClass(customClass)
    })
  })

  it('applies theme styles correctly', async () => {
    render(
      <ThemeProvider attribute="class">
        <Toaster />
      </ThemeProvider>
    )
    
    toast('Test message')

    await waitFor(() => {
      const toastElement = screen.getByRole('listitem')
      expect(toastElement).toHaveClass('group-[.toaster]:bg-step-2')
      expect(toastElement).toHaveClass('group-[.toaster]:text-step-12')
    })
  })

  it('applies action button styles correctly', async () => {
    render(
      <ThemeProvider attribute="class">
        <Toaster />
      </ThemeProvider>
    )
    
    toast('Message with action', {
      action: {
        label: 'Action',
        onClick: () => {},
      },
    })
    
    await waitFor(() => {
      const actionButton = screen.getByText('Action')
      expect(actionButton).toHaveClass('group-[.toast]:bg-step-9')
      expect(actionButton).toHaveClass('group-[.toast]:text-step-1')
    })
  })
}) 