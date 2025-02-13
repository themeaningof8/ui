import type { Meta, StoryObj } from '@storybook/react'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '.'

/**
 * `Resizable`は、リサイズ可能なパネルを作成するためのコンポーネントセットです。
 * react-resizable-panelsをベースに、アクセシビリティと一貫したスタイリングを提供します。
 */
const meta = {
  title: 'UI/Resizable',
  component: ResizablePanelGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ResizablePanelGroup>

export default meta
type Story = StoryObj<typeof ResizablePanelGroup>

/**
 * 基本的な水平方向のリサイズパネルの例です。
 */
export const Horizontal: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-[200px] max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Panel 1</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Panel 2</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

/**
 * 垂直方向のリサイズパネルの例です。
 */
export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="vertical"
      className="h-[400px] max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Panel 1</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Panel 2</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

/**
 * ハンドルアイコン付きの例です。
 */
export const WithHandle: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-[200px] max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Panel 1</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Panel 2</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

/**
 * 3つのパネルを持つ例です。
 */
export const ThreePanels: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-[200px] max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={30}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Panel 1</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={40}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Panel 2</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={30}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Panel 3</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

/**
 * サイズ制約付きの例です。
 */
export const WithConstraints: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-[200px] max-w-md rounded-lg border"
    >
      <ResizablePanel minSize={30} maxSize={70} defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">30-70%</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={30} maxSize={70} defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">30-70%</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

/**
 * ネストされたパネルの例です。
 */
export const Nested: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-[400px] max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={30}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Panel 1</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Panel 2</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Panel 3</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
} 