/**
 * @file Separatorの Storybook 設定
 * @description Separatorの様々な状態と使用例を表示します。
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '@/components/ui/separator';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta = {
  title: 'UI/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    decorative: {
      control: 'boolean',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * @description デフォルトの水平方向のセパレーター
 */
export const Horizontal: Story = {
  render: () => <Separator />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const separator = canvas.getByRole('separator');

    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
    expect(separator).toHaveClass('h-[1px]');
  },
};

/**
 * @description 垂直方向のセパレーター
 */
export const Vertical: Story = {
  render: () => <Separator orientation="vertical" className="h-10" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const separator = canvas.getByRole('separator');

    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute('data-orientation', 'vertical');
    expect(separator).toHaveClass('w-[1px]');
  },
};

/**
 * @description 装飾的なセパレーター（`aria-hidden`属性を持つ）
 */
export const Decorative: Story = {
  render: () => <Separator decorative />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const separator = canvas.getByRole('none');

    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute('aria-hidden', 'true');
  },
};

/**
 * @description カスタムスタイルを適用したセパレーター
 */
export const CustomStyles: Story = {
  render: () => (
    <Separator
      className="bg-primary h-1 w-24"
      style={{
        backgroundImage:
          'linear-gradient(to right, transparent, currentColor, transparent)',
      }}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const separator = canvas.getByRole('separator');

    expect(separator).toBeInTheDocument();
    expect(separator).toHaveClass('bg-primary', 'h-1', 'w-24');
  },
};

/**
 * 様々な使用例
 */
export const Examples: Story = {
  render: () => (
    <div className="w-[500px] space-y-8">
      <div className="space-y-4">
        <h4 className="text-sm font-medium leading-none">水平セパレーター</h4>
        <Separator />
        <div className="text-sm text-base-low">
          セパレーターの下のコンテンツ
        </div>
      </div>

      <div className="flex h-[100px] space-x-4">
        <div className="space-y-4">
          <h4 className="text-sm font-medium leading-none">垂直セパレーター</h4>
        </div>
        <Separator orientation="vertical" />
        <div className="text-sm text-base-low">
          セパレーターの右のコンテンツ
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium leading-none">装飾的セパレーター</h4>
        <Separator decorative />
        <div className="text-sm text-base-low">
          装飾的なセパレーターはスクリーンリーダーで読み上げられません
        </div>
      </div>
    </div>
  ),
}; 