/**
 * UIライブラリのエントリーポイント
 * @description すべてのUIコンポーネントとユーティリティをエクスポートする
 */

// コンポーネントのエクスポート
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@components/ui/accordion/accordion'
export { Button } from '@components/ui/button/button'
export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@components/ui/dialog/dialog'
export { Tabs, TabsList, TabsTrigger, TabsContent } from '@components/ui/tabs/tabs'
export { Toast, ToastProvider, ToastViewport } from '@components/ui/toast/toast'

// ユーティリティのエクスポート
export { cn } from '@lib/cn'

// バージョン情報
export const version = '0.1.0' 