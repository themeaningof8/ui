/**
 * JSDoc
 * このファイルは、UIライブラリのエントリーポイントである index.ts のテストを行います。
 * 主な仕様:
 * - index.ts から、src/components/ui/ に存在する全ての主要な UI コンポーネントおよびユーティリティが正しくエクスポートされているかを検証します。
 * - 各コンポーネントのエクスポートの存在確認と、全てのエクスポートが網羅的に含まれているかをチェックします。
 *
 * 制限事項:
 * - 個々のコンポーネントの動作確認は行わず、エクスポートの有無を検証するテストのみです。
 *
 * @module IndexTest
 */

import { describe, it, expect } from 'vitest';
import * as UI from './index';

describe('UIライブラリエントリーポイントのテスト', () => {
  it('Accordion関連コンポーネントがエクスポートされているか', () => {
    expect(UI.Accordion).toBeDefined();
    expect(UI.AccordionItem).toBeDefined();
    expect(UI.AccordionTrigger).toBeDefined();
    expect(UI.AccordionContent).toBeDefined();
  });

  it('Buttonコンポーネントがエクスポートされているか', () => {
    expect(UI.Button).toBeDefined();
  });

  it('Dialog関連コンポーネントがエクスポートされているか', () => {
    expect(UI.Dialog).toBeDefined();
    expect(UI.DialogTrigger).toBeDefined();
    expect(UI.DialogContent).toBeDefined();
    expect(UI.DialogHeader).toBeDefined();
    expect(UI.DialogFooter).toBeDefined();
    expect(UI.DialogTitle).toBeDefined();
    expect(UI.DialogDescription).toBeDefined();
  });

  it('Inputコンポーネントがエクスポートされているか', () => {
    expect(UI.Input).toBeDefined();
  });

  it('Tabs関連コンポーネントがエクスポートされているか', () => {
    expect(UI.Tabs).toBeDefined();
    expect(UI.TabsList).toBeDefined();
    expect(UI.TabsTrigger).toBeDefined();
    expect(UI.TabsContent).toBeDefined();
  });

  it('Toasterコンポーネントがエクスポートされているか', () => {
    expect(UI.Toaster).toBeDefined();
  });

  it('cnユーティリティがエクスポートされているか', () => {
    expect(UI.cn).toBeDefined();
  });

  it('バージョン情報がエクスポートされているか', () => {
    expect(UI.version).toBeDefined();
    expect(typeof UI.version).toBe('string');
    // バージョン情報の形式が x.y.z であることを確認
    expect(UI.version).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it('全てのUIコンポーネントおよびユーティリティが index.ts で網羅的にエクスポートされているか', () => {
    /**
     * ここでは、現在 index.ts からエクスポートされるべき全てのシンボル名を定義します。
     * 新たなコンポーネントを追加した場合は、こちらの expectedExportKeys に追記してください。
     */
    const expectedExportKeys = [
      'Accordion',
      'AccordionItem',
      'AccordionTrigger',
      'AccordionContent',
      'Button',
      'Dialog',
      'DialogTrigger',
      'DialogContent',
      'DialogHeader',
      'DialogFooter',
      'DialogTitle',
      'DialogDescription',
      'Input',
      'Tabs',
      'TabsList',
      'TabsTrigger',
      'TabsContent',
      'Toaster',
      'cn',
      'version'
    ];

    // 実際に index.ts でエクスポートされているキーを取得し、ソートして比較
    const actualExportKeys = Object.keys(UI).sort();
    expect(actualExportKeys).toEqual(expectedExportKeys.sort());
  });
}); 