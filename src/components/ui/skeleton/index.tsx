/**
 * @file スケルトンUIコンポーネント
 * @description コンテンツの読み込み中に表示されるスケルトンUIを提供します
 */
import { cn } from '@/lib/utils'

/**
 * Skeletonコンポーネント
 * @param props - スケルトンUIのプロパティ
 * @param props.className - 適用する追加のクラス名
 * @returns スケルトンUIのReact要素
 */
const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    role="status"
    data-state="loading"
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={0}
    className={cn('animate-pulse rounded-md bg-muted', className)}
    {...props}
  />
)

export { Skeleton }