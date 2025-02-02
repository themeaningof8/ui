# 要件定義書（RDD: Requirements Definition Document）

## コンポーネント設計方針

・対象コンポーネント:
  - shadcn/ui にあるすべての UI コンポーネント（Toast を除く）を実装する
    例：Button, Input, Label, Form, Dialog, Card, Tabs, Accordion, Dropdown Menu, Avatar, Tooltip, Popover 等
  - **新規追加**: Modal, Spinner, Progress Bar, Breadcrumb
    - **機能要件**: shadcn/ui に準拠した実装
    - **デザイン要件**: 一貫したスタイルとアクセシビリティを考慮
    - **アクセシビリティ基準**: WCAG 3.0 AA基準に準拠

・技術スタック:
  - Bun, TypeScript, React
  - Tailwind CSS v4（Zero Config）※ color-scales.css に定義されている色を利用
  - Storybook
  - Vitest
  - **将来的な技術**: React 19, React Server Component, AIが使用しやすいマシンリーダブルな情報

・実装詳細:
  - Next.js や React Router での利用を想定して設計する
  - 各コンポーネントは、JSDoc 形式のファイルヘッダーや、日本語コメントを各ファイル、クラス、メソッド、プロパティに記述する
  - API やプロパティについては shadcn/ui の実装に準拠する（例：Button コンポーネントでは variant プロパティやサイズ指定など）
  - パスは相対パスを使わず、必ずエイリアスを使用する（例: '@/components/ui/button' など）
  - 機能実装の終わりには必ず bun run test を実行し、テストに通ることを確認する

・スタイリング:
  - Tailwind CSS v4 のみを使用し、color-scales.css にあるカラーパレットに沿って実装する
  - バリアントの実装には tailwind-variants を使用する（class-variance-authority は使用しない）
  - クラス名の結合には cn.ts を使用する（utils.ts は使用しない）
  - color-scales.css で定義されていない色は使用しない

・Storybook:
  - 各コンポーネントの使用例を Storybook 上で確認できるようにする
    - 使用例パターンとして「デフォルト表示」、「必須状態・エラー状態」、および各種インタラクション例（例：クリック、入力、ドロップダウン展開など）を用意

・テスト:
  - Vitest を使って、各コンポーネントのレンダリングやアクセシビリティ、インタラクションなど基本動作をカバーするテストを実装する
  - **テストカバレッジ**: 90%を目指す

・デザインガイドライン:
  - **参考**: [Apple Human Interface Guidelines](https://developer.apple.com/jp/design/human-interface-guidelines/) を元にしたガイドラインを作成予定
  - **重視ポイント**: 一貫性と定量的目標の設定・達成

・パフォーマンス基準:
  - **テストカバレッジ**: 90%以上
  - **APCAスコア**: 70以上
  - **重視する指標**: テストカバレッジ, WCAG, Lighthouse

・セキュリティ要件:
  - ユーザー入力のバリデーションとサニタイズを徹底する
  - XSS（クロスサイトスクリプティング）対策を講じる
  - CSRF（クロスサイトリクエストフォージェリ）対策を実施する
  - セキュリティパッチや依存関係の更新を定期的に行う
  - エラーメッセージには詳細な情報を含めず、攻撃者に有用な情報を与えないようにする
  - SQLインジェクションやリモートコード実行などの攻撃ベクトルに対する対策を講じる

・ユーザビリティの改善点:
  - 「規約やルールを元にしたAIプロンプトベースでの開発基盤構築」
  - **機能**: Playgroundの提供と、セーブポイントに戻れる機能
  - **参考**: [v0.dev](https://v0.dev/) のようなユーザー体験を考慮

・将来的なコンポーネントや機能:
  - 現状はshadcn/uiと同じコンポーネントが作れれば、エッセンシャルなものは網羅できていると考える
