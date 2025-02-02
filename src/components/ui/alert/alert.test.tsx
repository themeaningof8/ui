/**
 * @file Alert コンポーネントのテスト
 * @description Alert コンポーネントの機能とアクセシビリティをテスト
 */
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Alert, AlertTitle, AlertDescription } from '.';

describe('Alert Component', () => {
  describe('基本機能', () => {
    it('デフォルトのAlertが正しくレンダリングされる', () => {
      render(
        <Alert>
          <AlertTitle>テストタイトル</AlertTitle>
          <AlertDescription>テスト説明文</AlertDescription>
        </Alert>
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('テストタイトル')).toBeInTheDocument();
      expect(screen.getByText('テスト説明文')).toBeInTheDocument();
    });

    it('children が未定義の場合も正しくレンダリングされる', () => {
      render(<Alert />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('AlertTitle のみでも正しくレンダリングされる', () => {
      render(
        <Alert>
          <AlertTitle>テストタイトル</AlertTitle>
        </Alert>
      );
      expect(screen.getByText('テストタイトル')).toBeInTheDocument();
      expect(screen.getByRole('alert')).not.toHaveTextContent('テスト説明文');
    });

    it('AlertDescription のみでも正しくレンダリングされる', () => {
      render(
        <Alert>
          <AlertDescription>テスト説明文</AlertDescription>
        </Alert>
      );
      expect(screen.getByText('テスト説明文')).toBeInTheDocument();
      expect(screen.getByRole('alert')).not.toHaveTextContent('テストタイトル');
    });

    describe('バリアントのスタイル', () => {
      it.each([
        ['default', {
          bg: 'bg-base-app',
          text: 'text-base-high',
          border: 'border-base-subtle'
        }],
        ['destructive', {
          bg: 'bg-destructive-app',
          text: 'text-destructive-high',
          border: 'border-destructive-subtle'
        }],
        ['success', {
          bg: 'bg-accent-app',
          text: 'text-accent-high',
          border: 'border-accent-subtle'
        }],
        ['warning', {
          bg: 'bg-base-app',
          text: 'text-base-high',
          border: 'border-base-subtle'
        }],
      ])('%s バリアントが正しいスタイルでレンダリングされる', (variant, expected) => {
        render(
          <Alert variant={variant as 'default' | 'destructive' | 'success' | 'warning'}>
            <AlertTitle>テストタイトル</AlertTitle>
            <AlertDescription>テスト説明文</AlertDescription>
          </Alert>
        );

        const alert = screen.getByRole('alert');
        expect(alert).toHaveClass(expected.bg);
        expect(alert).toHaveClass(expected.text);
        expect(alert).toHaveClass(expected.border);
      });
    });
  });

  describe('アクセシビリティ', () => {
    it('適切なARIA属性が設定されている', () => {
      render(
        <Alert>
          <AlertTitle>テストタイトル</AlertTitle>
          <AlertDescription>テスト説明文</AlertDescription>
        </Alert>
      );

      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
    });

    it('タイトルが適切な見出しレベルで表示される', () => {
      render(
        <Alert>
          <AlertTitle>テストタイトル</AlertTitle>
          <AlertDescription>テスト説明文</AlertDescription>
        </Alert>
      );

      const title = screen.getByText('テストタイトル');
      expect(title.tagName).toBe('H5');
    });

    it('AlertTitle に適切なスタイルが適用される', () => {
      render(
        <Alert>
          <AlertTitle>テストタイトル</AlertTitle>
        </Alert>
      );

      const title = screen.getByText('テストタイトル');
      expect(title).toHaveClass('mb-1', 'font-medium', 'leading-none', 'tracking-tight');
    });

    it('AlertDescription に適切なスタイルが適用される', () => {
      render(
        <Alert>
          <AlertDescription>テスト説明文</AlertDescription>
        </Alert>
      );

      const description = screen.getByText('テスト説明文');
      expect(description).toHaveClass('text-sm', '[&_p]:leading-relaxed');
    });
  });

  describe('カスタマイズ', () => {
    it('カスタムクラスが適用される', () => {
      render(
        <Alert className="custom-class">
          <AlertTitle className="title-class">テストタイトル</AlertTitle>
          <AlertDescription className="description-class">テスト説明文</AlertDescription>
        </Alert>
      );

      expect(screen.getByRole('alert')).toHaveClass('custom-class');
      expect(screen.getByText('テストタイトル')).toHaveClass('title-class');
      expect(screen.getByText('テスト説明文')).toHaveClass('description-class');
    });

    it('ref が正しく転送される', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Alert ref={ref}>
          <AlertTitle>テストタイトル</AlertTitle>
        </Alert>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute('role', 'alert');
    });

    it('追加のHTML属性が正しく適用される', () => {
      render(
        <Alert data-testid="custom-alert" data-custom="test">
          <AlertTitle>テストタイトル</AlertTitle>
        </Alert>
      );

      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('data-testid', 'custom-alert');
      expect(alert).toHaveAttribute('data-custom', 'test');
    });
  });
}); 