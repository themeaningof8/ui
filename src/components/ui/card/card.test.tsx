/**
 * @file Card コンポーネントのテスト
 * @description Card コンポーネントとそのサブコンポーネントの基本的なレンダリングと機能をテストします。
 */
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './';

describe('Card コンポーネント', () => {
  describe('基本機能', () => {
    it('デフォルト状態でレンダリングされる', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
          <CardContent>Test Content</CardContent>
          <CardFooter>Test Footer</CardFooter>
        </Card>
      );

      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
      expect(screen.getByText('Test Footer')).toBeInTheDocument();
    });
  });

  describe('スタイル適用', () => {
    it('Card にカスタムクラスが適用される', () => {
      const { container } = render(<Card className="custom-class" />);
      const card = container.firstElementChild;
      expect(card).toHaveClass('custom-class');
      expect(card).toHaveClass('rounded-lg', 'border', 'shadow-sm');
    });

    it('CardHeader にカスタムクラスが適用される', () => {
      const { container } = render(<CardHeader className="custom-class" />);
      const header = container.firstElementChild;
      expect(header).toHaveClass('custom-class');
      expect(header).toHaveClass('flex', 'flex-col', 'p-6');
    });

    it('CardTitle にカスタムクラスが適用される', () => {
      render(<CardTitle className="custom-class">Title</CardTitle>);
      const title = screen.getByText('Title');
      expect(title).toHaveClass('custom-class');
      expect(title).toHaveClass('text-2xl', 'font-semibold');
    });

    it('CardDescription にカスタムクラスが適用される', () => {
      render(<CardDescription className="custom-class">Description</CardDescription>);
      const description = screen.getByText('Description');
      expect(description).toHaveClass('custom-class');
      expect(description).toHaveClass('text-sm', 'text-base-low');
    });

    it('CardContent にカスタムクラスが適用される', () => {
      const { container } = render(<CardContent className="custom-class" />);
      const content = container.firstElementChild;
      expect(content).toHaveClass('custom-class');
      expect(content).toHaveClass('p-6', 'pt-0');
    });

    it('CardFooter にカスタムクラスが適用される', () => {
      const { container } = render(<CardFooter className="custom-class" />);
      const footer = container.firstElementChild;
      expect(footer).toHaveClass('custom-class');
      expect(footer).toHaveClass('flex', 'items-center', 'p-6');
    });
  });

  describe('アクセシビリティ', () => {
    it('適切なHTML要素が使用されている', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
        </Card>
      );

      expect(screen.getByText('Test Title').tagName).toBe('H3');
      expect(screen.getByText('Test Description').tagName).toBe('P');
    });
  });
}); 