/**
 * @file Breadcrumbのストーリー
 * @description Breadcrumbの使用例とバリエーションを表示
 */
import type { Meta, StoryObj } from '@storybook/react'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@/components/ui/breadcrumb'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta = {
  title: 'UI/Breadcrumb',
  component: Breadcrumb,
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
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

/**
 * @description 基本的なパンくずリスト
 */
export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/products">製品</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>詳細</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const nav = canvas.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'breadcrumb')

    const links = canvas.getAllByRole('link')
    expect(links).toHaveLength(3) // ホーム、製品、詳細（現在のページ）

    // 各リンクのテキストと属性を確認
    expect(links[0]).toHaveTextContent('ホーム')
    expect(links[0]).toHaveAttribute('href', '/')
    expect(links[1]).toHaveTextContent('製品')
    expect(links[1]).toHaveAttribute('href', '/products')
    expect(links[2]).toHaveAttribute('aria-current', 'page')
  },
}

/**
 * @description 長いパンくずリストの省略表示
 */
export const WithEllipsis: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>→</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator>→</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/products">製品</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>→</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>詳細</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // 省略記号の存在確認
    const ellipsis = canvas.getByRole('presentation')
    expect(ellipsis).toBeInTheDocument()
    
    // スクリーンリーダー用のテキストを確認
    const srOnlyText = canvas.getByText('More')
    expect(srOnlyText).toHaveClass('sr-only')
  },
}

/**
 * @description カスタムセパレーターを使用したパンくずリスト
 */
export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>→</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/products">製品</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>→</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>詳細</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // カスタムセパレーターの確認
    const separators = canvas.getAllByRole('presentation')
    for (const separator of separators) {
      expect(separator).toHaveTextContent('→')
    }
  },
}

/**
 * @description 非アクティブなリンクを含むパンくずリスト
 */
export const WithDisabledLink: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/products"
            className="pointer-events-none opacity-50"
            aria-disabled="true"
          >
            製品
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>詳細</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // 非アクティブなリンクの確認
    const disabledLink = canvas.getByText('製品').closest('a')
    expect(disabledLink).toHaveAttribute('aria-disabled', 'true')
    expect(disabledLink).toHaveClass('pointer-events-none', 'opacity-50')
  },
} 