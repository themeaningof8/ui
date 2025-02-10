/**
 * @file ToggleGroupのストーリー
 * @description ToggleGroupの様々な状態とバリエーションを表示
 */

import type { Meta, StoryObj } from '@storybook/react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta = {
  title: 'UI/ToggleGroup',
  component: ToggleGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

/**
 * @description 基本的なトグルグループの表示
 */
export const Default: Story = {
  args: {
    type: 'single',
    defaultValue: 'center',
  },
  render: () => (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left">左寄せ</ToggleGroupItem>
      <ToggleGroupItem value="center">中央</ToggleGroupItem>
      <ToggleGroupItem value="right">右寄せ</ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // トグルグループの存在確認
    const toggleGroups = canvas.getAllByRole('group')
    expect(toggleGroups).toHaveLength(2)
    
    // 各グループのトグルをテスト
    for (const group of toggleGroups) {
      const toggles = within(group).getAllByRole('radio')
      expect(toggles).toHaveLength(3)
      
      // 選択のテスト
      await userEvent.click(toggles[1])
      expect(toggles[1]).toHaveAttribute('aria-pressed', 'true')
    }
  },
}

/**
 * @description 複数選択可能なトグルグループ
 */
export const Multiple: Story = {
  args: {
    type: 'multiple',
    defaultValue: ['bold'],
  },
  render: () => (
    <ToggleGroup type="multiple" defaultValue={['bold']}>
      <ToggleGroupItem value="bold">太字</ToggleGroupItem>
      <ToggleGroupItem value="italic">斜体</ToggleGroupItem>
      <ToggleGroupItem value="underline">下線</ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // トグルグループの存在確認
    const toggles = canvas.getAllByRole('button')
    expect(toggles).toHaveLength(3)
    
    // デフォルト値の確認
    const boldToggle = canvas.getByText('太字')
    expect(boldToggle).toHaveAttribute('aria-pressed', 'true')
    
    // 複数選択のテスト
    const italicToggle = canvas.getByText('斜体')
    await userEvent.click(italicToggle)
    expect(boldToggle).toHaveAttribute('aria-pressed', 'true')
    expect(italicToggle).toHaveAttribute('aria-pressed', 'true')
  },
}

/**
 * @description サイズバリエーション
 */
export const Sizes: Story = {
  args: {
    type: 'single',
  },
  render: () => (
    <div className="flex flex-col space-y-4">
      <ToggleGroup type="single" size="sm">
        <ToggleGroupItem value="1">1</ToggleGroupItem>
        <ToggleGroupItem value="2">2</ToggleGroupItem>
        <ToggleGroupItem value="3">3</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" size="default">
        <ToggleGroupItem value="1">1</ToggleGroupItem>
        <ToggleGroupItem value="2">2</ToggleGroupItem>
        <ToggleGroupItem value="3">3</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" size="lg">
        <ToggleGroupItem value="1">1</ToggleGroupItem>
        <ToggleGroupItem value="2">2</ToggleGroupItem>
        <ToggleGroupItem value="3">3</ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // 各サイズのトグルグループを確認
    const toggleGroups = canvas.getAllByRole('group')
    expect(toggleGroups).toHaveLength(3)
    
    // 各サイズのトグルをテスト
    for (const group of toggleGroups) {
      const toggles = within(group).getAllByRole('button')
      expect(toggles).toHaveLength(3)
      
      // 選択のテスト
      await userEvent.click(toggles[1])
      expect(toggles[1]).toHaveAttribute('aria-pressed', 'true')
    }
  },
}

/**
 * @description 異なるバリアント
 */
export const Variants: Story = {
  args: {
    type: 'single',
  },
  render: () => (
    <div className="flex flex-col space-y-4">
      <ToggleGroup type="single" variant="default">
        <ToggleGroupItem value="1">デフォルト1</ToggleGroupItem>
        <ToggleGroupItem value="2">デフォルト2</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" variant="outline">
        <ToggleGroupItem value="1">アウトライン1</ToggleGroupItem>
        <ToggleGroupItem value="2">アウトライン2</ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // 各バリアントのトグルグループを確認
    const toggleGroups = canvas.getAllByRole('group')
    expect(toggleGroups).toHaveLength(2)
    
    // 各バリアントのトグルをテスト
    for (const group of toggleGroups) {
      const toggles = within(group).getAllByRole('radio')
      expect(toggles).toHaveLength(2)
      
      // 選択のテスト
      await userEvent.click(toggles[0])
      expect(toggles[0]).toHaveAttribute('aria-pressed', 'true')
      expect(toggles[1]).toHaveClass('bg-base-subtle-bg')
    }
  },
}

/**
 * @description 無効化状態のトグルグループ
 */
export const Disabled: Story = {
  args: {
    type: 'single',
  },
  render: () => (
    <ToggleGroup type="single" disabled>
      <ToggleGroupItem value="left" aria-label="左寄せ">
        左寄せ
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="中央寄せ">
        中央寄せ
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="右寄せ">
        右寄せ
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // トグルグループの存在確認
    const toggles = canvas.getAllByRole('button')
    expect(toggles).toHaveLength(3)
    
    // 無効化されたトグルの確認
    const disabledToggle = canvas.getByText('右寄せ')
    expect(disabledToggle).toBeDisabled()
    
    // 有効なトグルの操作テスト
    const enabledToggle = canvas.getByText('左寄せ')
    await userEvent.click(enabledToggle)
    expect(enabledToggle).toHaveAttribute('aria-pressed', 'true')
    
    // 無効化されたトグルをクリックしても状態が変わらないことを確認
    await userEvent.click(disabledToggle)
    expect(disabledToggle).not.toHaveAttribute('aria-pressed', 'true')
  },
} 