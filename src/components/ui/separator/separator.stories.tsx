import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Separator } from '.'

/**
 * `Separator`は、コンテンツを視覚的に分離するためのコンポーネントです。
 * Radix UIのSeparatorプリミティブをベースに、アクセシビリティと一貫したスタイリングを提供します。
 */
const meta = {
  title: 'UI/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof Separator>

/**
 * 基本的な水平セパレーターの例です。
 */
export const Default: Story = {
  render: () => (
    <div className="w-[300px]">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">セクション1</h4>
        <p className="text-sm text-step-11">
          セクション1の説明文が入ります。
        </p>
      </div>
      <Separator className="my-4" />
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">セクション2</h4>
        <p className="text-sm text-step-11">
          セクション2の説明文が入ります。
        </p>
      </div>
    </div>
  ),
}

/**
 * 垂直セパレーターの例です。
 */
export const Vertical: Story = {
  render: () => (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <div>アイテム1</div>
      <Separator orientation="vertical" />
      <div>アイテム2</div>
      <Separator orientation="vertical" />
      <div>アイテム3</div>
    </div>
  ),
}

/**
 * カスタムスタイルを適用した例です。
 */
export const CustomStyle: Story = {
  render: () => (
    <div className="w-[300px]">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">カスタムスタイル</h4>
        <p className="text-sm text-step-11">
          セパレーターにカスタムスタイルを適用できます。
        </p>
      </div>
      <Separator className="my-4 bg-primary" />
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">セクション2</h4>
        <p className="text-sm text-step-11">
          セクション2の説明文が入ります。
        </p>
      </div>
    </div>
  ),
}

/**
 * 装飾的でないセパレーターの例です。
 */
export const NonDecorative: Story = {
  render: () => (
    <div className="w-[300px]">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">セクション1</h4>
        <p className="text-sm text-step-11">
          セクション1の説明文が入ります。
        </p>
      </div>
      <Separator className="my-4" decorative={false} />
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">セクション2</h4>
        <p className="text-sm text-step-11">
          セクション2の説明文が入ります。
        </p>
      </div>
    </div>
  ),
}

/**
 * リストの区切りとして使用する例です。
 */
export const ListDivider: Story = {
  render: () => {
    const id = React.useId()
    let counter = 1;
    return (
      <div className="w-[300px] space-y-4">
        {Array.from({ length: 5 }).map(() => (
          <React.Fragment key={`${id}-${counter++}`}>
            {counter > 1 && <Separator className="my-4" />}
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none">
                リストアイテム {counter}
              </h4>
              <p className="text-sm text-muted-foreground">
                リストアイテム {counter} の説明文が入ります。
              </p>
            </div>
          </React.Fragment>
        ))}
      </div>
    )
  },
} 