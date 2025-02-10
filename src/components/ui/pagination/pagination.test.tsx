/**
 * @file Paginationコンポーネントのテスト
 * @description Pagination関連コンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import { userEvent } from '@testing-library/user-event'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '.'

describe('Pagination', () => {
  describe('基本機能テスト', () => {
    it('基本的なページネーションが正しくレンダリングされること', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )

      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
      expect(screen.getByLabelText('前のページへ')).toBeInTheDocument()
      expect(screen.getByLabelText('次のページへ')).toBeInTheDocument()
    })

    it('省略記号が正しく表示されること', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">10</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )

      expect(screen.getByText('...')).toBeInTheDocument()
    })
  })

  describe('インタラクティブ機能テスト', () => {
    it('アクティブなページが正しく表示されること', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>2</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )

      const activeLink = screen.getByText('2').closest('a')
      expect(activeLink).toHaveAttribute('aria-current', 'page')
    })

    it('無効なページが正しく表示されること', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" isDisabled />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isDisabled>1</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )

      const disabledLink = screen.getByText('1').closest('a')
      expect(disabledLink).toHaveAttribute('aria-disabled', 'true')
      expect(disabledLink).toHaveClass('pointer-events-none')
    })
  })

  describe('アクセシビリティテスト', () => {
    it('適切なARIA属性が設定されていること', () => {
      render(
        <Pagination aria-label="ページナビゲーション">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )

      const nav = screen.getByRole('navigation')
      expect(nav).toHaveAttribute('aria-label', 'ページナビゲーション')

      const activeLink = screen.getByText('1').closest('a')
      expect(activeLink).toHaveAttribute('aria-current', 'page')
    })

    it('キーボード操作が正しく機能すること', async () => {
      const user = userEvent.setup()
      
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )

      await user.tab()
      expect(screen.getByText('1')).toHaveFocus()

      await user.tab()
      expect(screen.getByText('2')).toHaveFocus()
    })
  })

  describe('スタイルテスト', () => {
    it('カスタムクラスが適用できること', () => {
      render(
        <Pagination className="custom-pagination">
          <PaginationContent className="custom-content">
            <PaginationItem className="custom-item">
              <PaginationLink href="#" className="custom-link">1</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )

      expect(screen.getByRole('navigation')).toHaveClass('custom-pagination')
      expect(screen.getByRole('navigation').firstChild).toHaveClass('custom-content')
      expect(screen.getByRole('listitem')).toHaveClass('custom-item')
      expect(screen.getByRole('link')).toHaveClass('custom-link')
    })

    it('アクティブページのスタイルが適用されること', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )

      const activeLink = screen.getByText('1').closest('a')
      expect(activeLink).toHaveClass('bg-primary text-primary-foreground')
    })
  })
}) 