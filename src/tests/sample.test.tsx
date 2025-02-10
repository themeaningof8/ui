/**
 * @file サンプルテスト
 * @description テスト環境が正しく設定されているか確認するためのサンプルテスト
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from './test-utils'

describe('テスト環境の確認', () => {
  it('コンポーネントのレンダリングができること', () => {
    render(<div>テスト環境は正常です</div>)
    expect(screen.getByText('テスト環境は正常です')).toBeInTheDocument()
  })

  it('非同期処理が動作すること', async () => {
    const promise = Promise.resolve('非同期処理は正常です')
    const result = await promise
    expect(result).toBe('非同期処理は正常です')
  })

  it('DOMイベントが処理できること', () => {
    let clicked = false
    render(
      <button
        type="button"
        onClick={() => {
          clicked = true
        }}
      >
        クリックしてください
      </button>
    )
    
    const button = screen.getByText('クリックしてください')
    button.click()
    expect(clicked).toBe(true)
  })

  it('スタイルの検証ができること', () => {
    render(
      <div style={{ color: 'red', padding: '10px' }}>
        スタイルテスト
      </div>
    )
    
    const element = screen.getByText('スタイルテスト')
    expect(element).toHaveStyle({
      color: 'red',
      padding: '10px'
    })
  })
}) 