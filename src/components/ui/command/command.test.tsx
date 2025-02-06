/**
 * @file Commandのテスト
 * @description Commandの機能とアクセシビリティをテスト
 */

import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, afterEach } from "vitest";
import {
	Command,
	CommandDialog,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";
import {
	runAxeTest,
	runKeyboardNavigationTest,
	runAriaAttributesTest,
	runFocusManagementTest,
	runContrastTest,
} from "@/tests/wcag3/helpers";
import type React from "react";

// scrollIntoViewのモック
Element.prototype.scrollIntoView = vi.fn();

const TestComponent = ({
	onKeyDown,
	onSelect,
}: {
	onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
	onSelect?: (value: string) => void;
}) => {
	return (
		<Command onKeyDown={onKeyDown}>
			<CommandInput placeholder="検索..." />
			<CommandList>
				<CommandEmpty>結果が見つかりません</CommandEmpty>
				<CommandGroup heading="提案">
					<CommandItem value="item1" onSelect={onSelect}>
						アイテム1
						<CommandShortcut>⌘1</CommandShortcut>
					</CommandItem>
					<CommandItem value="item2" onSelect={onSelect}>
						アイテム2
						<CommandShortcut>⌘2</CommandShortcut>
					</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading="設定">
					<CommandItem value="settings" onSelect={onSelect}>
						設定
						<CommandShortcut>⌘S</CommandShortcut>
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</Command>
	);
};

describe("Command", () => {
	const user = userEvent.setup();

	afterEach(() => {
		cleanup();
	});

	describe("基本機能", () => {
		it("コンポーネントが正しくレンダリングされる", () => {
			render(<TestComponent />);
			expect(screen.getByPlaceholderText("検索...")).toBeInTheDocument();
			expect(screen.getByText("提案")).toBeInTheDocument();
			expect(screen.getByText("アイテム1")).toBeInTheDocument();
			expect(screen.getByText("アイテム2")).toBeInTheDocument();
			expect(screen.getByText("設定")).toBeInTheDocument();
		});

		it("空の結果が表示される", async () => {
			render(<TestComponent />);
			const input = screen.getByPlaceholderText("検索...");
			await user.type(input, "存在しない項目");
			expect(screen.getByText("結果が見つかりません")).toBeInTheDocument();
		});

		it("グループとセパレーターが表示される", () => {
			render(<TestComponent />);
			expect(screen.getByText("提案")).toBeInTheDocument();
			expect(screen.getByText("設定")).toBeInTheDocument();
			const separator = screen.getByRole("separator");
			expect(separator).toBeInTheDocument();
		});
	});

	describe("インタラクション", () => {
		it("検索フィルタリングが機能する", async () => {
			render(<TestComponent />);
			const input = screen.getByPlaceholderText("検索...");
			await user.type(input, "アイテム1");
			expect(screen.getByText("アイテム1")).toBeInTheDocument();
			expect(screen.queryByText("アイテム2")).not.toBeInTheDocument();
		});

		it("カスタムフィルタリングが機能する", () => {
			const customFilter = (value: string, search: string): number => {
				return value.includes(search) ? 1 : 0;
			};

			render(
				<Command filter={customFilter}>
					<CommandInput placeholder="検索..." />
					<CommandList>
						<CommandItem value="test">テスト</CommandItem>
					</CommandList>
				</Command>,
			);

			const input = screen.getByPlaceholderText("検索...");
			fireEvent.change(input, { target: { value: "テ" } });
			expect(screen.getByText("テスト")).toBeInTheDocument();
		});

		it("選択イベントが発火する", async () => {
			const handleSelect = vi.fn();
			render(<TestComponent onSelect={handleSelect} />);
			const item = screen.getByText("アイテム1");
			await user.click(item);
			expect(handleSelect).toHaveBeenCalledWith("item1");
		});
	});

	describe("アクセシビリティ", () => {
		describe("基本的なアクセシビリティ", () => {
			it("axeによる基本的なアクセシビリティ要件を満たす", async () => {
				await runAxeTest(<TestComponent />);
			});

			it("キーボードナビゲーションが適切に機能する", () => {
				const { container } = render(<TestComponent />);
				runKeyboardNavigationTest(container);
			});

			it("ARIA属性が適切に設定されている", () => {
				const { container } = render(<TestComponent />);
				runAriaAttributesTest(container);
			});

			it("フォーカス管理が適切に機能する", () => {
				const { container } = render(<TestComponent />);
				runFocusManagementTest(container);
			});

			it("コントラスト要件を満たす", () => {
				const { container } = render(<TestComponent />);
				runContrastTest(container);
			});
		});

		describe("キーボード操作", () => {
			it("矢印キーで項目間を移動できる", async () => {
				render(<TestComponent />);
				const input = screen.getByPlaceholderText("検索...");
				await user.type(input, "{ArrowDown}");
				expect(screen.getByText("アイテム1")).toHaveAttribute(
					"data-highlighted",
					"true",
				);
				await user.keyboard("{ArrowDown}");
				expect(screen.getByText("アイテム2")).toHaveAttribute(
					"data-highlighted",
					"true",
				);
			});

			it("Enterキーで項目を選択できる", async () => {
				const handleSelect = vi.fn();
				render(<TestComponent onSelect={handleSelect} />);
				const input = screen.getByPlaceholderText("検索...");
				await user.type(input, "{ArrowDown}{Enter}");
				expect(handleSelect).toHaveBeenCalledWith("item1");
			});

			it("Escapeキーでダイアログを閉じる", async () => {
				render(
					<CommandDialog open>
						<TestComponent />
					</CommandDialog>,
				);
				await user.keyboard("{Escape}");
				expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
			});
		});

		describe("スクリーンリーダー対応", () => {
			it("適切なARIAラベルが設定されている", () => {
				render(<TestComponent />);
				expect(screen.getByRole("combobox")).toHaveAttribute(
					"aria-expanded",
					"true",
				);
				expect(screen.getByRole("listbox")).toBeInTheDocument();
			});

			it("グループにラベルが設定されている", () => {
				render(<TestComponent />);
				const groups = screen.getAllByRole("group");
				expect(groups[0]).toHaveAccessibleName("提案");
				expect(groups[1]).toHaveAccessibleName("設定");
			});

			it("ショートカットが適切に通知される", () => {
				render(<TestComponent />);
				const shortcuts = screen.getAllByText(/⌘/);
				for (const shortcut of shortcuts) {
					expect(shortcut).toHaveAttribute("aria-hidden", "true");
				}
			});
		});
	});
});
