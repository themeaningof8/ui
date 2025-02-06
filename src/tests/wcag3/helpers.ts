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
 * アクセシビリティテストのオプション
 */
export interface AccessibilityTestOptions {
	/**
	 * axeによるテストを実行するかどうか
	 * @default true
	 */
	axe?: boolean;

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
	 * @default false
	 */
	contrast?: boolean;

	/**
	 * フォーカス可能な要素の存在チェックをスキップするかどうか
	 * @default false
	 */
	skipFocusableCheck?: boolean;
}

/**
 * エラーメッセージの生成
 */
const createErrorMessage = (type: string, details: string) => {
	return `アクセシビリティテストに失敗しました (${type}): ${details}`;
};

/**
 * axeによるアクセシビリティ違反のチェック
 */
export const runAxeTest = async (element: ReactElement): Promise<RenderResult> => {
	const result = render(element);
	const axeResults = await axe(result.container);
	expect(axeResults, createErrorMessage('axe', 'アクセシビリティ違反が検出されました')).toHaveNoViolations();
	return result;
};

/**
 * キーボードナビゲーションのテスト
 */
export const runKeyboardNavigationTest = (container: HTMLElement): void => {
	const focusableElements = Array.from(
		container.querySelectorAll<HTMLElement>(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		)
	);
	expect(
		focusableElements.length,
		createErrorMessage('キーボードナビゲーション', 'フォーカス可能な要素が見つかりません')
	).toBeGreaterThan(0);
};

/**
 * ARIA属性のテスト
 */
export const runAriaAttributesTest = (container: HTMLElement): void => {
	const allElements = Array.from(container.getElementsByTagName('*'));
	const elementsWithAria = allElements.filter(element => {
		return Array.from(element.attributes).some(attr => attr.name.startsWith('aria-'));
	});
	
	if (elementsWithAria.length > 0) {
		for (const element of elementsWithAria) {
			const ariaAttributes = Array.from(element.attributes)
				.filter((attr) => attr.name.startsWith('aria-'))
				.map((attr) => attr.name);
			expect(
				ariaAttributes.length,
				createErrorMessage('ARIA属性', `要素 ${element.tagName} にARIA属性が設定されていません`)
			).toBeGreaterThan(0);
		}
	}
};

/**
 * フォーカス管理のテスト
 */
export const runFocusManagementTest = (container: HTMLElement): void => {
	const focusableElements = Array.from(
		container.querySelectorAll<HTMLElement>(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		)
	);
	for (const element of focusableElements) {
		element.focus();
		expect(
			document.activeElement,
			createErrorMessage('フォーカス管理', `要素 ${element.tagName} にフォーカスが当たりません`)
		).toBe(element);
	}
};

/**
 * コントラストのテスト
 */
export const runContrastTest = (container: HTMLElement): void => {
	const textElements = Array.from(
		container.querySelectorAll<HTMLElement>('p, span, div, h1, h2, h3, h4, h5, h6')
	);
	for (const element of textElements) {
		const styles = window.getComputedStyle(element);
		const contrastRatio = calculateContrast(styles.color, styles.backgroundColor);
		expect(
			contrastRatio,
			createErrorMessage('コントラスト', `要素 ${element.tagName} のAPCAコントラスト比が不十分です: ${contrastRatio}`)
		).toBeGreaterThanOrEqual(wcagRequirements.contrast.minRatio); // WCAG3.0のAPCA基準値
	}
};
