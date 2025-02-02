/**
 * @file Badge コンポーネントの Storybook 設定
 * @description Badge コンポーネントの様々な状態とバリアントを表示します。
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@/components/ui/badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルトのバッジ表示
 */
export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

/**
 * セカンダリバリアントのバッジ
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

/**
 * デストラクティブバリアントのバッジ
 */
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

/**
 * アウトラインバリアントのバッジ
 */
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

/**
 * 様々なバッジの使用例
 */
export const Examples: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Badge>New</Badge>
      <Badge variant="secondary">Updated</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="outline">Draft</Badge>
    </div>
  ),
}; 