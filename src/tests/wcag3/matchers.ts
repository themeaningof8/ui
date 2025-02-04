/**
 * @file カスタムマッチャーの実装
 * @description アクセシビリティテストのためのカスタムマッチャーの実装
 */

import { expect } from "vitest";
import type { AxeResults } from "axe-core";
import { calculateContrast, wcagRequirements } from "./styles";

expect.extend({
	toHaveNoViolations(received: AxeResults) {
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
										.join(", ")}`,
							)
							.join("\n")}`,
		};
	},

	toMeetContrastRatio(element: HTMLElement) {
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

	toHaveAdequateTouchTarget(element: HTMLElement) {
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

	toHaveVisibleFocusIndicator(element: HTMLElement) {
		const styles = window.getComputedStyle(element);
		const outlineWidth = Number.parseInt(styles.outlineWidth) || 0;
		const outlineStyle = styles.outlineStyle;
		const outlineColor = styles.outlineColor;
		const minOutlineWidth =
			wcagRequirements.focusIndicator?.minOutlineWidth || 0;
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
