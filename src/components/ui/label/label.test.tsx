/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { Label } from '.'
import { describe, it, expect, vi } from 'vitest'

describe('Label', () => {
  it('renders label text correctly', () => {
    render(<Label>Test Label</Label>)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const customClass = 'custom-class'
    render(<Label className={customClass}>Test Label</Label>)
    expect(screen.getByText('Test Label')).toHaveClass(customClass)
  })
  
  it('applies disabled styles when peer is disabled', () => {
    render(
      <div>
        <input disabled />
        <Label>Disabled Label</Label>
      </div>
    )
    const label = screen.getByText('Disabled Label')
    expect(label).toHaveClass('peer-disabled:cursor-not-allowed')
    expect(label).toHaveClass('peer-disabled:opacity-70')
  })
}) 