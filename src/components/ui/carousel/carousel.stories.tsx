/**
 * @file Carouselのストーリー
 * @description Carouselの使用例とバリエーションを表示
 */
import type { Meta, StoryObj } from '@storybook/react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta = {
  title: 'UI/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
    onLoad: () => {
      const consoleError = console.error;
      console.error = (...args) => {
        consoleError(...args);
        throw new Error(args.join(' '));
      };
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

const generateSlideId = (prefix: string, index: number) => `${prefix}-slide-${index}`

/**
 * @description 基本的なカルーセル
 */
export const Default: Story = {
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={generateSlideId('default', index)}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-4xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // カルーセルの存在確認
    const carousel = canvas.getByRole('region', { name: /carousel/i })
    expect(carousel).toBeInTheDocument()
    
    // ナビゲーションボタンの確認
    const prevButton = canvas.getByRole('button', { name: /previous slide/i })
    const nextButton = canvas.getByRole('button', { name: /next slide/i })
    expect(prevButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
    
    // 最初のスライドでは「前へ」ボタンが無効
    expect(prevButton).toBeDisabled()
    expect(nextButton).not.toBeDisabled()
    
    // 次のスライドへ移動
    await userEvent.click(nextButton)
  },
}

/**
 * @description 垂直方向のカルーセル
 */
export const Vertical: Story = {
  render: () => (
    <Carousel orientation="vertical" className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={generateSlideId('vertical', index)}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-4xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // 垂直方向のナビゲーションボタンの確認
    const prevButton = canvas.getByRole('button', { name: /previous slide/i })
    const nextButton = canvas.getByRole('button', { name: /next slide/i })
    
    expect(prevButton).toHaveClass('rotate-90')
    expect(nextButton).toHaveClass('rotate-90')
  },
}

/**
 * @description 複数のアイテムを表示するカルーセル
 */
export const MultipleSlides: Story = {
  render: () => (
    <Carousel
      opts={{
        align: 'start',
        slidesToScroll: 2,
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent className="-ml-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <CarouselItem key={generateSlideId('multiple', index)} className="pl-2 basis-1/2">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-4xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // 2つのスライドが表示されていることを確認
    const slides = canvas.getAllByRole('group')
    expect(slides).toHaveLength(6)
    
    // ナビゲーションの動作確認
    const nextButton = canvas.getByRole('button', { name: /next slide/i })
    await userEvent.click(nextButton)
  },
}

/**
 * @description カスタムスタイルを適用したカルーセル
 */
export const CustomStyles: Story = {
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent className="rounded-lg bg-muted p-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <CarouselItem key={generateSlideId('custom', index)}>
            <div className="p-1">
              <Card className="border-2 border-primary">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold text-primary">
                    {index + 1}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="border-2 border-primary text-primary" />
      <CarouselNext className="border-2 border-primary text-primary" />
    </Carousel>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // カスタムスタイルの確認
    const content = canvas.getByRole('region').querySelector('.rounded-lg')
    expect(content).toHaveClass('bg-muted')
    
    // ナビゲーションボタンのスタイル確認
    const buttons = canvas.getAllByRole('button')
    for (const button of buttons) {
      expect(button).toHaveClass('border-2', 'border-primary', 'text-primary')
    }
  },
} 