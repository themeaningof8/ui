/**
 * @file Avatar コンポーネントの Storybook 設定
 * @description Avatar コンポーネントの様々な状態と使用例を表示します。
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルトのアバター表示
 */
export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="@shadcn"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

/**
 * 画像なしのアバター
 */
export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="invalid-image.jpg" alt="Invalid Image" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

/**
 * サイズバリエーション
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  ),
};

/**
 * 様々な使用例
 */
export const Examples: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">shadcn</p>
          <p className="text-sm text-base-low">@shadcn</p>
        </div>
      </div>

      <div className="flex -space-x-4">
        <Avatar className="border-2 border-background">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="border-2 border-background">
          <AvatarImage src="https://github.com/radix-ui.png" alt="@radix-ui" />
          <AvatarFallback>RU</AvatarFallback>
        </Avatar>
        <Avatar className="border-2 border-background">
          <AvatarFallback>+2</AvatarFallback>
        </Avatar>
      </div>
    </div>
  ),
}; 