/**
 * @file Badge コンポーネントのテスト
 * @description Badge コンポーネントの機能とアクセシビリティをテスト
 */
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from '@/components/ui/badge';
import { testBasicAccessibility } from '@/tests/wcag3/helpers';

type BadgeVariantStyle = {
  bg?: string;
  text: string;
  border?: string;
  hover: string;
};

describe('Badge コンポーネント', () => {
  describe('基本機能', () => {
    it('デフォルトのBadgeが正しくレンダリングされる', () => {
      render(<Badge>テストバッジ</Badge>);
      expect(screen.getByText('テストバッジ')).toBeInTheDocument();
    });

    it('children が未定義の場合も正しくレンダリングされる', () => {
      render(<Badge aria-label="空のバッジ" />);
      const badge = screen.getByLabelText('空のバッジ');
      expect(badge).toBeInTheDocument();
    });

    describe('バリアントのスタイル', () => {
      it.each<[string, BadgeVariantStyle]>([
        ['default', {
          bg: 'bg-base-solid',
          text: 'text-base-on-solid',
          hover: 'hover:bg-base-solid-hover'
        }],
        ['secondary', {
          bg: 'bg-base-ui',
          text: 'text-base-high',
          hover: 'hover:bg-base-hover'
        }],
        ['destructive', {
          bg: 'bg-destructive-solid',
          text: 'text-destructive-on-solid',
          hover: 'hover:bg-destructive-solid-hover'
        }],
        ['outline', {
          text: 'text-base-high',
          border: 'border border-base-ui',
          hover: 'hover:bg-base-hover'
        }],
      ])('%s バリアントが正しいスタイルでレンダリングされる', (variant, expected) => {
        render(
          <Badge variant={variant as 'default' | 'secondary' | 'destructive' | 'outline'}>
            テストバッジ
          </Badge>
        );

        const badge = screen.getByText('テストバッジ');
        if (expected.bg) {
          expect(badge).toHaveClass(expected.bg);
        }
        expect(badge).toHaveClass(expected.text);
        if (expected.border) {
          expect(badge).toHaveClass(expected.border);
        }
        expect(badge).toHaveClass(expected.hover);
      });

      describe('バリアントごとのコントラスト比', () => {
        it.each<[string, BadgeVariantStyle]>([
          ['default', {
            bg: 'bg-base-solid',
            text: 'text-base-on-solid',
            hover: 'hover:bg-base-solid-hover'
          }],
          ['secondary', {
            bg: 'bg-base-ui',
            text: 'text-base-high',
            hover: 'hover:bg-base-hover'
          }],
          ['destructive', {
            bg: 'bg-destructive-solid',
            text: 'text-destructive-on-solid',
            hover: 'hover:bg-destructive-solid-hover'
          }],
          ['outline', {
            text: 'text-base-high',
            border: 'border border-base-ui',
            hover: 'hover:bg-base-hover'
          }],
        ])('%s バリアントのコントラスト比が適切である', (variant, expected) => {
          render(
            <Badge variant={variant as 'default' | 'secondary' | 'destructive' | 'outline'}>
              テストバッジ
            </Badge>
          );

          const badge = screen.getByText('テストバッジ');
          if (expected.bg) {
            expect(badge).toHaveClass(expected.bg);
          }
          expect(badge).toHaveClass(expected.text);
          if (expected.border) {
            expect(badge).toHaveClass(expected.border);
          }
          expect(badge).toHaveClass(expected.hover);
        });
      });
    });
  });

  describe('アクセシビリティ', () => {
    describe('WCAG 3.0メトリクス', () => {
      it('適切なサイズと間隔が設定されている', () => {
        render(<Badge>テストバッジ</Badge>);
        const badge = screen.getByText('テストバッジ');
        
        expect(badge).toHaveClass('px-2.5');  // 水平パディング
        expect(badge).toHaveClass('py-0.5');  // 垂直パディング
        expect(badge).toHaveClass('text-xs'); // フォントサイズ
        expect(badge).toHaveClass('rounded-full'); // 角丸
      });
    });

    // 基本的なアクセシビリティテスト
    testBasicAccessibility(
      <Badge aria-label="テストバッジ">テストバッジ</Badge>,
      {
        expectedRole: 'status',
        testDisabled: false,
      }
    );
  });

  describe('カスタマイズ', () => {
    it('カスタムクラスが適用される', () => {
      render(<Badge className="custom-class">テストバッジ</Badge>);
      const badge = screen.getByText('テストバッジ');
      expect(badge).toHaveClass('custom-class');
    });

    it('追加のHTML属性が正しく適用される', () => {
      render(
        <Badge data-testid="custom-badge" data-custom="test">
          テストバッジ
        </Badge>
      );

      const badge = screen.getByTestId('custom-badge');
      expect(badge).toHaveAttribute('data-custom', 'test');
    });
  });
}); 