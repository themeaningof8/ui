/**
 * @file Separator コンポーネントの Storybook 設定
 * @description Separator コンポーネントの様々な状態と使用例を表示します。
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './';

const meta = {
  title: 'UI/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルトの水平セパレーター
 */
export const Default: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div>Content Above</div>
      <Separator />
      <div>Content Below</div>
    </div>
  ),
};

/**
 * 垂直セパレーター
 */
export const Vertical: Story = {
  render: () => (
    <div className="flex h-[100px] items-center space-x-4">
      <div>Left</div>
      <Separator orientation="vertical" />
      <div>Right</div>
    </div>
  ),
};

/**
 * 装飾的セパレーター
 */
export const Decorative: Story = {
  args: {
    decorative: true,
  },
  render: (args) => (
    <div className="w-[300px] space-y-4">
      <div>Content Above</div>
      <Separator {...args} />
      <div>Content Below</div>
    </div>
  ),
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