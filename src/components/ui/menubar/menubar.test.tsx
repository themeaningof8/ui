/**
 * @file Menubarコンポーネントのテスト
 * @description Menubar関連コンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@/tests/test-utils'
import { userEvent } from '@testing-library/user-event'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
} from '.'

describe('Menubar', () => {
  describe('基本機能テスト', () => {
    it('メニューバーが正しくレンダリングされること', () => {
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>ファイル</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>新規作成</MenubarItem>
              <MenubarItem>開く</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>保存</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      expect(screen.getByText('ファイル')).toBeInTheDocument()
    })

    it('トリガーをクリックするとメニューが開くこと', async () => {
      const user = userEvent.setup()
      
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>ファイル</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>新規作成</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      const trigger = screen.getByText('ファイル')
      await user.click(trigger)

      await waitFor(() => {
        expect(screen.getByText('新規作成')).toBeVisible()
      })
    })

    it('サブメニューが正しく動作すること', async () => {
      const user = userEvent.setup()
      
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>編集</MenubarTrigger>
            <MenubarContent>
              <MenubarSub>
                <MenubarSubTrigger>詳細設定</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>オプション1</MenubarItem>
                  <MenubarItem>オプション2</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      const trigger = screen.getByText('編集')
      await user.click(trigger)
      
      await waitFor(() => {
        expect(screen.getByText('詳細設定')).toBeVisible()
      })

      await user.hover(screen.getByText('詳細設定'))
      
      await waitFor(() => {
        expect(screen.getByText('オプション1')).toBeVisible()
        expect(screen.getByText('オプション2')).toBeVisible()
      })
    })
  })

  describe('インタラクティブ要素テスト', () => {
    it('チェックボックスアイテムが正しく動作すること', async () => {
      const user = userEvent.setup()
      
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>表示</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem>ツールバー</MenubarCheckboxItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      const trigger = screen.getByText('表示')
      await user.click(trigger)
      
      const checkbox = await screen.findByRole('menuitemcheckbox', { name: 'ツールバー' })
      await user.click(checkbox)
      
      expect(checkbox).toHaveAttribute('aria-checked', 'true')
    })

    it('ラジオグループが正しく動作すること', async () => {
      const user = userEvent.setup()
      
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>表示</MenubarTrigger>
            <MenubarContent>
              <MenubarRadioGroup value="small">
                <MenubarRadioItem value="small">小</MenubarRadioItem>
                <MenubarRadioItem value="medium">中</MenubarRadioItem>
                <MenubarRadioItem value="large">大</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      const trigger = screen.getByText('表示')
      await user.click(trigger)
      
      const mediumOption = await screen.findByRole('menuitemradio', { name: '中' })
      await user.click(mediumOption)
      
      expect(mediumOption).toHaveAttribute('aria-checked', 'true')
    })
  })

  describe('アクセシビリティテスト', () => {
    it('適切なARIA属性が設定されていること', async () => {
      const user = userEvent.setup()
      
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>ファイル</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>新規作成</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      const menubar = screen.getByRole('menubar')
      expect(menubar).toBeInTheDocument()

      const trigger = screen.getByRole('button')
      await user.click(trigger)

      await waitFor(() => {
        const menu = screen.getByRole('menu')
        expect(menu).toBeInTheDocument()
        expect(menu).toHaveAttribute('aria-labelledby')
      })
    })

    it('キーボード操作が正しく機能すること', async () => {
      const user = userEvent.setup()
      
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>ファイル</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>新規作成</MenubarItem>
              <MenubarItem>開く</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      const trigger = screen.getByText('ファイル')
      await user.tab()
      expect(trigger).toHaveFocus()

      await user.keyboard('{Enter}')
      await waitFor(() => {
        expect(screen.getByText('新規作成')).toBeVisible()
      })

      await user.keyboard('{ArrowDown}')
      expect(screen.getByText('開く')).toHaveFocus()
    })
  })

  describe('スタイルテスト', () => {
    it('カスタムクラスが適用できること', () => {
      render(
        <Menubar className="custom-menubar">
          <MenubarMenu>
            <MenubarTrigger className="custom-trigger">ファイル</MenubarTrigger>
            <MenubarContent className="custom-content">
              <MenubarItem className="custom-item">新規作成</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      expect(screen.getByRole('menubar')).toHaveClass('custom-menubar')
      expect(screen.getByText('ファイル')).toHaveClass('custom-trigger')
    })

    it('ショートカットが正しく表示されること', async () => {
      const user = userEvent.setup()
      
      render(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>編集</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                コピー
                <MenubarShortcut>⌘C</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )

      const trigger = screen.getByText('編集')
      await user.click(trigger)

      await waitFor(() => {
        expect(screen.getByText('⌘C')).toBeVisible()
      })
    })
  })
}) 