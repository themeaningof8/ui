/**
 * @file アスペクト比コンポーネントのストーリー
 * @description アスペクト比コンポーネントの使用例を表示します
 */

import type { Meta, StoryObj } from '@storybook/react'
import { AspectRatio } from '.'

const meta = {
  title: 'UI/AspectRatio',
  component: AspectRatio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 16:9のアスペクト比の使用例
 */
export const Widescreen: Story = {
  args: {
    ratio: 16 / 9,
    children: (
      <img
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        alt="写真"
        className="rounded-md object-cover w-full"
      />
    ),
    className: "w-[600px]",
  },
}

/**
 * 4:3のアスペクト比の使用例
 */
export const Standard: Story = {
  args: {
    ratio: 4 / 3,
    children: (
      <img
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        alt="写真"
        className="rounded-md object-cover w-full"
      />
    ),
    className: "w-[600px]",
  },
}

/**
 * 1:1の正方形アスペクト比の使用例
 */
export const Square: Story = {
  args: {
    ratio: 1,
    children: (
      <img
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        alt="写真"
        className="rounded-md object-cover w-full"
      />
    ),
    className: "w-[400px]",
  },
}

/**
 * ビデオコンテンツでの使用例
 */
export const Video: Story = {
  args: {
    ratio: 16 / 9,
    children: (
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="YouTube動画"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded-md"
      />
    ),
    className: "w-[600px]",
  },
}

/**
 * カスタムコンテンツでの使用例
 */
export const CustomContent: Story = {
  args: {
    ratio: 16 / 9,
    children: (
      <div className="flex items-center justify-center bg-muted rounded-md w-full h-full">
        <p className="text-muted-foreground">16:9のコンテンツエリア</p>
      </div>
    ),
    className: "w-[600px]",
  },
} 