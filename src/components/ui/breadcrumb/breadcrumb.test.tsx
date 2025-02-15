/**
 * @file パンくずリストコンポーネントのテスト
 * @description パンくずリストコンポーネントの機能をテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbList,
  BreadcrumbEllipsis,
} from '.'

describe('Breadcrumbコンポーネント', () => {
  it('基本的なパンくずリストが正しくレンダリングされる', () => {
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
    const homeLink = screen.getByRole('link', { name: 'ホーム' })
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('複数のアイテムが正しくレンダリングされる', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/category">カテゴリー</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>現在のページ</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    expect(screen.getByText('ホーム')).toBeInTheDocument()
    expect(screen.getByText('カテゴリー')).toBeInTheDocument()
    expect(screen.getByText('現在のページ')).toBeInTheDocument()
    
    const homeLink = screen.getByRole('link', { name: 'ホーム' })
    const categoryLink = screen.getByRole('link', { name: 'カテゴリー' })
    expect(homeLink).toHaveAttribute('href', '/')
    expect(categoryLink).toHaveAttribute('href', '/category')
  })

  it('カスタムセパレーターが正しく適用される', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>{'>'}</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>現在のページ</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    expect(screen.getByText('>')).toBeInTheDocument()
  })

  it('カスタムクラス名が正しく適用される', () => {
    render(
      <Breadcrumb className="custom-class">
        <BreadcrumbList className="list-class">
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="link-class">ホーム</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="page-class">現在のページ</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    expect(screen.getByRole('navigation')).toHaveClass('custom-class')
    expect(screen.getByRole('list')).toHaveClass('list-class')
    expect(screen.getByText('ホーム')).toHaveClass('link-class')
    expect(screen.getByText('現在のページ')).toHaveClass('page-class')
  })

  it('リンクが正しく機能する', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/test">テストリンク</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    const link = screen.getByRole('link', { name: 'テストリンク' })
    expect(link).toHaveAttribute('href', '/test')
  })

  it('省略記号が正しくレンダリングされる', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>現在のページ</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    const ellipsisContainer = screen.getByText('More').closest('[aria-hidden="true"]')
    expect(ellipsisContainer).toBeInTheDocument()
    expect(screen.getByText('More')).toBeInTheDocument()
  })

  it('省略記号にカスタムクラス名が適用される', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbEllipsis className="custom-ellipsis" />
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    const ellipsisElement = screen.getByText('More').parentElement
    expect(ellipsisElement).toHaveClass('flex', 'size-9', 'items-center', 'justify-center', 'custom-ellipsis')
  })
}) 