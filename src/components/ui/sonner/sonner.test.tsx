/**
 * @file Sonnerコンポーネントのテストファイル
 * @description トースト通知の基本機能、アクセシビリティ、カスタマイズ機能をテスト
 */

import { render, screen, waitFor, cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import '@testing-library/jest-dom'
import { toast } from 'sonner'
import { Toaster } from '.'

describe('Toaster Component', () => {
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
    it('デフォルトのトースト通知を表示できる', async () => {
      renderToaster()
      
      // トースト通知を表示
      toast('テスト通知')

      await waitFor(() => {
        expect(screen.getByText('テスト通知')).toBeVisible()
      })
    })
  })
})

// テストカバレッジ設定（vitest.config.ts）
// coverage: {
//   provider: 'v8',
//   thresholds: {
//     lines: 80,
//     functions: 80,
//     branches: 75,
//     statements: 80
//   }
// } 
// } 