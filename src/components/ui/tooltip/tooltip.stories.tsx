/**
 * @file Tooltipのストーリー
 * @description Tooltipの使用例とバリエーションを表示
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

/**
 * @description Tooltipコンポーネントのメタデータ
 */
const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
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
 * @description 基本的な使用例
 */
export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">ホバーしてください</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>ツールチップの内容</p>
      </TooltipContent>
    </Tooltip>
  ),
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
}; 