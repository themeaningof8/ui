import type { Meta, StoryObj } from '@storybook/react'
import { CalendarDays } from 'lucide-react'
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '.'

/**
 * `HoverCard`は、要素にホバーした時に追加情報を表示するためのコンポーネントです。
 * Radix UIのHoverCardプリミティブをベースに、アクセシビリティと一貫したスタイリングを提供します。
 */
const meta = {
  title: 'UI/HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof HoverCard>

/**
 * 基本的な使用例です。
 */
export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger>Hover me</HoverCardTrigger>
      <HoverCardContent>
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">The React Framework – created and maintained by @vercel.</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}

/**
 * プロフィールカードの例です。
 */
export const Profile: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a
          href="https://example.com/user"
          className="text-sm font-medium underline underline-offset-4"
        >
          @user
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@user</h4>
            <p className="text-sm">
              Frontend developer and UI/UX enthusiast. Loves React and TypeScript.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}

/**
 * カスタム配置の例です。
 */
export const CustomPlacement: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger>Hover me (custom placement)</HoverCardTrigger>
      <HoverCardContent align="start" sideOffset={10}>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">Custom Placement</h4>
          <p className="text-sm">
            This card is aligned to the start and has a side offset of 10 pixels.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}

/**
 * リッチコンテンツの例です。
 */
export const RichContent: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger>Hover for rich content</HoverCardTrigger>
      <HoverCardContent className="w-96">
        <div className="space-y-4">
          <div className="space-y-1">
            <h4 className="text-lg font-semibold">Rich Content Example</h4>
            <p className="text-sm text-muted-foreground">
              HoverCardは、画像、リスト、その他のリッチコンテンツを表示できます。
            </p>
          </div>
          <div className="grid gap-2">
            <div className="rounded-md bg-muted p-2">
              <p className="text-sm">サンプルコード:</p>
              <pre className="text-xs">
                {`<HoverCard>
  <HoverCardTrigger>
    Hover me
  </HoverCardTrigger>
  <HoverCardContent>
    Content
  </HoverCardContent>
</HoverCard>`}
              </pre>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
} 