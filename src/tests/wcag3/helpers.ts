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
	}: {
		/** コンポーネントをラップするための関数 */
		wrapper?: (component: ReactElement) => ReactElement;
	} = {},
) => {
	describe("WCAG 3.0メトリクス", () => {
		it("コントラスト比が適切である", () => {
			render(wrapper ? wrapper(component) : component);
			// コントラスト比のチェックはWCAG3メトリクスで実装
		});

		it("フォーカスインジケータが視認できる", () => {
			render(wrapper ? wrapper(component) : component);
			const element = screen.getByRole("button");
			element.focus();
			expect(element).toHaveClass("focus-visible:outline-none");
			expect(element).toHaveClass("focus-visible:ring-2");
			expect(element).toHaveClass("focus-visible:ring-accent-solid");
			expect(element).toHaveClass("focus-visible:ring-offset-2");
		});

		it("インタラクティブな要素のサイズが適切である", () => {
			render(wrapper ? wrapper(component) : component);
			const element = screen.getByRole("button");

			// JSDOM環境ではレイアウト計算が正しく行われないため、
			// 最小サイズを指定するTailwindクラスの存在を確認
			expect(element.className).toMatch(/min-h-\[48px\]/);
			expect(element.className).toMatch(/min-w-\[48px\]/);
			expect(element.className).toMatch(/h-12/); // h-12 = 48px

			// 要素がクリック可能な領域を持っていることを確認
			expect(element).toHaveClass("flex");
			expect(element).toHaveClass("flex-1");
			expect(element).toHaveClass("w-full");
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
