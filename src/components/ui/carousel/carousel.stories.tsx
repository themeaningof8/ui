/**
 * @file カルーセルコンポーネントのストーリー
 * @description カルーセルコンポーネントの使用例を表示します
 */

import type { Meta, StoryObj } from '@storybook/react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '.'
import React from 'react';

const meta = {
  title: 'UI/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なカルーセルの使用例
 */
export const Default: Story = {
  render: () => {
    const id = React.useId();
    let counter = 0;
    return (
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map(() => (
            <CarouselItem key={`${id}-${counter++}`}>
              <div className="p-1">
                <div className="flex aspect-square items-center justify-center rounded-lg bg-muted p-6">
                  <span className="text-4xl font-semibold">{counter}</span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  },
}

/**
 * 画像を含むカルーセルの使用例
 */
export const WithImages: Story = {
  render: () => {
    const id = React.useId();
    let counter = 0;
    return (
      <Carousel className="w-full max-w-md">
        <CarouselContent>
          {[
            'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80',
            'https://images.unsplash.com/photo-1588345921517-c2dcdb7f1dcd?w=800&dpr=2&q=80',
            'https://images.unsplash.com/photo-1588345921532-c2dcdb7f1dcd?w=800&dpr=2&q=80',
          ].map(() => {
            return (
              <CarouselItem key={`${id}-${counter++}`}>
                <div className="p-1">
                  <img
                    src={'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80'}
                    alt={`スライド ${counter}`}
                    className="aspect-video w-full rounded-lg object-cover"
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  },
}

/**
 * オートプレイ機能を使用したカルーセルの例
 */
export const AutoPlay: Story = {
  render: () => {
    const id = React.useId();
    let counter = 0;
    return (
      <Carousel className="w-full max-w-xs" autoPlay interval={3000}>
        <CarouselContent>
          {Array.from({ length: 5 }).map(() => (
            <CarouselItem key={`${id}-${counter++}`}>
              <div className="p-1">
                <div className="flex aspect-square items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <span className="text-4xl font-semibold">{counter}</span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  },
}

/**
 * カスタムスタイルを適用したカルーセルの例
 */
export const CustomStyle: Story = {
  render: () => {
    const id = React.useId();
    let counter = 0;
    return (
      <Carousel className="w-full max-w-md bg-muted p-4 rounded-xl">
        <CarouselContent className="-ml-2 md:-ml-4">
          {Array.from({ length: 5 }).map(() => (
            <CarouselItem key={`${id}-${counter++}`} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <div className="flex aspect-video items-center justify-center rounded-lg bg-primary-foreground p-6">
                  <span className="text-4xl font-semibold">{counter}</span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    );
  },
} 