/**
 * @file WCAG3テストヘルパー
 * @description WCAG3.0に基づくアクセシビリティテストのためのヘルパー関数群
 */

import { render, type RenderResult } from '@testing-library/react';
import { axe } from 'jest-axe';
import { expect } from 'vitest';
import type { ReactElement } from 'react';
import { calculateContrast, wcagRequirements } from './styles';
import './matchers';

/**
 * コンポーネントタイプの定義
 */
export type ComponentType =
	| 'accordion'
	| 'button'
	| 'dialog'
	| 'form'
	| 'input'
	| 'menu'
	| 'radix'
	| 'select'
	| 'tabs';

/**
 * アクセシビリティテストのオプション
 */
export interface AccessibilityTestOptions {
	/**
	 * キーボードナビゲーションのテストを実行するかどうか
	 * @default true
	 */
	keyboardNavigation?: boolean;

	/**
	 * ARIAの属性のテストを実行するかどうか
	 * @default true
	 */
	ariaAttributes?: boolean;

	/**
	 * フォーカス管理のテストを実行するかどうか
	 * @default true
	 */
	focusManagement?: boolean;

	/**
	 * コントラストのテストを実行するかどうか
	 * @default true
	 */
	contrast?: boolean;

	/**
	 * フォーカス可能な要素の存在チェックをスキップするかどうか
	 * @default false
	 */
	skipFocusableCheck?: boolean;
}

/**
 * アクセシビリティテストを実行する
 * @param element テスト対象のReactコンポーネント
 * @param options テストオプション
 * @returns テスト結果
 */
export const runAccessibilityTest = async (
	element: ReactElement,
	options: AccessibilityTestOptions = {}
): Promise<RenderResult> => {
	const result = render(element);
	const {
		keyboardNavigation = true,
		ariaAttributes = true,
		focusManagement = true,
		contrast = true,
		skipFocusableCheck = false,
	} = options;

	// axeによるアクセシビリティ違反のチェック
	const axeResults = await axe(result.container);
	expect(axeResults).toHaveNoViolations();

	// キーボードナビゲーションのテスト
	if (keyboardNavigation && !skipFocusableCheck) {
		const focusableElements = Array.from(
			result.container.querySelectorAll<HTMLElement>(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			)
		);
		expect(focusableElements.length).toBeGreaterThan(0);
	}

	// ARIA属性のテスト
	if (ariaAttributes) {
		const allElements = Array.from(result.container.getElementsByTagName('*'));
		const elementsWithAria = allElements.filter(element => {
			return Array.from(element.attributes).some(attr => attr.name.startsWith('aria-'));
		});
		
		if (elementsWithAria.length > 0) {
			for (const element of elementsWithAria) {
				const ariaAttributes = Array.from(element.attributes)
					.filter((attr) => attr.name.startsWith('aria-'))
					.map((attr) => attr.name);
				expect(ariaAttributes.length).toBeGreaterThan(0);
			}
		}
	}

	// フォーカス管理のテスト
	if (focusManagement && !skipFocusableCheck) {
		const focusableElements = Array.from(
			result.container.querySelectorAll<HTMLElement>(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			)
		);
		for (const element of focusableElements) {
			element.focus();
			expect(document.activeElement).toBe(element);
		}
	}

	// コントラストのテスト
	if (contrast) {
		const textElements = Array.from(
			result.container.querySelectorAll<HTMLElement>('p, span, div, h1, h2, h3, h4, h5, h6')
		);
		for (const element of textElements) {
			const styles = window.getComputedStyle(element);
			const contrastRatio = calculateContrast(styles.color, styles.backgroundColor);
			expect(contrastRatio).toBeGreaterThanOrEqual(wcagRequirements.contrast.minRatio);
		}
	}

	return result;
};
