/**
 * @file スタイルテストヘルパー
 * @description WCAG3.0に基づくスタイルテストのためのヘルパー関数群
 */

/**
 * WCAG3.0の要件
 */
export const wcagRequirements = {
	/**
	 * コントラスト比の要件
	 */
	contrast: {
		/**
		 * 最小コントラスト比（APCA）
		 */
		minRatio: 60, // WCAG3.0のAPCA基準値
		textSize: {
			small: 14,
			large: 18,
		},
	},
	touchTarget: {
		/**
		 * 最小サイズ（ピクセル）
		 */
		minSize: 44,
		spacing: 8, // px
	},
	focusIndicator: {
		/**
		 * 最小アウトライン幅（ピクセル）
		 */
		minOutlineWidth: 2,
		minColorDifference: 45,
	},
} as const;

/**
 * RGB色をAPCA用の輝度値に変換する
 * @param r 赤成分 (0-255)
 * @param g 緑成分 (0-255)
 * @param b 青成分 (0-255)
 * @returns APCA用の輝度値
 */
const rgbToLuminance = (r: number, g: number, b: number): number => {
	// sRGBからリニアRGBへの変換（APCA用）
	const rL = Math.pow(r / 255, 2.4);
	const gL = Math.pow(g / 255, 2.4);
	const bL = Math.pow(b / 255, 2.4);

	// APCA用の輝度計算
	return 0.2126729 * rL + 0.7151522 * gL + 0.0721750 * bL;
};

/**
 * 色文字列をRGB値に変換する
 * @param color CSS色文字列
 * @returns RGB値の配列 [r, g, b]
 */
const parseColor = (color: string): [number, number, number] => {
	// カラーコードの場合
	if (color.startsWith("#")) {
		const hex = color.slice(1);
		// 3桁のカラーコードの場合
		if (hex.length === 3) {
			const r = Number.parseInt(hex[0] + hex[0], 16);
			const g = Number.parseInt(hex[1] + hex[1], 16);
			const b = Number.parseInt(hex[2] + hex[2], 16);
			return [r, g, b];
		}
		// 6桁のカラーコードの場合
		const r = Number.parseInt(hex.slice(0, 2), 16);
		const g = Number.parseInt(hex.slice(2, 4), 16);
		const b = Number.parseInt(hex.slice(4, 6), 16);
		return [r, g, b];
	}

	// rgb()形式の場合
	if (color.startsWith("rgb")) {
		const matches = color.match(/\d+/g);
		if (matches && matches.length >= 3) {
			const [r, g, b] = matches.map(n => Number.parseInt(n, 10));
			return [r, g, b];
		}
	}

	// rgba()形式の場合
	if (color.startsWith("rgba")) {
		const matches = color.match(/\d+/g);
		if (matches && matches.length >= 3) {
			const [r, g, b] = matches.map(n => Number.parseInt(n, 10));
			return [r, g, b];
		}
	}

	// hsl()形式の場合
	if (color.startsWith("hsl")) {
		const matches = color.match(/\d+/g);
		if (matches && matches.length >= 3) {
			const [h, s, l] = matches.map(n => Number.parseInt(n, 10));
			return hslToRgb(h, s, l);
		}
	}

	// hsla()形式の場合
	if (color.startsWith("hsla")) {
		const matches = color.match(/\d+/g);
		if (matches && matches.length >= 3) {
			const [h, s, l] = matches.map(n => Number.parseInt(n, 10));
			return hslToRgb(h, s, l);
		}
	}

	// 名前付き色の場合
	const namedColors: { [key: string]: [number, number, number] } = {
		transparent: [0, 0, 0],
		currentcolor: [0, 0, 0], // 親要素の色を継承
		inherit: [0, 0, 0], // 親要素の色を継承
		initial: [0, 0, 0], // ブラウザのデフォルト値
		unset: [0, 0, 0], // inheritまたはinitialのいずれか
		black: [0, 0, 0],
		white: [255, 255, 255],
		red: [255, 0, 0],
		green: [0, 128, 0],
		blue: [0, 0, 255],
		gray: [128, 128, 128],
	};

	const normalizedColor = color.toLowerCase().trim();
	if (normalizedColor in namedColors) {
		return namedColors[normalizedColor];
	}

	// デフォルト値として黒を返す
	console.warn(`サポートされていない色形式です: ${color}, 黒を使用します`);
	return [0, 0, 0];
};

/**
 * HSLからRGBに変換する
 * @param h 色相 (0-360)
 * @param s 彩度 (0-100)
 * @param l 明度 (0-100)
 * @returns RGB値の配列 [r, g, b]
 */
const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
	const saturation = s / 100;
	const lightness = l / 100;
	const k = (n: number) => (n + h / 30) % 12;
	const a = saturation * Math.min(lightness, 1 - lightness);
	const f = (n: number) =>
		lightness - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
	return [
		Math.round(255 * f(0)),
		Math.round(255 * f(8)),
		Math.round(255 * f(4)),
	];
};

/**
 * APCAコントラスト比を計算する
 * @param foreground 前景色（文字色）
 * @param background 背景色
 * @returns APCAコントラスト比
 */
export const calculateContrast = (
	foreground: string,
	background: string,
): number => {
	const fgRGB = parseColor(foreground);
	const bgRGB = parseColor(background);

	const fgLuminance = rgbToLuminance(...fgRGB);
	const bgLuminance = rgbToLuminance(...bgRGB);

	// APCAコントラスト比の計算
	const contrast = Math.abs(
		(Math.pow(fgLuminance, 0.57) - Math.pow(bgLuminance, 0.56)) *
		Math.sign(bgLuminance - fgLuminance) * 100
	);

	return contrast;
};

/**
 * アクセシビリティ要件の型定義
 */
export interface AccessibilityRequirements {
	contrast?: {
		minRatio: number;
		textSize?: {
			small: number;
			large: number;
		};
	};
	touchTarget?: {
		minSize: number;
		spacing: number;
	};
	focusIndicator?: {
		minOutlineWidth: number;
		minColorDifference: number;
	};
}

/**
 * 要素が最小コントラスト比を満たしているか確認する
 * @param element - 確認する要素
 * @returns 最小コントラスト比を満たしているか
 */
export const meetsMinimumContrast = (element: HTMLElement): boolean => {
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
export const meetsMinimumTouchTarget = (element: HTMLElement): boolean => {
	const rect = element.getBoundingClientRect();
	const minSize = wcagRequirements.touchTarget?.minSize;
	return rect.width >= minSize && rect.height >= minSize;
};

/**
 * 要素が適切なフォーカスインジケータを持っているか確認する
 * @param element - 確認する要素
 * @returns 適切なフォーカスインジケータを持っているか
 */
export const hasVisibleFocusIndicator = (element: HTMLElement): boolean => {
	const computedStyle = window.getComputedStyle(element);
	const outlineWidth = Number.parseInt(computedStyle.outlineWidth) || 0;
	return outlineWidth >= wcagRequirements.focusIndicator?.minOutlineWidth;
};
