/**
 * @file DropdownMenuのテスト
 * @description DropdownMenuの機能とアクセシビリティをテスト
 */

import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { runAccessibilityTest } from '@/tests/wcag3/helpers'

const TestDropdownMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button>メニューを開く</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>アクション</DropdownMenuLabel>
      <DropdownMenuItem>
        新規作成
        <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        編集
        <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuSub>
        <DropdownMenuItem>その他</DropdownMenuItem>
        <DropdownMenuSubContent>
          <DropdownMenuItem>サブメニュー項目1</DropdownMenuItem>
          <DropdownMenuItem>サブメニュー項目2</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuItem>
        削除
        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

describe('DropdownMenu', () => {
  const user = userEvent.setup()

  describe('基本機能', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<TestDropdownMenu />)
      expect(screen.getByRole('button', { name: 'メニューを開く' })).toBeInTheDocument()
    })

    it('メニュー項目が正しく表示される', async () => {
      render(<TestDropdownMenu />)
      await user.click(screen.getByRole('button', { name: 'メニューを開く' }))
      
      await waitFor(() => {
        expect(screen.getByText('アクション')).toBeInTheDocument()
        expect(screen.getByText('新規作成')).toBeInTheDocument()
        expect(screen.getByText('編集')).toBeInTheDocument()
        expect(screen.getByText('削除')).toBeInTheDocument()
      })
    })

    it('ショートカットが表示される', async () => {
      render(<TestDropdownMenu />)
      await user.click(screen.getByRole('button', { name: 'メニューを開く' }))
      
      await waitFor(() => {
        expect(screen.getByText('⌘N')).toBeInTheDocument()
        expect(screen.getByText('⌘E')).toBeInTheDocument()
        expect(screen.getByText('⌘⌫')).toBeInTheDocument()
      })
    })

    it('サブメニューが表示される', async () => {
      render(<TestDropdownMenu />)
      await user.click(screen.getByRole('button', { name: 'メニューを開く' }))
      
      await waitFor(() => {
        expect(screen.getByText('その他')).toBeInTheDocument()
      })

      await user.hover(screen.getByText('その他'))
      
      await waitFor(() => {
        expect(screen.getByText('サブメニュー項目1')).toBeInTheDocument()
        expect(screen.getByText('サブメニュー項目2')).toBeInTheDocument()
      })
    })

    it('セパレーターが表示される', async () => {
      render(<TestDropdownMenu />)
      await user.click(screen.getByRole('button', { name: 'メニューを開く' }))
      
      await waitFor(() => {
        expect(screen.getByRole('separator')).toBeInTheDocument()
      })
    })
  })

  describe('インタラクション', () => {
    it('クリックでメニューが開閉する', async () => {
      render(<TestDropdownMenu />)
      const trigger = screen.getByRole('button', { name: 'メニューを開く' })
      
      await user.click(trigger)
      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument()
      })
      
      await user.click(trigger)
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument()
      })
    })

    it('サブメニューが操作可能である', async () => {
      render(<TestDropdownMenu />)
      await user.click(screen.getByRole('button', { name: 'メニューを開く' }))
      
      await waitFor(() => {
        expect(screen.getByText('その他')).toBeInTheDocument()
      })

      await user.hover(screen.getByText('その他'))
      
      await waitFor(() => {
        expect(screen.getByText('サブメニュー項目1')).toBeInTheDocument()
      })

      await user.click(screen.getByText('サブメニュー項目1'))
      
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument()
      })
    })

    it('メニュー項目がクリック可能である', async () => {
      const onSelect = vi.fn()
      render(
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>メニューを開く</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={onSelect}>
              テスト項目
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
      
      await user.click(screen.getByRole('button', { name: 'メニューを開く' }))
      await waitFor(() => {
        expect(screen.getByText('テスト項目')).toBeInTheDocument()
      })
      
      await user.click(screen.getByText('テスト項目'))
      expect(onSelect).toHaveBeenCalled()
    })

    it('ESCキーでメニューが閉じる', async () => {
      render(<TestDropdownMenu />)
      await user.click(screen.getByRole('button', { name: 'メニューを開く' }))
      
      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument()
      })
      
      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument()
      })
    })
  })

  describe('アクセシビリティ', () => {
    it('基本的なアクセシビリティ要件を満たす', async () => {
      await runAccessibilityTest(<TestDropdownMenu />, {
        keyboardNavigation: true,
        ariaAttributes: true,
        focusManagement: true,
        contrast: false,
      })
    })

    it('適切なARIA属性が設定されている', async () => {
      render(<TestDropdownMenu />)
      const trigger = screen.getByRole('button')
      
      await user.click(trigger)
      await waitFor(() => {
        const menu = screen.getByRole('menu')
        expect(menu).toHaveAttribute('aria-labelledby')
        expect(trigger).toHaveAttribute('aria-expanded', 'true')
        expect(trigger).toHaveAttribute('aria-haspopup', 'menu')
      })
    })

    describe('キーボード操作', () => {
      it('矢印キーで項目間を移動できる', async () => {
        render(<TestDropdownMenu />)
        await user.click(screen.getByRole('button', { name: 'メニューを開く' }))
        
        await waitFor(() => {
          expect(screen.getByRole('menu')).toBeInTheDocument()
        })
        
        await user.keyboard('{ArrowDown}')
        expect(screen.getByText('新規作成')).toHaveFocus()
        
        await user.keyboard('{ArrowDown}')
        expect(screen.getByText('編集')).toHaveFocus()
      })

      it('Home/Endキーで最初/最後の項目に移動できる', async () => {
        render(<TestDropdownMenu />)
        await user.click(screen.getByRole('button', { name: 'メニューを開く' }))
        
        await waitFor(() => {
          expect(screen.getByRole('menu')).toBeInTheDocument()
        })
        
        await user.keyboard('{End}')
        expect(screen.getByText('削除')).toHaveFocus()
        
        await user.keyboard('{Home}')
        expect(screen.getByText('新規作成')).toHaveFocus()
      })

      it('サブメニューが矢印キーで操作可能', async () => {
        render(<TestDropdownMenu />)
        await user.click(screen.getByRole('button', { name: 'メニューを開く' }))
        
        await waitFor(() => {
          expect(screen.getByRole('menu')).toBeInTheDocument()
        })
        
        await user.keyboard('{ArrowDown}')
        await user.keyboard('{ArrowDown}')
        await user.keyboard('{ArrowDown}')
        expect(screen.getByText('その他')).toHaveFocus()
        
        await user.keyboard('{ArrowRight}')
        await waitFor(() => {
          expect(screen.getByText('サブメニュー項目1')).toBeInTheDocument()
        })
        
        await user.keyboard('{ArrowDown}')
        expect(screen.getByText('サブメニュー項目2')).toHaveFocus()
      })
    })
  })
}) 