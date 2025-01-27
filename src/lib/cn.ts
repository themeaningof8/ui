/**
 * クラス名結合ユーティリティ
 * @param classes - 結合するクラス名の配列
 * @returns 結合されたクラス文字列
 */
export const cn = (...classes: Array<string | undefined | boolean>): string =>
  classes.filter(Boolean).join(' ');