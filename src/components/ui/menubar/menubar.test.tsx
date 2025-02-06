/**
 * @file メニューバーのテスト
 * @description メニューバーの機能とアクセシビリティをテスト
 */

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { 
  runAxeTest,
  runKeyboardNavigationTest,
  runAriaAttributesTest,
  runFocusManagementTest,
  runContrastTest
} from '@/tests/wcag3/helpers'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  MenubarCheckboxItem,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from '@/components/ui/menubar'
import * as MenubarPrimitive from '@radix-ui/react-menubar'

const MenubarTest = () => (
  <Menubar>
    <MenubarMenu>
      <MenubarTrigger>ファイル</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>新規作成</MenubarItem>
        <MenubarItem>開く</MenubarItem>
        <MenubarItem>保存</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
)

describe('MenubarTest', () => {
  describe('基本機能', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<MenubarTest />)
      expect(screen.getByText('ファイル')).toBeInTheDocument()
    })

    it('メニュー項目が正しく表示される', async () => {
      render(<MenubarTest />)
      const trigger = screen.getByText('ファイル')
      await userEvent.click(trigger)

      expect(screen.getByText('新規作成')).toBeInTheDocument()
      expect(screen.getByText('開く')).toBeInTheDocument()
      expect(screen.getByText('保存')).toBeInTheDocument()
    })

    it('セパレーターが正しく表示される', async () => {
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>ファイル</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>新規作成</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>開く</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      const trigger = screen.getByText('ファイル')
      await userEvent.click(trigger)
      expect(screen.getByRole('separator')).toBeInTheDocument()
    })

    it('ショートカットが正しく表示される', async () => {
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>ファイル</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                新規作成
                <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      const trigger = screen.getByText('ファイル')
      await userEvent.click(trigger)
      expect(screen.getByText('⌘N')).toBeInTheDocument()
    })

    it('ラベルが正しく表示される', async () => {
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>編集</MenubarTrigger>
            <MenubarContent>
              <MenubarLabel>編集オプション</MenubarLabel>
              <MenubarItem>切り取り</MenubarItem>
              <MenubarItem>コピー</MenubarItem>
              <MenubarSeparator />
              <MenubarLabel inset>高度な編集</MenubarLabel>
              <MenubarItem>検索と置換</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      const trigger = screen.getByText('編集')
      await userEvent.click(trigger)

      // ラベルの表示を確認
      expect(screen.getByText('編集オプション')).toBeInTheDocument()
      expect(screen.getByText('高度な編集')).toBeInTheDocument()

      // inset属性が適用されていることを確認
      const insetLabel = screen.getByText('高度な編集')
      expect(insetLabel).toHaveClass('pl-8')

      // メニュー項目が正しく表示されていることを確認
      expect(screen.getByText('切り取り')).toBeInTheDocument()
      expect(screen.getByText('コピー')).toBeInTheDocument()
      expect(screen.getByText('検索と置換')).toBeInTheDocument()
    })
  })

  describe('インタラクション', () => {
    it('チェックボックス項目が正しく機能する', async () => {
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>表示</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem checked>ツールバー</MenubarCheckboxItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      const trigger = screen.getByText('表示')
      await userEvent.click(trigger)

      const checkbox = screen.getByRole('menuitemcheckbox')
      expect(checkbox).toBeInTheDocument()
      expect(checkbox).toHaveAttribute('data-state', 'checked')
    })

    it('ラジオ項目が正しく機能する', async () => {
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>表示</MenubarTrigger>
            <MenubarContent>
              <MenubarPrimitive.RadioGroup value="medium">
                <MenubarRadioItem value="small">小</MenubarRadioItem>
                <MenubarRadioItem value="medium">中</MenubarRadioItem>
                <MenubarRadioItem value="large">大</MenubarRadioItem>
              </MenubarPrimitive.RadioGroup>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      const trigger = screen.getByText('表示')
      await userEvent.click(trigger)

      const radioItems = screen.getAllByRole('menuitemradio')
      expect(radioItems).toHaveLength(3)
      expect(radioItems[1]).toHaveAttribute('data-state', 'checked')
    })

    it('サブメニューが正しく機能する', async () => {
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>編集</MenubarTrigger>
            <MenubarContent>
              <MenubarSub>
                <MenubarSubTrigger>詳細設定</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>設定1</MenubarItem>
                  <MenubarItem>設定2</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      const trigger = screen.getByText('編集')
      await userEvent.click(trigger)

      const subTrigger = screen.getByText('詳細設定')
      expect(subTrigger).toBeInTheDocument()

      await userEvent.hover(subTrigger)
      await userEvent.click(subTrigger)

      await waitFor(() => {
        expect(screen.getByText('設定1')).toBeInTheDocument()
        expect(screen.getByText('設定2')).toBeInTheDocument()
      })
    })
  })

  describe('アクセシビリティ', () => {
    describe('基本的なアクセシビリティ', () => {
      it('axeによる基本的なアクセシビリティ要件を満たす', async () => {
        await runAxeTest(<MenubarTest />);
      });

      it('キーボードナビゲーションが適切に機能する', () => {
        const { container } = render(<MenubarTest />);
        runKeyboardNavigationTest(container);
      });

      it('ARIA属性が適切に設定されている', () => {
        const { container } = render(<MenubarTest />);
        runAriaAttributesTest(container);
      });

      it('フォーカス管理が適切に機能する', () => {
        const { container } = render(<MenubarTest />);
        runFocusManagementTest(container);
      });

      it('コントラスト要件を満たす', () => {
        const { container } = render(<MenubarTest />);
        runContrastTest(container);
      });
    });

    it('キーボード操作が正しく機能する', async () => {
      render(<MenubarTest />)
      const trigger = screen.getByText('ファイル')
      
      // メニューを開く
      await userEvent.tab()
      expect(trigger).toHaveFocus()
      await userEvent.keyboard('{Enter}')
      expect(trigger).toHaveAttribute('aria-expanded', 'true')

      // メニュー項目間の移動
      const getHighlightedItem = () => {
        const items = screen.getAllByRole('menuitem')
        return items.find(item => item.getAttribute('data-highlighted') === '')
      }

      // 最初のメニュー項目が選択される
      await waitFor(() => {
        const highlightedItem = getHighlightedItem()
        expect(highlightedItem).toHaveTextContent('新規作成')
      })

      // 2番目のメニュー項目に移動
      await userEvent.keyboard('{ArrowDown}')
      await waitFor(() => {
        const highlightedItem = getHighlightedItem()
        expect(highlightedItem).toHaveTextContent('開く')
      })

      // 3番目のメニュー項目に移動
      await userEvent.keyboard('{ArrowDown}')
      await waitFor(() => {
        const highlightedItem = getHighlightedItem()
        expect(highlightedItem).toHaveTextContent('保存')
      })

      // メニューを閉じる
      await userEvent.keyboard('{Escape}')
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })
  })
}) 