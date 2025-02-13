/**
 * @file Hoverカードコンポーネントのテスト
 * @description Hoverカードコンポーネントの機能をテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '.'

describe('HoverCardコンポーネント', () => {
  it('トリガー要素にホバーした時にコンテンツが表示されること', async () => {
    const user = userEvent.setup()
    render(
      <HoverCard>
        <HoverCardTrigger asChild>
          <button type="button">ホバーしてください</button>
        </HoverCardTrigger>
        <HoverCardContent>
          <p>ホバーカードの内容</p>
        </HoverCardContent>
      </HoverCard>
    )

    const trigger = screen.getByText('ホバーしてください')
    await user.hover(trigger)

    await waitFor(() => {
      expect(screen.getByText('ホバーカードの内容')).toBeInTheDocument()
    })

    await user.unhover(trigger)
    await waitFor(() => {
      expect(screen.queryByText('ホバーカードの内容')).not.toBeInTheDocument()
    })
  })

  it('カスタムクラスが適用されること', () => {
    render(
      <HoverCard>
        <HoverCardTrigger className="custom-trigger">
          <button type="button">ホバーしてください</button>
        </HoverCardTrigger>
        <HoverCardContent className="custom-content">
          <p>ホバーカードの内容</p>
        </HoverCardContent>
      </HoverCard>
    )

    const trigger = screen.getByText('ホバーしてください')
    expect(trigger.parentElement).toHaveClass('custom-trigger')
  })
}) 