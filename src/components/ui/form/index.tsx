/**
 * @file フォームコンポーネント
 * @description フォームの検証と状態管理を提供するコンポーネントです
 *
 * @example
 * ```tsx
 * // 基本的な使用例
 * const form = useForm({
 *   defaultValues: { username: "" },
 *   resolver: zodResolver(schema)
 * })
 *
 * return (
 *   <Form {...form}>
 *     <form onSubmit={form.handleSubmit(onSubmit)}>
 *       <FormField
 *         control={form.control}
 *         name="username"
 *         render={({ field }) => (
 *           <FormItem>
 *             <FormLabel>ユーザー名</FormLabel>
 *             <FormControl>
 *               <Input {...field} />
 *             </FormControl>
 *             <FormDescription>
 *               公開プロフィールに表示される名前です
 *             </FormDescription>
 *             <FormMessage />
 *           </FormItem>
 *         )}
 *       />
 *       <Button type="submit">保存</Button>
 *     </form>
 *   </Form>
 * )
 *
 * // 複数のフィールドを持つフォーム
 * const form = useForm({
 *   defaultValues: {
 *     email: "",
 *     password: "",
 *     terms: false
 *   }
 * })
 *
 * return (
 *   <Form {...form}>
 *     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
 *       <FormField
 *         control={form.control}
 *         name="email"
 *         render={({ field }) => (
 *           <FormItem>
 *             <FormLabel>メールアドレス</FormLabel>
 *             <FormControl>
 *               <Input type="email" {...field} />
 *             </FormControl>
 *             <FormMessage />
 *           </FormItem>
 *         )}
 *       />
 *       <FormField
 *         control={form.control}
 *         name="password"
 *         render={({ field }) => (
 *           <FormItem>
 *             <FormLabel>パスワード</FormLabel>
 *             <FormControl>
 *               <Input type="password" {...field} />
 *             </FormControl>
 *             <FormMessage />
 *           </FormItem>
 *         )}
 *       />
 *       <FormField
 *         control={form.control}
 *         name="terms"
 *         render={({ field }) => (
 *           <FormItem className="flex items-center space-x-2">
 *             <FormControl>
 *               <Checkbox checked={field.value} onCheckedChange={field.onChange} />
 *             </FormControl>
 *             <FormLabel>利用規約に同意する</FormLabel>
 *             <FormMessage />
 *           </FormItem>
 *         )}
 *       />
 *     </form>
 *   </Form>
 * )
 */

import * as React from "react";
import type {
	ComponentPropsWithoutRef,
	HTMLAttributes,
} from "react";
import type * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
	Controller,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
	FormProvider,
	useFormContext,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

/**
 * フォームのルートコンポーネント
 */
const Form = FormProvider;

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	name: TName;
};

/**
 * フォームフィールドコンテキスト
 */
const FormFieldContext = React.createContext<FormFieldContextValue>(
	{} as FormFieldContextValue,
);

type FormItemContextValue = {
	id: string;
};

/**
 * フォームアイテムコンテキスト
 */
const FormItemContext = React.createContext<FormItemContextValue>(
	{} as FormItemContextValue,
);

/**
 * フォームフィールドコンポーネント
 * @param props - コンポーネントのプロパティ
 */
function FormField<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller data-slot="form-field" {...props} />
		</FormFieldContext.Provider>
	);
}

/**
 * フォームフィールドコンテキストを使用するためのフック
 */
function useFormField() {
	const fieldContext = React.useContext(FormFieldContext);
	const itemContext = React.useContext(FormItemContext);
	const { getFieldState, formState } = useFormContext();

	const fieldState = getFieldState(fieldContext.name, formState);

	if (!fieldContext) {
		throw new Error("useFormField should be used within <FormField>");
	}

	const { id } = itemContext;

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	};
}

/**
 * フォームアイテムコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function FormItem({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	const id = React.useId();

	return (
		<FormItemContext.Provider value={{ id }}>
			<div
				data-slot="form-item"
				className={cn("space-y-2", className)}
				{...props}
			/>
		</FormItemContext.Provider>
	);
}

/**
 * フォームラベルコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function FormLabel({
	className,
	...props
}: ComponentPropsWithoutRef<typeof LabelPrimitive.Root>) {
	const { error, formItemId } = useFormField();

	return (
		<Label
			data-slot="form-label"
			className={cn(error && "text-destructive-step-11", className)}
			htmlFor={formItemId}
			{...props}
		/>
	);
}

/**
 * フォームコントロールコンポーネント
 * @param props - コンポーネントのプロパティ
 */
function FormControl({ ...props }: ComponentPropsWithoutRef<typeof Slot>) {
	const { error, formItemId, formDescriptionId, formMessageId } =
		useFormField();

	return (
		<Slot
			data-slot="form-control"
			id={formItemId}
			aria-describedby={
				!error
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			{...props}
		/>
	);
}

/**
 * フォーム説明コンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function FormDescription({
	className,
	...props
}: HTMLAttributes<HTMLParagraphElement>) {
	const { formDescriptionId } = useFormField();

	return (
		<p
			data-slot="form-description"
			id={formDescriptionId}
			className={cn("text-sm text-step-11", className)}
			{...props}
		/>
	);
}

/**
 * フォームメッセージコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 */
function FormMessage({
	className,
	children,
	...props
}: HTMLAttributes<HTMLParagraphElement>) {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message) : children;

	if (!body) {
		return null;
	}

	return (
		<p
			data-slot="form-message"
			id={formMessageId}
			className={cn("text-sm font-medium text-destructive-step-11", className)}
			{...props}
		>
			{body}
		</p>
	);
}

// displayName の設定
FormField.displayName = "FormField";
FormItem.displayName = "FormItem";
FormLabel.displayName = "FormLabel";
FormControl.displayName = "FormControl";
FormDescription.displayName = "FormDescription";
FormMessage.displayName = "FormMessage";

export {
	useFormField,
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
};
