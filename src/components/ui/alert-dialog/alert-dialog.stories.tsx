/**
 * @file アラートダイアログコンポーネントのストーリー
 * @description アラートダイアログコンポーネントの使用例を表示します
 */

import type { Meta, StoryObj } from '@storybook/react'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '.'

const meta = {
  title: 'UI/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なアラートダイアログの使用例
 */
export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger>アラートを開く</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
          <AlertDialogDescription>
            この操作は取り消せません。削除したデータは復元できません。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction>削除</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

/**
 * 長いコンテンツを含むアラートダイアログの使用例
 */
export const LongContent: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger>詳細なアラートを開く</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>利用規約の確認</AlertDialogTitle>
          <AlertDialogDescription>
            以下の利用規約をよくお読みください。同意される場合は「同意する」を
            クリックしてください。
            <br /><br />
            1. 個人情報の取り扱いについて
            <br />
            当サービスは、ユーザーの個人情報を適切に管理し、以下の目的以外では
            使用しません。
            <br /><br />
            2. サービスの利用について
            <br />
            当サービスの利用にあたっては、以下の事項を遵守してください。
            <br /><br />
            3. 免責事項
            <br />
            当サービスは、以下の事項について一切の責任を負いません。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction>同意する</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

/**
 * カスタムアクションを持つアラートダイアログの使用例
 */
export const CustomActions: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger>設定を開く</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>設定の変更</AlertDialogTitle>
          <AlertDialogDescription>
            現在の設定を変更しようとしています。
            以下のオプションから選択してください。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>後で</AlertDialogCancel>
          <AlertDialogAction className="bg-yellow-500 hover:bg-yellow-600">
            保存
          </AlertDialogAction>
          <AlertDialogAction className="bg-red-500 hover:bg-red-600">
            リセット
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
} 