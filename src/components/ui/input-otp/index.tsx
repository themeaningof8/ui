/**
 * @file OTP入力コンポーネント
 * @description OTP（ワンタイムパスワード）入力用のコンポーネントを提供します
 */

"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";

import { cn } from "@/lib/utils";

interface ExtendedOTPContext {
	slots: {
		char: string | null;
		hasFakeCaret: boolean;
		isActive: boolean;
	}[];
	disabled?: boolean;
}

const InputOTP = React.forwardRef<
	React.ComponentRef<typeof OTPInput>,
	React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, disabled, ...props }, ref) => (
	<OTPInput
		ref={ref}
		containerClassName={cn(
			"flex items-center gap-2 has-[:disabled]:opacity-50",
			containerClassName,
		)}
		className={cn("disabled:cursor-not-allowed", className)}
		disabled={disabled}
		{...props}
	/>
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
	React.ComponentRef<"div">,
	React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("flex items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
	React.ComponentRef<"input">,
	React.ComponentPropsWithoutRef<"input"> & { index: number }
>(({ index, className, disabled, ...props }, ref) => {
	const inputOTPContext = React.useContext(OTPInputContext) as ExtendedOTPContext;
	const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];
	const isDisabled = disabled || inputOTPContext.disabled;

	return (
		<div className="relative">
			<input
				ref={ref}
				type="text"
				inputMode="numeric"
				pattern="\d*"
				maxLength={1}
				data-index={index.toString()}
				placeholder="○"
				disabled={isDisabled}
				aria-label={`Digit ${index + 1}`}
				className={cn(
					"relative h-10 w-10 text-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
					isActive && "z-10 ring-2 ring-ring ring-offset-background",
					isDisabled && "cursor-not-allowed opacity-50",
					className,
				)}
				value={char ?? ""}
				readOnly
				{...props}
			/>
			{hasFakeCaret && !isDisabled && (
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					<div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
				</div>
			)}
		</div>
	);
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
	React.ComponentRef<"div">,
	React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
	<div ref={ref} {...props}>
		<Dot />
	</div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
