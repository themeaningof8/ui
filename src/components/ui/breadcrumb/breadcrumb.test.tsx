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
              <BreadcrumbPage>詳細</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getByRole('list')).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'ホーム' })).toBeInTheDocument()
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

      const ellipsis = screen.getByText('More')
      expect(ellipsis).toBeInTheDocument()
      expect(ellipsis).toHaveClass('sr-only')
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
      expect(breadcrumb).toHaveAttribute('aria-label', 'breadcrumb')

      const list = screen.getByRole('list')
      expect(list.parentElement).toBe(breadcrumb)

      const currentPage = screen.getByText('詳細').closest('[aria-current="page"]')
      expect(currentPage).toHaveAttribute('aria-current', 'page')
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
      expect(screen.getByRole('link', { name: 'ホーム' })).toHaveClass('custom-link')
      expect(screen.getByText('詳細').closest('span')).toHaveClass('custom-page')
    })

    it('カスタムセパレーターが使用できること', () => {
      render(
        <Breadcrumb separator={<span>|</span>}>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>|</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>詳細</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

      const separator = screen.getByText('|')
      expect(separator).toBeInTheDocument()
    })
  })
}) 