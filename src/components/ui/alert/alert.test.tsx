/**
 * @file alert.test.tsx
 * @description Alertコンポーネントのテストファイル
 * @package components
 */

/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { Alert, AlertTitle, AlertDescription } from '.'
import { describe, it, expect } from 'vitest'

describe('Alert', () => {
  it('renders alert with default variant', () => {
    render(
      <Alert>
        <AlertTitle>タイトル</AlertTitle>
        <AlertDescription>説明文</AlertDescription>
      </Alert>
    )

    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('border-step-6')
    expect(alert).toHaveClass('bg-step-2')
    expect(alert).toHaveClass('text-step-12')
  })

  it('renders alert with destructive variant', () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>エラー</AlertTitle>
        <AlertDescription>エラーが発生しました</AlertDescription>
      </Alert>
    )

    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('border-destructive-step-6')
    expect(alert).toHaveClass('bg-destructive-step-2')
    expect(alert).toHaveClass('text-destructive-step-12')
  })

  it('renders alert with custom className', () => {
    const customClass = 'custom-class'
    render(
      <Alert className={customClass}>
        <AlertTitle>タイトル</AlertTitle>
        <AlertDescription>説明文</AlertDescription>
      </Alert>
    )

    expect(screen.getByRole('alert')).toHaveClass(customClass)
  })

  it('renders alert with title and description', () => {
    render(
      <Alert>
        <AlertTitle>タイトル</AlertTitle>
        <AlertDescription>説明文</AlertDescription>
      </Alert>
    )

    expect(screen.getByText('タイトル')).toBeInTheDocument()
    expect(screen.getByText('説明文')).toBeInTheDocument()
  })

  it('renders AlertTitle with custom className', () => {
    const customClass = 'custom-title'
    render(
      <Alert>
        <AlertTitle className={customClass}>タイトル</AlertTitle>
      </Alert>
    )

    expect(screen.getByText('タイトル')).toHaveClass(customClass)
  })

  it('renders AlertDescription with custom className', () => {
    const customClass = 'custom-description'
    render(
      <Alert>
        <AlertDescription className={customClass}>説明文</AlertDescription>
      </Alert>
    )

    expect(screen.getByText('説明文')).toHaveClass(customClass)
  })
}) 