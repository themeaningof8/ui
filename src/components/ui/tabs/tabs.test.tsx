/**
 * @file Tabsのテスト
 * @description Tabsの機能とアクセシビリティをテスト
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { 
  runAxeTest,
  runKeyboardNavigationTest,
  runAriaAttributesTest,
  runFocusManagementTest,
  runContrastTest
} from '@/tests/wcag3/helpers'

describe('Tabs', () => {
  const defaultTabs = (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">タブ1</TabsTrigger>
        <TabsTrigger value="tab2">タブ2</TabsTrigger>
        <TabsTrigger value="tab3" disabled>タブ3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">コンテンツ1</TabsContent>
      <TabsContent value="tab2">コンテンツ2</TabsContent>
      <TabsContent value="tab3">コンテンツ3</TabsContent>
    </Tabs>
  )

  describe('基本機能', () => {
    it('デフォルトのタブが選択された状態でレンダリングされる', () => {
      render(defaultTabs)

      // タブトリガーが表示されていることを確認
      expect(screen.getByRole('tab', { name: /タブ1/i })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: /タブ2/i })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: /タブ3/i })).toBeInTheDocument()

      // デフォルトのタブが選択されていることを確認
      expect(screen.getByRole('tab', { name: /タブ1/i })).toHaveAttribute('data-state', 'active')
      expect(screen.getByRole('tab', { name: /タブ2/i })).toHaveAttribute('data-state', 'inactive')

      // デフォルトのコンテンツが表示されていることを確認
      expect(screen.getByText('コンテンツ1')).toBeInTheDocument()
      expect(screen.queryByText('コンテンツ2')).not.toBeInTheDocument()
    });

    it('無効化されたタブが適切に表示される', () => {
      render(defaultTabs)
      const disabledTab = screen.getByRole('tab', { name: /タブ3/i })
      expect(disabledTab).toBeDisabled()
      expect(disabledTab).toHaveAttribute('data-state', 'inactive')
    });
  });

  describe('インタラクション', () => {
    it('タブをクリックすると内容が切り替わる', async () => {
      render(defaultTabs)

      // 2番目のタブをクリック
      await userEvent.click(screen.getByRole('tab', { name: /タブ2/i }))

      // タブの状態が変更されていることを確認
      expect(screen.getByRole('tab', { name: /タブ1/i })).toHaveAttribute('data-state', 'inactive')
      expect(screen.getByRole('tab', { name: /タブ2/i })).toHaveAttribute('data-state', 'active')

      // コンテンツが切り替わっていることを確認
      expect(screen.queryByText('コンテンツ1')).not.toBeInTheDocument()
      expect(screen.getByText('コンテンツ2')).toBeInTheDocument()
    });

    it('無効化されたタブはクリックしても状態が変化しない', async () => {
      render(defaultTabs)

      // 無効化されたタブをクリック
      await userEvent.click(screen.getByRole('tab', { name: /タブ3/i }))
      expect(screen.getByRole('tab', { name: /タブ1/i })).toHaveAttribute('data-state', 'active')
      expect(screen.queryByText('コンテンツ3')).not.toBeInTheDocument()
    });

    it('カスタムクラスが適用される', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList className="custom-list">
            <TabsTrigger className="custom-trigger" value="tab1">タブ1</TabsTrigger>
          </TabsList>
          <TabsContent className="custom-content" value="tab1">コンテンツ1</TabsContent>
        </Tabs>
      )

      expect(screen.getByRole('tablist')).toHaveClass('custom-list')
      expect(screen.getByRole('tab')).toHaveClass('custom-trigger')
      expect(screen.getByRole('tabpanel')).toHaveClass('custom-content')
    });
  });

  describe('アクセシビリティ', () => {
    describe('基本的なアクセシビリティ', () => {
      it('axeによる基本的なアクセシビリティ要件を満たす', async () => {
        await runAxeTest(defaultTabs);
      });

      it('キーボードナビゲーションが適切に機能する', () => {
        const { container } = render(defaultTabs);
        runKeyboardNavigationTest(container);
      });

      it('ARIA属性が適切に設定されている', () => {
        const { container } = render(defaultTabs);
        runAriaAttributesTest(container);
      });

      it('フォーカス管理が適切に機能する', () => {
        const { container } = render(defaultTabs);
        runFocusManagementTest(container);
      });

      it('コントラスト要件を満たす', () => {
        const { container } = render(defaultTabs);
        runContrastTest(container);
      });
    });
  });
}); 