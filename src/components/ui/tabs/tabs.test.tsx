/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '.'
import { describe, it, expect, vi } from 'vitest'

describe('Tabs', () => {
  it('renders tabs correctly', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    )

    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getAllByRole('tab')).toHaveLength(2)
    expect(screen.getByText('Content 1')).toBeInTheDocument()
  })

  it('applies custom className to components', () => {
    const customClass = 'custom-class'
    render(
      <Tabs defaultValue="tab1">
        <TabsList className={customClass}>
          <TabsTrigger value="tab1" className={customClass}>
            Tab 1
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className={customClass}>
          Content 1
        </TabsContent>
      </Tabs>
    )

    expect(screen.getByRole('tablist')).toHaveClass(customClass)
    expect(screen.getByRole('tab')).toHaveClass(customClass)
    expect(screen.getByRole('tabpanel')).toHaveClass(customClass)
  })

  it('handles tab switching correctly', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    
    render(
      <Tabs defaultValue="tab1" onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    )

    const tab2 = screen.getByRole('tab', { name: 'Tab 2' })
    await user.click(tab2)
    
    expect(onValueChange).toHaveBeenCalledWith('tab2')
    expect(screen.getByText('Content 2')).toBeInTheDocument()
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
  })

  it('handles disabled state correctly', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1" disabled>
            Tab 1
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
      </Tabs>
    )

    const tab = screen.getByRole('tab')
    expect(tab).toBeDisabled()
    expect(tab).toHaveClass('disabled:pointer-events-none')
    expect(tab).toHaveClass('disabled:opacity-50')
  })

  it('applies active state styles correctly', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    )

    const activeTab = screen.getByRole('tab', { selected: true })
    expect(activeTab).toHaveClass('data-[state=active]:bg-background')
    expect(activeTab).toHaveClass('data-[state=active]:text-foreground')
  })

  it('applies focus styles correctly', async () => {
    const user = userEvent.setup()
    
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
      </Tabs>
    )

    const tab = screen.getByRole('tab')
    await user.tab()
    
    expect(tab).toHaveFocus()
    expect(tab).toHaveClass('focus-visible:ring-2')
  })

  it('renders content with correct spacing', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
      </Tabs>
    )

    const content = screen.getByRole('tabpanel')
    expect(content).toHaveClass('mt-2')
  })
}) 