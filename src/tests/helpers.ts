/**
 * @file テストヘルパー関数
 * @description コンポーネントテストで使用する共通のヘルパー関数を定義します
 */

import { screen, waitForElementToBeRemoved } from '@testing-library/react'

/**
 * 要素が表示されるまで待機する関数
 * @param text - 要素のテキスト
 * @returns Promise<HTMLElement>
 */
export const waitForElementToBeVisible = async (text: string): Promise<HTMLElement> => {
  return await screen.findByText(text)
}

/**
 * 要素が非表示になるまで待機する関数
 * @param text - 要素のテキスト
 * @returns Promise<void>
 */
export const waitForElementToBeHidden = async (text: string): Promise<void> => {
  const element = screen.queryByText(text)
  if (element) {
    await waitForElementToBeRemoved(element)
  }
}

/**
 * ボタンが無効化されているか確認する関数
 * @param name - ボタンのテキストまたはラベル
 * @returns boolean
 */
export const isButtonDisabled = (name: string): boolean => {
  const button = screen.getByRole('button', { name })
  return button.hasAttribute('disabled')
}

/**
 * フォーム要素の値を取得する関数
 * @param label - フォーム要素のラベル
 * @returns string
 */
export const getFormValue = (label: string): string => {
  const input = screen.getByLabelText(label) as HTMLInputElement
  return input.value
}

/**
 * エラーメッセージが表示されているか確認する関数
 * @param message - エラーメッセージ
 * @returns boolean
 */
export const hasErrorMessage = (message: string): boolean => {
  const error = screen.queryByText(message)
  return error !== null
}

/**
 * アクセシビリティの属性を確認する関数
 * @param role - ARIA ロール
 * @param name - 要素の名前
 * @returns HTMLElement
 */
export const getAccessibleElement = (role: string, name: string): HTMLElement => {
  return screen.getByRole(role, { name })
}

/**
 * コンポーネントのスナップショットを検証する関数
 * @param element - HTMLElement
 * @returns boolean
 */
export const matchesSnapshot = (element: HTMLElement): boolean => {
  const snapshot = element.innerHTML
  return snapshot === element.innerHTML
}

/**
 * アニメーションの完了を待機する関数
 * @param element - HTMLElement
 * @returns Promise<void>
 */
export const waitForAnimation = async (element: HTMLElement): Promise<void> => {
  await new Promise<void>((resolve) => {
    element.addEventListener('animationend', () => resolve(), { once: true })
  })
}

/**
 * フォーカスされている要素を取得する関数
 * @returns HTMLElement | null
 */
export const getFocusedElement = (): HTMLElement | null => {
  return document.activeElement as HTMLElement
}

/**
 * 要素が表示範囲内にあるか確認する関数
 * @param element - HTMLElement
 * @returns boolean
 */
export const isElementInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth
  )
} 