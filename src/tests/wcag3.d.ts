/**
 * @file WCAG 3.0テストユーティリティの型定義
 * @description WCAG 3.0メトリクス計測用の型定義を提供します
 */

import type { RenderResult } from '@testing-library/react'

/**
 * WCAG 3.0メトリクスの検証結果の型定義
 */
export interface WCAG3Metrics {
  apca: { element: Element; contrast: number }[]
  interactiveElements: Element[]
  focusableElements: Element[]
}

/**
 * WCAG 3.0メトリクスチェック関数の型定義
 */
export type CheckWCAG3Metrics = (renderResult: RenderResult) => WCAG3Metrics

/**
 * WCAG 3.0メトリクスレポート関数の型定義
 */
export type ReportWCAG3Results = (results: WCAG3Metrics) => void

/**
 * Vitestのテストコンテキストの拡張
 */
declare global {
  namespace Vi {
    interface TestContext {
      checkWCAG3: CheckWCAG3Metrics
      reportWCAG3: ReportWCAG3Results
    }
  }
} 