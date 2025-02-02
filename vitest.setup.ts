/**
 * @file Vitestのセットアップファイル
 * @description テスト環境のグローバル設定を行います
 */
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach } from "vitest";
import { testBasicAccessibility, testWCAG3Compliance, testKeyboardInteraction } from "./src/tests/wcag3/helpers";

// JSDOMにないPointer APIのメソッドをモック実装
beforeAll(() => {
	// ElementにhasPointerCaptureメソッドを追加
	if (!Element.prototype.hasPointerCapture) {
		Element.prototype.hasPointerCapture = (pointerId: number): boolean => false;
	}

	// ElementにsetPointerCaptureメソッドを追加
	if (!Element.prototype.setPointerCapture) {
		Element.prototype.setPointerCapture = (pointerId: number): void => {
			// 空の実装
		};
	}

	// ElementにreleasePointerCaptureメソッドを追加
	if (!Element.prototype.releasePointerCapture) {
		Element.prototype.releasePointerCapture = (pointerId: number): void => {
			// 空の実装
		};
	}

	// HTMLElementのプロトタイプにscrollIntoViewを追加
	Element.prototype.scrollIntoView = () => {};

	// window.matchMediaのモック実装
	window.matchMedia =
		window.matchMedia ||
		((query) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: () => {},
			removeListener: () => {},
			addEventListener: () => {},
			removeEventListener: () => {},
			dispatchEvent: () => false,
		}));
});

// 各テスト前にWCAG 3.0メトリクスのレポート機能を設定
beforeEach((context) => {
	// テストコンテキストにWCAG 3.0メトリクスチェック関数を追加
	context.checkWCAG3 = testWCAG3Compliance;
	context.reportWCAG3 = testBasicAccessibility;
});

// 各テスト後にクリーンアップを実行
afterEach(() => {
	cleanup();
});

/**
 * ResizeObserverのモック実装
 */
class MockResizeObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
}

/**
 * IntersectionObserverのモック実装
 */
class MockIntersectionObserver implements IntersectionObserver {
	readonly root: Element | null = null;
	readonly rootMargin: string = "0px";
	readonly thresholds: ReadonlyArray<number> = [0];

	observe(): void {}
	unobserve(): void {}
	disconnect(): void {}
	takeRecords(): IntersectionObserverEntry[] { return []; }
}

/**
 * MutationObserverのモック実装
 */
class MockMutationObserver implements MutationObserver {
	observe(target: Node, options?: MutationObserverInit): void {}
	disconnect(): void {}
	takeRecords(): MutationRecord[] { return []; }
}

// グローバルオブジェクトにObserverを追加
global.ResizeObserver = MockResizeObserver;
global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
global.MutationObserver = MockMutationObserver as unknown as typeof MutationObserver;

// WCAG 3.0メトリクスのグローバル型定義
declare module "vitest" {
	interface TestContext {
		checkWCAG3: typeof testWCAG3Compliance;
		reportWCAG3: typeof testBasicAccessibility;
	}
}
