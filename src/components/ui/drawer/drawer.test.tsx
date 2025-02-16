/**
 * @file ドロワーコンポーネントのテスト
 * @description ドロワーコンポーネントの機能をテストします
 */

import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from ".";

// matchMediaのモック
window.matchMedia =
	window.matchMedia ||
	(() => ({
		matches: false,
		addListener: () => {},
		removeListener: () => {},
	}));

// getComputedStyleのモック
Object.defineProperty(window, 'getComputedStyle', {
	value: () => ({
		getPropertyValue: () => '',
		transform: 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)',
	}),
});

// vaulのモック
vi.mock("vaul", async () => {
	const actual = await vi.importActual("vaul");
	return {
		...(actual as object),
		useDrawer: () => ({
			open: false,
			onOpenChange: vi.fn(),
			setOpen: vi.fn(),
			modal: true,
			snapPoints: [0, 1],
			activeSnapPoint: null,
			setActiveSnapPoint: vi.fn(),
			setDragValue: vi.fn(),
			dragValue: 0,
			isOpen: false,
		}),
		DrawerOverlay: ({
			children,
			...props
		}: ComponentPropsWithoutRef<"div">) => (
			<div
				data-testid="drawer-overlay"
				style={{
					transform: 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)',
					WebkitTransform: 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)',
					MozTransform: 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)',
				}}
				{...props}
			>
				{children}
			</div>
		),
		DrawerContent: ({
			children,
			...props
		}: ComponentPropsWithoutRef<"div">) => (
			<div
				style={{
					transform: 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)',
					WebkitTransform: 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)',
					MozTransform: 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)',
				}}
				{...props}
			>
				{children}
			</div>
		),
		DrawerTrigger: ({
			children,
			...props
		}: ComponentPropsWithoutRef<"button">) => (
			<button type="button" {...props}>
				{children}
			</button>
		),
		DrawerPortal: ({ children }: { children: ReactNode }) => children,
	};
});

describe("Drawerコンポーネント", () => {
	it("基本的なドロワーが正しくレンダリングされること", async () => {
		const user = userEvent.setup()
		render(
			<Drawer>
				<DrawerTrigger>開く</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>タイトル</DrawerTitle>
						<DrawerDescription>説明文</DrawerDescription>
					</DrawerHeader>
					<DrawerFooter>
						<DrawerClose>閉じる</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>,
		);

		expect(screen.queryByText("タイトル")).not.toBeInTheDocument();

		await user.click(screen.getByText("開く"));
		await waitFor(() => {
			expect(screen.getByText("タイトル")).toBeInTheDocument();
		});

		expect(screen.getByText("説明文")).toBeInTheDocument();
	});

	it("カスタムクラス名が正しく適用されること", async () => {
		const user = userEvent.setup()
		render(
			<Drawer>
				<DrawerTrigger className="custom-trigger">開く</DrawerTrigger>
				<DrawerContent className="custom-content">
					<DrawerHeader className="custom-header">
						<DrawerTitle className="custom-title">タイトル</DrawerTitle>
						<DrawerDescription className="custom-description">
							説明文
						</DrawerDescription>
					</DrawerHeader>
					<DrawerFooter className="custom-footer">
						<DrawerClose>閉じる</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>,
		);

		await user.click(screen.getByText("開く"));
		await waitFor(() => {
			expect(screen.getByText("タイトル")).toBeInTheDocument();
		});

		expect(screen.getByText("開く")).toHaveClass("custom-trigger");
		expect(screen.getByText("タイトル").parentElement).toHaveClass(
			"custom-header",
		);
		expect(screen.getByText("タイトル")).toHaveClass("custom-title");
		expect(screen.getByText("説明文")).toHaveClass("custom-description");
		expect(screen.getByText("閉じる").parentElement).toHaveClass(
			"custom-footer",
		);
	});

	it("ドロワーが閉じられること", async () => {
		const onOpenChange = vi.fn();
		const user = userEvent.setup()
		render(
			<Drawer onOpenChange={onOpenChange}>
				<DrawerTrigger>開く</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>タイトル</DrawerTitle>
						<DrawerDescription>説明文</DrawerDescription>
					</DrawerHeader>
					<DrawerClose>閉じる</DrawerClose>
				</DrawerContent>
			</Drawer>,
		);

		await user.click(screen.getByText("開く"));
		await waitFor(() => {
			expect(screen.getByText("タイトル")).toBeInTheDocument();
		});

		await user.click(screen.getByText("閉じる"));
		expect(onOpenChange).toHaveBeenCalledWith(false);
	});

	it("オーバーレイをクリックしてドロワーが閉じられること", async () => {
		const onOpenChange = vi.fn();
		const user = userEvent.setup()
		render(
			<Drawer onOpenChange={onOpenChange}>
				<DrawerTrigger>開く</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>タイトル</DrawerTitle>
						<DrawerDescription>説明文</DrawerDescription>
					</DrawerHeader>
				</DrawerContent>
			</Drawer>,
		);

		await user.click(screen.getByText("開く"));
		await waitFor(() => {
			expect(screen.getByText("タイトル")).toBeInTheDocument();
		});

		const overlay = screen.getByTestId("drawer-overlay");
		await user.click(overlay);
		expect(onOpenChange).toHaveBeenCalledWith(false);
	});
});
