/**
 * @file チャートコンポーネントのテスト
 * @description チャートコンポーネントの機能をテストします
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import { Chart } from '.'

describe('Chartコンポーネント', () => {
  const mockData = {
    labels: ['1月', '2月', '3月'],
    datasets: [
      {
        label: 'データセット1',
        data: [10, 20, 30],
      },
    ],
  }

  it('基本的なチャートが正しくレンダリングされること', () => {
    render(<Chart type="line" data={mockData} />)
    expect(screen.getByTestId('chart')).toBeInTheDocument()
  })

  it('カスタムクラス名が正しく適用されること', () => {
    render(
      <Chart
        type="line"
        data={mockData}
        className="custom-chart"
      />
    )
    expect(screen.getByTestId('chart')).toHaveClass('custom-chart')
  })

  it('異なるタイプのチャートがレンダリングできること', () => {
    const { rerender } = render(<Chart type="line" data={mockData} />)
    expect(screen.getByTestId('chart')).toHaveAttribute('data-chart-type', 'line')

    rerender(<Chart type="bar" data={mockData} />)
    expect(screen.getByTestId('chart')).toHaveAttribute('data-chart-type', 'bar')

    rerender(<Chart type="pie" data={mockData} />)
    expect(screen.getByTestId('chart')).toHaveAttribute('data-chart-type', 'pie')
  })

  it('オプションが正しく適用されること', () => {
    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'テストチャート',
        },
      },
    }

    render(
      <Chart
        type="line"
        data={mockData}
        options={options}
      />
    )

    expect(screen.getByTestId('chart')).toHaveAttribute('data-has-options', 'true')
  })

  it('データが更新された時にチャートが再レンダリングされること', () => {
    const { rerender } = render(<Chart type="line" data={mockData} />)
    
    const updatedData = {
      ...mockData,
      datasets: [
        {
          label: 'データセット1',
          data: [40, 50, 60],
        },
      ],
    }

    rerender(<Chart type="line" data={updatedData} />)
    expect(screen.getByTestId('chart')).toBeInTheDocument()
  })
}) 