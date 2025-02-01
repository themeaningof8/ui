/**
 * @file Vitestのセットアップファイル
 * @description テスト環境のグローバル設定を行います
 */
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// JSDOMにないPointer APIのメソッドをモック実装
beforeAll(() => {
	// ElementにhasPointerCaptureメソッドを追加
	if (!Element.prototype.hasPointerCapture) {
		Element.prototype.hasPointerCapture = (pointerId: number): boolean => false;
	}

	// ElementにsetPointerCaptureメソッドを追加
	if (!Element.prototype.setPointerCapture) {
		Element.prototype.setPointerCapture = (pointerId: number): void => {
			// 空の実装
		};
	}

	// ElementにreleasePointerCaptureメソッドを追加
	if (!Element.prototype.releasePointerCapture) {
		Element.prototype.releasePointerCapture = (pointerId: number): void => {
			// 空の実装
		};
	}
});

// 各テスト後にクリーンアップを実行
afterEach(() => {
	cleanup();
});
