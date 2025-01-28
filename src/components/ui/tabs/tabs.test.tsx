/**
 * Tabsコンポーネントのテスト
 * @module TabsTest
 */

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs'

describe('Tabs', () => {
  const defaultTabs = (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3" disabled>Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
      <TabsContent value="tab3">Content 3</TabsContent>
    </Tabs>
  )

  it('renders tabs with default selected tab', () => {
    render(defaultTabs)

    // タブトリガーが表示されていることを確認
    expect(screen.getByRole('tab', { name: /tab 1/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /tab 2/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /tab 3/i })).toBeInTheDocument()

    // デフォルトのタブが選択されていることを確認
    expect(screen.getByRole('tab', { name: /tab 1/i })).toHaveAttribute('data-state', 'active')
    expect(screen.getByRole('tab', { name: /tab 2/i })).toHaveAttribute('data-state', 'inactive')

    // デフォルトのコンテンツが表示されていることを確認
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
  })

  it('switches tabs when clicking triggers', async () => {
    render(defaultTabs)

    // 2番目のタブをクリック
    await userEvent.click(screen.getByRole('tab', { name: /tab 2/i }))

    // タブの状態が変更されていることを確認
    expect(screen.getByRole('tab', { name: /tab 1/i })).toHaveAttribute('data-state', 'inactive')
    expect(screen.getByRole('tab', { name: /tab 2/i })).toHaveAttribute('data-state', 'active')

    // コンテンツが切り替わっていることを確認
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })

  it('handles disabled tabs correctly', async () => {
    render(defaultTabs)

    // 無効化されたタブが正しく表示されていることを確認
    const disabledTab = screen.getByRole('tab', { name: /tab 3/i })
    expect(disabledTab).toBeDisabled()
    expect(disabledTab).toHaveAttribute('data-state', 'inactive')

    // 無効化されたタブをクリックしても状態が変わらないことを確認
    await userEvent.click(disabledTab)
    expect(screen.getByRole('tab', { name: /tab 1/i })).toHaveAttribute('data-state', 'active')
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument()
  })

  it('applies custom className to tab components', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList className="custom-list">
          <TabsTrigger className="custom-trigger" value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent className="custom-content" value="tab1">Content 1</TabsContent>
      </Tabs>
    )

    expect(screen.getByRole('tablist')).toHaveClass('custom-list')
    expect(screen.getByRole('tab')).toHaveClass('custom-trigger')
    expect(screen.getByRole('tabpanel')).toHaveClass('custom-content')
  })

  it('forwards refs correctly', () => {
    const listRef = React.createRef<HTMLDivElement>()
    const triggerRef = React.createRef<HTMLButtonElement>()
    const contentRef = React.createRef<HTMLDivElement>()

    render(
      <Tabs defaultValue="tab1">
        <TabsList ref={listRef}>
          <TabsTrigger ref={triggerRef} value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent ref={contentRef} value="tab1">Content 1</TabsContent>
      </Tabs>
    )

    expect(listRef.current).toBeInstanceOf(HTMLDivElement)
    expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement)
    expect(contentRef.current).toBeInstanceOf(HTMLDivElement)
  })

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup()
    render(defaultTabs)

    // 最初のタブにフォーカス
    const firstTab = screen.getByRole('tab', { name: /tab 1/i })
    await user.click(firstTab) // クリックでフォーカスを設定（より安定した方法）
    await waitFor(() => {
      expect(firstTab).toHaveFocus()
    })

    // 右矢印キーで次のタブに移動
    await user.keyboard('{ArrowRight}')
    await waitFor(() => {
      expect(screen.getByRole('tab', { name: /tab 2/i })).toHaveFocus()
    })

    // 右矢印キーで無効化されたタブをスキップ
    await user.keyboard('{ArrowRight}')
    await waitFor(() => {
      expect(screen.getByRole('tab', { name: /tab 1/i })).toHaveFocus()
    })

    // 左矢印キーで前のタブに移動
    await user.keyboard('{ArrowLeft}')
    await waitFor(() => {
      expect(screen.getByRole('tab', { name: /tab 2/i })).toHaveFocus()
    })
  })
}) 