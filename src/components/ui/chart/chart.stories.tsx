/**
 * @file チャートコンポーネントのストーリー
 * @description チャートコンポーネントの使用例を表示します
 */

import type { Meta, StoryObj } from '@storybook/react'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
} from '.'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const meta = {
  title: 'UI/Chart',
  component: ChartContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChartContainer>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 折れ線グラフの使用例
 */
export const LineChartExample: Story = {
  args: {
    config: {
      value: {
        label: '売上高',
        color: '#8884d8',
      },
    },
  },
  render: (args) => {
    const data = [
      { name: '1月', value: 65 },
      { name: '2月', value: 59 },
      { name: '3月', value: 80 },
      { name: '4月', value: 81 },
      { name: '5月', value: 56 },
      { name: '6月', value: 55 },
    ]

    return (
      <div style={{ width: '600px', height: '400px' }}>
        <ChartContainer {...args}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend content={<ChartLegendContent />} />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    )
  },
}

/**
 * 棒グラフの使用例
 */
export const BarChartExample: Story = {
  args: {
    config: {
      value: {
        label: '来客数',
        color: '#82ca9d',
      },
    },
  },
  render: (args) => {
    const data = [
      { name: '月曜', value: 12 },
      { name: '火曜', value: 19 },
      { name: '水曜', value: 3 },
      { name: '木曜', value: 5 },
      { name: '金曜', value: 2 },
    ]

    return (
      <div style={{ width: '600px', height: '400px' }}>
        <ChartContainer {...args}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend content={<ChartLegendContent />} />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    )
  },
}

/**
 * 円グラフの使用例
 */
export const PieChartExample: Story = {
  args: {
    config: {
      value: {
        label: '色の割合',
        theme: {
          light: '#8884d8',
          dark: '#82ca9d',
        },
      },
    },
  },
  render: (args) => {
    const data = [
      { name: '赤', value: 300 },
      { name: '青', value: 50 },
      { name: '黄', value: 100 },
    ]

    return (
      <div style={{ width: '600px', height: '400px' }}>
        <ChartContainer {...args}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend content={<ChartLegendContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    )
  },
}

/**
 * レーダーチャートの使用例
 */
export const RadarChartExample: Story = {
  args: {
    config: {
      A: {
        label: 'プレイヤーA',
        color: '#8884d8',
      },
      B: {
        label: 'プレイヤーB',
        color: '#82ca9d',
      },
    },
  },
  render: (args) => {
    const data = [
      { subject: '攻撃', A: 120, B: 110, fullMark: 150 },
      { subject: '防御', A: 98, B: 130, fullMark: 150 },
      { subject: '速度', A: 86, B: 130, fullMark: 150 },
      { subject: '体力', A: 99, B: 100, fullMark: 150 },
      { subject: '技術', A: 85, B: 90, fullMark: 150 },
      { subject: '戦略', A: 65, B: 85, fullMark: 150 },
    ]

    return (
      <div style={{ width: '600px', height: '400px' }}>
        <ChartContainer {...args}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar
                name="プレイヤーA"
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Radar
                name="プレイヤーB"
                dataKey="B"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.6}
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend content={<ChartLegendContent />} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    )
  },
}

/**
 * 複数データセットの使用例
 */
export const MultipleDatasets: Story = {
  args: {
    config: {
      今年: {
        label: '今年の売上',
        color: '#8884d8',
      },
      昨年: {
        label: '昨年の売上',
        color: '#82ca9d',
      },
    },
  },
  render: (args) => {
    const data = [
      { name: '1月', 今年: 65, 昨年: 28 },
      { name: '2月', 今年: 59, 昨年: 48 },
      { name: '3月', 今年: 80, 昨年: 40 },
      { name: '4月', 今年: 81, 昨年: 19 },
      { name: '5月', 今年: 56, 昨年: 86 },
      { name: '6月', 今年: 55, 昨年: 27 },
    ]

    return (
      <div style={{ width: '600px', height: '400px' }}>
        <ChartContainer {...args}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend content={<ChartLegendContent />} />
              <Line type="monotone" dataKey="今年" stroke="#8884d8" />
              <Line type="monotone" dataKey="昨年" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    )
  },
} 