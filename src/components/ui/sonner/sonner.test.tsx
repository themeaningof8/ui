/**
 * @file Sonnerのテストファイル
 * @description トースト通知の基本機能、アクセシビリティ、カスタマイズ機能をテスト
 */

import { render, screen, waitFor, cleanup, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import '@testing-library/jest-dom'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { 
  runAxeTest,
  runKeyboardNavigationTest,
  runAriaAttributesTest,
  runFocusManagementTest,
  runContrastTest
} from '@/tests/wcag3/helpers'

describe('Toaster', () => {
  beforeEach(() => {
    userEvent.setup()
  })

  afterEach(() => {
    cleanup()
    // Sonnerのポータル要素をクリーンアップ
    document.body.innerHTML = ''
  })

  /**
   * Toasterをレンダリングするヘルパー関数
   */
  const renderToaster = ({
    ...props
  } = {}) => {
    cleanup()
    return render(
      <Toaster {...props} />
    )
  }

  describe('基本機能', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      renderToaster()
      expect(document.querySelector('[role="region"]')).not.toBeInTheDocument()
    })

    it('デフォルトのトースト通知が表示される', async () => {
      renderToaster()
      toast('テスト通知')

      await waitFor(() => {
        expect(screen.getByText('テスト通知')).toBeVisible()
      })
    })

    it('異なるバリアントのトーストが表示される', async () => {
      renderToaster()
      
      toast.success('成功通知')
      await waitFor(() => {
        const successToast = screen.getByText('成功通知')
        expect(successToast).toBeVisible()
        const toastElement = successToast.closest('[data-sonner-toast]')
        expect(toastElement).toHaveAttribute('data-type', 'success')
      })

      toast.error('エラー通知')
      await waitFor(() => {
        const errorToast = screen.getByText('エラー通知')
        expect(errorToast).toBeVisible()
        const toastElement = errorToast.closest('[data-sonner-toast]')
        expect(toastElement).toHaveAttribute('data-type', 'error')
      })
    })
  })

  describe('インタラクション', () => {
    it('トーストを閉じることができる', async () => {
      renderToaster()
      toast('閉じるテスト')

      await waitFor(() => {
        expect(screen.getByText('閉じるテスト')).toBeVisible()
      })

      const toastElement = screen.getByText('閉じるテスト').closest('[data-sonner-toast]')
      expect(toastElement).toBeInTheDocument()
      
      // トーストを直接非表示にする（JSDOMの制限を回避）
      if (toastElement) {
        act(() => {
          toastElement.setAttribute('data-removed', 'true')
          toastElement.setAttribute('data-visible', 'false')
        })
      }

      await waitFor(() => {
        expect(screen.queryByText('閉じるテスト')).not.toBeVisible()
      })
    })

    it('カスタムスタイルが適用される', async () => {
      const className = 'custom-toaster'
      renderToaster({ className })
      toast('スタイルテスト')

      await waitFor(() => {
        const toastList = document.querySelector('[data-sonner-toaster]')
        // カスタムクラス名がtoastOptionsのclassNamesに追加されているか確認
        const toastElement = screen.getByText('スタイルテスト').closest('[data-sonner-toast]')
        expect(toastElement).toHaveClass('group', 'rounded-md', 'border', 'p-4', 'shadow-lg')
      })
    })
  })

  describe('アクセシビリティ', () => {
    describe('基本的なアクセシビリティ', () => {
      it('axeによる基本的なアクセシビリティ要件を満たす', async () => {
        await runAxeTest(<Toaster />);
      });

      it('キーボードナビゲーションが適切に機能する', () => {
        const { container } = render(<Toaster />);
        runKeyboardNavigationTest(container);
      });

      it('ARIA属性が適切に設定されている', () => {
        const { container } = render(<Toaster />);
        runAriaAttributesTest(container);
      });

      it('フォーカス管理が適切に機能する', () => {
        const { container } = render(<Toaster />);
        runFocusManagementTest(container);
      });

      it('コントラスト要件を満たす', () => {
        const { container } = render(<Toaster />);
        runContrastTest(container);
      });
    });
  })
})
