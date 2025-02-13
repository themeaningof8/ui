/**
 * @file カルーセルコンポーネントのテスト
 * @description カルーセルコンポーネントの機能をテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '.'

describe('Carouselコンポーネント', () => {
  it('基本的なカルーセルが正しくレンダリングされること', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>スライド1</CarouselItem>
          <CarouselItem>スライド2</CarouselItem>
          <CarouselItem>スライド3</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )

    expect(screen.getByText('スライド1')).toBeInTheDocument()
    expect(screen.getByText('スライド2')).toBeInTheDocument()
    expect(screen.getByText('スライド3')).toBeInTheDocument()
    expect(screen.getByLabelText('前のスライド')).toBeInTheDocument()
    expect(screen.getByLabelText('次のスライド')).toBeInTheDocument()
  })

  it('カスタムクラス名が正しく適用されること', () => {
    render(
      <Carousel className="custom-carousel" data-testid="carousel">
        <CarouselContent className="custom-content" data-testid="carousel-content">
          <CarouselItem className="custom-item" data-testid="carousel-item">スライド1</CarouselItem>
        </CarouselContent>
      </Carousel>
    )

    expect(screen.getByTestId('carousel')).toHaveClass('custom-carousel')
    expect(screen.getByTestId('carousel-content')).toHaveClass('custom-content')
    expect(screen.getByTestId('carousel-item')).toHaveClass('custom-item')
  })

  it('ナビゲーションボタンが正しく機能すること', async () => {
    const { user } = render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>スライド1</CarouselItem>
          <CarouselItem>スライド2</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )

    const nextButton = screen.getByLabelText('次のスライド')
    const prevButton = screen.getByLabelText('前のスライド')

    await user.click(nextButton)
    // スライド2が表示される
    expect(screen.getByText('スライド2')).toBeVisible()

    await user.click(prevButton)
    // スライド1が表示される
    expect(screen.getByText('スライド1')).toBeVisible()
  })

  it('オートプレイが正しく機能すること', () => {
    const { rerender } = render(
      <Carousel autoPlay interval={2000}>
        <CarouselContent>
          <CarouselItem>スライド1</CarouselItem>
          <CarouselItem>スライド2</CarouselItem>
        </CarouselContent>
      </Carousel>
    )

    // オートプレイの開始を確認
    expect(screen.getByTestId('carousel')).toHaveAttribute('data-autoplay', 'true')

    // オートプレイの停止を確認
    rerender(
      <Carousel autoPlay={false}>
        <CarouselContent>
          <CarouselItem>スライド1</CarouselItem>
          <CarouselItem>スライド2</CarouselItem>
        </CarouselContent>
      </Carousel>
    )

    expect(screen.getByTestId('carousel')).toHaveAttribute('data-autoplay', 'false')
  })
}) 