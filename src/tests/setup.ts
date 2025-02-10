/**
 * @file テストのセットアップファイル
 * @description テスト実行時の共通設定を行います
 */

import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { setupServer } from 'msw/node'

// テスト実行後のクリーンアップ
afterEach(() => {
	cleanup()
})

// MSWのセットアップ
export const server = setupServer()

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// グローバルなエラーハンドリング
window.console.error = (...args: unknown[]) => {
	const errorMessage = args.join(' ')
	throw new Error(errorMessage)
}

// ResizeObserverのモック
class MockResizeObserver implements ResizeObserver {
	observe(): void {}
	unobserve(): void {}
	disconnect(): void {}
}
global.ResizeObserver = MockResizeObserver

// matchMediaのモック
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: (query: string): MediaQueryList => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: () => {},
		removeListener: () => {},
		addEventListener: () => {},
		removeEventListener: () => {},
		dispatchEvent: () => true,
	}),
})

// IntersectionObserverのモック
class MockIntersectionObserver implements IntersectionObserver {
	readonly root: Element | null = null
	readonly rootMargin: string = '0px'
	readonly thresholds: ReadonlyArray<number> = [0]
	
	constructor(private callback: IntersectionObserverCallback) {}
	
	observe(): void {}
	unobserve(): void {}
	disconnect(): void {}
	takeRecords(): IntersectionObserverEntry[] { return [] }
}
global.IntersectionObserver = MockIntersectionObserver
