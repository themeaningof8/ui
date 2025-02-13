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
const Carousel = React.forwardRef<
  HTMLDivElement,
  CarouselProps
>(({
  orientation = "horizontal",
  autoPlay = false,
  interval = 3000,
  opts,
  className,
  children,
  ...props
}, ref) => {
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

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <section
        ref={ref}
        className={cn("relative", className)}
        aria-roledescription="carousel"
        data-autoplay={autoPlay}
        data-testid="carousel"
        {...props}
      >
        {children}
      </section>
    </CarouselContext.Provider>
  )
})
Carousel.displayName = "Carousel"

/**
 * @interface CarouselContentProps
 * @description カルーセルのコンテンツ部分のプロパティ
 * @property {string} [className] - カスタムクラス名
 * @property {React.ReactNode} [children] - コンテンツの内容
 */
const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden" data-testid="carousel-viewport">
      <div
        ref={ref}
        className={cn("flex", className)}
        data-testid="carousel-content"
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

/**
 * @interface CarouselItemProps
 * @description カルーセルの各アイテムのプロパティ
 * @property {string} [className] - カスタムクラス名
 * @property {React.ReactNode} [children] - アイテムの内容
 */
const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="group"
    aria-roledescription="slide"
    className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
    {...props}
  />
))
CarouselItem.displayName = "CarouselItem"

/**
 * @interface CarouselPreviousProps
 * @description 前のスライドに移動するボタンのプロパティ
 * @property {string} [className] - カスタムクラス名
 */
const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        "left-2 top-1/2 -translate-y-1/2",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label="前のスライド"
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

/**
 * @interface CarouselNextProps
 * @description 次のスライドに移動するボタンのプロパティ
 * @property {string} [className] - カスタムクラス名
 */
const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        "right-2 top-1/2 -translate-y-1/2",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      aria-label="次のスライド"
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} 