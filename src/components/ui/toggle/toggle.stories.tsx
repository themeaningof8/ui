/**
 * @file Toggleコンポーネントのストーリー
 * @description Toggleコンポーネントの使用例とバリエーションを表示
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '.';
import { Label } from '../label';

/**
 * @description Toggleコンポーネントのメタデータ
 */
const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toggle>;

/**
 * @description 基本的な使用例
 */
export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Toggle id="toggle" />
      <Label htmlFor="toggle">トグルスイッチ</Label>
    </div>
  ),
};

/**
 * @description サイズバリエーション
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <Toggle id="toggle-sm" size="sm" />
        <Label htmlFor="toggle-sm">Small</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Toggle id="toggle-default" size="default" />
        <Label htmlFor="toggle-default">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Toggle id="toggle-lg" size="lg" />
        <Label htmlFor="toggle-lg">Large</Label>
      </div>
    </div>
  ),
};

/**
 * @description 無効状態
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Toggle id="toggle-disabled" disabled />
      <Label htmlFor="toggle-disabled">無効状態</Label>
    </div>
  ),
}; 