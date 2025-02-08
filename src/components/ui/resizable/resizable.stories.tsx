/**
 * @file Resizableのストーリー
 * @description Resizableの様々な状態とバリエーションを表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta = {
  title: 'UI/Resizable',
  component: ResizablePanelGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ResizablePanelGroup>

export default meta
type Story = StoryObj<typeof meta>

/**
 * @description 基本的な水平分割パネル
 */
export const Default: Story = {
  args: {
    direction: 'horizontal',
  },
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-[400px] max-w-[800px] rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-medium">パネル1</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-medium">パネル2</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // パネルグループの存在確認
    const panelGroup = canvas.getByRole('group')
    expect(panelGroup).toBeInTheDocument()
    
    // パネルの確認
    const panels = canvas.getAllByText(/パネル\d/)
    expect(panels).toHaveLength(2)
    
    // リサイズハンドルの確認
    const handle = canvas.getByRole('separator')
    expect(handle).toBeInTheDocument()
  },
}

/**
 * @description 垂直分割パネル
 */
export const VerticalLayout: Story = {
  args: {
    direction: 'vertical',
  },
  render: () => (
    <ResizablePanelGroup
      direction="vertical"
      className="h-[400px] max-w-[800px] rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-medium">上部パネル</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-medium">下部パネル</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // パネルグループの存在確認
    const panelGroup = canvas.getByRole('group')
    expect(panelGroup).toBeInTheDocument()
    expect(panelGroup).toHaveClass('data-[panel-group-direction=vertical]:flex-col')
    
    // パネルの確認
    const topPanel = canvas.getByText('上部パネル')
    const bottomPanel = canvas.getByText('下部パネル')
    expect(topPanel).toBeInTheDocument()
    expect(bottomPanel).toBeInTheDocument()
  },
}

/**
 * @description 3パネルレイアウト
 */
export const ThreePanels: Story = {
  args: {
    direction: 'horizontal',
  },
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-[400px] max-w-[800px] rounded-lg border"
    >
      <ResizablePanel defaultSize={30}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-medium">サイドバー</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={40}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-medium">メインコンテンツ</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={30}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-medium">詳細パネル</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // パネルグループの存在確認
    const panelGroup = canvas.getByRole('group')
    expect(panelGroup).toBeInTheDocument()
    
    // パネルの確認
    const panels = [
      canvas.getByText('サイドバー'),
      canvas.getByText('メインコンテンツ'),
      canvas.getByText('詳細パネル'),
    ]
    for (const panel of panels) {
      expect(panel).toBeInTheDocument()
    }
    
    // リサイズハンドルの確認
    const handles = canvas.getAllByRole('separator')
    expect(handles).toHaveLength(2)
  },
}

/**
 * @description ネストされたパネル
 */
export const NestedPanels: Story = {
  args: {
    direction: 'horizontal',
  },
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-[400px] max-w-[800px] rounded-lg border"
    >
      <ResizablePanel defaultSize={30}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-medium">サイドバー</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={60}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-medium">メインコンテンツ</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={40}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-medium">プレビュー</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // パネルグループの存在確認
    const panelGroups = canvas.getAllByRole('group')
    expect(panelGroups).toHaveLength(2)
    
    // パネルの確認
    const panels = [
      canvas.getByText('サイドバー'),
      canvas.getByText('メインコンテンツ'),
      canvas.getByText('プレビュー'),
    ]
    for (const panel of panels) {
      expect(panel).toBeInTheDocument()
    }
    
    // リサイズハンドルの確認
    const handles = canvas.getAllByRole('separator')
    expect(handles).toHaveLength(2)
  },
}

/**
 * @description カスタムスタイルのパネル
 */
export const CustomStyles: Story = {
  args: {
    direction: 'horizontal',
  },
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-[400px] max-w-[800px] rounded-lg border bg-base-ui"
    >
      <ResizablePanel
        defaultSize={50}
        className="bg-background p-4"
      >
        <div className="flex h-full flex-col gap-4 rounded-md border p-4">
          <h3 className="text-lg font-medium">パネル1</h3>
          <p className="text-sm text-base-low">
            カスタムスタイルを適用したパネルの例です。
          </p>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        defaultSize={50}
        className="bg-background p-4"
      >
        <div className="flex h-full flex-col gap-4 rounded-md border p-4">
          <h3 className="text-lg font-medium">パネル2</h3>
          <p className="text-sm text-base-low">
            各パネルに独自のスタイルを適用できます。
          </p>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // パネルグループの存在確認
    const panelGroup = canvas.getByRole('group')
    expect(panelGroup).toBeInTheDocument()
    expect(panelGroup).toHaveClass('bg-base-ui')
    
    // パネルの確認
    const panels = canvas.getAllByText(/パネル\d/)
    expect(panels).toHaveLength(2)
    
    // スタイルの確認
    const descriptions = [
      canvas.getByText('カスタムスタイルを適用したパネルの例です。'),
      canvas.getByText('各パネルに独自のスタイルを適用できます。'),
    ]
    for (const description of descriptions) {
      expect(description).toHaveClass('text-sm', 'text-base-low')
    }
  },
} 