"use client";

/**
 * @file OTP入力コンポーネント
 * @description ワンタイムパスワード（OTP）入力用のコンポーネントです
 *
 * @example
 * ```tsx
 * <InputOTP maxLength={6}>
 *   <InputOTPGroup>
 *     <InputOTPSlot index={0} />
 *     <InputOTPSeparator />
 *     <InputOTPSlot index={1} />
 *   </InputOTPGroup>
 * </InputOTP>
 * ```
 */

import { type ComponentPropsWithoutRef, useContext } from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * OTP入力のルートコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.containerClassName - コンテナ要素の追加のCSSクラス名
 * @param props.children - 入力フィールドの内容
 */
function InputOTP({
	className,
	containerClassName,
	...props
}: ComponentPropsWithoutRef<typeof OTPInput>) {
	return (
		<OTPInput
			data-slot="input-otp"
			containerClassName={cn(
				"flex items-center gap-2 has-[:disabled]:opacity-50",
				containerClassName,
			)}
			className={cn("disabled:cursor-not-allowed", className)}
			{...props}
		/>
	);
}

/**
 * OTP入力フィールドのグループコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.children - グループの内容
 */
function InputOTPGroup({
	className,
	...props
}: ComponentPropsWithoutRef<"div">) {
	return (
		<div
			data-slot="input-otp-group"
			className={cn("flex items-center", className)}
			{...props}
		/>
	);
}

/**
 * OTP入力の各スロットコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.index - スロットのインデックス
 * @param props.className - 追加のCSSクラス名
 */
function InputOTPSlot({
	index,
	className,
	...props
}: ComponentPropsWithoutRef<"div"> & { index: number }) {
	const inputOTPContext = useContext(OTPInputContext);
	const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

	return (
		<div
			data-slot="input-otp-slot"
			className={cn(
				"relative flex size-9 items-center justify-center border-y border-r border-step-7 text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
				isActive && "z-10 ring-1 ring-step-6 border-step-8",
				className,
			)}
			{...props}
		>
			{char}
			{hasFakeCaret && (
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					<div className="h-4 w-px animate-caret-blink bg-step-11 duration-1000" />
				</div>
			)}
		</div>
	);
}

/**
 * OTP入力スロット間のセパレータコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function InputOTPSeparator({
	className,
	...props
}: ComponentPropsWithoutRef<"div">) {
	return (
		<div
			data-slot="input-otp-separator"
			className={cn(
				"flex items-center justify-center px-2 opacity-50",
				className,
			)}
			{...props}
		>
			<Minus className="size-4" />
		</div>
	);
}

// displayName の設定
InputOTP.displayName = "InputOTP";
InputOTPGroup.displayName = "InputOTPGroup";
InputOTPSlot.displayName = "InputOTPSlot";
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
