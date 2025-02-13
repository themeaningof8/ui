/**
 * @file タブコンポーネントのStorybook設定ファイル
 * @description タブコンポーネントの様々な使用例を示すストーリーを定義します
 */
import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '.'

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

/**
 * デフォルトのタブ表示
 * 基本的な使用例を示します
 */
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">アカウント</TabsTrigger>
        <TabsTrigger value="password">パスワード</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium">アカウント設定</h3>
          <p className="mt-2 text-gray-600">
            アカウントの基本設定を管理できます。
          </p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium">パスワード変更</h3>
          <p className="mt-2 text-gray-600">
            アカウントのパスワードを変更できます。
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
}

/**
 * フォーム付きのタブ
 * タブ内にフォームを配置した例を示します
 */
export const WithForm: Story = {
  render: () => (
    <Tabs defaultValue="personal" className="w-[600px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="personal">個人情報</TabsTrigger>
        <TabsTrigger value="preferences">設定</TabsTrigger>
      </TabsList>
      <TabsContent value="personal">
        <div className="p-6 bg-white rounded-lg shadow space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">名前</label>
            <input
              id="name"
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="山田 太郎"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">メール</label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="example@example.com"
            />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="preferences">
        <div className="p-6 bg-white rounded-lg shadow space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">通知を有効にする</span>
            <button type="button" className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
              <span className="translate-x-1 inline-block h-4 w-4 rounded-full bg-white" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">ダークモード</span>
            <button type="button" className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
              <span className="translate-x-1 inline-block h-4 w-4 rounded-full bg-white" />
            </button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  ),
}

/**
 * カードスタイルのタブ
 * カードレイアウトを使用したタブの例を示します
 */
export const CardStyle: Story = {
  render: () => (
    <Tabs defaultValue="music" className="w-[500px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="music">音楽</TabsTrigger>
        <TabsTrigger value="photos">写真</TabsTrigger>
        <TabsTrigger value="videos">動画</TabsTrigger>
      </TabsList>
      <TabsContent value="music">
        <div className="grid gap-4 p-4 bg-white rounded-lg shadow">
          {['再生中の曲', '次の曲', 'プレイリスト'].map((item) => (
            <div key={item} className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded">
              <div className="w-10 h-10 bg-gray-200 rounded" />
              <div>
                <p className="font-medium">{item}</p>
                <p className="text-sm text-gray-500">アーティスト名</p>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="photos">
        <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded-lg shadow">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded" />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="videos">
        <div className="space-y-4 p-4 bg-white rounded-lg shadow">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-video bg-gray-200 rounded" />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  ),
}

/**
 * 無効状態のタブ
 * タブの無効状態を示します
 */
export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="active" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="active">有効</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          無効
        </TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <div className="p-4 bg-white rounded-lg shadow">
          <p>このタブは有効です</p>
        </div>
      </TabsContent>
      <TabsContent value="disabled">
        <div className="p-4 bg-white rounded-lg shadow">
          <p>このタブは無効です</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
}

/**
 * カスタムスタイルのタブ
 * カスタマイズされたスタイルを適用したタブの例を示します
 */
export const CustomStyle: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList className="bg-blue-100 p-1 rounded-xl">
        <TabsTrigger
          value="tab1"
          className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg"
        >
          タブ1
        </TabsTrigger>
        <TabsTrigger
          value="tab2"
          className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg"
        >
          タブ2
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4 bg-blue-50 rounded-lg mt-2">
          <p>カスタムスタイルのコンテンツ1</p>
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4 bg-blue-50 rounded-lg mt-2">
          <p>カスタムスタイルのコンテンツ2</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
} 