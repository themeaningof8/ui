"use client"

/**
 * @file チャートコンポーネント
 * @description データの可視化のためのチャートコンポーネントを提供します
 * 
 * @example
 * ```tsx
 * <ChartContainer config={chartConfig}>
 *   <LineChart data={data}>
 *     <XAxis dataKey="name" />
 *     <YAxis />
 *     <Line type="monotone" dataKey="value" />
 *     <ChartTooltip content={<ChartTooltipContent />} />
 *   </LineChart>
 * </ChartContainer>
 * ```
 */

import * as RechartsPrimitive from "recharts"
import {
  type CSSProperties,
  type ComponentType,
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ReactNode,
  createContext, 
  useContext,
  useId,
  useMemo
} from "react"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

/**
 * チャートの設定タイプ
 */
export type ChartConfig = {
	[k in string]: {
		label?: ReactNode
		icon?: ComponentType
	} & (
		| { color?: string; theme?: never }
		| { color?: never; theme: Record<keyof typeof THEMES, string> }
	)
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = createContext<ChartContextProps | null>(null)

function useChart() {
  const context = useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

/**
 * チャートのコンテナコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.id - チャートのID
 * @param props.className - 追加のCSSクラス名
 * @param props.config - チャートの設定
 * @param props.children - チャートの内容
 */
function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: ComponentPropsWithoutRef<"div"> & {
  config: ChartConfig
  children: ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"]
}) {
  const uniqueId = useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-step-11 [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-step-7/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-step-7 [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-step-7 [&_.recharts-radial-bar-background-sector]:fill-step-7 [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-step-7 [&_.recharts-reference-line_[stroke='#ccc']]:stroke-step-7 [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

/**
 * チャートのスタイルコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.id - チャートのID
 * @param props.config - チャートの設定
 */
function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      data-slot="chart-style"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
              ${prefix} [data-chart=${id}] {
              ${colorConfig
                .map(([key, itemConfig]) => {
                  const color =
                    itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
                    itemConfig.color
                  return color ? `  --color-${key}: ${color};` : null
                })
                .join("\n")}
              }
            `
          )
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

/**
 * チャートのツールチップコンテンツコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.active - ツールチップがアクティブかどうか
 * @param props.payload - ツールチップのデータ
 * @param props.className - 追加のCSSクラス名
 * @param props.indicator - インジケーターのスタイル
 * @param props.hideLabel - ラベルを非表示にするかどうか
 * @param props.hideIndicator - インジケーターを非表示にするかどうか
 * @param props.label - ラベルの内容
 * @param props.labelFormatter - ラベルのフォーマッター
 * @param props.labelClassName - ラベルのクラス名
 * @param props.formatter - データのフォーマッター
 * @param props.color - インジケーターの色
 * @param props.nameKey - 名前のキー
 * @param props.labelKey - ラベルのキー
 */
function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
  ...props
}: ComponentPropsWithoutRef<"div"> & {
  active?: boolean
  payload?: any[]
  indicator?: "line" | "dot" | "dashed"
  hideLabel?: boolean
  hideIndicator?: boolean
  label?: string
  labelFormatter?: (label: any, payload: any[]) => ReactNode
  labelClassName?: string
  formatter?: (value: any, name: string, props: any, index: number, payload: any) => ReactNode
  color?: string
  nameKey?: string
  labelKey?: string
}) {
  const { config } = useChart()

  const tooltipLabel = useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null
    }

    const [item] = payload
    const key = `${labelKey || item.dataKey || item.name || "value"}`
    const itemConfig = getPayloadConfigFromPayload(config, item, key)
    const value =
      !labelKey && typeof label === "string"
        ? config[label as keyof typeof config]?.label || label
        : itemConfig?.label

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      )
    }

    if (!value) {
      return null
    }

    return <div className={cn("font-medium", labelClassName)}>{value}</div>
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ])

  if (!active || !payload?.length) {
    return null
  }

  const nestLabel = payload.length === 1 && indicator !== "dot"

  return (
    <div
      data-slot="chart-tooltip"
      className={cn(
        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-step-6 bg-step-1 px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
      {...props}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)
          const indicatorColor = color || item.payload.fill || item.color

          return (
            <div
              key={item.dataKey}
              data-slot="chart-tooltip-item"
              className={cn(
                "flex w-full flex-wrap items-stretch gap-2 [&>svg]:size-2.5 [&>svg]:text-step-11/50",
                indicator === "dot" && "items-center"
              )}
            >
              {formatter && item?.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, index, item.payload)
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <div
                        data-slot="chart-tooltip-indicator"
                        className={cn(
                          "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                          {
                            "h-2.5 w-2.5": indicator === "dot",
                            "w-1": indicator === "line",
                            "w-0 border-[1.5px] border-dashed bg-transparent":
                              indicator === "dashed",
                            "my-0.5": nestLabel && indicator === "dashed",
                          }
                        )}
                        style={
                          {
                            "--color-bg": indicatorColor,
                            "--color-border": indicatorColor,
                          } as CSSProperties
                        }
                      />
                    )
                  )}
                  <div
                    data-slot="chart-tooltip-content"
                    className={cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center"
                    )}
                  >
                    <div className="grid gap-1.5">
                      {nestLabel ? tooltipLabel : null}
                      <span className="text-step-11">
                        {itemConfig?.label || item.name}
                      </span>
                    </div>
                    {item.value && (
                      <span className="font-mono font-medium tabular-nums text-step-12">
                        {item.value.toLocaleString()}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ChartLegend = RechartsPrimitive.Legend

/**
 * チャートの凡例コンテンツコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.className - 追加のCSSクラス名
 * @param props.hideIcon - アイコンを非表示にするかどうか
 * @param props.payload - 凡例のデータ
 * @param props.verticalAlign - 垂直方向の配置
 * @param props.nameKey - 名前のキー
 */
function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
  ...props
}: ComponentPropsWithoutRef<"div"> & {
  payload?: any[]
  verticalAlign?: "top" | "bottom"
  hideIcon?: boolean
  nameKey?: string
}) {
  const { config } = useChart()

  if (!payload?.length) {
    return null
  }

  return (
    <div
      data-slot="chart-legend"
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
      {...props}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`
        const itemConfig = getPayloadConfigFromPayload(config, item, key)

        return (
          <div
            key={item.value}
            data-slot="chart-legend-item"
            className={cn(
              "flex items-center gap-1.5 [&>svg]:size-3 [&>svg]:text-step-11/50",
            )}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                data-slot="chart-legend-indicator"
                className="size-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            {itemConfig?.label}
          </div>
        )
      })}
    </div>
  )
}

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

// displayName の設定
ChartTooltipContent.displayName = "ChartTooltipContent"
ChartLegendContent.displayName = "ChartLegendContent"

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
