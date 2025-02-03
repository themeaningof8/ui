/**
 * @file WCAG 3.0テストヘルパー
 * @description アクセシビリティテストのための共通ユーティリティ関数
 */

import { render } from "@testing-library/react";
import type { RenderResult } from "@testing-library/react";
import { axe } from "./axe-setup";
import userEvent from "@testing-library/user-event";
import { expect, describe, it } from "vitest";
import type { ReactElement } from "react";
import {
	calculateContrast,
	type AccessibilityRequirements,
	wcagRequirements,
} from "./styles";
import "./matchers";
import { APCAcontrast } from "apca-w3";
import type { AxeResults } from "axe-core";

// カスタムマッチャーの型定義
declare module "vitest" {
	interface CustomMatchers<R = void> {
		toHaveNoViolations(): R;
		toMeetContrastRatio(): R;
		toHaveAdequateTouchTarget(): R;
		toHaveVisibleFocusIndicator(): R;
	}
	interface Assertion extends CustomMatchers {}
}

/**
 * コンポーネントタイプの定義
 */
export type ComponentType =
	| "form"
	| "button"
	| "input"
	| "select"
	| "accordion"
	| "dialog"
	| "tabs"
	| "menu"
	| "radix";

/**
 * キーボード操作の設定
 */
export interface KeyboardConfig {
	/** 必須のキー操作 */
	requiredKeys: string[];
	/** オプションのキー操作 */
	optionalKeys?: string[];
	/** キー操作のカスタムテスト */
	customTests?: {
		keys: string[];
		description: string;
		test: (user: ReturnType<typeof userEvent.setup>) => Promise<void>;
	}[];
}

/**
 * ARIA属性の設定
 */
export interface AriaConfig {
	/** 必須のARIA属性 */
	requiredAttributes: string[];
	/** 状態依存のARIA属性 */
	conditionalAttributes?: {
		attribute: string;
		condition: string;
		value: string;
	}[];
}

/**
 * フォーカス管理の設定
 */
export interface FocusConfig {
	/** フォーカストラップが必要か */
	trapFocus?: boolean;
	/** フォーカスの自動移動が必要か */
	autoFocus?: boolean;
	/** フォーカス順序の検証が必要か */
	validateOrder?: boolean;
	/** カスタムのフォーカステスト */
	customTests?: {
		description: string;
		test: (user: ReturnType<typeof userEvent.setup>) => Promise<void>;
	}[];
}

/**
 * コンポーネント固有の設定
 */
const componentConfigs: Partial<Record<
	ComponentType,
	{
		keyboard: KeyboardConfig;
		aria: AriaConfig;
		focus: FocusConfig;
	}
>> = {
	form: {
		keyboard: {
			requiredKeys: ["Tab", "Enter"],
			optionalKeys: ["Space"],
			customTests: [
				{
					keys: ["Escape"],
					description: "Escapeキーでフォームをリセットできる",
					test: async (user) => {
						// フォーム固有のリセットテスト
					},
				},
			],
		},
		aria: {
			requiredAttributes: ["aria-invalid", "aria-describedby"],
			conditionalAttributes: [
				{
					attribute: "aria-invalid",
					condition: "エラー時",
					value: "true",
				},
			],
		},
		focus: {
			trapFocus: false,
			autoFocus: false,
			validateOrder: true,
		},
	},
	dialog: {
		keyboard: {
			requiredKeys: ["Tab", "Escape"],
			customTests: [
				{
					keys: ["Escape"],
					description: "Escapeキーでダイアログを閉じる",
					test: async (user) => {
						// ダイアログ固有の閉じるテスト
					},
				},
			],
		},
		aria: {
			requiredAttributes: ["aria-modal", "aria-labelledby"],
			conditionalAttributes: [
				{
					attribute: "aria-hidden",
					condition: "非表示時",
					value: "true",
				},
			],
		},
		focus: {
			trapFocus: true,
			autoFocus: true,
			validateOrder: true,
		},
	},
	accordion: {
		keyboard: {
			requiredKeys: ["Tab", "Enter", "Space", "ArrowUp", "ArrowDown"],
			customTests: [
				{
					keys: ["Enter", "Space"],
					description: "Enter/Spaceキーでパネルを開閉できる",
					test: async (user) => {
						// アコーディオン固有の開閉テスト
					},
				},
			],
		},
		aria: {
			requiredAttributes: ["aria-expanded", "aria-controls"],
			conditionalAttributes: [
				{
					attribute: "aria-expanded",
					condition: "展開時",
					value: "true",
				},
			],
		},
		focus: {
			trapFocus: false,
			autoFocus: false,
			validateOrder: true,
		},
	},
};

