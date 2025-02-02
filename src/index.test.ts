/**
 * @file UIライブラリのエントリーポイントのテスト
 * @description エクスポートされているコンポーネントとユーティリティのテスト
 */

import { describe, expect, it } from 'vitest'
import * as UI from '.'

describe('UIライブラリエントリーポイントのテスト', () => {
  it('Accordion関連コンポーネントがエクスポートされているか', () => {
    expect(UI.Accordion).toBeDefined()
    expect(UI.AccordionItem).toBeDefined()
    expect(UI.AccordionTrigger).toBeDefined()
    expect(UI.AccordionContent).toBeDefined()
  })

  it('Buttonコンポーネントがエクスポートされているか', () => {
    expect(UI.Button).toBeDefined()
  })

  it('Dialog関連コンポーネントがエクスポートされているか', () => {
    expect(UI.Dialog).toBeDefined()
    expect(UI.DialogTrigger).toBeDefined()
    expect(UI.DialogContent).toBeDefined()
    expect(UI.DialogHeader).toBeDefined()
    expect(UI.DialogFooter).toBeDefined()
    expect(UI.DialogTitle).toBeDefined()
    expect(UI.DialogDescription).toBeDefined()
  })

  it('Inputコンポーネントがエクスポートされているか', () => {
    expect(UI.Input).toBeDefined()
  })

  it('Tabs関連コンポーネントがエクスポートされているか', () => {
    expect(UI.Tabs).toBeDefined()
    expect(UI.TabsList).toBeDefined()
    expect(UI.TabsTrigger).toBeDefined()
    expect(UI.TabsContent).toBeDefined()
  })

  it('Toasterコンポーネントがエクスポートされているか', () => {
    expect(UI.Toaster).toBeDefined()
  })

  it('NavigationMenu関連コンポーネントがエクスポートされているか', () => {
    expect(UI.NavigationMenu).toBeDefined()
    expect(UI.NavigationMenuList).toBeDefined()
    expect(UI.NavigationMenuItem).toBeDefined()
    expect(UI.NavigationMenuContent).toBeDefined()
    expect(UI.NavigationMenuTrigger).toBeDefined()
    expect(UI.NavigationMenuLink).toBeDefined()
    expect(UI.navigationMenuTriggerStyle).toBeDefined()
  })

  it('RadioGroup関連コンポーネントがエクスポートされているか', () => {
    expect(UI.RadioGroup).toBeDefined()
    expect(UI.RadioGroupItem).toBeDefined()
    expect(UI.RadioGroupItemText).toBeDefined()
  })

  it('Progressコンポーネントがエクスポートされているか', () => {
    expect(UI.Progress).toBeDefined()
  })

  it('Sliderコンポーネントがエクスポートされているか', () => {
    expect(UI.Slider).toBeDefined()
  })

  it('cnユーティリティがエクスポートされているか', () => {
    expect(UI.cn).toBeDefined()
  })

  it('バージョン情報がエクスポートされているか', () => {
    expect(UI.version).toBeDefined()
  })

  it('全てのUIコンポーネントおよびユーティリティが index.ts で網羅的にエクスポートされているか', () => {
    const expectedExportKeys = [
      'Accordion',
      'AccordionContent',
      'AccordionItem',
      'AccordionTrigger',
      'Button',
      'Dialog',
      'DialogContent',
      'DialogDescription',
      'DialogFooter',
      'DialogHeader',
      'DialogTitle',
      'DialogTrigger',
      'Input',
      'NavigationMenu',
      'NavigationMenuList',
      'NavigationMenuItem',
      'NavigationMenuContent',
      'NavigationMenuTrigger',
      'NavigationMenuLink',
      'navigationMenuTriggerStyle',
      'Progress',
      'RadioGroup',
      'RadioGroupItem',
      'RadioGroupItemText',
      'Slider',
      'Tabs',
      'TabsContent',
      'TabsList',
      'TabsTrigger',
      'Toaster',
      'cn',
      'version',
    ]

    // 実際に index.ts でエクスポートされているキーを取得し、ソートして比較
    const actualExportKeys = Object.keys(UI).sort()
    expect(actualExportKeys).toEqual(expectedExportKeys.sort())
  })
}) 