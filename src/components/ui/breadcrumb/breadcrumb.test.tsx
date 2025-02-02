/**
 * @file Breadcrumbコンポーネントのテスト
 * @description Breadcrumbコンポーネントの機能とアクセシビリティをテスト
 */

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { testBasicAccessibility } from '@/tests/wcag3/helpers'

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '.'

describe('Breadcrumb', () => {
  describe('基本機能', () => {
    it('基本的なパンくずリストが表示されること', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>現在のページ</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

      expect(screen.getByText('ホーム')).toBeInTheDocument()
      expect(screen.getByText('現在のページ')).toBeInTheDocument()
    })

    it('複数階層のパンくずリストが表示されること', () => {
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
              <BreadcrumbPage>製品詳細</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

      expect(screen.getByText('ホーム')).toBeInTheDocument()
      expect(screen.getByText('製品')).toBeInTheDocument()
      expect(screen.getByText('製品詳細')).toBeInTheDocument()
    })

    it('リンクが正しく設定されること', () => {
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
          </BreadcrumbList>
        </Breadcrumb>
      )

      const homeLink = screen.getByText('ホーム')
      const productsLink = screen.getByText('製品')
      expect(homeLink).toHaveAttribute('href', '/')
      expect(productsLink).toHaveAttribute('href', '/products')
    })

    it('現在のページが正しく表示されること', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>現在のページ</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

      const currentPage = screen.getByText('現在のページ')
      expect(currentPage).toHaveAttribute('aria-current', 'page')
    })

    it('カスタムセパレーターが正しく表示されること', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>現在のページ</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

      const separator = screen.getByText('/')
      expect(separator).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('スタイル', () => {
    it('基本的なスタイルが適用されていること', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('inline-flex', 'items-center', 'gap-1', 'text-sm', 'text-base-high')

      const list = screen.getByRole('list')
      expect(list).toHaveClass('flex', 'items-center', 'gap-1')

      const link = screen.getByText('ホーム')
      expect(link).toHaveClass('text-base-high', 'hover:text-base-high/80')
    })

    it('カスタムクラスが適用されること', () => {
      render(
        <Breadcrumb className="custom-nav">
          <BreadcrumbList className="custom-list">
            <BreadcrumbItem className="custom-item">
              <BreadcrumbLink href="/" className="custom-link">ホーム</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

      expect(screen.getByRole('navigation')).toHaveClass('custom-nav')
      expect(screen.getByRole('list')).toHaveClass('custom-list')
      expect(screen.getByRole('listitem')).toHaveClass('custom-item')
      expect(screen.getByText('ホーム')).toHaveClass('custom-link')
    })
  })

  describe('アクセシビリティ', () => {
    it('アクセシビリティ要件を満たすこと', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>現在のページ</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

      const nav = screen.getByRole('navigation')
      expect(nav).toHaveAttribute('aria-label', 'パンくずリスト')

      const list = screen.getByRole('list')
      expect(list).toBeInTheDocument()

      const items = screen.getAllByRole('listitem')
      expect(items).toHaveLength(2)

      const separator = screen.getByText('', { selector: '[aria-hidden="true"]' })
      expect(separator).toBeInTheDocument()
    })

    // WCAG 3.0の基本的なアクセシビリティテスト
    testBasicAccessibility(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>現在のページ</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
      {
        expectedRole: 'navigation',
        testDisabled: false,
      }
    )
  })
}) 