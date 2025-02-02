/**
 * @file HoverCardコンポーネントのテスト
 * @description HoverCardコンポーネントの機能とアクセシビリティをテスト
 */

import { describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Button } from '@/components/ui/button'

describe('HoverCard', () => {
  it('トリガーにホバーするとコンテンツが表示されること', async () => {
    render(
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button>ホバーしてください</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div>ホバーカードの内容</div>
        </HoverCardContent>
      </HoverCard>,
    )

    const trigger = screen.getByRole('button', { name: 'ホバーしてください' })
    await userEvent.hover(trigger)

    await waitFor(() => {
      expect(screen.getByText('ホバーカードの内容')).toBeInTheDocument()
    })
  })

  it('トリガーからマウスが離れるとコンテンツが非表示になること', async () => {
    render(
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button>ホバーしてください</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div>ホバーカードの内容</div>
        </HoverCardContent>
      </HoverCard>,
    )

    const trigger = screen.getByRole('button', { name: 'ホバーしてください' })
    await userEvent.hover(trigger)

    await waitFor(() => {
      expect(screen.getByText('ホバーカードの内容')).toBeInTheDocument()
    })

    await userEvent.unhover(trigger)

    await waitFor(() => {
      expect(screen.queryByText('ホバーカードの内容')).not.toBeInTheDocument()
    })
  })

  it('異なる配置でコンテンツが表示されること', async () => {
    render(
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button>ホバーしてください</Button>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          <div>左寄せコンテンツ</div>
        </HoverCardContent>
      </HoverCard>,
    )

    const trigger = screen.getByRole('button', { name: 'ホバーしてください' })
    await userEvent.hover(trigger)

    await waitFor(() => {
      const content = screen.getByText('左寄せコンテンツ')
      expect(content).toBeInTheDocument()
      expect(content.parentElement).toHaveAttribute('data-align', 'start')
    })
  })

  it('カスタムクラス名が適用されること', async () => {
    render(
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button>ホバーしてください</Button>
        </HoverCardTrigger>
        <HoverCardContent className="custom-class">
          <div>カスタムスタイルのコンテンツ</div>
        </HoverCardContent>
      </HoverCard>,
    )

    const trigger = screen.getByRole('button', { name: 'ホバーしてください' })
    await userEvent.hover(trigger)

    await waitFor(() => {
      const content = screen.getByText('カスタムスタイルのコンテンツ')
      expect(content.parentElement).toHaveClass('custom-class')
    })
  })
}) 