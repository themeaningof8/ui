/**
 * @file Avatarコンポーネントのテスト
 * @description Avatar, AvatarImage, AvatarFallback コンポーネントの機能とアクセシビリティをテストします
 */

import { render, screen, waitFor } from '@/tests/test-utils'
import { Avatar, AvatarImage, AvatarFallback } from '.'

describe('Avatar', () => {
  describe('基本レンダリングテスト', () => {
    it('Avatar, AvatarImage, AvatarFallback が正しくレンダリングされること', async () => {
      render(
        <Avatar data-testid="avatar-root">
          <AvatarImage
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            alt="テストユーザー"
            data-testid="avatar-image"
          />
          <AvatarFallback data-testid="avatar-fallback">TU</AvatarFallback>
        </Avatar>
      )

      const avatarRoot = screen.getByTestId('avatar-root')
      expect(avatarRoot).toBeInTheDocument()
      expect(avatarRoot).toHaveClass('relative flex size-10 shrink-0 overflow-hidden rounded-full')

      await waitFor(() => {
        const avatarImage = screen.getByTestId('avatar-image')
        expect(avatarImage).toBeInTheDocument()
        expect(avatarImage).toHaveAttribute('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7')
        expect(avatarImage).toHaveAttribute('alt', 'テストユーザー')
      })

      const fallback = screen.queryByTestId('avatar-fallback')
      expect(fallback).toBeNull()
    })

    it('AvatarImage の src が空の場合、AvatarFallback が表示されること', () => {
      render(
        <Avatar>
          <AvatarImage src="" alt="テストユーザー" />
          <AvatarFallback data-testid="avatar-fallback">TU</AvatarFallback>
        </Avatar>
      )

      const fallback = screen.getByTestId('avatar-fallback')
      expect(fallback).toBeVisible()
    })
  })

  describe('アクセシビリティテスト', () => {
    it('AvatarImage に適切な alt 属性が設定されていること', async () => {
      render(
        <Avatar>
          <AvatarImage
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            alt="テストユーザー"
            data-testid="avatar-image"
          />
          <AvatarFallback>TU</AvatarFallback>
        </Avatar>
      )

      await waitFor(() => {
        const avatarImage = screen.getByTestId('avatar-image')
        expect(avatarImage).toHaveAttribute('alt', 'テストユーザー')
      })
    })

    it('AvatarFallback が適切に表示されること', () => {
      render(
        <Avatar>
          <AvatarImage src="" alt="テストユーザー" />
          <AvatarFallback data-testid="avatar-fallback">TU</AvatarFallback>
        </Avatar>
      )

      const fallback = screen.getByTestId('avatar-fallback')
      expect(fallback).toBeVisible()
    })
  })

  describe('スタイルテスト', () => {
    it('カスタムクラスが適用できること', async () => {
      render(
        <Avatar className="custom-avatar" data-testid="avatar-root">
          <AvatarImage
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            alt="テストユーザー"
            className="custom-image"
            data-testid="avatar-image"
          />
          <AvatarFallback className="custom-fallback" data-testid="avatar-fallback">TU</AvatarFallback>
        </Avatar>
      )

      const avatarRoot = screen.getByTestId('avatar-root')
      expect(avatarRoot).toHaveClass('custom-avatar')

      await waitFor(() => {
        const avatarImage = screen.getByTestId('avatar-image')
        expect(avatarImage).toHaveClass('custom-image')
      })

      const fallback = screen.queryByTestId('avatar-fallback')
      expect(fallback).toBeNull()
    })
  })
}) 