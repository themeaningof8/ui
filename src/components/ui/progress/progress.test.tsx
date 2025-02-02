/**
 * @file Progressコンポーネントのテスト
 * @description Progressコンポーネントの機能とアクセシビリティをテスト
 */

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Progress } from '.'

describe('Progress', () => {
  it('基本的なプログレスバーが表示されること', () => {
    render(<Progress value={50} />)
    const progress = screen.getByRole('progressbar')
    
    expect(progress).toBeInTheDocument()
    expect(progress).toHaveAttribute('aria-valuenow', '50')
  })

  it('異なるサイズが適用されること', () => {
    render(<Progress value={50} size="sm" />)
    const progress = screen.getByRole('progressbar')
    
    expect(progress).toHaveClass('h-2')
  })

  it('不定の進捗状態が表示されること', () => {
    render(<Progress isIndeterminate />)
    const progress = screen.getByRole('progressbar')
    const indicator = progress.querySelector('[class*="animate-indeterminate-progress"]')
    
    expect(indicator).toBeInTheDocument()
  })

  it('カスタムクラス名が適用されること', () => {
    const customClass = 'custom-class'
    render(<Progress value={50} className={customClass} />)
    const progress = screen.getByRole('progressbar')
    
    expect(progress).toHaveClass(customClass)
  })

  it('アクセシビリティ要件を満たすこと', () => {
    render(<Progress value={50} />)
    const progress = screen.getByRole('progressbar')
    
    expect(progress).toHaveAttribute('aria-valuenow', '50')
    expect(progress).toHaveAttribute('aria-valuemin', '0')
    expect(progress).toHaveAttribute('aria-valuemax', '100')
  })
}) 