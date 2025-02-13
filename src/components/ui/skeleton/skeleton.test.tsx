/**
 * @file src/components/ui/skeleton/skeleton.test.tsx
 * @description Skeletonコンポーネントのテスト
 */

import { render, screen } from '@testing-library/react'
import { Skeleton } from '.';

describe('Skeleton', () => {
  it('renders skeleton correctly', () => {
    render(<Skeleton />)
    const elements = screen.getAllByRole('generic')
    expect(elements[elements.length - 1]).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const customClass = 'custom-class'
    render(<Skeleton className={customClass} />)
    const elements = screen.getAllByRole('generic')
    expect(elements[elements.length - 1]).toHaveClass(customClass)
  })

  it('applies base styles correctly', () => {
    render(<Skeleton />)
    const elements = screen.getAllByRole('generic')
    const skeleton = elements[elements.length - 1]
    expect(skeleton).toHaveClass('animate-pulse')
    expect(skeleton).toHaveClass('rounded-md')
    expect(skeleton).toHaveClass('bg-muted')
  })

  it('renders with custom dimensions', () => {
    render(<Skeleton className="h-12 w-12" />)
    const elements = screen.getAllByRole('generic')
    const skeleton = elements[elements.length - 1]
    expect(skeleton).toHaveClass('h-12')
    expect(skeleton).toHaveClass('w-12')
  })

  it('renders with custom shape', () => {
    render(<Skeleton className="rounded-full" />)
    const elements = screen.getAllByRole('generic')
    expect(elements[elements.length - 1]).toHaveClass('rounded-full')
  })

  it('forwards additional props', () => {
    const dataTestId = 'test-skeleton'
    render(<Skeleton data-testid={dataTestId} />)
    expect(screen.getByTestId(dataTestId)).toBeInTheDocument()
  })

  it('renders children correctly', () => {
    render(
      <Skeleton>
        <div>Loading content</div>
      </Skeleton>
    )
    expect(screen.getByText('Loading content')).toBeInTheDocument()
  })

  it('combines multiple classes correctly', () => {
    render(
      <Skeleton className="h-12 w-12 rounded-full bg-gray-200" />
    )
    const elements = screen.getAllByRole('generic')
    const skeleton = elements[elements.length - 1]
    expect(skeleton).toHaveClass('h-12')
    expect(skeleton).toHaveClass('w-12')
    expect(skeleton).toHaveClass('rounded-full')
    expect(skeleton).toHaveClass('bg-gray-200')
  })
}) 