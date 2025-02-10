/**
 * @file Tabsコンポーネントのテスト
 * @description Tabsコンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '.'
import userEvent from '@testing-library/user-event'

describe('Tabs', () => {
  describe('基本機能テスト', () => {
    it('基本的なタブが正しくレンダリングされること', () => {
      render(
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">アカウント</TabsTrigger>
            <TabsTrigger value="password">パスワード</TabsTrigger>
          </TabsList>
          <TabsContent value="account">アカウント設定</TabsContent>
          <TabsContent value="password">パスワード設定</TabsContent>
        </Tabs>
      )
      
      expect(screen.getByRole('tablist')).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'アカウント' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'パスワード' })).toBeInTheDocument()
      expect(screen.getByRole('tabpanel')).toHaveTextContent('アカウント設定')
    })

    it('タブの切り替えが正しく動作すること', async () => {
      const user = userEvent.setup()

      render(
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">アカウント</TabsTrigger>
            <TabsTrigger value="password">パスワード</TabsTrigger>
          </TabsList>
          <TabsContent value="account">アカウント設定</TabsContent>
          <TabsContent value="password">パスワード設定</TabsContent>
        </Tabs>
      )
      
      const passwordTab = screen.getByRole('tab', { name: 'パスワード' })
      await user.click(passwordTab)
      
      expect(screen.getByRole('tabpanel')).toHaveTextContent('パスワード設定')
      expect(passwordTab).toHaveAttribute('aria-selected', 'true')
    })
  })

  describe('アクセシビリティテスト', () => {
    it('適切なARIA属性が設定されていること', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList aria-label="設定">
            <TabsTrigger value="tab1">タブ1</TabsTrigger>
            <TabsTrigger value="tab2">タブ2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">コンテンツ1</TabsContent>
          <TabsContent value="tab2">コンテンツ2</TabsContent>
        </Tabs>
      )
      
      const tablist = screen.getByRole('tablist')
      const tab1 = screen.getByRole('tab', { name: 'タブ1' })
      const tabPanel1 = screen.getByRole('tabpanel')
      
      expect(tablist).toHaveAttribute('aria-label', '設定')
      expect(tab1).toHaveAttribute('aria-selected', 'true')
      expect(tabPanel1).toHaveAttribute('aria-labelledby', tab1.id)
    })

    it('キーボード操作が正しく動作すること', async () => {
      const user = userEvent.setup()

      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">タブ1</TabsTrigger>
            <TabsTrigger value="tab2">タブ2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">コンテンツ1</TabsContent>
          <TabsContent value="tab2">コンテンツ2</TabsContent>
        </Tabs>
      )
      
      const tab1 = screen.getByRole('tab', { name: 'タブ1' })
      await user.tab()
      expect(tab1).toHaveFocus()
      
      await user.keyboard('{arrowright}')
      const tab2 = screen.getByRole('tab', { name: 'タブ2' })
      expect(tab2).toHaveFocus()
    })
  })

  describe('スタイルテスト', () => {
    it('デフォルトのスタイルが適用されること', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">タブ1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">コンテンツ1</TabsContent>
        </Tabs>
      )
      
      const tablist = screen.getByRole('tablist')
      expect(tablist).toHaveClass('inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground')
    })

    it('カスタムクラスが適用できること', () => {
      render(
        <Tabs defaultValue="tab1" className="custom-tabs">
          <TabsList className="custom-tablist">
            <TabsTrigger value="tab1" className="custom-trigger">タブ1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="custom-content">コンテンツ1</TabsContent>
        </Tabs>
      )
      
      expect(screen.getByRole('tablist')).toHaveClass('custom-tablist')
      expect(screen.getByRole('tab')).toHaveClass('custom-trigger')
      expect(screen.getByRole('tabpanel')).toHaveClass('custom-content')
    })
  })

  describe('エッジケーステスト', () => {
    it('無効状態のタブが正しく表示されること', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">タブ1</TabsTrigger>
            <TabsTrigger value="tab2" disabled>タブ2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">コンテンツ1</TabsContent>
          <TabsContent value="tab2">コンテンツ2</TabsContent>
        </Tabs>
      )
      
      const disabledTab = screen.getByRole('tab', { name: 'タブ2' })
      expect(disabledTab).toBeDisabled()
      expect(disabledTab).toHaveClass('disabled:pointer-events-none disabled:opacity-50')
    })

    it('動的なタブコンテンツが正しく表示されること', async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()

      render(
        <Tabs defaultValue="tab1" onValueChange={onValueChange}>
          <TabsList>
            <TabsTrigger value="tab1">タブ1</TabsTrigger>
            <TabsTrigger value="tab2">タブ2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div>動的コンテンツ1</div>
          </TabsContent>
          <TabsContent value="tab2">
            <div>動的コンテンツ2</div>
          </TabsContent>
        </Tabs>
      )
      
      const tab2 = screen.getByRole('tab', { name: 'タブ2' })
      await user.click(tab2)
      
      expect(onValueChange).toHaveBeenCalledWith('tab2')
      expect(screen.getByText('動的コンテンツ2')).toBeInTheDocument()
    })
  })

  describe('コンテキストテスト', () => {
    it('ネストされたコンポーネントが正しく表示されること', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">
              <span>アイコン</span>
              <span>タブ1</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div className="space-y-4">
              <h3>設定</h3>
              <p>設定内容</p>
            </div>
          </TabsContent>
        </Tabs>
      )
      
      expect(screen.getByText('アイコン')).toBeInTheDocument()
      expect(screen.getByText('設定')).toBeInTheDocument()
      expect(screen.getByText('設定内容')).toBeInTheDocument()
    })

    it('フォーム要素を含むタブが正しく動作すること', async () => {
      const user = userEvent.setup()
      const onSubmit = vi.fn(e => e.preventDefault())

      render(
        <Tabs defaultValue="form">
          <TabsList>
            <TabsTrigger value="form">フォーム</TabsTrigger>
          </TabsList>
          <TabsContent value="form">
            <form onSubmit={onSubmit}>
              <input type="text" placeholder="入力してください" />
              <button type="submit">送信</button>
            </form>
          </TabsContent>
        </Tabs>
      )
      
      const input = screen.getByPlaceholderText('入力してください')
      const submitButton = screen.getByRole('button', { name: '送信' })
      
      await user.type(input, 'テストデータ')
      await user.click(submitButton)
      
      expect(onSubmit).toHaveBeenCalled()
      expect(input).toHaveValue('テストデータ')
    })
  })
}) 