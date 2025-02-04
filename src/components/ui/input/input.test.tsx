/**
 * @file Inputのテスト
 * @description Inputの機能とアクセシビリティをテスト
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Input } from '@/components/ui/input'
import { runAccessibilityTest } from '@/tests/wcag3/helpers'

const TestInput = (props: React.ComponentProps<typeof Input>) => (
  <div>
    <label htmlFor="test-input">テストラベル</label>
    <Input id="test-input" {...props} />
  </div>
)

describe('Input', () => {
  describe('基本機能', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<TestInput />)
      const input = screen.getByRole('textbox')
      
      expect(input).toHaveClass(
        'flex',
        'h-10',
        'w-full',
        'rounded-md',
        'border',
        'px-3',
        'py-2',
        'text-sm',
        'bg-base-app',
        'text-base-high',
        'border-base-ui',
        'file:border-0',
        'file:bg-transparent',
        'file:text-sm',
        'file:font-medium',
        'placeholder:text-base-low',
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-base-ui',
        'focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed',
        'disabled:opacity-50'
      )
    })

    it('プレースホルダーテキストが表示される', () => {
      render(<TestInput placeholder="テスト入力" />)
      expect(screen.getByPlaceholderText('テスト入力')).toBeInTheDocument()
    })

    it('バリアント（エラー状態）が適用される', () => {
      render(<TestInput error />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('border-destructive-ui', 'focus-visible:ring-destructive-ui')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })

    it('必須属性が適用される', () => {
      render(<TestInput required />)
      const input = screen.getByRole('textbox')
      expect(input).toBeRequired()
      expect(input).toHaveAttribute('aria-required', 'true')
    })
  })

  describe('インタラクション', () => {
    it('入力値が正しく更新される', async () => {
      const user = userEvent.setup()
      render(<TestInput />)
      const input = screen.getByRole('textbox')
      
      await user.type(input, 'テストテキスト')
      expect(input).toHaveValue('テストテキスト')
    })

    it('カスタムクラスが適用される', () => {
      render(<TestInput className="custom-class" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('custom-class')
    })

    it('カスタム属性が適用される', () => {
      render(<TestInput data-testid="custom-input" />)
      expect(screen.getByTestId('custom-input')).toBeInTheDocument()
    })
  })

  describe('アクセシビリティ', () => {
    it('基本的なアクセシビリティ要件を満たす', async () => {
      await runAccessibilityTest(<TestInput />, {
        keyboardNavigation: true,
        ariaAttributes: true,
        focusManagement: true,
        contrast: false
      });
    });

    it('各状態でアクセシビリティ要件を満たす', async () => {
      const states = [
        { name: 'デフォルト', props: {} },
        { name: 'エラー', props: { error: true } },
        { name: '必須', props: { required: true } },
        { name: '無効', props: { disabled: true } },
      ];

      for (const { name, props } of states) {
        await runAccessibilityTest(<TestInput {...props} />, {
          keyboardNavigation: true,
          ariaAttributes: true,
          focusManagement: true,
          contrast: false,
          skipFocusableCheck: name === '無効'
        });
      }
    });

    it('キーボード操作が正しく機能する', async () => {
      const user = userEvent.setup()
      render(<TestInput />)
      const input = screen.getByRole('textbox')

      await user.tab()
      expect(input).toHaveFocus()

      await user.keyboard('テスト')
      expect(input).toHaveValue('テスト')
    });
  })
}) 