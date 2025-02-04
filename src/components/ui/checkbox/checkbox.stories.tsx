/**
 * @file Checkboxの Storybook ストーリー
 * @description Checkboxの様々な状態とバリエーションを表示します。
 */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルトの Checkbox の表示例です。
 */
export const Default: Story = {
  args: {
    'aria-label': 'Accept terms and conditions',
  },
};

/**
 * チェック済み状態の Checkbox の表示例です。
 */
export const Checked: Story = {
  args: {
    'aria-label': 'Accept terms and conditions',
    defaultChecked: true,
  },
};

/**
 * 不確定状態の Checkbox の表示例です。
 */
export const Indeterminate: Story = {
  args: {
    'aria-label': 'Select all',
    indeterminate: true,
  },
};

/**
 * 無効化された Checkbox の表示例です。
 */
export const Disabled: Story = {
  args: {
    'aria-label': 'Accept terms and conditions',
    disabled: true,
  },
};

/**
 * 異なるサイズの Checkbox の表示例です。
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Checkbox size="sm" aria-label="Small checkbox" />
      <Checkbox size="default" aria-label="Default checkbox" />
      <Checkbox size="lg" aria-label="Large checkbox" />
    </div>
  ),
};

/**
 * ラベル付きの Checkbox の表示例です。
 */
export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" aria-label="Accept terms and conditions" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        利用規約に同意する
      </label>
    </div>
  ),
};

/**
 * Controlled モードでの Checkbox の使用例です。
 */
export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex items-center gap-2">
        <Checkbox
          id="controlled"
          checked={checked}
          onCheckedChange={setChecked}
          aria-label="Controlled checkbox"
        />
        <label
          htmlFor="controlled"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Controlled: {checked ? 'オン' : 'オフ'}
        </label>
      </div>
    );
  },
};

/**
 * フォーム内での Checkbox の使用例です。
 */
export const FormExample: Story = {
  render: () => {
    const [selectAll, setSelectAll] = useState(false);
    const [items, setItems] = useState({
      item1: false,
      item2: false,
      item3: false,
    });

    const handleSelectAll = (checked: boolean) => {
      setSelectAll(checked);
      setItems({
        item1: checked,
        item2: checked,
        item3: checked,
      });
    };

    const handleItemChange = (key: keyof typeof items, checked: boolean) => {
      const newItems = { ...items, [key]: checked };
      setItems(newItems);
      setSelectAll(Object.values(newItems).every(Boolean));
    };

    return (
      <form className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="select-all"
              checked={selectAll}
              onCheckedChange={handleSelectAll}
              aria-label="Select all"
            />
            <label
              htmlFor="select-all"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              すべて選択
            </label>
          </div>
        </div>
        <div className="ml-6 space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="item1"
              checked={items.item1}
              onCheckedChange={(checked) => handleItemChange('item1', checked)}
              aria-label="Item 1"
            />
            <label
              htmlFor="item1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              項目 1
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="item2"
              checked={items.item2}
              onCheckedChange={(checked) => handleItemChange('item2', checked)}
              aria-label="Item 2"
            />
            <label
              htmlFor="item2"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              項目 2
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="item3"
              checked={items.item3}
              onCheckedChange={(checked) => handleItemChange('item3', checked)}
              aria-label="Item 3"
            />
            <label
              htmlFor="item3"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              項目 3
            </label>
          </div>
        </div>
      </form>
    );
  },
}; 