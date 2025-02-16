/**
 * @file チャートコンポーネントのテスト
 * @description チャートコンポーネントの機能をテストします
 */
import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '.'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import type { LegendType } from 'recharts'

describe('Chartコンポーネント', () => {
  const mockData = [
    { name: '1月', value: 65 },
    { name: '2月', value: 59 },
    { name: '3月', value: 80 },
    { name: '4月', value: 81 },
    { name: '5月', value: 56 },
    { name: '6月', value: 55 },
  ]

  const pieData = [
    { name: '赤', value: 300 },
    { name: '青', value: 50 },
    { name: '黄', value: 100 },
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

  it('ラインチャートが正しくレンダリングされること', async () => {
    const { container } = render(
      <div style={containerStyle}>
        <ChartContainer config={mockConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
              <ChartTooltip />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    )
    
    const chart = container.querySelector('[data-chart]')
    expect(chart).toBeInTheDocument()
    
    // レスポンシブコンテナの存在を確認
    const responsiveContainer = container.querySelector('.recharts-responsive-container')
    expect(responsiveContainer).toBeInTheDocument()
  })

  it('バーチャートが正しくレンダリングされること', async () => {
    const { container } = render(
      <div style={containerStyle}>
        <ChartContainer config={mockConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="value" fill="#8884d8" />
              <ChartTooltip />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    )
    
    const chart = container.querySelector('[data-chart]')
    expect(chart).toBeInTheDocument()
    
    // レスポンシブコンテナの存在を確認
    const responsiveContainer = container.querySelector('.recharts-responsive-container')
    expect(responsiveContainer).toBeInTheDocument()
  })

  it('パイチャートが正しくレンダリングされること', async () => {
    const { container } = render(
      <div style={containerStyle}>
        <ChartContainer config={mockConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                fill="#8884d8"
              />
              <ChartTooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    )
    
    const chart = container.querySelector('[data-chart]')
    expect(chart).toBeInTheDocument()
    
    // レスポンシブコンテナの存在を確認
    const responsiveContainer = container.querySelector('.recharts-responsive-container')
    expect(responsiveContainer).toBeInTheDocument()
  })

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

  describe('ChartTooltip', () => {
    const mockTooltipPayload = [
      {
        name: 'value',
        value: 100,
        dataKey: 'value',
        color: '#ff0000',
        payload: { name: '1月', value: 100 },
      },
    ]

    it('ツールチップが正しくレンダリングされること', () => {
      render(
        <ChartContainer config={mockConfig}>
          <ChartTooltipContent
            active={true}
            payload={mockTooltipPayload}
            label="1月"
          />
        </ChartContainer>
      )

      expect(screen.getByText('データセット1')).toBeInTheDocument()
      expect(screen.getByText('100')).toBeInTheDocument()
    })

    it('カスタムフォーマッターが正しく機能すること', () => {
      const formatter = (value: number) => `¥${value.toLocaleString()}`
      
      render(
        <ChartContainer config={mockConfig}>
          <ChartTooltipContent
            active={true}
            payload={mockTooltipPayload}
            label="1月"
            formatter={(value) => formatter(value as number)}
          />
        </ChartContainer>
      )

      expect(screen.getByText('¥100')).toBeInTheDocument()
    })

    it('非アクティブな場合は何も表示されないこと', () => {
      render(
        <ChartContainer config={mockConfig}>
          <ChartTooltipContent
            active={false}
            payload={mockTooltipPayload}
            label="1月"
          />
        </ChartContainer>
      )

      // ツールチップの内容が表示されていないことを確認
      expect(screen.queryByText('データセット1')).not.toBeInTheDocument()
      expect(screen.queryByText('100')).not.toBeInTheDocument()
    })
  })

  describe('ChartLegend', () => {
    const mockLegendPayload = [
      {
        value: 'データセット1',
        type: 'line' as LegendType,
        color: '#ff0000',
        dataKey: 'value',
      },
    ]

    it('凡例が正しくレンダリングされること', () => {
      render(
        <ChartContainer config={mockConfig}>
          <ChartLegendContent payload={mockLegendPayload} />
        </ChartContainer>
      )

      expect(screen.getByText('データセット1')).toBeInTheDocument()
    })

    it('アイコンを非表示にできること', () => {
      render(
        <ChartContainer config={mockConfig}>
          <ChartLegendContent payload={mockLegendPayload} hideIcon={true} />
        </ChartContainer>
      )

      const legendItem = screen.getByText('データセット1').parentElement
      expect(legendItem?.querySelector('svg')).not.toBeInTheDocument()
    })

    it('垂直位置が正しく適用されること', () => {
      render(
        <ChartContainer config={mockConfig}>
          <ChartLegendContent payload={mockLegendPayload} verticalAlign="top" />
        </ChartContainer>
      )

      // legendItemの親要素のdivを検索し、そのクラスを確認
      const legendItem = screen.getByText('データセット1')
      const legendContainer = legendItem.closest('.flex.items-center.justify-center')
      expect(legendContainer).toHaveClass('pb-3')
    })
  })
}) 