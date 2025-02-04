/**
 * @file カスタムマッチャーの型定義
 * @description アクセシビリティテストのためのカスタムマッチャーの型定義
 */

declare module "vitest" {
	interface Assertion {
		/**
		 * axe-coreの違反がないことを確認する
		 */
		toHaveNoViolations(): void;

		/**
		 * コントラスト比が基準を満たしているか確認する
		 */
		toMeetContrastRatio(): void;

		/**
		 * タッチターゲットが適切なサイズを持っているか確認する
		 */
		toHaveAdequateTouchTarget(): void;

		/**
		 * フォーカスインジケータが視覚的に明確か確認する
		 */
		toHaveVisibleFocusIndicator(): void;
	}
}

export {}; 