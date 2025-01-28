/**
 * UIライブラリのエントリーポイントのテスト
 * @description エクスポートされたすべてのコンポーネントとユーティリティが正しく利用可能であることを確認
 */

import {
  // コンポーネント
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Toast,
  ToastProvider,
  ToastViewport,
  // ユーティリティ
  cn,
  // その他
  version
} from '@/index'

describe('UIライブラリのエントリーポイント', () => {
  describe('コンポーネントのエクスポート', () => {
    it('Accordionコンポーネントが正しくエクスポートされている', () => {
      expect(Accordion).toBeDefined()
      expect(AccordionItem).toBeDefined()
      expect(AccordionTrigger).toBeDefined()
      expect(AccordionContent).toBeDefined()
    })

    it('Buttonコンポーネントが正しくエクスポートされている', () => {
      expect(Button).toBeDefined()
    })

    it('Dialogコンポーネントが正しくエクスポートされている', () => {
      expect(Dialog).toBeDefined()
      expect(DialogTrigger).toBeDefined()
      expect(DialogContent).toBeDefined()
      expect(DialogHeader).toBeDefined()
      expect(DialogFooter).toBeDefined()
      expect(DialogTitle).toBeDefined()
      expect(DialogDescription).toBeDefined()
    })

    it('Tabsコンポーネントが正しくエクスポートされている', () => {
      expect(Tabs).toBeDefined()
      expect(TabsList).toBeDefined()
      expect(TabsTrigger).toBeDefined()
      expect(TabsContent).toBeDefined()
    })

    it('Toastコンポーネントが正しくエクスポートされている', () => {
      expect(Toast).toBeDefined()
      expect(ToastProvider).toBeDefined()
      expect(ToastViewport).toBeDefined()
    })
  })

  describe('ユーティリティのエクスポート', () => {
    it('cn関数が正しくエクスポートされている', () => {
      expect(cn).toBeDefined()
      expect(typeof cn).toBe('function')
    })

    it('cn関数が正しく動作する', () => {
      expect(cn('base', 'additional')).toBe('base additional')
      expect(cn('base', { conditional: true })).toBe('base conditional')
      expect(cn('base', { conditional: false })).toBe('base')
    })
  })

  describe('バージョン情報', () => {
    it('バージョン情報が正しくエクスポートされている', () => {
      expect(version).toBeDefined()
      expect(typeof version).toBe('string')
      expect(version).toMatch(/^\d+\.\d+\.\d+$/)
    })
  })
}) 