/**
 * @file Paginationコンポーネントのテスト
 * @description Paginationコンポーネントの機能とアクセシビリティをテスト
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Pagination } from '.'

describe('Pagination', () => {
  describe('基本機能', () => {
    it('デフォルト状態でレンダリングされる', () => {
      render(
        <Pagination
          total={30}
          perPage={10}
          currentPage={1}
          onPageChange={() => {}}
        />
      )

      expect(screen.getByText('前へ')).toBeInTheDocument()
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
      expect(screen.getByText('次へ')).toBeInTheDocument()
    })

    it('アクティブなページが正しく表示される', () => {
      render(
        <Pagination
          total={30}
          perPage={10}
          currentPage={2}
          onPageChange={() => {}}
        />
      )

      const activeLink = screen.getByText('2').closest('button')
      expect(activeLink).toHaveAttribute('aria-current', 'page')
    })

    it('省略記号が表示される', () => {
      render(
        <Pagination
          total={100}
          perPage={10}
          currentPage={1}
          onPageChange={() => {}}
        />
      )

      expect(screen.getByRole('presentation')).toBeInTheDocument()
      expect(screen.getByText('More pages')).toBeInTheDocument()
    })
  })

  describe('ナビゲーション', () => {
    it('前へ/次へボタンがクリック可能', async () => {
      const user = userEvent.setup()
      const onPageChange = vi.fn()

      render(
        <Pagination
          total={30}
          perPage={10}
          currentPage={2}
          onPageChange={onPageChange}
        />
      )

      await user.click(screen.getByText('前へ'))
      expect(onPageChange).toHaveBeenCalledWith(1)

      await user.click(screen.getByText('次へ'))
      expect(onPageChange).toHaveBeenCalledWith(3)
    })

    it('ページ番号がクリック可能', async () => {
      const user = userEvent.setup()
      const onPageChange = vi.fn()

      render(
        <Pagination
          total={30}
          perPage={10}
          currentPage={1}
          onPageChange={onPageChange}
        />
      )

      await user.click(screen.getByText('2'))
      expect(onPageChange).toHaveBeenCalledWith(2)
    })

    it('無効化状態で操作できない', async () => {
      const user = userEvent.setup()
      const onPageChange = vi.fn()

      render(
        <Pagination
          total={30}
          perPage={10}
          currentPage={1}
          onPageChange={onPageChange}
          disabled
        />
      )

      await user.click(screen.getByText('2'))
      expect(onPageChange).not.toHaveBeenCalled()
    })
  })

  describe('アクセシビリティ', () => {
    it('適切なARIA属性が設定されている', () => {
      render(
        <Pagination
          total={30}
          perPage={10}
          currentPage={2}
          onPageChange={() => {}}
        />
      )

      const nav = screen.getByRole('navigation')
      expect(nav).toHaveAttribute('aria-label', 'ページネーション')

      const activeLink = screen.getByText('2').closest('button')
      expect(activeLink).toHaveAttribute('aria-current', 'page')

      const previousButton = screen.getByText('前へ').closest('button')
      expect(previousButton).toHaveAttribute('aria-label', '前のページ')

      const nextButton = screen.getByText('次へ').closest('button')
      expect(nextButton).toHaveAttribute('aria-label', '次のページ')
    })

    it('キーボード操作が可能', async () => {
      const user = userEvent.setup()
      const onPageChange = vi.fn()

      render(
        <Pagination
          total={30}
          perPage={10}
          currentPage={2}
          onPageChange={onPageChange}
        />
      )

      await user.tab()
      await user.keyboard('{Enter}')
      expect(onPageChange).toHaveBeenCalledWith(1)

      await user.tab()
      await user.keyboard('{Enter}')
      expect(onPageChange).toHaveBeenCalledWith(1)

      await user.tab()
      await user.keyboard('{Enter}')
      expect(onPageChange).toHaveBeenCalledWith(2)
    })
  })
}) 