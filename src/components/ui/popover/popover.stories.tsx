/**
 * @file Popoverの Stories
 * @description Popoverの使用例とバリエーションを Storybook で表示
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta = {
  title: 'UI/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * @description 基本的な Popover の使用例
 */
export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>ポップオーバーを開く</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">設定</h4>
            <p className="text-sm text-base-high">
              ポップオーバーの内容をここに表示します。
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button');
    
    // トリガーボタンの確認
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('ポップオーバーを開く');
    
    // ポップオーバーを開く
    await userEvent.click(trigger);
    
    // ポップオーバーの内容を確認
    const popover = document.querySelector('[role="dialog"]');
    expect(popover).toBeInTheDocument();
    
    const popoverContent = within(popover as HTMLElement);
    expect(popoverContent.getByText('設定')).toBeVisible();
    expect(popoverContent.getByText('ポップオーバーの内容をここに表示します。')).toBeVisible();
    
    // ポップオーバーを閉じる
    await userEvent.keyboard('{Escape}');
    expect(popover).not.toBeVisible();
  },
};

/**
 * @description 位置を指定した Popover
 */
export const Positioned: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button>上に表示</Button>
        </PopoverTrigger>
        <PopoverContent side="top">
          <p>上側に表示されるポップオーバー</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button>右に表示</Button>
        </PopoverTrigger>
        <PopoverContent side="right">
          <p>右側に表示されるポップオーバー</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button>下に表示</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom">
          <p>下側に表示されるポップオーバー</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button>左に表示</Button>
        </PopoverTrigger>
        <PopoverContent side="left">
          <p>左側に表示されるポップオーバー</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');
    
    // 4つのボタンが存在することを確認
    expect(buttons).toHaveLength(4);
    
    // 各方向のポップオーバーをテスト
    for (const [index, button] of buttons.entries()) {
      await userEvent.click(button);
      const popover = document.querySelector('[role="dialog"]');
      expect(popover).toBeInTheDocument();
      
      // 位置属性の確認
      const sides = ['top', 'right', 'bottom', 'left'];
      expect(popover).toHaveAttribute('data-side', sides[index]);
      
      // 内容の確認
      const content = within(popover as HTMLElement);
      expect(content.getByText(`${sides[index]}側に表示されるポップオーバー`)).toBeVisible();
      
      // 閉じる
      await userEvent.keyboard('{Escape}');
      expect(popover).not.toBeVisible();
    }
  },
};

/**
 * @description 配置を指定した Popover
 */
export const Aligned: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button>開始位置に揃える</Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <p>開始位置に揃えたポップオーバー</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button>中央に揃える</Button>
        </PopoverTrigger>
        <PopoverContent align="center">
          <p>中央に揃えたポップオーバー</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button>終了位置に揃える</Button>
        </PopoverTrigger>
        <PopoverContent align="end">
          <p>終了位置に揃えたポップオーバー</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');
    
    // 3つのボタンが存在することを確認
    expect(buttons).toHaveLength(3);
    
    // 各配置のポップオーバーをテスト
    for (const [index, button] of buttons.entries()) {
      await userEvent.click(button);
      const popover = document.querySelector('[role="dialog"]');
      expect(popover).toBeInTheDocument();
      
      // 配置属性の確認
      const alignments = ['start', 'center', 'end'];
      expect(popover).toHaveAttribute('data-align', alignments[index]);
      
      // 内容の確認
      const content = within(popover as HTMLElement);
      expect(content.getByText(`${alignments[index]}位置に揃えたポップオーバー`)).toBeVisible();
      
      // 閉じる
      await userEvent.keyboard('{Escape}');
      expect(popover).not.toBeVisible();
    }
  },
};

/**
 * @description カスタムスタイルを適用した Popover
 */
export const CustomStyles: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>カスタムスタイル</Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 bg-base-subtle p-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="text-lg font-medium leading-none">カスタマイズ例</h4>
            <p className="text-sm text-base-high">
              幅を広げ、背景色を変更し、パディングを大きくしたポップオーバーです。
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button');
    
    // トリガーボタンの確認
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('カスタムスタイル');
    
    // ポップオーバーを開く
    await userEvent.click(trigger);
    
    // カスタムスタイルの確認
    const popover = document.querySelector('[role="dialog"]');
    expect(popover).toBeInTheDocument();
    expect(popover).toHaveClass('w-96', 'bg-base-subtle', 'p-6');
    
    // 内容の確認
    const content = within(popover as HTMLElement);
    expect(content.getByText('カスタマイズ例')).toBeVisible();
    expect(content.getByText('幅を広げ、背景色を変更し、パディングを大きくしたポップオーバーです。')).toBeVisible();
    
    // ポップオーバーを閉じる
    await userEvent.keyboard('{Escape}');
    expect(popover).not.toBeVisible();
  },
}; 