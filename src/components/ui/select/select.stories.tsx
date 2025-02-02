/**
 * @file Select コンポーネントの Storybook ストーリー
 * @description Select コンポーネントの様々な状態とバリエーションを表示します。
 */
import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from '@/components/ui/select';

const meta = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルトの Select の表示例です。
 */
export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="選択してください" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="1">オプション 1</SelectItem>
          <SelectItem value="2">オプション 2</SelectItem>
          <SelectItem value="3">オプション 3</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

/**
 * グループ化された Select の表示例です。
 */
export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="フルーツを選択" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>果物</SelectLabel>
          <SelectItem value="apple">りんご</SelectItem>
          <SelectItem value="banana">バナナ</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>野菜</SelectLabel>
          <SelectItem value="carrot">にんじん</SelectItem>
          <SelectItem value="tomato">トマト</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

/**
 * 無効化された Select の表示例です。
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Select disabled>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="無効化された Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="1">オプション 1</SelectItem>
            <SelectItem value="2">オプション 2</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="一部無効化" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="1">オプション 1</SelectItem>
            <SelectItem value="2" disabled>オプション 2</SelectItem>
            <SelectItem value="3">オプション 3</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
};

/**
 * フォーム内での Select の使用例です。
 */
export const FormExample: Story = {
  render: () => (
    <form className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="fruit"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          好きなフルーツ
        </label>
        <Select name="fruit" required>
          <SelectTrigger id="fruit" className="w-full">
            <SelectValue placeholder="フルーツを選択してください" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>果物</SelectLabel>
              <SelectItem value="apple">りんご</SelectItem>
              <SelectItem value="banana">バナナ</SelectItem>
              <SelectItem value="orange">オレンジ</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>ベリー類</SelectLabel>
              <SelectItem value="strawberry">いちご</SelectItem>
              <SelectItem value="blueberry">ブルーベリー</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <p className="text-sm text-base-low">
          お気に入りのフルーツを選択してください。
        </p>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="size"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          サイズ
        </label>
        <Select name="size" defaultValue="m">
          <SelectTrigger id="size" className="w-full">
            <SelectValue placeholder="サイズを選択してください" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="s">S</SelectItem>
              <SelectItem value="m">M</SelectItem>
              <SelectItem value="l">L</SelectItem>
              <SelectItem value="xl">XL</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </form>
  ),
}; 