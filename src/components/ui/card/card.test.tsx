/**
 * @file Card コンポーネントのテスト
 * @description Card コンポーネントとそのサブコンポーネントの基本的なレンダリングと機能をテストします。
 */
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { testBasicAccessibility } from '@/tests/wcag3/helpers';
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

    it('子要素なしでレンダリングされる', () => {
      const { container } = render(<Card />);
      expect(container.firstElementChild).toBeInTheDocument();
      expect(container.firstElementChild).toHaveClass('rounded-lg', 'border', 'shadow-sm');
    });

    it('入れ子構造が正しく機能する', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>親カード</CardTitle>
            <Card>
              <CardHeader>
                <CardTitle>子カード</CardTitle>
              </CardHeader>
            </Card>
          </CardHeader>
        </Card>
      );

      expect(screen.getByText('親カード')).toBeInTheDocument();
      expect(screen.getByText('子カード')).toBeInTheDocument();
    });
  });

  describe('スタイル適用', () => {
    it('Card にカスタムクラスが適用される', () => {
      const { container } = render(<Card className="custom-class" />);
      const card = container.firstElementChild;
      expect(card).toHaveClass('custom-class');
      expect(card).toHaveClass('rounded-lg', 'border', 'shadow-sm');
      expect(card).toHaveClass('bg-base-surface', 'text-base-high');
    });

    it('CardHeader にカスタムクラスが適用される', () => {
      const { container } = render(<CardHeader className="custom-class" />);
      const header = container.firstElementChild;
      expect(header).toHaveClass('custom-class');
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6');
    });

    it('CardTitle にカスタムクラスが適用される', () => {
      render(<CardTitle className="custom-class">Title</CardTitle>);
      const title = screen.getByText('Title');
      expect(title).toHaveClass('custom-class');
      expect(title).toHaveClass('text-2xl', 'font-semibold', 'leading-none', 'tracking-tight');
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
      expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0');
    });

    it('複数のカスタムクラスが正しく適用される', () => {
      const { container } = render(
        <Card className="class1 class2">
          <CardHeader className="header1 header2">
            <CardTitle className="title1 title2">Title</CardTitle>
          </CardHeader>
        </Card>
      );

      expect(container.firstElementChild).toHaveClass('class1', 'class2');
      const header = screen.getByText('Title').parentElement;
      expect(header).toHaveClass('header1', 'header2');
      expect(screen.getByText('Title')).toHaveClass('title1', 'title2');
    });
  });

  describe('アクセシビリティ', () => {
    it('適切なHTML要素とARIAロールが使用されている', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
        </Card>
      );

      const card = screen.getByRole('article');
      expect(card).toBeInTheDocument();
      expect(screen.getByText('Test Title').tagName).toBe('H3');
      expect(screen.getByText('Test Description').tagName).toBe('P');
    });

    it('コンテンツの階層構造が適切である', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Test Content</p>
          </CardContent>
        </Card>
      );

      const card = screen.getByRole('article');
      const title = screen.getByText('Test Title');
      const description = screen.getByText('Test Description');
      const content = screen.getByText('Test Content');

      expect(title.parentElement).toBe(description.parentElement);
      expect(content.parentElement?.parentElement).toBe(card);
    });

    // WCAG 3.0の基本的なアクセシビリティテスト
    testBasicAccessibility(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>Test Content</CardContent>
        <CardFooter>Test Footer</CardFooter>
      </Card>,
      {
        expectedRole: 'article',
        testDisabled: false,
      }
    );

    it('複数のカードが適切なロールを持つ', () => {
      render(
        <div>
          <Card>
            <CardTitle>Card 1</CardTitle>
          </Card>
          <Card>
            <CardTitle>Card 2</CardTitle>
          </Card>
        </div>
      );

      const articles = screen.getAllByRole('article');
      expect(articles).toHaveLength(2);
      for (const article of articles) {
        expect(article).toHaveClass('rounded-lg', 'border', 'shadow-sm');
      }
    });
  });
}); 