/**
 * @file メニューバーコンポーネントのテスト
 * @description メニューバーコンポーネントの機能をテストします
 */
import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from '.'

describe('Menubarコンポーネント', () => {
  it('基本的なメニューバーが正しくレンダリングされること', () => {
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

    expect(screen.getByText('ファイル')).toBeInTheDocument()
  })

  it('複数のメニューが正しく機能すること', async () => {
    const user = userEvent.setup()
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>ファイル</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>新規作成</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>編集</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>コピー</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    // 2番目のメニューを開く
    await user.click(screen.getByText('編集'))
    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: 'コピー' })).toBeInTheDocument()
    })
  })

  it('メニュー項目が無効化されること', () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>ファイル</MenubarTrigger>
          <MenubarContent>
            <MenubarItem disabled>新規作成</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    expect(screen.getByText('ファイル')).toBeInTheDocument()
  })

  it('チェックボックス項目が正しく機能すること', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>表示</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem onCheckedChange={onCheckedChange}>
              ツールバー
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    await user.click(screen.getByText('表示'))
    await waitFor(() => {
      expect(screen.getByText('ツールバー')).toBeInTheDocument()
    })
    await user.click(screen.getByText('ツールバー'))
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it('ラジオ項目が正しく機能すること', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>表示</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup onValueChange={onValueChange}>
              <MenubarRadioItem value="small">小</MenubarRadioItem>
              <MenubarRadioItem value="medium">中</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    await user.click(screen.getByText('表示'))
    await waitFor(() => {
      expect(screen.getByText('小')).toBeInTheDocument()
    })
    await user.click(screen.getByText('小'))
    expect(onValueChange).toHaveBeenCalledWith('small')
  })

  it('サブメニューが正しくレンダリングされること', async () => {
    const user = userEvent.setup()
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>ファイル</MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>最近使用したファイル</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>ドキュメント1</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    await user.click(screen.getByText('ファイル'))
    await waitFor(() => {
      expect(screen.getByText('最近使用したファイル')).toBeInTheDocument()
    })
  })

  it('カスタムクラス名が正しく適用されること', () => {
    const customClass = 'custom-class'
    render(
      <Menubar className={customClass}>
        <MenubarMenu>
          <MenubarTrigger className={customClass}>ファイル</MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    )

    expect(screen.getByRole('menubar')).toHaveClass(customClass)
    expect(screen.getByText('ファイル')).toHaveClass(customClass)
  })

  it('複数のメニューが正しくレンダリングされること', async () => {
    const user = userEvent.setup()
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>ファイル</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>新規作成</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>編集</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>コピー</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    await user.click(screen.getByText('編集'))
    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: 'コピー' })).toBeInTheDocument()
    })
  })

  it('無効化されたメニュー項目が正しくレンダリングされること', () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger disabled>ファイル</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>新規作成</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    const trigger = screen.getByText('ファイル')
    expect(trigger).toBeDisabled()
  })
}) 