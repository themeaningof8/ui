/**
 * @file モーダルのテスト
 * @description モーダルの機能とアクセシビリティをテスト
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { 
  runAxeTest,
  runKeyboardNavigationTest,
  runAriaAttributesTest,
  runFocusManagementTest,
  runContrastTest
} from '@/tests/wcag3/helpers'
import { Modal } from '@/components/ui/modal'

const ModalTest = () => (
  <Modal open={true} onOpenChange={() => {}}>
    <div>モーダルコンテンツ</div>
  </Modal>
)

describe('Modal', () => {
  const user = userEvent.setup()

  describe('基本機能', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<ModalTest />)
      expect(screen.getByText('モーダルコンテンツ')).toBeInTheDocument()
    })

    it('タイトルと説明が表示される', () => {
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

    it('スタイルが適切に適用される', () => {
      render(
        <Modal
          open={true}
          onOpenChange={() => {}}
        >
          <div data-testid="modal-content">モーダルコンテンツ</div>
        </Modal>
      )
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveClass(
        'fixed',
        'top-1/2',
        'left-1/2',
        'max-h-[85vh]',
        'w-full',
        'max-w-lg',
        '-translate-x-1/2',
        '-translate-y-1/2',
        'rounded-md',
        'bg-white',
        'p-6',
        'shadow-lg',
        'z-50'
      )
    })
  })

  describe('インタラクション', () => {
    it('閉じるボタンをクリックするとonOpenChangeが呼ばれる', async () => {
      const onOpenChange = vi.fn()
      render(
        <Modal open={true} onOpenChange={onOpenChange}>
          <div>モーダルコンテンツ</div>
        </Modal>
      )

      const closeButton = screen.getByRole('button', { name: '✕' })
      await user.click(closeButton)
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it('ESCキーでモーダルが閉じる', async () => {
      const onOpenChange = vi.fn()
      render(
        <Modal open={true} onOpenChange={onOpenChange}>
          <div>モーダルコンテンツ</div>
        </Modal>
      )

      await user.keyboard('{Escape}')
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it('オーバーレイをクリックするとモーダルが閉じる', async () => {
      const onOpenChange = vi.fn()
      const user = userEvent.setup()

      render(
        <Modal open onOpenChange={onOpenChange}>
          <div>モーダルコンテンツ</div>
        </Modal>
      )

      const overlay = screen.getByTestId('modal-overlay')
      await user.click(overlay)
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })
  })

  describe('アクセシビリティ', () => {
    describe('基本的なアクセシビリティ', () => {
      it('axeによる基本的なアクセシビリティ要件を満たす', async () => {
        await runAxeTest(<ModalTest />);
      });

      it('キーボードナビゲーションが適切に機能する', () => {
        const { container } = render(<ModalTest />);
        runKeyboardNavigationTest(container);
      });

      it('ARIA属性が適切に設定されている', () => {
        const { container } = render(<ModalTest />);
        runAriaAttributesTest(container);
      });

      it('フォーカス管理が適切に機能する', () => {
        const { container } = render(<ModalTest />);
        runFocusManagementTest(container);
      });

      it('コントラスト要件を満たす', () => {
        const { container } = render(<ModalTest />);
        runContrastTest(container);
      });
    });

    it('適切なARIA属性が設定されている', () => {
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
      expect(dialog).toHaveAttribute('aria-labelledby')
      expect(dialog).toHaveAttribute('aria-describedby')
    })

    it('フォーカストラップが機能する', async () => {
      const user = userEvent.setup()
      render(
        <Modal open onOpenChange={() => {}}>
          <div>
            <button type="button">ボタン1</button>
            <button type="button">ボタン2</button>
            <button type="button">ボタン3</button>
          </div>
        </Modal>
      )

      // 最初のフォーカス可能な要素にフォーカスが当たっていることを確認
      const firstButton = screen.getByRole('button', { name: 'ボタン1' })
      expect(firstButton).toHaveFocus()

      // タブキーでフォーカスが循環することを確認
      await user.keyboard('{Tab}') // ボタン2へ
      expect(screen.getByRole('button', { name: 'ボタン2' })).toHaveFocus()

      await user.keyboard('{Tab}') // ボタン3へ
      expect(screen.getByRole('button', { name: 'ボタン3' })).toHaveFocus()

      await user.keyboard('{Tab}') // 閉じるボタンへ
      expect(screen.getByRole('button', { name: '✕' })).toHaveFocus()

      await user.keyboard('{Tab}') // ボタン1へ戻る
      expect(firstButton).toHaveFocus()
    })
  })
}) 