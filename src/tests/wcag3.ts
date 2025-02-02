/**
 * @file WCAG 3.0メトリクス計測用のヘルパー関数
 * @description WCAG 3.0のアクセシビリティ基準に基づくテストヘルパー関数を提供します
 */

import type { RenderResult } from "@testing-library/react";

/**
 * APCAコントラスト比を計算します
 * @param textColor テキストの色（RGB形式）
 * @param backgroundColor 背景色（RGB形式）
 * @returns APCAコントラスト比
 */
export const calculateAPCAContrast = (
	textColor: string,
	backgroundColor: string,
): number => {
	// RGB値を抽出
	const [textR, textG, textB] = textColor.match(/\d+/g)?.map(Number) || [
		0, 0, 0,
	];
	const [bgR, bgG, bgB] = backgroundColor.match(/\d+/g)?.map(Number) || [
		0, 0, 0,
	];

	// sRGBからY値への変換
	const textY = 0.2126 * textR + 0.7152 * textG + 0.0722 * textB;
	const bgY = 0.2126 * bgR + 0.7152 * bgG + 0.0722 * bgB;

	// APCAコントラスト比の計算
	const contrast = Math.abs((textY - bgY) / Math.max(textY, bgY)) * 100;

	return contrast;
};

/**
 * コンポーネントのWCAG 3.0メトリクスをチェックします
 * @param renderResult テストライブラリのレンダリング結果
 * @returns WCAG 3.0メトリクスの検証結果
 */
export const checkWCAG3Metrics = (renderResult: RenderResult) => {
	const { container } = renderResult;
	const elements = container.querySelectorAll("*");
	const results = {
		apca: [] as { element: Element; contrast: number }[],
		interactiveElements: [] as Element[],
		focusableElements: [] as Element[],
	};

	for (const element of Array.from(elements)) {
		const styles = window.getComputedStyle(element);
		const textColor = styles.color;
		const backgroundColor = styles.backgroundColor;

		// APCAコントラスト比の計算
		const contrast = calculateAPCAContrast(textColor, backgroundColor);
		if (contrast < 70) {
			results.apca.push({ element, contrast });
		}

		// インタラクティブ要素のチェック
		if (
			element.hasAttribute("role") ||
			element.tagName.toLowerCase() === "button"
		) {
			results.interactiveElements.push(element);
		}

		// フォーカス可能要素のチェック
		if (
			element.hasAttribute("tabindex") ||
			element.tagName.toLowerCase() === "a"
		) {
			results.focusableElements.push(element);
		}
	}

	return results;
};

/**
 * WCAG 3.0のテスト結果をコンソールに出力します
 * @param results WCAG 3.0メトリクスの検証結果
 */
export const reportWCAG3Results = (
	results: ReturnType<typeof checkWCAG3Metrics>,
) => {
	console.log("\n=== WCAG 3.0 Metrics Report ===");

	// APCAコントラスト比の報告
	console.log("\nAPCA Contrast Issues:");
	for (const { element, contrast } of results.apca) {
		console.log(
			`- Element: ${element.tagName.toLowerCase()}, Contrast: ${contrast.toFixed(2)}`,
		);
	}

	// インタラクティブ要素の報告
	console.log("\nInteractive Elements:");
	for (const element of results.interactiveElements) {
		console.log(
			`- ${element.tagName.toLowerCase()} (role: ${element.getAttribute("role") || "native"})`,
		);
	}

	// フォーカス可能要素の報告
	console.log("\nFocusable Elements:");
	for (const element of results.focusableElements) {
		console.log(
			`- ${element.tagName.toLowerCase()} (tabindex: ${element.getAttribute("tabindex") || "native"})`,
		);
	}

	console.log("\n===========================");
};
