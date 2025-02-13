/**
 * @file チャートコンポーネントのストーリー
 * @description チャートコンポーネントの使用例を表示します
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Chart } from '.'

const meta = {
  title: 'UI/Chart',
  component: Chart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Chart>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 折れ線グラフの使用例
 */
export const LineChart: Story = {
  args: {
    type: 'line',
    data: {
      labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
      datasets: [
        {
          label: '売上高',
          data: [65, 59, 80, 81, 56, 55],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: '月次売上推移',
        },
      },
    },
  },
}

/**
 * 棒グラフの使用例
 */
export const BarChart: Story = {
  args: {
    type: 'bar',
    data: {
      labels: ['月曜', '火曜', '水曜', '木曜', '金曜'],
      datasets: [
        {
          label: '来客数',
          data: [12, 19, 3, 5, 2],
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: '曜日別来客数',
        },
      },
    },
  },
}

/**
 * 円グラフの使用例
 */
export const PieChart: Story = {
  args: {
    type: 'pie',
    data: {
      labels: ['赤', '青', '黄'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: '色の割合',
        },
      },
    },
  },
}

/**
 * レーダーチャートの使用例
 */
export const RadarChart: Story = {
  args: {
    type: 'radar',
    data: {
      labels: ['攻撃', '防御', '速度', '体力', '技術', '戦略'],
      datasets: [
        {
          label: 'プレイヤー1',
          data: [65, 59, 90, 81, 56, 55],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)',
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'ステータス分布',
        },
      },
    },
  },
}

/**
 * 複数データセットの使用例
 */
export const MultipleDatasets: Story = {
  args: {
    type: 'line',
    data: {
      labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
      datasets: [
        {
          label: '今年',
          data: [65, 59, 80, 81, 56, 55],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
        {
          label: '昨年',
          data: [28, 48, 40, 19, 86, 27],
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: '年間比較',
        },
      },
    },
  },
} 