/**
 * @file Chartのストーリー
 * @description Chartの使用例とバリエーションを表示
 */
import type { Meta } from '@storybook/react'
import type { ReactElement } from 'react'
import { ChartContainer } from '@/components/ui/chart'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta = {
  title: 'UI/Chart',
  component: ChartContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChartContainer>

export default meta
type Story = {
  render: () => ReactElement
  play?: ({ canvasElement }: { canvasElement: HTMLElement }) => Promise<void>
}

// サンプルデータ
const lineData = [
  { month: '1月', value: 100 },
  { month: '2月', value: 300 },
  { month: '3月', value: 200 },
  { month: '4月', value: 500 },
  { month: '5月', value: 400 },
  { month: '6月', value: 600 },
]

const barData = [
  { category: 'A', value: 400 },
  { category: 'B', value: 300 },
  { category: 'C', value: 500 },
  { category: 'D', value: 200 },
]

const pieData = [
  { name: '製品A', value: 400 },
  { name: '製品B', value: 300 },
  { name: '製品C', value: 200 },
]

/**
 * @description 基本的な折れ線グラフ
 */
export const LineChartExample: Story = {
  render: () => (
    <ChartContainer
      className="w-full max-w-lg"
      config={{
        line: {
          color: '#2563eb',
        },
      }}
    >
      <LineChart data={lineData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          name="line"
          strokeWidth={2}
          dot={{ strokeWidth: 2 }}
        />
      </LineChart>
    </ChartContainer>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const chart = canvas.getByRole('region')
    
    expect(chart).toBeInTheDocument()
    expect(chart).toHaveClass('aspect-video')
  },
}

/**
 * @description エリアチャート
 */
export const AreaChartExample: Story = {
  render: () => (
    <ChartContainer
      className="w-full max-w-lg"
      config={{
        area: {
          theme: {
            light: '#3b82f6',
            dark: '#60a5fa',
          },
        },
      }}
    >
      <AreaChart data={lineData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="value"
          name="area"
          strokeWidth={2}
          fill="var(--color-area)"
          stroke="var(--color-area)"
        />
      </AreaChart>
    </ChartContainer>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const chart = canvas.getByRole('region')
    
    expect(chart).toBeInTheDocument()
    expect(chart).toHaveAttribute('data-chart')
  },
}

/**
 * @description 棒グラフ
 */
export const BarChartExample: Story = {
  render: () => (
    <ChartContainer
      className="w-full max-w-lg"
      config={{
        bar: {
          color: '#10b981',
        },
      }}
    >
      <BarChart data={barData}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="value"
          name="bar"
          fill="var(--color-bar)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const chart = canvas.getByRole('region')
    
    expect(chart).toBeInTheDocument()
    expect(chart).toHaveClass('flex', 'justify-center')
  },
}

/**
 * @description 円グラフ
 */
export const PieChartExample: Story = {
  render: () => (
    <ChartContainer
      className="w-full max-w-lg"
      config={{
        pie1: { color: '#3b82f6' },
        pie2: { color: '#10b981' },
        pie3: { color: '#f59e0b' },
      }}
    >
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
        >
          {pieData.map((entry) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={`var(--color-pie${pieData.indexOf(entry) + 1})`}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ChartContainer>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const chart = canvas.getByRole('region')
    
    expect(chart).toBeInTheDocument()
    expect(chart).toHaveClass('text-xs')
  },
}

/**
 * @description カスタムツールチップを使用したグラフ
 */
export const CustomTooltipChart: Story = {
  render: () => (
    <ChartContainer
      className="w-full max-w-lg"
      config={{
        custom: {
          label: '売上高',
          color: '#8b5cf6',
        },
      }}
    >
      <LineChart data={lineData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null
            
            return (
              <div className="rounded-lg border bg-background p-2 shadow-sm">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-muted-foreground">
                      {payload[0].payload.month}
                    </span>
                    <span className="font-bold">
                      {payload[0].value?.toLocaleString()}円
                    </span>
                  </div>
                </div>
              </div>
            )
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          name="custom"
          strokeWidth={2}
          dot={{ strokeWidth: 2 }}
          stroke="var(--color-custom)"
        />
      </LineChart>
    </ChartContainer>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const chart = canvas.getByRole('region')
    
    expect(chart).toBeInTheDocument()
    expect(chart).toHaveClass('flex', 'aspect-video', 'justify-center')
  },
} 