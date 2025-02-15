/**
 * @file colors.stories.tsx
 * @description カラーパレットのドキュメントを提供するストーリー
 */

import type { Meta, StoryObj } from '@storybook/react'
import { cn } from '@/lib/utils'
import { Card,
  CardHeader,
  CardTitle,
  CardContent } from '@/components/ui/card'

const meta = {
  title: 'Foundation/Colors',
  parameters: {
    layout: 'centered',
    // テスト用のパラメータを追加
    chromatic: { disableSnapshot: false },
    // デザインシステムのメタデータ
    design: {
      type: 'figma',
      url: 'YOUR_FIGMA_URL_HERE',
    },
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * カラースケールの使用例を示すコンポーネント
 */
const ColorScale = ({
  step,
  useCase,
  className
}: {
  step: number
  useCase: string
  className?: string
}) => (
  <div className="flex items-center gap-2" data-testid={`color-scale-${step}`}>
    <div
      className={cn(
        'size-10 rounded-md',
        className,
      )}
      style={{ backgroundColor: `var(--color-step-${step})` }}
    />
    <div
      className={cn(
        'size-10 rounded-md',
        className
      )}
      style={{ backgroundColor: `var(--color-accent-step-${step})` }}
    />
    <div
      className={cn(
        'size-10 rounded-md',
        className,
      )}
      style={{ backgroundColor: `var(--color-destructive-step-${step})` }}
    />

    <div className="flex flex-col">
      <div className="text-xs font-medium">Step {step}</div>
      <div className="text-xs">{useCase}</div>
    </div>
  </div>
)

/**
 * カラースケールの概要
 */
export const Overview: Story = {
  render: () => (
    <div className="prose prose-sm max-w-none dark:prose-invert">
      <h1>カラースケールについて</h1>
      <p className="text-step-11">
        各スケールには12のステップがあり、それぞれのステップは特定のユースケースのために設計されています。
        以下の表は、各ステップの一般的な使用例の概要を示しています。
      </p>

      <div className="space-y-0.5">
        <ColorScale
          step={1}
          useCase="アプリケーションの背景"
          className="bg-step-1"
        />
        <ColorScale
          step={2}
          useCase="サブ背景"
          className="bg-step-2"
        />
        <ColorScale
          step={3}
          useCase="UIエレメントの背景"
          className="bg-step-3"
        />
        <ColorScale
          step={4}
          useCase="ホバー時のUIエレメント背景"
          className="bg-step-4"
        />
        <ColorScale
          step={5}
          useCase="アクティブ/選択されたUIエレメントの背景"
          className="bg-step-5"
        />
        <ColorScale
          step={6}
          useCase="サブ境界線とセパレーター"
          className="bg-step-6"
        />
        <ColorScale
          step={7}
          useCase="UIエレメントの境界線とフォーカスリング"
          className="bg-step-7"
        />
        <ColorScale
          step={8}
          useCase="ホバー時のUIエレメントの境界線"
          className="bg-step-8"
        />
        <ColorScale
          step={9}
          useCase="ソリッドな背景"
          className="bg-step-9"
        />
        <ColorScale
          step={10}
          useCase="ホバー時のソリッドな背景"
          className="bg-step-10"
        />
        <ColorScale
          step={11}
          useCase="低コントラストのテキスト"
          className="bg-step-11"
        />
        <ColorScale
          step={12}
          useCase="高コントラストのテキスト"
          className="bg-step-12"
        />
      </div>

      <h2>ステップ1-2: 背景</h2>
      <p className="text-step-11">
        ステップ1と2は、アプリケーションの背景とサブコンポーネントの背景用に設計されています。
        目的に応じて使い分けることができます。
      </p>

      <Card>
        <CardHeader>
          <CardTitle>適切な使用例：</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside">
            <li>メインアプリケーションの背景</li>
            <li>ストライプテーブルの背景</li>
            <li>コードブロックの背景</li>
            <li>カードの背景</li>
            <li>サイドバーの背景</li>
            <li>キャンバスエリアの背景</li>
          </ul>
        </CardContent>
      </Card>

      <h2>ステップ3-5: コンポーネントの背景</h2>
      <p className="text-step-11">
        ステップ3、4、5はUIコンポーネントの背景用に設計されています。
      </p>
      <Card>
        <CardHeader>
          <CardTitle>適切な使用例：</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside">
            <li>ステップ3: 通常の状態</li>
            <li>ステップ4: ホバー状態</li>
            <li>ステップ5: 押下または選択された状態</li>
          </ul>
        </CardContent>
      </Card>

      <h2>ステップ6-8: 境界線</h2>
      <p>
        ステップ6、7、8は境界線用に設計されています。
      </p>

      <Card>
        <CardHeader>
          <CardTitle>適切な使用例：</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside">
            <li>ステップ6: インタラクティブでないコンポーネントのサブ境界線（サイドバー、ヘッダー、カード、アラート、セパレーター）</li>
            <li>ステップ7: インタラクティブなコンポーネントのサブ境界線</li>
            <li>ステップ8: インタラクティブなコンポーネントの強調境界線とフォーカスリング</li>
          </ul>
        </CardContent>
      </Card>

      <h2>ステップ9-10: ソリッドな背景</h2>
      <p>
        ステップ9と10はソリッドな背景用に設計されています。
      </p>
      <p>
        ステップ9は、スケール内で最も彩度の高いステップです。つまり、最も純粋なステップであり、
        白または黒が最も少なく混ざっているステップです。ステップ9は純粋なため、幅広い用途があります：
      </p>

      <Card>
        <CardHeader>
          <CardTitle>適切な使用例：</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside">
            <li>ウェブサイト/アプリケーションの背景</li>
            <li>ウェブサイトのセクション背景</li>
            <li>ヘッダーの背景</li>
            <li>コンポーネントの背景</li>
            <li>グラフィックス/ロゴ</li>
            <li>オーバーレイ</li>
            <li>カラーシャドウ</li>
            <li>アクセント境界線</li>
          </ul>
        </CardContent>
      </Card>

      <h2>ステップ11-12: テキスト</h2>
      <p>
        ステップ11と12はテキスト用に設計されています。
      </p>

      <Card>
        <CardHeader>
          <CardTitle>適切な使用例：</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside">
            <li>ステップ11: 低コントラストのテキスト</li>
            <li>ステップ12: 高コントラストのテキスト</li>
          </ul>
        </CardContent>
      </Card>

      <h2>インタラクティブな例</h2>
      <div className="not-prose space-y-4">
        <div className="rounded-lg border border-border p-4 space-y-4">
          <h3 className="text-lg font-medium">ボタンの状態</h3>
          <div className="flex gap-4">
            <button
              type="button"
              className="rounded-md bg-card px-4 py-2 hover:bg-step-5 active:bg-step-5/80"
            >
              通常
            </button>
            <button
              type="button"
              className="rounded-md bg-step-5 px-4 py-2"
            >
              ホバー
            </button>
            <button
              type="button"
              className="rounded-md bg-step-5/80 px-4 py-2"
            >
              アクティブ
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-border p-4 space-y-4">
          <h3 className="text-lg font-medium">テキストのコントラスト</h3>
          <div className="space-y-2">
            <p className="text-step-12">高コントラストテキスト (Step 12)</p>
            <p className="text-step-11">低コントラストテキスト (Step 11)</p>
            <p className="text-sm text-step-11">補足テキスト</p>
          </div>
        </div>

        <div className="rounded-lg border border-border p-4 space-y-4">
          <h3 className="text-lg font-medium">境界線の使用例</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-md border border-step-6 p-4">
              デフォルト
            </div>
            <div className="rounded-md border-2 border-step-7 p-4">
              フォーカス
            </div>
            <div className="rounded-md border border-step-8 p-4">
              アクセント
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

/**
 * ダークモードでの表示
 */
export const DarkMode: Story = {
  ...Overview,
  parameters: {
    backgrounds: { default: 'dark' },
  },
} 