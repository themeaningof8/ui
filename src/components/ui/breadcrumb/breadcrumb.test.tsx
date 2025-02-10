/**
 * @file Breadcrumbコンポーネントのテスト
 * @description Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis コンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '.'

describe('Breadcrumb', () => {
  describe('基本レンダリングテスト', () => {
    it('すべてのコンポーネントが正しくレンダリングされること', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">製品</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>詳細</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getByRole('list')).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'ホーム' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: '製品' })).toBeInTheDocument()
      expect(screen.getByText('詳細')).toBeInTheDocument()
    })

    it('省略記号（...）が正しく表示されること', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbEllipsis />
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>詳細</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

      const ellipsis = screen.getByRole('presentation', { name: '' })
      expect(ellipsis).toBeInTheDocument()
    })
  })

  describe('アクセシビリティテスト', () => {
    it('各コンポーネントに適切なARIA属性が設定されていること', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>詳細</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

      const breadcrumb = screen.getByRole('navigation')
      expect(breadcrumb).toHaveAttribute('aria-label', 'パンくずリスト')

      const list = screen.getByRole('list')
      expect(list.parentElement).toBe(breadcrumb)

      const items = screen.getAllByRole('listitem')
      expect(items).toHaveLength(3)

      const currentPage = screen.getByText('詳細').parentElement
      expect(currentPage).toHaveAttribute('aria-current', 'page')

      const separators = screen.getAllByRole('presentation')
      expect(separators).toHaveLength(2)
    })
  })

  describe('スタイルテスト', () => {
    it('カスタムクラスが適用できること', () => {
      render(
        <Breadcrumb className="custom-breadcrumb">
          <BreadcrumbList className="custom-list">
            <BreadcrumbItem className="custom-item">
              <BreadcrumbLink href="/" className="custom-link">
                ホーム
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="custom-separator" />
            <BreadcrumbItem>
              <BreadcrumbPage className="custom-page">詳細</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

      expect(screen.getByRole('navigation')).toHaveClass('custom-breadcrumb')
      expect(screen.getByRole('list')).toHaveClass('custom-list')
      expect(screen.getAllByRole('listitem')[0]).toHaveClass('custom-item')
      expect(screen.getByRole('link')).toHaveClass('custom-link')
      expect(screen.getAllByRole('presentation')[0]).toHaveClass('custom-separator')
      expect(screen.getByText('詳細').parentElement).toHaveClass('custom-page')
    })

    it('カスタムセパレーターが使用できること', () => {
      render(
        <Breadcrumb separator={<span>|</span>}>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>詳細</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

      const separators = screen.getAllByRole('presentation')
      expect(separators[0]).toHaveTextContent('|')
    })
  })
}) 