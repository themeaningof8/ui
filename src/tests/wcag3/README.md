# WCAG 3.0テストヘルパー使用ガイドライン

## テストヘルパーの種類

1. `testBasicAccessibility`
   - 基本的なアクセシビリティテスト
   - 全てのコンポーネントに必須
   - ARIAロールとdisabled状態のテスト

2. `testWCAG3Compliance`
   - WCAG 3.0メトリクスのコンプライアンステスト
   - 視覚的な要素を持つコンポーネントに必要
   - コントラスト比、フォーカスインジケータ、サイズのテスト

3. `testKeyboardInteraction`
   - キーボード操作のテスト
   - インタラクティブなコンポーネントに必要
   - キーボードナビゲーションとフォーカス管理のテスト

## コンポーネントタイプ別の必要なテスト

### 1. コンテナ系コンポーネント
- 例：Card, Alert, Dialog
- 必要なテスト：
  - `testBasicAccessibility`
  - `testWCAG3Compliance`（視覚的な要素がある場合）

### 2. インタラクティブコンポーネント
- 例：Button, Checkbox, Select, Accordion
- 必要なテスト：
  - `testBasicAccessibility`
  - `testWCAG3Compliance`
  - `testKeyboardInteraction`

### 3. ナビゲーション系コンポーネント
- 例：Breadcrumb, Navigation Menu, Tabs
- 必要なテスト：
  - `testBasicAccessibility`
  - `testWCAG3Compliance`
  - `testKeyboardInteraction`（方向キーの操作を含む）

### 4. フォーム系コンポーネント
- 例：Input, Textarea, Radio Group
- 必要なテスト：
  - `testBasicAccessibility`
  - `testWCAG3Compliance`（エラー状態のコントラストを含む）
  - `testKeyboardInteraction`

### 5. 装飾系コンポーネント
- 例：Badge, Separator, Skeleton
- 必要なテスト：
  - `testBasicAccessibility`
  - `testWCAG3Compliance`（コントラスト比のみ）

## テスト実装のガイドライン

1. 基本ルール
   - 全てのコンポーネントは最低限`testBasicAccessibility`を実装
   - インタラクティブな要素は必ず`testKeyboardInteraction`を実装
   - 視覚的な要素は`testWCAG3Compliance`を実装

2. テストの優先順位
   1. `testBasicAccessibility`
   2. `testKeyboardInteraction`（インタラクティブな場合）
   3. `testWCAG3Compliance`

3. テストケースの追加
   - コンポーネント固有の機能に応じて追加のテストケースを実装
   - エラー状態、無効状態、読み込み状態など、特殊な状態のテスト

4. アクセシビリティの検証ポイント
   - 適切なARIAロールとプロパティ
   - キーボード操作のサポート
   - フォーカス管理
   - コントラスト比
   - テキストの可読性 