/**
 * @file Inputのテスト
 * @description Inputの機能とアクセシビリティをテスト
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Input } from '@/components/ui/input'
import { 
  runAxeTest,
  runKeyboardNavigationTest,
  runAriaAttributesTest,
  runFocusManagementTest,
  runContrastTest
} from '@/tests/wcag3/helpers'

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
    describe('基本的なアクセシビリティ', () => {
      it('axeによる基本的なアクセシビリティ要件を満たす', async () => {
        await runAxeTest(<TestInput />);
      });

      it('キーボードナビゲーションが適切に機能する', () => {
        const { container } = render(<TestInput />);
        runKeyboardNavigationTest(container);
      });

      it('ARIA属性が適切に設定されている', () => {
        const { container } = render(<TestInput />);
        runAriaAttributesTest(container);
      });

      it('フォーカス管理が適切に機能する', () => {
        const { container } = render(<TestInput />);
        runFocusManagementTest(container);
      });

      it('コントラスト要件を満たす', () => {
        const { container } = render(<TestInput />);
        runContrastTest(container);
      });
    });

    describe('各状態でのアクセシビリティ', () => {
      const states = [
        { name: 'エラー', props: { error: true } },
        { name: '必須', props: { required: true } },
        { name: '無効', props: { disabled: true } },
      ];

      for (const { name, props } of states) {
        describe(`${name}状態`, () => {
          it('axeによる基本的なアクセシビリティ要件を満たす', async () => {
            await runAxeTest(<TestInput {...props} />);
          });

          it('キーボードナビゲーションが適切に機能する', () => {
            const { container } = render(<TestInput {...props} />);
            runKeyboardNavigationTest(container);
          });

          it('ARIA属性が適切に設定されている', () => {
            const { container } = render(<TestInput {...props} />);
            runAriaAttributesTest(container);
          });

          it('フォーカス管理が適切に機能する', () => {
            const { container } = render(<TestInput {...props} />);
            runFocusManagementTest(container);
          });

          it('コントラスト要件を満たす', () => {
            const { container } = render(<TestInput {...props} />);
            runContrastTest(container);
          });
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
  });
}); 