/**
 * @file パンくずリストコンポーネントのストーリー
 * @description パンくずリストコンポーネントの使用例を表示します
 */

import type { Meta, StoryObj } from '@storybook/react'
import { ChevronRight, Home, FileText, Folder } from 'lucide-react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '.'

const meta = {
  title: 'UI/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なパンくずリストの使用例
 */
export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>現在のページ</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
}

/**
 * 複数階層のパンくずリストの使用例
 */
export const MultiLevel: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/category">カテゴリー</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/category/subcategory">サブカテゴリー</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>現在のページ</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
}

/**
 * カスタムセパレーターを使用したパンくずリストの使用例
 */
export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <ChevronRight className="size-4" />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbPage>現在のページ</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
}

/**
 * アイコン付きのパンくずリストの使用例
 */
export const WithIcons: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="/" className="flex items-center gap-2">
          <Home className="size-4" />
          ホーム
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/documents" className="flex items-center gap-2">
          <Folder className="size-4" />
          ドキュメント
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage className="flex items-center gap-2">
          <FileText className="size-4" />
          レポート
        </BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
}

/**
 * カスタムスタイルを適用したパンくずリストの使用例
 */
export const CustomStyle: Story = {
  render: () => (
    <Breadcrumb className="bg-muted p-2 rounded-lg">
      <BreadcrumbItem>
        <BreadcrumbLink href="/" className="text-primary hover:text-primary/80">
          ホーム
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator className="text-muted-foreground" />
      <BreadcrumbItem>
        <BreadcrumbPage className="font-semibold">
          現在のページ
        </BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
} 