/**
 * @file テストのセットアップファイル
 * @description テスト環境のグローバル設定を行います
 */

import { afterEach, beforeAll, expect, vi } from "vitest";
import { configureAxe } from "jest-axe";
import type { AxeResults } from "axe-core";
import "@testing-library/jest-dom";
import { cleanup, configure } from '@testing-library/react'
import {
	wcagRequirements,
	calculateContrast,
} from "./wcag3/styles";


// カスタムマッチャーの型定義
declare global {
	namespace Vi {
		interface Assertion {
			toHaveNoViolations(): void;
			toMeetContrastRatio(): void;
			toHaveAdequateTouchTarget(): void;
			toHaveVisibleFocusIndicator(): void;
		}
	}
}

// カスタムマッチャーの実装
expect.extend({
	toHaveNoViolations: (received: AxeResults) => {
		const violations = received.violations;
		const pass = violations.length === 0;

		return {
			pass,
			message: () =>
				pass
					? "アクセシビリティ違反は見つかりませんでした"
					: `${violations.length}件のアクセシビリティ違反が見つかりました:\n${violations
							.map(
								(violation) =>
									`- ${violation.help} (${violation.id})\n  影響を受ける要素: ${violation.nodes
										.map((node) => node.target.join(", "))
										.join(", ")}`
							)
							.join("\n")}`,
		};
	},
	toMeetContrastRatio: (element: HTMLElement) => {
		const styles = window.getComputedStyle(element);
		const foreground = styles.color;
		const background = styles.backgroundColor;
		const contrast = calculateContrast(foreground, background);
		const minRatio = wcagRequirements.contrast?.minRatio || 0;
		const pass = contrast >= minRatio;

		return {
			pass,
			message: () =>
				pass
					? `コントラスト比が基準を満たしています (${contrast})`
					: `コントラスト比が基準を満たしていません (${contrast} < ${minRatio})`,
		};
	},
	toHaveAdequateTouchTarget: (element: HTMLElement) => {
		const rect = element.getBoundingClientRect();
		const minSize = wcagRequirements.touchTarget?.minSize || 44;
		const pass = rect.width >= minSize && rect.height >= minSize;

		return {
			pass,
			message: () =>
				pass
					? `タッチターゲットサイズが基準を満たしています (${rect.width}x${rect.height})`
					: `タッチターゲットサイズが基準を満たしていません (${rect.width}x${rect.height} < ${minSize}x${minSize})`,
		};
	},
	toHaveVisibleFocusIndicator: (element: HTMLElement) => {
		const styles = window.getComputedStyle(element);
		const outlineWidth = Number.parseInt(styles.outlineWidth) || 0;
		const outlineStyle = styles.outlineStyle;
		const outlineColor = styles.outlineColor;
		const minOutlineWidth = wcagRequirements.focusIndicator?.minOutlineWidth || 0;
		const pass =
			outlineWidth >= minOutlineWidth &&
			outlineStyle !== "none" &&
			outlineColor !== "transparent";

		return {
			pass,
			message: () =>
				pass
					? "フォーカスインジケータが視認可能です"
					: "フォーカスインジケータが視認できません",
		};
	},
});

// テスト環境のグローバル設定
vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: vi.fn(),
		replace: vi.fn(),
		prefetch: vi.fn(),
	}),
	useSearchParams: () => ({
		get: vi.fn(),
	}),
}));

// axe-coreの設定
configureAxe({
	rules: [
		{
			id: "color-contrast",
			enabled: true,
		},
		{
			id: "aria-allowed-attr",
			enabled: true,
		},
		{
			id: "aria-required-attr",
			enabled: true,
		},
		{
			id: "button-name",
			enabled: true,
		},
	],
});

// テスト環境の設定
configure({
	testIdAttribute: 'data-testid',
})

// テスト後のクリーンアップ
afterEach(() => {
	cleanup()
})

// グローバルオブジェクトの設定
beforeAll(() => {
	// ResizeObserverのモック
	const ResizeObserverMock = vi.fn(() => ({
		observe: vi.fn(),
		unobserve: vi.fn(),
		disconnect: vi.fn(),
	}))
	
	// IntersectionObserverのモック
	const mockIntersectionObserver = vi.fn(() => ({
		observe: vi.fn(),
		unobserve: vi.fn(),
		disconnect: vi.fn(),
		root: null,
		rootMargin: '',
		thresholds: [0],
		takeRecords: () => [],
	}))

	// グローバルオブジェクトの定義
	Object.defineProperties(global, {
		ResizeObserver: {
			writable: true,
			configurable: true,
			value: ResizeObserverMock,
		},
		IntersectionObserver: {
			writable: true,
			configurable: true,
			value: mockIntersectionObserver,
		},
	})

	// DOMイベントのモック
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: vi.fn().mockImplementation(query => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		})),
	})

	// アニメーションのモック
	window.HTMLElement.prototype.scrollIntoView = vi.fn()
	window.HTMLElement.prototype.releasePointerCapture = vi.fn()
	window.HTMLElement.prototype.hasPointerCapture = vi.fn()
})
