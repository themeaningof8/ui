/**
 * @file Modal
 * @description アクセシブルなモーダルウィンドウコンポーネント。ユーザー対話を促し、フォーカスマネジメントや閉じる操作を提供します。
 *
 * @example
 * <Modal open={open} onOpenChange={setOpen} title="モーダルタイトル" description="モーダルの説明">
 *   <div>モーダルコンテンツ</div>
 * </Modal>
 */

import type * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/cn";
import { tv } from "tailwind-variants";

/**
 * @description モーダルオーバーレイのスタイル定義
 */
const modalOverlayVariants = tv({
	base: "fixed inset-0 bg-black/50 z-40 transition-opacity",
});

/**
 * @description モーダルコンテンツのスタイル定義
 */
const modalContentVariants = tv({
	base: "fixed top-1/2 left-1/2 max-h-[85vh] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg z-50",
});

/**
 * @description Modalコンポーネントのプロパティ型
 * @property {string} [title] - モーダルのタイトル
 * @property {string} [description] - モーダルの説明文
 * @property {React.ReactNode} [children] - モーダルのコンテンツ
 */
export type ModalProps = React.ComponentPropsWithoutRef<
	typeof DialogPrimitive.Root
> & {
	title?: string;
	description?: string;
	children?: React.ReactNode;
};

/**
 * @description Modalコンポーネント。モーダルウィンドウとして子要素の表示とユーザー対話を提供します。
 */
const Modal: React.FC<ModalProps> = ({
	title,
	description,
	children,
	...props
}) => {
	return (
		<DialogPrimitive.Root {...props}>
			<DialogPrimitive.Portal>
				<DialogPrimitive.Overlay className={modalOverlayVariants()} data-testid="modal-overlay" />
				<DialogPrimitive.Content className={modalContentVariants()}>
					<DialogPrimitive.Title
						className={cn("text-lg font-bold mb-2", !title && "sr-only")}
					>
						{title || "Modal"}
					</DialogPrimitive.Title>
					<DialogPrimitive.Description
						className={cn(
							"text-sm text-gray-600 mb-4",
							!description && "sr-only",
						)}
					>
						{description || "Modal content"}
					</DialogPrimitive.Description>
					<div>{children}</div>
					<DialogPrimitive.Close
						className={cn(
							"absolute top-2 right-2",
							"text-gray-500 hover:text-gray-700",
						)}
					>
						✕
					</DialogPrimitive.Close>
				</DialogPrimitive.Content>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	);
};

Modal.displayName = "Modal";

export { Modal };
