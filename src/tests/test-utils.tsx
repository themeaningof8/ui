/**
 * @file テストユーティリティ
 * @description テストで共通して使用する関数群を定義します
 */

import type { ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// 画像のモック化
const originalImage = window.Image;
beforeAll(() => {
	// @ts-ignore
	window.Image = class {
		onload: () => void = () => {};
		src = "";
		alt = "";
		constructor() {
			setTimeout(() => {
				this.onload();
			}, 0);
		}
	};
});

afterAll(() => {
	window.Image = originalImage;
});

/**
 * カスタムレンダー関数のオプション
 */
interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
	/**
	 * 初期ルートパス
	 */
	route?: string;
}

/**
 * カスタムレンダー関数
 * @param ui - レンダリングするReactコンポーネント
 * @param options - レンダリングオプション
 * @returns レンダリング結果とユーザーイベントオブジェクト
 */
function customRender(ui: ReactElement, options?: CustomRenderOptions) {
	const { route = "/", ...renderOptions } = options || {};

	// ユーザーイベントのセットアップ
	const user = userEvent.setup();

	return {
		user,
		...render(ui, {
			...renderOptions,
		}),
	};
}

/**
 * テスト用のユーティリティ関数をエクスポート
 */
export * from "@testing-library/react";
export { customRender as render };
export { userEvent };

/**
 * テスト用のモックデータを生成する関数
 * @param overrides - デフォルト値を上書きするオブジェクト
 * @returns モックデータ
 */
export const createMockData = <T extends Record<string, unknown>>(
	overrides: Partial<T> = {},
): T => {
	return {
		...overrides,
	} as T;
};

/**
 * テスト用のモックエラーを生成する関数
 * @param message - エラーメッセージ
 * @param code - エラーコード
 * @returns エラーオブジェクト
 */
export const createMockError = (
	message: string,
	code?: string,
): Error & { code?: string } => {
	const error = new Error(message);
	if (code) {
		Object.assign(error, { code });
	}
	return error;
};

/**
 * 非同期処理の完了を待機する関数
 * @param ms - 待機時間（ミリ秒）
 */
export const waitForAsync = (ms = 0): Promise<void> =>
	new Promise((resolve) => setTimeout(resolve, ms));

/**
 * テスト用のイベントを発火する関数
 * @param element - イベントを発火する要素
 * @param eventName - イベント名
 * @param options - イベントオプション
 */
export const fireEvent = (
	element: Element,
	eventName: string,
	options?: Record<string, unknown>,
): void => {
	const event = new Event(eventName, {
		bubbles: true,
		cancelable: true,
		...options,
	});
	element.dispatchEvent(event);
};
