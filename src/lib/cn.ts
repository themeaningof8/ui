/**
 * @file クラス名結合ユーティリティ
 * @description クラス名を結合するためのユーティリティ関数を提供
 */
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * @description クラス名を結合するユーティリティ関数
 * @param inputs - 結合するクラス名の配列
 * @returns 結合されたクラス名
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}