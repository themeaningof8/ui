/**
 * @file Separatorコンポーネントのテスト
 * @description Separatorコンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import { Separator } from '.'

describe('Separator', () => {
  describe('基本機能テスト', () => {
    it('水平セパレーターが正しくレンダリングされること', () => {
      render(<Separator orientation="horizontal" />)
      
      const separator = screen.getByRole('separator')
      expect(separator).toBeInTheDocument()
      expect(separator).toHaveAttribute('aria-orientation', 'horizontal')
    })

    it('垂直セパレーターが正しくレンダリングされること', () => {
      render(<Separator orientation="vertical" />)
      
      const separator = screen.getByRole('separator')
      expect(separator).toBeInTheDocument()
      expect(separator).toHaveAttribute('aria-orientation', 'vertical')
    })

    it('デフォルトで水平方向になること', () => {
      render(<Separator />)
      
      const separator = screen.getByRole('separator')
      expect(separator).toHaveAttribute('aria-orientation', 'horizontal')
    })
  })

  describe('アクセシビリティテスト', () => {
    it('適切なARIA属性が設定されていること', () => {
      render(<Separator aria-label="セクション区切り" />)
      
      const separator = screen.getByRole('separator')
      expect(separator).toHaveAttribute('aria-label', 'セクション区切り')
    })

    it('装飾的なセパレーターの場合、aria-hiddenが設定されること', () => {
      render(<Separator decorative />)
      
      const separator = screen.getByRole('none')
      expect(separator).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('スタイルテスト', () => {
    it('カスタムクラスが適用できること', () => {
      render(<Separator className="custom-separator" />)
      
      const separator = screen.getByRole('separator')
      expect(separator).toHaveClass('custom-separator')
    })

    it('水平方向のデフォルトスタイルが適用されること', () => {
      render(<Separator />)
      
      const separator = screen.getByRole('separator')
      expect(separator).toHaveClass('h-[1px] w-full')
    })

    it('垂直方向のデフォルトスタイルが適用されること', () => {
      render(<Separator orientation="vertical" />)
      
      const separator = screen.getByRole('separator')
      expect(separator).toHaveClass('h-full w-[1px]')
    })
  })

  describe('コンテキストテスト', () => {
    it('リスト内で正しく機能すること', () => {
      render(
        <ul>
          <li>アイテム1</li>
          <Separator decorative />
          <li>アイテム2</li>
        </ul>
      )
      
      const separator = screen.getByRole('none')
      expect(separator).toBeInTheDocument()
    })

    it('メニュー内で正しく機能すること', () => {
      render(
        <nav>
          <a href="#">リンク1</a>
          <Separator orientation="vertical" />
          <a href="#">リンク2</a>
        </nav>
      )
      
      const separator = screen.getByRole('separator')
      expect(separator).toHaveAttribute('aria-orientation', 'vertical')
    })
  })

  describe('エッジケーステスト', () => {
    it('空のコンテナ内でも正しくレンダリングされること', () => {
      render(
        <div>
          <Separator />
        </div>
      )
      
      const separator = screen.getByRole('separator')
      expect(separator).toBeInTheDocument()
    })

    it('複数のセパレーターが正しく機能すること', () => {
      render(
        <div>
          <Separator />
          <div>コンテンツ1</div>
          <Separator />
          <div>コンテンツ2</div>
          <Separator />
        </div>
      )
      
      const separators = screen.getAllByRole('separator')
      expect(separators).toHaveLength(3)
      for (const separator of separators) {
        expect(separator).toHaveAttribute('aria-orientation', 'horizontal')
      }
    })

    it('異なる方向のセパレーターが混在しても正しく機能すること', () => {
      render(
        <div style={{ display: 'flex' }}>
          <div>セクション1</div>
          <Separator orientation="vertical" />
          <div>
            セクション2
            <Separator orientation="horizontal" />
            サブセクション
          </div>
        </div>
      )
      
      const separators = screen.getAllByRole('separator')
      expect(separators[0]).toHaveAttribute('aria-orientation', 'vertical')
      expect(separators[1]).toHaveAttribute('aria-orientation', 'horizontal')
    })
  })
}) 