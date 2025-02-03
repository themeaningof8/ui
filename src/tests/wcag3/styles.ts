/**
 * @file スタイルユーティリティ
 * @description アクセシビリティテストのためのスタイル関連のユーティリティ関数
 */

import { APCAcontrast } from "apca-w3";

/**
 * アクセシビリティ要件の設定
 */
export interface AccessibilityRequirements {
	/** コントラスト比の設定 */
	contrast?: {
		/** 最小コントラスト比（APCA基準） */
		minRatio: number;
	};
	/** タッチターゲットのサイズ設定 */
	touchTarget?: {
		/** 最小サイズ（ピクセル） */
		minSize: number;
	};
	/** フォーカスインジケータの設定 */
	focusIndicator?: {
		/** アウトラインの最小幅（ピクセル） */
		minOutlineWidth: number;
	};
}

/**
 * WCAG 3.0の最小要件
 */
export const wcagRequirements: AccessibilityRequirements = {
	contrast: {
		minRatio: 60, // APCA基準
	},
	touchTarget: {
		minSize: 44, // WCAG 3.0基準
	},
	focusIndicator: {
		minOutlineWidth: 2,
	},
};

/**
 * 色文字列をRGB値に変換する
 * @param color - CSSの色文字列（rgb, rgba, hex）
 * @returns RGB値の配列 [r, g, b]
 */
const parseColor = (color: string): [number, number, number] => {
	// rgb(r, g, b) または rgba(r, g, b, a) の形式の場合
	const rgbMatch = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
	if (rgbMatch) {
		return [
			Number.parseInt(rgbMatch[1], 10),
			Number.parseInt(rgbMatch[2], 10),
			Number.parseInt(rgbMatch[3], 10),
		];
	}

	// hex形式の場合（#rgb または #rrggbb）
	const hexMatch = color.match(/^#([A-Fa-f0-9]{3,6})/);
	if (hexMatch) {
		const hex = hexMatch[1];
		if (hex.length === 3) {
			return [
				Number.parseInt(hex[0] + hex[0], 16),
				Number.parseInt(hex[1] + hex[1], 16),
				Number.parseInt(hex[2] + hex[2], 16),
			];
		}
		if (hex.length === 6) {
			return [
				Number.parseInt(hex.slice(0, 2), 16),
				Number.parseInt(hex.slice(2, 4), 16),
				Number.parseInt(hex.slice(4, 6), 16),
			];
		}
	}

	return [0, 0, 0];
};

/**
 * コントラスト比を計算する
 * @param foreground - 前景色（テキスト色）
 * @param background - 背景色
 * @returns APCAコントラスト値（-108%から108%の範囲）
 */
export const calculateContrast = (
	foreground: string,
	background: string,
): number => {
	const [fR, fG, fB] = parseColor(foreground);
	const [bR, bG, bB] = parseColor(background);

	return Math.abs(
		APCAcontrast(
			[fR, fG, fB],
			[bR, bG, bB],
		),
	);
};

/**
 * 要素が最小コントラスト比を満たしているか確認する
 * @param element - 確認する要素
 * @returns 最小コントラスト比を満たしているか
 */
export const meetsMinimumContrast = (
	element: HTMLElement,
): boolean => {
	const computedStyle = window.getComputedStyle(element);
	const contrast = calculateContrast(
		computedStyle.color,
		computedStyle.backgroundColor,
	);
	return contrast >= wcagRequirements.contrast?.minRatio;
};

/**
 * 要素が最小タッチターゲットサイズを満たしているか確認する
 * @param element - 確認する要素
 * @returns 最小タッチターゲットサイズを満たしているか
 */
export const meetsMinimumTouchTarget = (
	element: HTMLElement,
): boolean => {
	const rect = element.getBoundingClientRect();
	const minSize = wcagRequirements.touchTarget?.minSize;
	return rect.width >= minSize && rect.height >= minSize;
};

/**
 * 要素が適切なフォーカスインジケータを持っているか確認する
 * @param element - 確認する要素
 * @returns 適切なフォーカスインジケータを持っているか
 */
export const hasVisibleFocusIndicator = (
	element: HTMLElement,
): boolean => {
	const computedStyle = window.getComputedStyle(element);
	const outlineWidth = Number.parseInt(computedStyle.outlineWidth) || 0;
	const outlineStyle = computedStyle.outlineStyle;
	const outlineColor = computedStyle.outlineColor;

	return (
		outlineWidth >= wcagRequirements.focusIndicator?.minOutlineWidth &&
		outlineStyle !== "none" &&
		outlineColor !== "transparent"
	);
};
