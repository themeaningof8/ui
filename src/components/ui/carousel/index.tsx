/**
 * @file カルーセルコンポーネント
 * @description スライドショー形式でコンテンツを表示するためのカルーセルコンポーネント
 * 
 * @example
 * ```tsx
 * // 基本的な使用例
 * <Carousel>
 *   <CarouselContent>
 *     <CarouselItem>スライド1</CarouselItem>
 *     <CarouselItem>スライド2</CarouselItem>
 *   </CarouselContent>
 *   <CarouselPrevious />
 *   <CarouselNext />
 * </Carousel>
 * 
 * // オートプレイの使用例
 * <Carousel autoPlay interval={3000}>
 *   <CarouselContent>
 *     <CarouselItem>スライド1</CarouselItem>
 *     <CarouselItem>スライド2</CarouselItem>
 *   </CarouselContent>
 * </Carousel>
 * ```
 */

"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/**
 * @interface CarouselProps
 * @description カルーセルのルートコンポーネントのプロパティ
 * @property {string} [className] - カスタムクラス名
 * @property {React.ReactNode} [children] - カルーセルの内容
 * @property {string} [orientation="horizontal"] - カルーセルの方向
 * @property {boolean} [autoPlay=false] - 自動再生を有効にするかどうか
 * @property {number} [interval=3000] - 自動再生の間隔（ミリ秒）
 */
type CarouselProps = {
  orientation?: "horizontal" | "vertical"
  autoPlay?: boolean
  interval?: number
  opts?: UseEmblaCarouselType[1]
} & React.HTMLAttributes<HTMLDivElement>

/**
 * @interface CarouselContextType
 * @description カルーセルのコンテキスト型
 */
type CarouselContextType = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} | null

const CarouselContext = React.createContext<CarouselContextType>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }
  return context
}

/**
 * カルーセルコンポーネント
 */
function Carousel({
  orientation = "horizontal",
  autoPlay = false,
  interval = 3000,
  opts,
  className,
  children,
  ...props
}: CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel({
    ...opts,
    axis: orientation === "horizontal" ? "x" : "y",
  })
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const onSelect = React.useCallback(() => {
    if (!api) return

    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [api])

  React.useEffect(() => {
    if (!api) return

    onSelect()
    api.on("select", onSelect)
    api.on("reInit", onSelect)

    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api, onSelect])

  React.useEffect(() => {
    if (autoPlay && api) {
      const intervalId = setInterval(() => {
        if (api.canScrollNext()) {
          api.scrollNext()
        } else {
          api.scrollTo(0)
        }
      }, interval)

      return () => clearInterval(intervalId)
    }
  }, [api, autoPlay, interval])

  const contextValue = React.useMemo(
    () => ({
      carouselRef,
      api,
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext,
    }),
    [carouselRef, api, scrollPrev, scrollNext, canScrollPrev, canScrollNext]
  )

  return (
    <CarouselContext.Provider value={contextValue}>
      <section
        data-slot="carousel"
        className={cn("relative", className)}
        aria-roledescription="carousel"
        data-autoplay={autoPlay}
        data-orientation={orientation}
        data-testid="carousel"
        {...props}
      >
        {children}
      </section>
    </CarouselContext.Provider>
  )
}

/**
 * カルーセルのコンテンツコンポーネント
 */
function CarouselContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { carouselRef } = useCarousel()

  return (
    <div
      data-slot="carousel-viewport"
      ref={carouselRef}
      className={cn(
        "overflow-hidden",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-7 focus-visible:ring-offset-2"
      )}
      data-testid="carousel-viewport"
    >
      <div
        data-slot="carousel-content"
        className={cn("flex", className)}
        data-testid="carousel-content"
        {...props}
      />
    </div>
  )
}

/**
 * カルーセルの各アイテムコンポーネント
 */
function CarouselItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="carousel-item"
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-7 focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * 前のスライドに移動するボタン
 */
function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        "left-2 top-1/2 -translate-y-1/2",
        "transition-transform duration-200",
        "hover:scale-110",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-7 focus-visible:ring-offset-2",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label="前のスライド"
      {...props}
    >
      <ArrowLeft className="size-4" />
    </Button>
  )
}

/**
 * 次のスライドに移動するボタン
 */
function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        "right-2 top-1/2 -translate-y-1/2",
        "transition-transform duration-200",
        "hover:scale-110",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-step-7 focus-visible:ring-offset-2",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      aria-label="次のスライド"
      {...props}
    >
      <ArrowRight className="size-4" />
    </Button>
  )
}

// displayName の設定
Carousel.displayName = "Carousel"
CarouselContent.displayName = "CarouselContent"
CarouselItem.displayName = "CarouselItem"
CarouselPrevious.displayName = "CarouselPrevious"
CarouselNext.displayName = "CarouselNext"

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} 