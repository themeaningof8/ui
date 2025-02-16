import type { Meta, StoryObj } from '@storybook/react'
import { ScrollArea } from '.'
import { Separator } from '@/components/ui/separator';
import React from 'react';

/**
 * `ScrollArea`は、カスタムスクロールバーを持つスクロール可能な領域を作成するコンポーネントです。
 * Radix UIのScroll Areaプリミティブをベースに、アクセシビリティと一貫したスタイリングを提供します。
 */
const meta = {
  title: 'UI/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof ScrollArea>

/**
 * 基本的な垂直スクロールの例です。
 */
export const Vertical: Story = {
  render: () => {
    const id = React.useId();
    let counter = 0;
    return (
      <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
        <div className="space-y-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
          {Array.from({ length: 20 }).map((_) => (
            <React.Fragment key={`${id}-${counter++}`}>
              <div className="text-sm">
                Item {counter}
              </div>
              <Separator className='my-2' />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    );
  },
}

/**
 * 水平スクロールの例です。
 */
export const Horizontal: Story = {
  render: () => {
     const id = React.useId();
     let counter = 0;
    return (
    <ScrollArea className="h-[100px] w-[350px] rounded-md border">
      <div className="flex p-4">
        {Array.from({ length: 20 }).map(() => (
          <div
            key={`${id}-${counter++}`}
            className="flex h-16 w-16 shrink-0 items-center justify-center border"
          >
            {counter}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
  }
}

/**
 * 両方向のスクロールの例です。
 */
export const Both: Story = {
   render: () => {
    const id = React.useId();
    let counter = 0;
    return (
    <ScrollArea className="h-[300px] w-[400px] rounded-md border p-4">
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 30 }).map(() => (
          <div
            key={`${id}-${counter++}`}
            className="flex h-[120px] items-center justify-center rounded-md border"
          >
            Item {counter}
          </div>
        ))}
      </div>
    </ScrollArea>
    );
   }
}

/**
 * テキストコンテンツの例です。
 */
export const WithText: Story = {
  render: () => {
    const id = React.useId();
    let counter = 0;
    return(
    <ScrollArea className="h-[300px] w-[600px] rounded-md border p-4">
      <div className="space-y-4">
        <h4 className="text-sm font-medium leading-none">テキストコンテンツ</h4>
        {Array.from({ length: 10 }).map(() => (
          <div key={`${id}-${counter++}`} className="text-sm">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              facilisi. Sed euismod, nisl nec ultricies lacinia, nunc nisl
              tincidunt nunc, vitae aliquam nunc nisl eu nunc.
            </p>
            <p className="mt-2">
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Integer euismod lacus luctus
              magna.
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
    );
  }
}

/**
 * カスタムスタイルを適用した例です。
 */
export const CustomStyle: Story = {
  render: () => {
    const id = React.useId();
    let counter = 0;
    return (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border bg-step-3 p-4">
      <div className="space-y-4">
        {Array.from({ length: 20 }).map(() => (
          <div key={`${id}-${counter++}`} className="text-sm text-step-11">
            Item {counter}
          </div>
        ))}
      </div>
    </ScrollArea>
    );
  }
}

/**
 * ネストされたスクロールエリアの例です。
 */
export const Nested: Story = {
  render: () => {
      const outerId = React.useId();
      let outerCounter = 0;
    return (
    <ScrollArea className="h-[400px] w-[600px] rounded-md border p-4">
      <div className="space-y-4">
        <h4 className="text-sm font-medium leading-none">外側のスクロールエリア</h4>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map(() => {
              const innerId = React.useId();
              let innerCounter = 0;
              return (
            <ScrollArea
              key={`${outerId}-${outerCounter++}`}
              className="h-[100px] w-full rounded-md border bg-step-3 p-4"
            >
              <div className="space-y-2">
                <h5 className="text-sm font-medium leading-none">
                  内側のスクロールエリア {outerCounter}
                </h5>
                {Array.from({ length: 10 }).map(() => (
                  <div key={`${innerId}-${innerCounter++}`} className="text-sm">
                    Nested Item {innerCounter}
                  </div>
                ))}
              </div>
            </ScrollArea>
              );
          })}
        </div>
      </div>
    </ScrollArea>
    );
  }
}

export const VerticalWithScrollBar: Story = {
  render: () => {
    const id = React.useId();
    let counter = 0;
    return (
      <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
        <div className="space-y-4">
          {Array.from({ length: 20 }).map((_) => (
            <div key={`${id}-${counter++}`} className="text-sm">
              Item {counter}
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  },
} 