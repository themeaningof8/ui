/**
 * @file Tooltipのストーリー
 * @description Tooltipの使用例とバリエーションを表示
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

/**
 * @description Tooltipコンポーネントのメタデータ
 */
const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
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
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

/**
 * @description Tooltipの基本的な表示
 */
export const Default: Story = {
  render: () => (
    <div className="flex items-center justify-center h-[200px]">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">ホバーしてください</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>ツールチップが表示されました</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "ホバーしてください" });

    await step("ホバー", async () => {
      await userEvent.hover(button);
    });

    // ツールチップが表示されるのを待つ
    await step("ツールチップ表示確認", async () => {
      await waitFor(() => {
        expect(canvas.getByText("ツールチップが表示されました.")).toBeVisible();
      });
    });

    await step("アンホバー", async () => {
      await userEvent.unhover(button);
    });

    await step("ツールチップ非表示確認", async () => {
      await waitFor(() => {
        expect(
          canvas.queryByText("ツールチップが表示されました."),
        ).not.toBeVisible();
      });
    });
  },
};

/**
 * @description 表示位置のバリエーション
 */
export const Positions: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">上に表示</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>上に表示されます</p>
        </TooltipContent>
      </Tooltip>

      <div className="flex gap-8">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">左に表示</Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>左に表示されます</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">右に表示</Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>右に表示されます</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">下に表示</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>下に表示されます</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

/**
 * @description 遅延時間の設定例
 */
export const CustomDelay: Story = {
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={1000}>
        <Story />
      </TooltipProvider>
    ),
  ],
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">1秒後に表示</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>1秒後に表示されます</p>
      </TooltipContent>
    </Tooltip>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /1秒後に表示/ });

    // トリガーにホバーする
    await userEvent.hover(trigger);

    // 1秒待つ (delayDuration={1000})
    await step('Wait for 1 second', async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    // ツールチップが表示されることを確認
    const tooltipContent = await canvas.findByText('1秒後に表示されます');
    expect(tooltipContent).toBeVisible();

    // トリガーからマウスを離す
    await userEvent.unhover(trigger);
  }
}; 