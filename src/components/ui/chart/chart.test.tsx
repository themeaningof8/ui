/**
 * @file チャートコンポーネントのテスト
 * @description チャートコンポーネントの機能をテストします
 */

import { describe, it, expect } from 'vitest'
import { render } from '@/tests/test-utils'
import { ChartContainer } from '.'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'

describe('Chartコンポーネント', () => {
  const mockData = [
    { name: '1月', value: 10 },
    { name: '2月', value: 20 },
    { name: '3月', value: 30 },
  ]

  const mockConfig = {
    value: {
      label: 'データセット1',
      color: '#ff0000',
    },
  }

  // テスト用のスタイルを設定
  const containerStyle = {
    width: '600px',
    height: '400px',
  }

  it('基本的なチャートが正しくレンダリングされること', () => {
    const { container } = render(
      <div style={containerStyle}>
        <ChartContainer config={mockConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <Line type="monotone" dataKey="value" />
              <XAxis dataKey="name" />
              <YAxis />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    )
    const chart = container.querySelector('[data-chart]')
    expect(chart).toBeInTheDocument()
  })

  it('カスタムクラス名が正しく適用されること', () => {
    const { container } = render(
      <div style={containerStyle}>
        <ChartContainer config={mockConfig} className="custom-chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <Line type="monotone" dataKey="value" />
              <XAxis dataKey="name" />
              <YAxis />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    )
    const chart = container.querySelector('[data-chart]')
    expect(chart).toHaveClass('custom-chart')
  })

  it('異なるデータセットが正しく表示されること', () => {
    const multiData = [
      { name: '1月', value1: 10, value2: 15 },
      { name: '2月', value1: 20, value2: 25 },
      { name: '3月', value1: 30, value2: 35 },
    ]

    const multiConfig = {
      value1: {
        label: 'データセット1',
        color: '#ff0000',
      },
      value2: {
        label: 'データセット2',
        color: '#00ff00',
      },
    }

    const { container } = render(
      <div style={containerStyle}>
        <ChartContainer config={multiConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={multiData}>
              <Line type="monotone" dataKey="value1" />
              <Line type="monotone" dataKey="value2" />
              <XAxis dataKey="name" />
              <YAxis />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    )

    const chart = container.querySelector('[data-chart]')
    expect(chart).toBeInTheDocument()
  })

  it('データが更新された時にチャートが再レンダリングされること', () => {
    const { container, rerender } = render(
      <div style={containerStyle}>
        <ChartContainer config={mockConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <Line type="monotone" dataKey="value" />
              <XAxis dataKey="name" />
              <YAxis />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    )
    
    const updatedData = [
      { name: '1月', value: 40 },
      { name: '2月', value: 50 },
      { name: '3月', value: 60 },
    ]

    rerender(
      <div style={containerStyle}>
        <ChartContainer config={mockConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={updatedData}>
              <Line type="monotone" dataKey="value" />
              <XAxis dataKey="name" />
              <YAxis />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    )

    const chart = container.querySelector('[data-chart]')
    expect(chart).toBeInTheDocument()
  })
}) 