/**
 * @file パンくずリストコンポーネントのテスト
 * @description パンくずリストコンポーネントの機能をテストします
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbList,
  BreadcrumbEllipsis,
} from '.'
import React from 'react'

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
          <BreadcrumbSeparator className="custom-separator">/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>現在のページ</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    expect(screen.getByText('/')).toHaveClass('custom-separator')
  })

  it('カスタムクラス名が正しく適用される', () => {
    const customClass = 'custom-class'
    render(
      <Breadcrumb className={customClass}>
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

    expect(screen.getByRole('navigation')).toHaveClass(customClass)
    expect(screen.getByRole('list')).toHaveClass('list-class')
    expect(screen.getByText('ホーム')).toHaveClass('link-class')
    expect(screen.getByText('現在のページ')).toHaveClass('page-class')
  })

  it('リンクが正しく機能する', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" onClick={onClick}>
              ホーム
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    const link = screen.getByText('ホーム')
    await user.click(link)
    
    expect(onClick).toHaveBeenCalled()
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

    expect(screen.getByText('その他のページ')).toBeInTheDocument()
  })

  it('省略記号にカスタムクラス名が適用される', () => {
    const customClass = 'custom-ellipsis'
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbEllipsis className={customClass} />
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    const ellipsisContainer = screen.getByText('その他のページ').parentElement
    expect(ellipsisContainer).toHaveClass(customClass)
  })

  it('BreadcrumbLinkがasChildプロパティを正しく処理する', () => {
    const CustomLink = React.forwardRef<
      HTMLAnchorElement,
      React.ComponentPropsWithoutRef<"a">
    >((props, ref) => (
      <a ref={ref} {...props} className="custom-link">
        {props.children}
      </a>
    ))
    CustomLink.displayName = "CustomLink"

    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <CustomLink href="/">ホーム</CustomLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    const link = screen.getByRole('link', { name: 'ホーム' })
    expect(link).toHaveClass('custom-link')
  })
}) 