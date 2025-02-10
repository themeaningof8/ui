/**
 * @file Toggleのストーリー
 * @description Toggleの使用例とバリエーションを表示
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '@/components/ui/toggle';
import { Label } from '@components/ui/label';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

/**
 * @description Toggleコンポーネントのメタデータ
 */
const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // トグルとラベルの存在確認
    const toggle = canvas.getByRole('button');
    const label = canvas.getByText('トグルスイッチ');
    expect(toggle).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    
    // 初期状態の確認
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    
    // クリックしてトグル状態を変更
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    
    // もう一度クリックして元に戻す
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 各サイズのトグルを取得
    const toggles = canvas.getAllByRole('button');
    expect(toggles).toHaveLength(3);
    
    // サイズクラスの確認
    const [small, defaultSize, large] = toggles;
    expect(small).toHaveClass('h-8', 'w-8');
    expect(defaultSize).toHaveClass('h-9', 'w-9');
    expect(large).toHaveClass('h-10', 'w-10');
    
    // 各トグルの動作確認
    for (const toggle of toggles) {
      await userEvent.click(toggle);
      expect(toggle).toHaveAttribute('aria-pressed', 'true');
    }
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 無効化されたトグルの確認
    const toggle = canvas.getByRole('button');
    expect(toggle).toBeDisabled();
    
    // disabled状態のスタイリングを確認
    const computedStyle = window.getComputedStyle(toggle);
    expect(computedStyle.pointerEvents).toBe('none');
    expect(computedStyle.opacity).toBe('0.5');
    
    // クリックしても状態が変化しないことを確認
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
  },
}; 