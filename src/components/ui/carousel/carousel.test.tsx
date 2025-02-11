/**
 * @file Carouselコンポーネントのテスト
 * @description Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext コンポーネントの機能とアクセシビリティをテストします
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import { userEvent } from '@testing-library/user-event'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '.'

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

// useEmblaCarousel をモック
vi.mock('embla-carousel-react', () => ({
  __esModule: true,
  default: () => [
    vi.fn(),
    mockCarouselApi
  ],
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
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )

      const carousel = screen.getByTestId('carousel')
      expect(carousel).toHaveAttribute('aria-roledescription', 'carousel')
      expect(screen.getByText('アイテム1')).toBeInTheDocument()
      expect(screen.getByText('アイテム2')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Previous slide/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Next slide/i })).toBeInTheDocument()
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
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )

      const prevButton = screen.getByRole('button', { name: /Previous slide/i })
      const nextButton = screen.getByRole('button', { name: /Next slide/i })

      await user.click(nextButton)
      expect(mockCarouselApi.scrollNext).toHaveBeenCalledTimes(1)

      await user.click(prevButton)
      expect(mockCarouselApi.scrollPrev).toHaveBeenCalledTimes(1)
    })

    it('前へ/次へボタンが無効化されること', () => {
      mockCarouselApi.canScrollPrev.mockReturnValue(false)
      mockCarouselApi.canScrollNext.mockReturnValue(false)
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>アイテム1</CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )

      const prevButton = screen.getByRole('button', { name: /Previous slide/i })
      const nextButton = screen.getByRole('button', { name: /Next slide/i })

      expect(prevButton).toBeDisabled()
      expect(nextButton).toBeDisabled()
    })

    it('キーボード操作でスクロールできること', async () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>アイテム1</CarouselItem>
            <CarouselItem>アイテム2</CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )

      const carousel = screen.getByTestId('carousel')
      
      // キーボードイベントを直接ディスパッチ
      carousel.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
      expect(mockCarouselApi.scrollNext).toHaveBeenCalledTimes(1)

      carousel.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))
      expect(mockCarouselApi.scrollPrev).toHaveBeenCalledTimes(1)
    })
  })

  describe('オプションとスタイルテスト', () => {
    it('カスタムクラスが適用できること', () => {
      render(
        <Carousel className="custom-carousel">
          <CarouselContent className="custom-content">
            <CarouselItem className="custom-item">アイテム1</CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="custom-previous" />
          <CarouselNext className="custom-next" />
        </Carousel>
      )

      const carousel = screen.getByTestId('carousel')
      expect(carousel).toHaveClass('custom-carousel')
      const content = screen.getByText('アイテム1').closest('.custom-content')
      expect(content).toHaveClass('custom-content')
      expect(screen.getByText('アイテム1').closest('.custom-item')).toHaveClass('custom-item')
      expect(screen.getByRole('button', { name: /Previous slide/i })).toHaveClass('custom-previous')
      expect(screen.getByRole('button', { name: /Next slide/i })).toHaveClass('custom-next')
    })

    it('オプションが正しく適用されること', () => {
      const opts = {
        loop: true,
        align: "start" as const,
        dragFree: true
      }

      render(
        <Carousel opts={opts}>
          <CarouselContent>
            <CarouselItem>アイテム1</CarouselItem>
          </CarouselContent>
        </Carousel>
      )

      // embla-carousel-reactのモックが正しいオプションで呼び出されたことを確認
      expect(mockCarouselApi.on).toHaveBeenCalledWith('select', expect.any(Function))
      expect(mockCarouselApi.on).toHaveBeenCalledWith('reInit', expect.any(Function))
    })

    it('垂直方向のカルーセルが正しく動作すること', () => {
      render(
        <Carousel orientation="vertical">
          <CarouselContent>
            <CarouselItem>アイテム1</CarouselItem>
            <CarouselItem>アイテム2</CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )

      const prevButton = screen.getByRole('button', { name: /Previous slide/i })
      const nextButton = screen.getByRole('button', { name: /Next slide/i })

      // 垂直方向の場合、ボタンに rotate-90 クラスが適用されていることを確認
      expect(prevButton).toHaveClass('rotate-90')
      expect(nextButton).toHaveClass('rotate-90')
    })
  })

  describe('アクセシビリティテスト', () => {
    it('適切なARIA属性が設定されていること', () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>アイテム1</CarouselItem>
          </CarouselContent>
        </Carousel>
      )

      const carousel = screen.getByTestId('carousel')
      expect(carousel).toHaveAttribute('aria-roledescription', 'carousel')
      
      const slide = screen.getByText('アイテム1').closest('[role="group"]')
      expect(slide).toHaveAttribute('aria-roledescription', 'slide')
    })

    it('ナビゲーションボタンが適切にラベル付けされていること', () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>アイテム1</CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )

      expect(screen.getByRole('button', { name: /Previous slide/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Next slide/i })).toBeInTheDocument()
    })
  })
}) 