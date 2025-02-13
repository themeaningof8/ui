/**
 * @file チャートコンポーネント
 * @description データを視覚的に表示するためのチャートコンポーネント
 * 
 * @example
 * ```tsx
 * // 折れ線グラフの例
 * <Chart
 *   type="line"
 *   data={{
 *     labels: ['1月', '2月', '3月'],
 *     datasets: [{
 *       label: '売上高',
 *       data: [65, 59, 80],
 *     }],
 *   }}
 * />
 * 
 * // 棒グラフの例
 * <Chart
 *   type="bar"
 *   data={{
 *     labels: ['A', 'B', 'C'],
 *     datasets: [{
 *       label: 'スコア',
 *       data: [12, 19, 3],
 *     }],
 *   }}
 * />
 * ```
 */

"use client"

import * as React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartData,
  type ChartOptions,
  type ChartType,
} from "chart.js"
import { Chart as ReactChart } from "react-chartjs-2"

import { cn } from "@/lib/utils"

// チャートの種類に応じて必要なコンポーネントを登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
)

/**
 * @interface ChartProps
 * @description チャートコンポーネントのプロパティ
 * @property {ChartType} type - チャートの種類（'line', 'bar', 'pie', 'radar'など）
 * @property {ChartData} data - チャートのデータ
 * @property {ChartOptions} [options] - チャートのオプション
 * @property {string} [className] - カスタムクラス名
 */
interface ChartProps {
  type: ChartType
  data: ChartData
  options?: ChartOptions
  className?: string
}

/**
 * チャートコンポーネント
 * @param props - コンポーネントのプロパティ
 * @returns チャート要素
 */
const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  ({ type, data, options, className }, ref) => {
    const defaultOptions: ChartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    }

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        data-testid="chart"
        data-chart-type={type}
        data-has-options={!!options}
      >
        <ReactChart
          type={type}
          data={data}
          options={options || defaultOptions}
        />
      </div>
    )
  }
)
Chart.displayName = "Chart"

export { Chart }
export type { ChartProps } 