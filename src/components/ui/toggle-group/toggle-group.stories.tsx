import type { Meta, StoryObj } from '@storybook/react'
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '.'

/**
 * `ToggleGroup`は、複数のトグルボタンをグループ化し、単一選択または複数選択を管理するコンポーネントです。
 * Radix UIのToggle Groupプリミティブをベースに、アクセシビリティと一貫したスタイリングを提供します。
 */
const meta = {
  title: 'UI/ToggleGroup',
  component: ToggleGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof ToggleGroup>

/**
 * 基本的な単一選択の例です。
 */
export const SingleSelection: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
}

/**
 * 複数選択が可能な例です。
 */
export const MultipleSelection: Story = {
  render: () => (
    <ToggleGroup type="multiple" defaultValue={['bold']}>
      <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
      <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
    </ToggleGroup>
  ),
}

/**
 * アイコンを使用した例です。
 */
export const WithIcons: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

/**
 * アウトラインバリアントの例です。
 */
export const Outline: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left" variant="outline">
        Left
      </ToggleGroupItem>
      <ToggleGroupItem value="center" variant="outline">
        Center
      </ToggleGroupItem>
      <ToggleGroupItem value="right" variant="outline">
        Right
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

/**
 * 異なるサイズの例です。
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-center space-y-4">
      <ToggleGroup type="single" defaultValue="center">
        <ToggleGroupItem value="left" size="sm">Left</ToggleGroupItem>
        <ToggleGroupItem value="center" size="sm">Center</ToggleGroupItem>
        <ToggleGroupItem value="right" size="sm">Right</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" defaultValue="center">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" defaultValue="center">
        <ToggleGroupItem value="left" size="lg">Left</ToggleGroupItem>
        <ToggleGroupItem value="center" size="lg">Center</ToggleGroupItem>
        <ToggleGroupItem value="right" size="lg">Right</ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
}

/**
 * 無効化された状態の例です。
 */
export const Disabled: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left" disabled>
        Left
      </ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
}

/**
 * テキストとアイコンを組み合わせた例です。
 */
export const WithTextAndIcons: Story = {
  render: () => (
    <ToggleGroup type="multiple" defaultValue={['bold', 'italic']}>
      <ToggleGroupItem value="bold">
        <Bold className="h-4 w-4 mr-2" />
        Bold
      </ToggleGroupItem>
      <ToggleGroupItem value="italic">
        <Italic className="h-4 w-4 mr-2" />
        Italic
      </ToggleGroupItem>
      <ToggleGroupItem value="underline">
        <Underline className="h-4 w-4 mr-2" />
        Underline
      </ToggleGroupItem>
    </ToggleGroup>
  ),
} 