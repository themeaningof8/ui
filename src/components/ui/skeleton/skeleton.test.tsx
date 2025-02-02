/**
 * @file Skeletonコンポーネントのテスト
 * @description Skeletonコンポーネントの機能をテスト
 */

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Skeleton } from '.'

describe('Skeleton', () => {
  it('基本的なスケルトンが表示されること', () => {
    render(<Skeleton data-testid="skeleton" />)
    const skeleton = screen.getByTestId('skeleton')
    
    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveClass('animate-pulse')
    expect(skeleton).toHaveClass('bg-base-subtle')
  })

  it('カスタムサイズが適用されること', () => {
    const height = '100px'
    const width = '200px'
    render(<Skeleton data-testid="skeleton" height={height} width={width} />)
    const skeleton = screen.getByTestId('skeleton')
    
    expect(skeleton).toHaveStyle({ height, width })
  })

  it('円形のスケルトンが表示されること', () => {
    render(<Skeleton data-testid="skeleton" isCircle />)
    const skeleton = screen.getByTestId('skeleton')
    
    expect(skeleton).toHaveClass('rounded-full')
  })

  it('カスタムクラス名が適用されること', () => {
    const customClass = 'custom-class'
    render(<Skeleton data-testid="skeleton" className={customClass} />)
    const skeleton = screen.getByTestId('skeleton')
    
    expect(skeleton).toHaveClass(customClass)
  })
}) 