/**
 * WCAG 3.0の基本テスト設定
 */
export interface WCAG3TestConfig {
	/** コンポーネントの種類 */
	componentType: ComponentType;
	/** 期待されるARIAロール */
	expectedRole?: string;
	/** キーボード操作の設定 */
	keyboard?: {
		/** 必須のキー操作 */
		requiredKeys: string[];
		/** フォーカストラップが必要か */
		requiresFocusTrap?: boolean;
	};
	/** カスタムテスト関数 */
	customTests?: () => void;
}

/**
 * アクセシビリティテストのオプション
 */
export interface AccessibilityTestOptions {
	/** テスト対象のセレクタ設定 */
	selectors?: {
		/** コントラストをチェックする要素のセレクタ */
		contrast?: string;
		/** タッチターゲットをチェックする要素のセレクタ */
		touchTarget?: string;
		/** フォーカスインジケータをチェックする要素のセレクタ */
		focusIndicator?: string;
	};
	/** スキップするテスト */
	skip?: Array<"contrast" | "touchTarget" | "focusIndicator" | "axe">;
	/** axe-coreのオプション設定 */
	axeOptions?: {
		/** 実行するルールの設定 */
		runOnly?: {
			/** ルールの種類 */
			type: 'tag' | 'rule';
			/** 実行するルールの値 */
			values: string[];
		};
		/** 個別のルール設定 */
		rules?: {
			[ruleId: string]: {
				/** ルールの有効/無効 */
				enabled: boolean;
				/** その他のオプション */
				[key: string]: unknown;
			};
		};
	};
}

/**
 * WCAG 3.0の基本的なアクセシビリティテストを実行する
 * 
 * @param ui - テスト対象のReactコンポーネント
 * @param options - テストオプション
 * @returns レンダリング結果
 */
export const testAccessibility = (
	ui: ReactElement,
	options: AccessibilityTestOptions = {}
): RenderResult => {
	const result = render(ui);

	// axe-coreによるテスト
	if (!options.skip?.includes("axe")) {
		it("アクセシビリティ違反がないこと", async () => {
			const results = await axe(result.container, options.axeOptions);
			expect(results).toHaveNoViolations();
		});
	}

	// コントラストのテスト
	if (!options.skip?.includes("contrast") && options.selectors?.contrast) {
		it("十分なコントラスト比があること", () => {
			const elements = Array.from(result.container.querySelectorAll(options.selectors.contrast));
			for (const element of elements) {
				expect(element as HTMLElement).toMeetContrastRatio();
			}
		});
	}

	// タッチターゲットのテスト
	if (!options.skip?.includes("touchTarget") && options.selectors?.touchTarget) {
		it("十分なタッチターゲットサイズがあること", () => {
			const elements = Array.from(result.container.querySelectorAll(options.selectors.touchTarget));
			for (const element of elements) {
				expect(element as HTMLElement).toHaveAdequateTouchTarget();
			}
		});
	}

	// フォーカスインジケータのテスト
	if (!options.skip?.includes("focusIndicator") && options.selectors?.focusIndicator) {
		it("視認可能なフォーカスインジケータがあること", () => {
			const elements = Array.from(result.container.querySelectorAll(options.selectors.focusIndicator));
			for (const element of elements) {
				expect(element as HTMLElement).toHaveVisibleFocusIndicator();
			}
		});
	}

	return result;
};

/**
 * キーボード操作のテストヘルパー
 */
export const keyboardTest = {
	/**
	 * Tabキーでのフォーカス移動をテストする
	 */
	tabNavigation: async (
		container: HTMLElement,
		expectedOrder: string[]
	): Promise<void> => {
		const user = userEvent.setup();
		for (const selector of expectedOrder) {
			await user.tab();
			const element = container.querySelector(selector);
			expect(element).toHaveFocus();
		}
	},

	/**
	 * 特定のキー操作をテストする
	 */
	keyPress: async (
		element: HTMLElement,
		key: string,
		expectedResult: () => void
	): Promise<void> => {
		const user = userEvent.setup();
		await user.type(element, `{${key}}`);
		expectedResult();
	},
};

/**
 * ARIAプロパティのテストヘルパー
 */
export const ariaTest = {
	/**
	 * ARIA属性の存在をチェックする
	 */
	hasAttribute: (element: HTMLElement, attribute: string, value?: string) => {
		if (value) {
			expect(element).toHaveAttribute(attribute, value);
		} else {
			expect(element).toHaveAttribute(attribute);
		}
	},

	/**
	 * ライブリージョンの設定をチェックする
	 */
	checkLiveRegion: (element: HTMLElement, politeness: "polite" | "assertive") => {
		expect(element).toHaveAttribute("aria-live", politeness);
	},
};
