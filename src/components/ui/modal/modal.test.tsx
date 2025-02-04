/**
 * @file Modalのテスト
 * @description Modalの機能とアクセシビリティをテスト
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Modal } from '@/components/ui/modal'

describe('Modal', () => {
  it('モーダルが開いた状態で表示されること', () => {
    render(
      <Modal open={true} onOpenChange={() => {}}>
        <div>モーダルコンテンツ</div>
      </Modal>
    )
    expect(screen.getByText('モーダルコンテンツ')).toBeInTheDocument()
  })

  it('タイトルと説明が表示されること', () => {
    render(
      <Modal
        open={true}
        onOpenChange={() => {}}
        title="テストタイトル"
        description="テスト説明"
      >
        <div>モーダルコンテンツ</div>
      </Modal>
    )
    expect(screen.getByText('テストタイトル')).toBeInTheDocument()
    expect(screen.getByText('テスト説明')).toBeInTheDocument()
  })

  it('閉じるボタンをクリックするとonOpenChangeが呼ばれること', async () => {
    const onOpenChange = vi.fn()
    const user = userEvent.setup()

    render(
      <Modal open={true} onOpenChange={onOpenChange}>
        <div>モーダルコンテンツ</div>
      </Modal>
    )

    const closeButton = screen.getByRole('button')
    await user.click(closeButton)
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('アクセシビリティ要件を満たすこと', () => {
    render(
      <Modal
        open={true}
        onOpenChange={() => {}}
        title="テストタイトル"
        description="テスト説明"
      >
        <div>モーダルコンテンツ</div>
      </Modal>
    )

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveAttribute('aria-labelledby')
    expect(dialog).toHaveAttribute('aria-describedby')
  })
}) 