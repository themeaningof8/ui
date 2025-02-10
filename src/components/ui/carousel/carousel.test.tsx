/**
 * @file Carouselコンポーネントのテスト
 * @description Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext コンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@/tests/test-utils'
import { userEvent } from '@testing-library/user-event'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
} from '.'
import { cn } from '@/lib/cn'

// モック用の Carousel API
const mockCarouselApi = {
  scrollPrev: vi.fn(),
  scrollNext: vi.fn(),
  canScrollPrev: vi.fn(),
  canScrollNext: vi.fn(),
  selectedScrollSnap: vi.fn(),
  scrollSnapList: vi.fn(),
  scrollTo: vi.fn(),
  on: vi.fn(),
  off: vi.fn(),
  plugins: vi.fn(),
  update: vi.fn(),
  reInit: vi.fn(),
  destroy: vi.fn(),
}

// useCarousel フックをモック
vi.mock('.', () => ({
  ...vi.importActual('.'),
  useCarousel: vi.fn(() => mockCarouselApi),
}))

describe('Carousel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // 各テストの前にモックの戻り値をリセット
    mockCarouselApi.canScrollPrev.mockReturnValue(true)
    mockCarouselApi.canScrollNext.mockReturnValue(true)
  })

  describe('基本機能テスト', () => {
    it('Carouselコンポーネントが正しくレンダリングされること', () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>アイテム1</CarouselItem>
            <CarouselItem>アイテム2</CarouselItem>
          </CarouselContent>
          < CarouselPrevious />
          < CarouselNext />
        </Carousel>
      )

      expect(screen.getByRole('group')).toBeInTheDocument()
      expect(screen.getByText('アイテム1')).toBeInTheDocument()
      expect(screen.getByText('アイテム2')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '前のスライド' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '次のスライド' })).toBeInTheDocument()
    })

    it('前へ/次へボタンのクリックでスクロールが動作すること', async () => {
      const user = userEvent.setup()

      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>アイテム1</CarouselItem>
            <CarouselItem>アイテム2</CarouselItem>
            <CarouselItem>アイテム3</CarouselItem>
          </CarouselContent>
          < CarouselPrevious />
          < CarouselNext />
        </Carousel>
      )

      const prevButton = screen.getByRole('button', { name: '前のスライド' })
      const nextButton = screen.getByRole('button', { name: '次のスライド' })

      await user.click(nextButton)
      expect(mockCarouselApi.scrollNext).toHaveBeenCalledTimes(1)

      await user.click(prevButton)
      expect(mockCarouselApi.scrollPrev).toHaveBeenCalledTimes(1)
    })

    it('前へ/次へボタンが無効化されること', async () => {
      mockCarouselApi.canScrollPrev.mockReturnValue(false)
      mockCarouselApi.canScrollNext.mockReturnValue(false)

      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>アイテム1</CarouselItem>
          </CarouselContent>
          < CarouselPrevious />
          < CarouselNext />
        </Carousel>
      )

      const prevButton = screen.getByRole('button', { name: '前のスライド' })
      const nextButton = screen.getByRole('button', { name: '次のスライド' })

      expect(prevButton).toBeDisabled()
      expect(nextButton).toBeDisabled()
    })

    it('キーボード操作でスクロールできること', async () => {
      const user = userEvent.setup()

      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>アイテム1</CarouselItem>
            <CarouselItem>アイテム2</CarouselItem>
          </CarouselContent>
          < CarouselPrevious />
          < CarouselNext />
        </Carousel>
      )

      const carouselContent = screen.getByRole('region')
      await user.tab() // フォーカスを当てる
      expect(carouselContent).toHaveFocus()

      await user.keyboard('{ArrowRight}')
      expect(mockCarouselApi.scrollNext).toHaveBeenCalledTimes(1)

      await user.keyboard('{ArrowLeft}')
      expect(mockCarouselApi.scrollPrev).toHaveBeenCalledTimes(1)
    })
  })

  describe('オプションとスタイルテスト', () => {
    it('カスタムクラスが適用できること', () => {
      render(
        < Carousel className="custom-carousel"
          opts={{
            loop: true,
          }}
        >
          < CarouselContent className="custom-content">
            < CarouselItem className="custom-item">アイテム1</CarouselItem >
          </CarouselContent>
          < CarouselPrevious className="custom-previous" />
          < CarouselNext className="custom-next" />
        </Carousel>
      )

      expect(screen.getByRole('group')).toHaveClass('custom-carousel')
      expect(screen.getByRole('region')).toHaveClass('custom-content')
      expect(screen.getByText('アイテム1').parentElement).toHaveClass('custom-item')
      expect(screen.getByRole('button', { name: '前のスライド' })).toHaveClass('custom-previous')
      expect(screen.getByRole('button', { name: '次のスライド' })).toHaveClass('custom-next')
    })

    it('プラグインが適用できること', () => {
      const plugin = vi.fn()
      render(
        < Carousel
          plugins={[plugin]}
        >
          <CarouselContent>
            <CarouselItem>アイテム1</CarouselItem>
          </CarouselContent>
        </Carousel>
      )

      expect(plugin).toHaveBeenCalledTimes(1)
    })
  })
}) 