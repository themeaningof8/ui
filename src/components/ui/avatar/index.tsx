/**
 * @file Avatar コンポーネント
 * @description ユーザーのプロフィール画像やフォールバックを表示するアバターコンポーネント
 * 
 * @example
 * ```tsx
 * // コンポーネントベースの使用法
 * <Avatar>
 *   <AvatarImage src="https://example.com/avatar.jpg" alt="ユーザー名" />
 *   <AvatarFallback>UN</AvatarFallback>
 * </Avatar>
 * 
 * // プロパティベースの使用法
 * <Avatar src="https://example.com/avatar.jpg" fallback="UN" />
 * ```
 */

import * as React from 'react';
import { tv } from 'tailwind-variants';
import { cn } from '@/lib/cn';

/**
 * Avatar のプロパティを定義
 */
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * アバターのサイズ
   * @default "default"
   */
  size?: 'sm' | 'default' | 'lg';
  /**
   * 画像のURL
   */
  src?: string;
  /**
   * 画像の代替テキスト（必須）
   */
  alt: string;
  /**
   * フォールバックの内容
   */
  fallback?: string;
}

/**
 * AvatarImage のプロパティを定義
 */
export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * 画像の読み込みに失敗した場合のコールバック
   */
  onLoadingStatusChange?: (status: 'loading' | 'loaded' | 'error') => void;
  /**
   * 画像の代替テキスト（必須）
   */
  alt: string;
}

/**
 * AvatarFallback のプロパティを定義
 */
export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * フォールバックの表示遅延（ミリ秒）
   * @default 600
   */
  delayMs?: number;
}

const avatarVariants = tv({
  base: [
    "relative flex shrink-0 overflow-hidden rounded-full",
    "bg-base-ui text-base-high"
  ],
  variants: {
    size: {
      sm: "h-8 w-8 text-xs",
      default: "h-10 w-10 text-base",
      lg: "h-12 w-12 text-lg",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const avatarImageVariants = tv({
  base: "aspect-square h-full w-full",
});

const avatarFallbackVariants = tv({
  base: [
    "flex h-full w-full items-center justify-center rounded-full",
    "bg-base-ui font-medium text-base-high"
  ],
});

/**
 * Avatar コンポーネント
 */
export function Avatar({
  className,
  size,
  src,
  alt,
  fallback,
  children,
  ...props
}: AvatarProps) {
  const [status, setStatus] = React.useState<'loading' | 'loaded' | 'error'>('loading');

  // 子要素が提供されている場合はそれを使用し、そうでない場合は src と fallback から生成
  const content = children ?? (
    <>
      {src && (
        <AvatarImage
          src={src}
          alt={alt}
          onLoadingStatusChange={setStatus}
        />
      )}
      {(status === 'error' || !src) && (
        <AvatarFallback>{fallback}</AvatarFallback>
      )}
    </>
  );

  return (
    <div
      className={cn(avatarVariants({ size }), className)}
      aria-label={alt}
      {...props}
    >
      {content}
    </div>
  );
}

/**
 * AvatarImage コンポーネント
 */
export function AvatarImage({
  className,
  onLoadingStatusChange,
  alt,
  ...props
}: AvatarImageProps) {
  const [status, setStatus] = React.useState<'loading' | 'loaded' | 'error'>('loading');

  React.useEffect(() => {
    onLoadingStatusChange?.(status);
  }, [status, onLoadingStatusChange]);

  return (
    <img
      {...props}
      className={cn(avatarImageVariants(), className)}
      onLoad={() => setStatus('loaded')}
      onError={() => setStatus('error')}
      alt={alt}
    />
  );
}

/**
 * AvatarFallback コンポーネント
 */
export function AvatarFallback({
  className,
  delayMs = 600,
  ...props
}: AvatarFallbackProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  if (!isLoaded) {
    return null;
  }

  return (
    <div className={cn(avatarFallbackVariants(), className)} {...props} />
  );
}

Avatar.displayName = 'Avatar';
AvatarImage.displayName = 'AvatarImage';
AvatarFallback.displayName = 'AvatarFallback'; 