/**
 * @file HoverCardコンポーネントのテスト
 * @description HoverCardコンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@/tests/test-utils'
import { userEvent } from '@testing-library/user-event'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '.'
import { waitForElementToBeVisible, waitForElementToBeHidden } from '@/tests/helpers'

describe('HoverCard', () => {
  describe('基本表示テスト', () => {
    it('トリガー要素が正しくレンダリングされること', () => {
      render(
        <HoverCard>
          <HoverCardTrigger asChild>
            <button type="button">ホバーしてください</button>
          </HoverCardTrigger>
          <HoverCardContent>
            <h3>ホバーカードのタイトル</h3>
            <p>ホバーカードの説明文をここに記述します。ユーザーに対して補足情報を提供します。</p>
          </HoverCardContent>
        </HoverCard>
      )

      expect(screen.getByText('ホバーしてください')).toBeInTheDocument()
    })

    it('ホバー時にコンテンツが表示され、ホバー解除で非表示になること', async () => {
      const user = userEvent.setup()
      
      render(
        <HoverCard>
          <HoverCardTrigger asChild>
            <button type="button">ホバーしてください</button>
          </HoverCardTrigger>
          <HoverCardContent>
            <h3>ホバーカードのタイトル</h3>
            <p>ホバーカードの説明文をここに記述します。ユーザーに対して補足情報を提供します。</p>
          </HoverCardContent>
        </HoverCard>
      )

      const trigger = screen.getByText('ホバーしてください')
      
      // ホバー前は非表示
      expect(screen.queryByText('ホバーカードのタイトル')).not.toBeInTheDocument()
      
      // ホバー時に表示
      await user.hover(trigger)
      await waitForElementToBeVisible('ホバーカードのタイトル')
      expect(screen.getByText('ホバーカードの説明文をここに記述します。ユーザーに対して補足情報を提供します。')).toBeInTheDocument()
      
      // ホバー解除で非表示
      await user.unhover(trigger)
      await waitForElementToBeHidden('ホバーカードのタイトル')
      expect(screen.queryByText('ホバーカードのタイトル')).not.toBeInTheDocument()
    })
  })

  describe('カスタムコンテンツテスト', () => {
    it('商品情報が正しく表示されること', async () => {
      const user = userEvent.setup()
      
      render(
        <HoverCard>
          <HoverCardTrigger asChild>
            <button type="button">商品情報</button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">商品名: テスト商品</h4>
              <ul className="text-sm">
                <li>特徴1: 高品質な素材を使用</li>
                <li>特徴2: 耐久性に優れている</li>
                <li>特徴3: 使いやすいデザイン</li>
                <li>特徴4: 環境に配慮した製品</li>
              </ul>
              <p className="text-sm font-semibold">価格: ¥10,000</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      )

      const trigger = screen.getByText('商品情報')
      await user.hover(trigger)
      
      // 商品情報の表示を確認
      await waitForElementToBeVisible('商品名: テスト商品')
      expect(screen.getByText('特徴1: 高品質な素材を使用')).toBeInTheDocument()
      expect(screen.getByText('価格: ¥10,000')).toBeInTheDocument()
    })
  })

  describe('アクセシビリティテスト', () => {
    it('適切なARIA属性が設定されていること', async () => {
      const user = userEvent.setup()
      
      render(
        <HoverCard>
          <HoverCardTrigger asChild>
            <button type="button">ホバーしてください</button>
          </HoverCardTrigger>
          <HoverCardContent>
            <h3>ホバーカードのタイトル</h3>
            <p>ホバーカードの説明文</p>
          </HoverCardContent>
        </HoverCard>
      )

      const trigger = screen.getByRole('button')
      await user.hover(trigger)
      
      await waitFor(() => {
        const content = screen.getByRole('dialog')
        expect(content).toHaveAttribute('aria-modal', 'false')
        expect(content).toHaveAttribute('role', 'dialog')
      })
    })
  })
}) 