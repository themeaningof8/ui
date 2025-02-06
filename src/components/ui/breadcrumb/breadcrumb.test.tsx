/**
 * @file Breadcrumbのテスト
 * @description Breadcrumbの基本機能、インタラクション、アクセシビリティをテスト
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { 
  runAxeTest,
  runKeyboardNavigationTest,
  runAriaAttributesTest,
  runFocusManagementTest,
  runContrastTest
} from '@/tests/wcag3/helpers'

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const TestBreadcrumb = () => (
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
        <BreadcrumbLink href="/products/category" aria-current="page">カテゴリー</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbPage>製品詳細</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
)

describe('Breadcrumb', () => {
  describe('基本機能', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<TestBreadcrumb />)
      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getByRole('list')).toBeInTheDocument()
      expect(screen.getAllByRole('listitem')).toHaveLength(4)
    })

    it('各リンクが正しく表示される', () => {
      render(<TestBreadcrumb />)
      expect(screen.getByText('ホーム')).toHaveAttribute('href', '/')
      expect(screen.getByText('製品')).toHaveAttribute('href', '/products')
      expect(screen.getByText('カテゴリー')).toHaveAttribute('href', '/products/category')
    })

    it('セパレーターが正しく表示される', () => {
      render(<TestBreadcrumb />)
      const separators = screen.getAllByTestId('breadcrumb-separator')
      expect(separators).toHaveLength(2)
      for (const separator of separators) {
        expect(separator).toHaveAttribute('aria-hidden', 'true')
        expect(separator).toHaveClass('text-base-low')
      }
    })

    it('現在のページが適切にマークされる', () => {
      render(<TestBreadcrumb />)
      const currentPage = screen.getByText('カテゴリー')
      expect(currentPage).toHaveAttribute('aria-current', 'page')
    })
  })

  describe('インタラクション', () => {
    it('リンクがクリック可能である', async () => {
      const user = userEvent.setup()
      render(<TestBreadcrumb />)
      
      const homeLink = screen.getByText('ホーム')
      await user.click(homeLink)
      expect(homeLink).toHaveFocus()
    })

    it('カスタムクラスが適用される', () => {
      render(
        <Breadcrumb className="custom-class">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      )
      expect(screen.getByRole('navigation')).toHaveClass('custom-class')
    })

    it('カスタムセパレーターが適用される', () => {
      render(
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="custom-separator">/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">製品</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      )
      const separator = screen.getByText('/')
      expect(separator).toHaveClass('custom-separator')
    })
  })

  describe('アクセシビリティ', () => {
    describe('基本的なアクセシビリティ', () => {
      it('axeによる基本的なアクセシビリティ要件を満たす', async () => {
        await runAxeTest(<TestBreadcrumb />);
      });

      it('キーボードナビゲーションが適切に機能する', () => {
        const { container } = render(<TestBreadcrumb />);
        runKeyboardNavigationTest(container);
      });

      it('ARIA属性が適切に設定されている', () => {
        const { container } = render(<TestBreadcrumb />);
        runAriaAttributesTest(container);
      });

      it('フォーカス管理が適切に機能する', () => {
        const { container } = render(<TestBreadcrumb />);
        runFocusManagementTest(container);
      });

      it('コントラスト要件を満たす', () => {
        const { container } = render(<TestBreadcrumb />);
        runContrastTest(container);
      });
    });

    it('スクリーンリーダー用のテキストが適切に設定されている', () => {
      render(<TestBreadcrumb />)
      const separators = screen.getAllByTestId('breadcrumb-separator')
      for (const separator of separators) {
        expect(separator).toHaveAttribute('aria-hidden', 'true')
      }
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveAttribute('aria-label', 'パンくずリスト')
    })
  })
}) 