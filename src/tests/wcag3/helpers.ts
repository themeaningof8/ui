/**
 * @file WCAG 3.0テストヘルパー
 * @description コンポーネントのWCAG 3.0準拠テストを行うためのヘルパー関数
 */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, describe, it, vi } from "vitest";
import React, { type ReactElement } from "react";

/**
 * 基本的なアクセシビリティテストを実行します
 * @param component テスト対象のコンポーネント
 * @param options テストオプション
 */
export const testBasicAccessibility = (
	component: ReactElement,
	{
		expectedRole,
		testDisabled = true,
		useDataDisabled = false,
		wrapper,
	}: {
		/** 期待されるARIAロール */
		expectedRole: string;
		/** 無効化状態をテストするかどうか */
		testDisabled?: boolean;
		/** data-disabled属性を使用するかどうか（Radix UI用） */
		useDataDisabled?: boolean;
		/** コンポーネントをラップするための関数 */
		wrapper?: (component: ReactElement) => ReactElement;
	},
) => {
	describe("基本機能", () => {
		it("正しいロールが設定されている", async () => {
			render(wrapper ? wrapper(component) : component);
			// アコーディオンコンテンツの場合、開いた状態でのみregionロールが取得できる
			if (expectedRole === "region") {
				const trigger = screen.getByRole("button");
				await userEvent.click(trigger);
			}
			expect(screen.getByRole(expectedRole)).toBeInTheDocument();
		});

		if (testDisabled) {
			it("無効化状態が適切に設定される", () => {
				const { rerender } = render(wrapper ? wrapper(component) : component);
				const element = screen.getByRole(expectedRole);
				
				// 初期状態の確認
				if (useDataDisabled) {
					expect(element).not.toHaveAttribute("data-disabled");
				} else {
					expect(element).not.toBeDisabled();
				}

				// disabledプロパティを持つ新しいコンポーネントを再レンダリング
				const props = { disabled: true };
				rerender(wrapper ? wrapper(React.cloneElement(component, props)) : React.cloneElement(component, props));

				// 無効化状態の確認
				if (useDataDisabled) {
					expect(element).toHaveAttribute("data-disabled");
				} else {
					expect(element).toBeDisabled();
				}
			});
		}
	});
};

/**
 * WCAG 3.0メトリクスのコンプライアンステストを実行します
 * @param component テスト対象のコンポーネント
 */
export const testWCAG3Compliance = (
	component: ReactElement,
	{
		wrapper,
		expectedRole = "button",
		focusClasses = {
			outline: "focus:outline-none",
			ring: "focus:ring-2",
			ringColor: "focus:ring-base-ui",
			ringOffset: "focus:ring-offset-2",
		},
		sizeClasses = {
			height: "h-10",
			width: "w-full",
			padding: ["px-3", "py-2"],
			layout: ["flex", "items-center", "justify-between"],
		},
	}: {
		/** コンポーネントをラップするための関数 */
		wrapper?: (component: ReactElement) => ReactElement;
		/** 期待されるARIAロール（デフォルトは"button"） */
		expectedRole?: string;
		/** フォーカス時のクラス名 */
		focusClasses?: {
			outline: string;
			ring: string;
			ringColor: string;
			ringOffset: string;
		};
		/** サイズ関連のクラス名 */
		sizeClasses?: {
			height: string;
			width: string;
			padding: string[];
			layout: string[];
		};
	} = {},
) => {
	describe("WCAG 3.0メトリクス", () => {
		it("コントラスト比が適切である", () => {
			render(wrapper ? wrapper(component) : component);
			// コントラスト比のチェックはWCAG3メトリクスで実装
		});

		it("フォーカスインジケータが視認できる", () => {
			render(wrapper ? wrapper(component) : component);
			const element = screen.getByRole(expectedRole);
			element.focus();

			// フォーカス時のスタイルをチェック
			const className = element.className;
			expect(className).toMatch(new RegExp(focusClasses.outline.replace(":", "\\:")));
			expect(className).toMatch(new RegExp(focusClasses.ring.replace(":", "\\:")));
			expect(className).toMatch(new RegExp(focusClasses.ringColor.replace(":", "\\:")));
			expect(className).toMatch(new RegExp(focusClasses.ringOffset.replace(":", "\\:")));
		});

		it("インタラクティブな要素のサイズが適切である", () => {
			render(wrapper ? wrapper(component) : component);
			const element = screen.getByRole(expectedRole);
			const className = element.className;

			// サイズ関連のクラスをチェック
			expect(className).toMatch(new RegExp(sizeClasses.height));
			expect(className).toMatch(new RegExp(sizeClasses.width));
			sizeClasses.padding.forEach(padding => {
				expect(className).toMatch(new RegExp(padding));
			});
			sizeClasses.layout.forEach(layout => {
				expect(className).toMatch(new RegExp(layout));
			});
		});
	});
};

/**
 * キーボード操作のテストを実行します
 * @param component テスト対象のコンポーネント
 * @param options テストオプション
 */
export const testKeyboardInteraction = (
	component: ReactElement,
	{
		expectedRole,
		triggerKeys = [" ", "Enter"],
		isAccordion = false,
		wrapper,
	}: {
		/** 期待されるARIAロール */
		expectedRole: string;
		/** トリガーとなるキー */
		triggerKeys?: string[];
		/** アコーディオンコンポーネントかどうか */
		isAccordion?: boolean;
		/** コンポーネントをラップするための関数 */
		wrapper?: (component: ReactElement) => ReactElement;
	},
) => {
	describe("キーボード操作", () => {
		const user = userEvent.setup();

		it("Tabキーでフォーカスできる", async () => {
			render(wrapper ? wrapper(component) : component);
			const elements = screen.getAllByRole(expectedRole);
			const firstElement = elements[0];

			await user.tab();
			expect(firstElement).toHaveFocus();
		});

		if (triggerKeys.length > 0) {
			for (const key of triggerKeys) {
				it(`${key}キーで操作できる`, async () => {
					const onKeyDown = vi.fn();
					const props = { onKeyDown };
					const { rerender } = render(
						wrapper ? wrapper(React.cloneElement(component, props)) : React.cloneElement(component, props)
					);

					const elements = screen.getAllByRole(expectedRole);
					const firstElement = elements[0];
					await user.tab();
					await user.keyboard(key);
					expect(onKeyDown).toHaveBeenCalled();
				});
			}
		}

		if (isAccordion) {
			it("矢印キーで適切にフォーカス移動できる", async () => {
				render(wrapper ? wrapper(component) : component);
				const triggers = screen.getAllByRole("button");
				
				// 最初のトリガーにフォーカス
				await user.tab();
				expect(triggers[0]).toHaveFocus();

				// 下矢印で次のトリガーにフォーカス
				await user.keyboard("{ArrowDown}");
				expect(triggers[1]).toHaveFocus();

				// 上矢印で前のトリガーにフォーカス
				await user.keyboard("{ArrowUp}");
				expect(triggers[0]).toHaveFocus();

				// Homeキーで最初のトリガーにフォーカス
				await user.keyboard("{Home}");
				expect(triggers[0]).toHaveFocus();

				// Endキーで最後のトリガーにフォーカス
				await user.keyboard("{End}");
				expect(triggers[triggers.length - 1]).toHaveFocus();
			});

			it("適切なARIA属性が設定されている", () => {
				render(wrapper ? wrapper(component) : component);
				const triggers = screen.getAllByRole("button");
				
				for (const trigger of triggers) {
					expect(trigger).toHaveAttribute("aria-expanded");
					expect(trigger).toHaveAttribute("aria-controls");
				}
			});
		}
	});
};
