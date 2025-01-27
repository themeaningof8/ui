import { StrictMode, Suspense, lazy } from 'react'
import './styles/globals.css'

// アプリケーションのメインコンポーネントを遅延ロード
const App = lazy(() => import('./App'))

// ローディング中に表示するフォールバックUI
const LoadingFallback = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <div className="text-lg">Loading...</div>
  </div>
)

// 非同期でアプリケーションを初期化
const initializeApp = async () => {
  const container = document.getElementById('root')
  if (container) {
    // ReactDOMを動的インポート
    const { createRoot } = await import('react-dom/client')
    const root = createRoot(container)

    // Appコンポーネントをレンダリング
    root.render(
      <StrictMode>
        <Suspense fallback={<LoadingFallback />}>
          <App />
        </Suspense>
      </StrictMode>
    )
  }
}

// アプリケーションの初期化を実行
// エラーハンドリングを追加
initializeApp().catch((error) => {
  console.error('Failed to initialize app:', error)
  // エラー時のフォールバックUIを表示
  const container = document.getElementById('root')
  if (container) {
    container.innerHTML = `
      <div class="flex h-screen w-screen items-center justify-center">
        <div class="text-lg text-red-500">
          Failed to load application. Please refresh the page.
        </div>
      </div>
    `
  }
}) 