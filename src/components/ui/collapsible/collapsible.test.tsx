/**
 * @file コラプシブルコンポーネントのテスト
 * @description コラプシブルコンポーネントの機能をテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '.'

describe('Collapsibleコンポーネント', () => {
  it('基本的なコラプシブルが正しくレンダリングされること', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>トリガー</CollapsibleTrigger>
        <CollapsibleContent>コンテンツ</CollapsibleContent>
      </Collapsible>
    )

    expect(screen.getByRole('button', { name: 'トリガー' })).toBeInTheDocument()
    const content = screen.getByRole('button', { name: 'トリガー' }).closest('[data-state]')
    expect(content).toHaveAttribute('data-state', 'closed')
  })

  it('トリガーをクリックするとコンテンツの表示が切り替わること', async () => {
    const user = userEvent.setup()
    render(
      <Collapsible>
        <CollapsibleTrigger>トリガー</CollapsibleTrigger>
        <CollapsibleContent>コンテンツ</CollapsibleContent>
      </Collapsible>
    )

    const trigger = screen.getByRole('button', { name: 'トリガー' })
    const content = trigger.closest('[data-state]')

    // 初期状態では非表示
    expect(content).toHaveAttribute('data-state', 'closed')

    // トリガーをクリックすると表示される
    await user.click(trigger)
    await waitFor(() => {
      expect(content).toHaveAttribute('data-state', 'open')
    })

    // もう一度クリックすると非表示になる
    await user.click(trigger)
    await waitFor(() => {
      expect(content).toHaveAttribute('data-state', 'closed')
    })
  })

  it('カスタムクラス名が正しく適用されること', () => {
    const { container } = render(
      <Collapsible className="custom-collapsible">
        <CollapsibleTrigger className="custom-trigger">トリガー</CollapsibleTrigger>
        <CollapsibleContent className="custom-content">コンテンツ</CollapsibleContent>
      </Collapsible>
    )

    const root = container.querySelector('.custom-collapsible')
    const trigger = screen.getByRole('button', { name: 'トリガー' })
    const content = container.querySelector('.custom-content')

    expect(root).toBeInTheDocument()
    expect(trigger).toHaveClass('custom-trigger')
    expect(content).toBeInTheDocument()
  })

  it('デフォルトで開いた状態で表示できること', async () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>トリガー</CollapsibleTrigger>
        <CollapsibleContent>コンテンツ</CollapsibleContent>
      </Collapsible>
    )

    await waitFor(() => {
      const content = screen.getByRole('button', { name: 'トリガー' }).closest('[data-state]')
      expect(content).toHaveAttribute('data-state', 'open')
    })
  })

  it('無効化状態が正しく機能すること', () => {
    render(
      <Collapsible disabled>
        <CollapsibleTrigger>トリガー</CollapsibleTrigger>
        <CollapsibleContent>コンテンツ</CollapsibleContent>
      </Collapsible>
    )

    const trigger = screen.getByRole('button', { name: 'トリガー' })
    const content = trigger.closest('[data-state]')

    expect(content).toHaveAttribute('data-state', 'closed')
    expect(trigger).toBeDisabled()
    expect(content).toHaveAttribute('data-disabled')
  })
}) 