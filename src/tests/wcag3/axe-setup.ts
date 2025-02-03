/**
 * axe-coreのセットアップファイル
 *
 * WCAG 3.0テストのためのaxe-coreの設定を行います。
 */

import { configureAxe } from "jest-axe";
import {
	meetsMinimumContrast,
	meetsMinimumTouchTarget,
	hasVisibleFocusIndicator,
} from "./styles";

/**
 * axe-coreのカスタム設定
 */
export const axe = configureAxe({
	globalOptions: {
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
	},
});
