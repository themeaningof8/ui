/**
 * @file Resizableコンポーネントのテスト
 * @description Resizable関連コンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@/tests/test-utils'
import { userEvent } from '@testing-library/user-event'
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '.'

describe('Resizable', () => {
  describe('基本機能テスト', () => {
    it('パネルグループが正しくレンダリングされること', () => {
      render(
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>パネル1</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>パネル2</ResizablePanel>
        </ResizablePanelGroup>
      )

      expect(screen.getByText('パネル1')).toBeInTheDocument()
      expect(screen.getByText('パネル2')).toBeInTheDocument()
      expect(screen.getByRole('separator')).toBeInTheDocument()
    })

    it('デフォルトのサイズが正しく設定されること', () => {
      render(
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={30}>パネル1</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={70}>パネル2</ResizablePanel>
        </ResizablePanelGroup>
      )

      const panel1 = screen.getByText('パネル1').parentElement
      const panel2 = screen.getByText('パネル2').parentElement

      expect(panel1).toHaveStyle({ flexBasis: '30%' })
      expect(panel2).toHaveStyle({ flexBasis: '70%' })
    })
  })

  describe('インタラクティブ機能テスト', () => {
    it('ハンドルのドラッグでサイズが変更できること', async () => {
      const user = userEvent.setup()
      
      render(
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel minSize={20}>パネル1</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize={20}>パネル2</ResizablePanel>
        </ResizablePanelGroup>
      )

      const handle = screen.getByRole('separator')
      
      // マウスダウン
      await user.pointer({ target: handle, keys: '[MouseLeft>]' })
      
      // ドラッグ
      fireEvent.mouseMove(handle, {
        clientX: 100,
        clientY: 0,
      })
      
      // マウスアップ
      await user.pointer({ target: handle, keys: '[/MouseLeft]' })
      
      // サイズが変更されたことを確認
      const panel1 = screen.getByText('パネル1').parentElement
      expect(panel1).not.toHaveStyle({ flexBasis: '50%' })
    })

    it('最小サイズが守られること', async () => {
      const user = userEvent.setup()
      
      render(
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel minSize={30}>パネル1</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize={30}>パネル2</ResizablePanel>
        </ResizablePanelGroup>
      )

      const handle = screen.getByRole('separator')
      
      // 極端な位置までドラッグ
      await user.pointer({ target: handle, keys: '[MouseLeft>]' })
      fireEvent.mouseMove(handle, {
        clientX: -1000,
        clientY: 0,
      })
      await user.pointer({ target: handle, keys: '[/MouseLeft]' })
      
      const panel1 = screen.getByText('パネル1').parentElement
      expect(panel1).toHaveStyle({ flexBasis: '30%' })
    })
  })

  describe('アクセシビリティテスト', () => {
    it('適切なARIA属性が設定されていること', () => {
      render(
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>パネル1</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>パネル2</ResizablePanel>
        </ResizablePanelGroup>
      )

      const handle = screen.getByRole('separator')
      expect(handle).toHaveAttribute('aria-orientation', 'horizontal')
      expect(handle).toHaveAttribute('aria-valuenow')
    })

    it('キーボード操作が正しく機能すること', async () => {
      const user = userEvent.setup()
      
      render(
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>パネル1</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>パネル2</ResizablePanel>
        </ResizablePanelGroup>
      )

      const handle = screen.getByRole('separator')
      
      // Tabキーでフォーカス
      await user.tab()
      expect(handle).toHaveFocus()

      // 矢印キーでサイズ変更
      await user.keyboard('{ArrowRight}')
      const panel1 = screen.getByText('パネル1').parentElement
      expect(panel1).not.toHaveStyle({ flexBasis: '50%' })
    })
  })

  describe('スタイルテスト', () => {
    it('カスタムクラスが適用できること', () => {
      render(
        <ResizablePanelGroup direction="horizontal" className="custom-group">
          <ResizablePanel className="custom-panel">パネル1</ResizablePanel>
          <ResizableHandle className="custom-handle" />
          <ResizablePanel className="custom-panel">パネル2</ResizablePanel>
        </ResizablePanelGroup>
      )

      expect(screen.getByRole('group')).toHaveClass('custom-group')
      expect(screen.getAllByRole('region')[0]).toHaveClass('custom-panel')
      expect(screen.getByRole('separator')).toHaveClass('custom-handle')
    })

    it('方向に応じたスタイルが適用されること', () => {
      render(
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel>パネル1</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>パネル2</ResizablePanel>
        </ResizablePanelGroup>
      )

      const group = screen.getByRole('group')
      expect(group).toHaveClass('flex-col')
    })
  })

  describe('エッジケーステスト', () => {
    it('単一パネルでも正しく動作すること', () => {
      render(
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>単一パネル</ResizablePanel>
        </ResizablePanelGroup>
      )

      const panel = screen.getByText('単一パネル').parentElement
      expect(panel).toHaveStyle({ flexBasis: '100%' })
    })

    it('無効なサイズ指定を適切に処理すること', () => {
      render(
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={-10}>パネル1</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={150}>パネル2</ResizablePanel>
        </ResizablePanelGroup>
      )

      const panel1 = screen.getByText('パネル1').parentElement
      const panel2 = screen.getByText('パネル2').parentElement

      expect(panel1).not.toHaveStyle({ flexBasis: '-10%' })
      expect(panel2).not.toHaveStyle({ flexBasis: '150%' })
    })
  })
}) 