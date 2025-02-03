/**
 * WCAG 3.0テスト用のユーティリティ関数
 *
 * APCAコントラスト計算などのヘルパー関数を提供します。
 */

import { APCAcontrast, sRGBtoY } from "apca-w3";

/**
 * 色文字列をRGB値に変換する
 *
 * @param color - CSS色文字列（例: 'rgb(255, 255, 255)'や'#ffffff'）
 * @returns RGB値の配列 [r, g, b]
 */
export function parseColor(color: string): [number, number, number] {
	// HEXカラーの場合
	if (color.startsWith("#")) {
		const hex = color.slice(1);
		return [
			Number.parseInt(hex.slice(0, 2), 16),
			Number.parseInt(hex.slice(2, 4), 16),
			Number.parseInt(hex.slice(4, 6), 16),
		];
	}

	// RGB/RGBA形式の場合
	const match = color.match(/\d+/g);
	if (match) {
		return [
			Number.parseInt(match[0], 10),
			Number.parseInt(match[1], 10),
			Number.parseInt(match[2], 10),
		];
	}

	throw new Error(`Unsupported color format: ${color}`);
}

/**
 * APCAコントラスト比を計算する
 *
 * @param textColor - テキストの色
 * @param backgroundColor - 背景色
 * @returns APCAコントラスト値（-108 ~ 106の範囲）
 */
export function calculateAPCAContrast(
	textColor: string,
	backgroundColor: string,
): number {
	const [textR, textG, textB] = parseColor(textColor);
	const [bgR, bgG, bgB] = parseColor(backgroundColor);

	const textY = sRGBtoY([textR, textG, textB]);
	const bgY = sRGBtoY([bgR, bgG, bgB]);

	return APCAcontrast(textY, bgY);
}

/**
 * 要素のコントラストが十分かチェックする
 *
 * @param element - チェック対象のHTML要素
 * @returns コントラストが十分な場合はtrue
 */
export function hasAdequateContrast(element: HTMLElement): boolean {
	const styles = window.getComputedStyle(element);
	const contrast = calculateAPCAContrast(styles.color, styles.backgroundColor);

	// APCA基準: 60以上が推奨
	return Math.abs(contrast) >= 60;
}

/**
 * タッチターゲットサイズが十分かチェックする
 *
 * @param element - チェック対象のHTML要素
 * @returns サイズが十分な場合はtrue
 */
export function hasAdequateTouchTarget(element: HTMLElement): boolean {
	const styles = window.getComputedStyle(element);
	const width = Number.parseFloat(styles.width);
	const height = Number.parseFloat(styles.height);

	// WCAG 3.0基準: 44x44px以上
	return width >= 44 && height >= 44;
}

/**
 * フォーカスインジケータが視認可能かチェックする
 *
 * @param element - チェック対象のHTML要素
 * @returns フォーカスインジケータが視認可能な場合はtrue
 */
export function hasVisibleFocusIndicator(element: HTMLElement): boolean {
	element.focus();
	const styles = window.getComputedStyle(element);

	return styles.outlineWidth !== "0px" || element.matches(":focus-visible");
}
