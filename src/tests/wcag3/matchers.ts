/**
 * @file カスタムマッチャーの型定義
 * @description アクセシビリティテストのためのカスタムマッチャーの型定義
 */

declare global {
  namespace Vi {
    interface Assertion {
      toHaveNoViolations(): void;
      toMeetContrastRatio(): void;
      toHaveAdequateTouchTarget(): void;
      toHaveVisibleFocusIndicator(): void;
    }
  }
}

export {}; 