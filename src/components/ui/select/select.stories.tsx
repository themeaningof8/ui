/**
 * @file Selectの Storybook ストーリー
 * @description Selectの様々な状態とバリエーションを表示します。
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
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta = {
  title: 'UI/Select',
  component: Select,
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
export const DisabledExample: Story = {
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

/**
 * 基本的なSelectコンポーネントの使用例
 */
export const Basic: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');

    // トリガーが正しく表示されているか確認
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Select a fruit');

    // トリガーをクリックしてオプションを表示
    await userEvent.click(trigger);

    // オプションが表示されているか確認
    const options = canvas.getAllByRole('option');
    expect(options).toHaveLength(5);

    // 各オプションのテキストを確認
    expect(options[0]).toHaveTextContent('Apple');
    expect(options[1]).toHaveTextContent('Banana');
    expect(options[2]).toHaveTextContent('Blueberry');
    expect(options[3]).toHaveTextContent('Grapes');
    expect(options[4]).toHaveTextContent('Pineapple');

    // Bananaを選択
    await userEvent.click(options[1]);

    // トリガーのテキストがBananaに変わったことを確認
    expect(trigger).toHaveTextContent('Banana');
  },
};

/**
 * グループ化されたSelectコンポーネントの使用例
 */
export const Grouped: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a framework" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Frameworks</SelectLabel>
          <SelectItem value="next">Next.js</SelectItem>
          <SelectItem value="sveltekit">SvelteKit</SelectItem>
          <SelectItem value="remix">Remix</SelectItem>
          <SelectItem value="astro">Astro</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Libraries</SelectLabel>
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="vue">Vue</SelectItem>
          <SelectItem value="svelte">Svelte</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');

    // トリガーをクリック
    await userEvent.click(trigger);

    // ラベルが表示されていることを確認
    expect(canvas.getByText('Frameworks')).toBeVisible();
    expect(canvas.getByText('Libraries')).toBeVisible();

    // 各グループのアイテム数を確認
    const frameworkOptions = canvas.getAllByText(/Next\.js|SvelteKit|Remix|Astro/);
    const libraryOptions = canvas.getAllByText(/React|Vue|Svelte/);
    expect(frameworkOptions).toHaveLength(4);
    expect(libraryOptions).toHaveLength(3);
  },
};

/**
 * 無効化されたSelectコンポーネントの使用例
 */
export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a color" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="red">Red</SelectItem>
        <SelectItem value="green">Green</SelectItem>
        <SelectItem value="blue">Blue</SelectItem>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');

    // Selectがdisabled状態であることを確認
    expect(trigger).toBeDisabled();
  },
};

/**
 * カスタムスタイルのSelectコンポーネントの使用例
 */
export const CustomStyle: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px] border-2 border-dashed border-primary">
        <SelectValue placeholder="Select a programming language" />
      </SelectTrigger>
      <SelectContent className="bg-popover border-primary">
        <SelectItem value="javascript" className="hover:bg-accent hover:text-accent-foreground">
          JavaScript
        </SelectItem>
        <SelectItem value="typescript" className="hover:bg-accent hover:text-accent-foreground">
          TypeScript
        </SelectItem>
        <SelectItem value="python" className="hover:bg-accent hover:text-accent-foreground">
          Python
        </SelectItem>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');

    // カスタムスタイルが適用されていることを確認
    expect(trigger).toHaveClass('border-2', 'border-dashed', 'border-primary');

    // トリガーをクリックしてオプションを表示
    await userEvent.click(trigger);

    // オプションのカスタムスタイルを確認
    const options = canvas.getAllByRole('option');
    for (const option of options) {
      expect(option).toHaveClass('hover:bg-accent', 'hover:text-accent-foreground');
    }
  },
}; 