/**
 * Vitestのセットアップファイル
 * テスト環境のグローバル設定を行います
 */
import '@testing-library/jest-dom/vitest'
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import { Window } from 'happy-dom'
import type { ReactNode } from 'react'

declare module 'vitest' {
  interface JestAssertion<T> extends matchers.TestingLibraryMatchers<T, void> {}
}

// グローバル変数の設定
const window = new Window()
const document = window.document

// グローバルオブジェクトの設定
Object.defineProperty(globalThis, 'window', { value: window })
Object.defineProperty(globalThis, 'document', { value: document })
Object.defineProperty(globalThis, 'navigator', { value: window.navigator })
Object.defineProperty(globalThis, 'Element', { value: window.Element })
Object.defineProperty(globalThis, 'HTMLElement', { value: window.HTMLElement })

// Testing Libraryのマッチャーを追加
expect.extend(matchers)

// 各テスト後にクリーンアップ
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

// モックのセットアップ
Object.defineProperty(window, 'matchMedia', {
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
})

// Radix UIコンポーネントのモック
type MockComponentProps = {
  children: ReactNode
}

vi.mock('@radix-ui/react-presence', () => ({
  Presence: ({ children }: MockComponentProps) => children
}))

vi.mock('@radix-ui/react-dismissable-layer', () => ({
  DismissableLayer: ({ children }: MockComponentProps) => children
}))

vi.mock('@radix-ui/react-focus-scope', () => ({
  FocusScope: ({ children }: MockComponentProps) => children
}))

vi.mock('@radix-ui/react-portal', () => ({
  Portal: ({ children }: MockComponentProps) => children
}))