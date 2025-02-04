/**
 * @file Spinnerのテスト
 * @description Spinnerの機能とアクセシビリティをテスト
 */

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Spinner } from '@/components/ui/spinner'

describe('Spinner', () => {
  it('デフォルトのサイズで表示されること', () => {
    render(<Spinner />)
    const spinner = screen.getByText('Loading...')
    expect(spinner).toBeInTheDocument()
    expect(spinner.parentElement).toHaveClass('w-6 h-6') // mdサイズのデフォルト値
  })

  it('指定したサイズで表示されること', () => {
    render(<Spinner size="sm" />)
    const spinner = screen.getByText('Loading...')
    expect(spinner.parentElement).toHaveClass('w-4 h-4')
  })

  it('アクセシビリティ要件を満たすこと', () => {
    render(<Spinner />)
    const spinner = screen.getByText('Loading...')
    expect(spinner).toHaveClass('sr-only')
  })

  it('追加のクラス名が適用されること', () => {
    render(<Spinner className="test-class" />)
    const spinner = screen.getByText('Loading...').parentElement
    expect(spinner).toHaveClass('test-class')
  })
}) 