/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from ".";

describe("Resizable", () => {
	it("renders panel group correctly", () => {
		render(
			<ResizablePanelGroup direction="horizontal">
				<ResizablePanel defaultSize={50}>Panel 1</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={50}>Panel 2</ResizablePanel>
			</ResizablePanelGroup>,
		);

		expect(screen.getByText("Panel 1")).toBeInTheDocument();
		expect(screen.getByText("Panel 2")).toBeInTheDocument();
	});

	it("applies custom className to panel group", () => {
		const customClass = "custom-class";
		render(
			<ResizablePanelGroup direction="horizontal" className={customClass}>
				<ResizablePanel defaultSize={50}>Panel 1</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={50}>Panel 2</ResizablePanel>
			</ResizablePanelGroup>,
		);

		const panelGroup = screen
			.getByText("Panel 1")
			.closest("[data-panel-group]");
		expect(panelGroup).toHaveClass(customClass);
	});

	it("applies custom className to panel", () => {
		const customClass = "custom-class";
		render(
			<ResizablePanelGroup direction="horizontal">
				<ResizablePanel className={customClass} defaultSize={50}>Panel 1</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={50}>Panel 2</ResizablePanel>
			</ResizablePanelGroup>,
		);

		const panel = screen.getByText("Panel 1").closest("[data-panel]");
		expect(panel).toHaveClass(customClass);
	});

	it("renders handle with grip icon when withHandle is true", () => {
		render(
			<ResizablePanelGroup direction="horizontal">
				<ResizablePanel defaultSize={50}>Panel 1</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={50}>Panel 2</ResizablePanel>
			</ResizablePanelGroup>,
		);

		const handle = screen.getByRole("separator");
		const gripIcon = handle.querySelector("svg");
		expect(gripIcon).toBeInTheDocument();
		expect(gripIcon).toHaveClass("lucide-grip-vertical");
	});

	it("renders panel group with correct initial sizes", () => {
		const { container } = render(
			<div style={{ width: "500px", height: "500px" }}>
				<ResizablePanelGroup direction="horizontal">
					<ResizablePanel defaultSize={30} minSize={10}>Panel 1</ResizablePanel>
					<ResizableHandle />
					<ResizablePanel defaultSize={70} minSize={10}>Panel 2</ResizablePanel>
				</ResizablePanelGroup>
			</div>,
		);

		// パネルの取得
		const panels = container.querySelectorAll("[data-panel]");
		const [panel1, panel2] = panels;

		// 初期サイズの確認
		const size1 = panel1.getAttribute("data-panel-size");
		const size2 = panel2.getAttribute("data-panel-size");

		expect(Number(size1)).toBe(30);
		expect(Number(size2)).toBe(70);

		// サイズの合計が100%になることを確認
		expect(Number(size1) + Number(size2)).toBe(100);
	});

	it("renders handle with correct attributes", () => {
		const { container } = render(
			<ResizablePanelGroup direction="horizontal">
				<ResizablePanel defaultSize={50}>Panel 1</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={50}>Panel 2</ResizablePanel>
			</ResizablePanelGroup>,
		);

		const handle = container.querySelector("[data-resize-handle]");
		expect(handle).toBeInTheDocument();
		expect(handle).toHaveAttribute("role", "separator");
		expect(handle).toHaveAttribute("tabindex", "0");
		expect(handle).toHaveAttribute("data-panel-resize-handle-enabled", "true");
	});

	it("applies size constraints correctly", () => {
		const { container } = render(
			<ResizablePanelGroup direction="horizontal">
				<ResizablePanel minSize={20} maxSize={80} defaultSize={30}>
					Panel 1
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel minSize={20} maxSize={80} defaultSize={70}>
					Panel 2
				</ResizablePanel>
			</ResizablePanelGroup>,
		);

		const panels = container.querySelectorAll("[data-panel]");

		for (const panel of panels) {
			const constraints = JSON.parse(
				panel.getAttribute("data-panel-size-constraints") || "{}",
			);
			expect(constraints.minSize).toBe(20);
			expect(constraints.maxSize).toBe(80);
		}
	});
});
