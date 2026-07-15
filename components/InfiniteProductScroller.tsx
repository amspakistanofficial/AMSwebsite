"use client"

import React, { useEffect, useState, useRef, useCallback, useMemo, memo } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getAllProducts, type ProductDetail } from "@/lib/product-catalog"

interface InfiniteProductScrollerProps {
  selectedCategory: string
}

const ALL_PRODUCTS = getAllProducts()

function formatSpec(spec: string) {
  const lines = spec.split("\n").filter(Boolean)
  if (lines.length > 1) {
    return (
      <>
        <span className="text-white text-base font-black italic tracking-wide block mb-1">{lines[0]}</span>
        <span className="text-gray-400 text-sm font-medium tracking-wide">{lines.slice(1).join(" | ")}</span>
      </>
    )
  }
  return <span className="text-white text-base font-black italic tracking-wide">{lines[0]}</span>
}

const ProductCard = memo(function ProductCard({
  product,
  isCentered,
}: {
  product: ProductDetail
  isCentered: boolean
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className={`product-snap-item flex-shrink-0 block w-[160px] md:w-[350px] bg-transparent p-2 md:p-6 transition-all duration-300 group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] ${isCentered ? 'md:scale-110 md:z-10' : 'md:scale-90 md:opacity-70'}`}
    >
      {/* Purple Glow Effect on hover */}
      <div className="absolute inset-0 bg-[#8a2be2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="w-full relative overflow-visible flex flex-col items-center justify-center">
        {/* Image container */}
        <div className="relative w-full h-[140px] md:h-[350px] flex items-center justify-center">
          {/* Glow behind image on hover - no blur on mobile for perf */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 h-48 md:h-64 bg-[#8a2be2]/15 rounded-full md:blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none hidden md:block" />

          <Image
            src={product.image}
            alt={product.name}
            width={350}
            height={350}
            loading="lazy"
            sizes="(min-width: 768px) 350px, 160px"
            className="object-contain group-hover:scale-105 transition-transform duration-500 relative z-10"
            style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
          />

          <div className="absolute inset-0 z-20 flex items-end bg-black/80 p-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            <div className="translate-y-3 transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
              <p className="text-primary text-[10px] md:text-xs font-black uppercase tracking-[0.25em] mb-2">
                {product.category}
              </p>
              <h4 className="text-white text-sm md:text-lg font-black uppercase tracking-tighter mb-2">
                {product.name}
              </h4>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-medium line-clamp-3 mb-4">
                {product.description}
              </p>
              <span className="inline-flex items-center justify-center border border-primary/60 px-3 py-2 text-[10px] md:text-xs font-black uppercase tracking-tighter text-primary transition-colors group-hover:bg-primary group-hover:text-black group-focus-visible:bg-primary group-focus-visible:text-black">
                View Details
              </span>
            </div>
          </div>
        </div>

        {/* Mobile: Title + description always visible below image */}
        <div className="md:hidden mt-3 w-full bg-[#111111] border border-primary/30 p-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-5 bg-primary" />
            <h4 className="text-primary text-xs font-black uppercase tracking-[0.2em]">{product.name}</h4>
          </div>
          <div className="leading-relaxed">
            {formatSpec(product.description)}
          </div>
          <span className="mt-3 inline-flex items-center justify-center border border-primary/60 px-3 py-2 text-[10px] font-black uppercase tracking-tighter text-primary">
            View Details
          </span>
        </div>
      </div>
    </Link>
  )
})

export const InfiniteProductScroller = memo(function InfiniteProductScroller({ selectedCategory }: InfiniteProductScrollerProps) {
  const [visibleCategory, setVisibleCategory] = useState(selectedCategory)
  const [isChanging, setIsChanging] = useState(false)
  const [{ canScrollLeft, canScrollRight, centeredIndex }, setScrollState] = useState({
    canScrollLeft: false,
    canScrollRight: true,
    centeredIndex: 0,
  })
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedCategory === visibleCategory) return

    setIsChanging(true)
    const timer = setTimeout(() => {
      setVisibleCategory(selectedCategory)
      setIsChanging(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [selectedCategory, visibleCategory])

  const filteredProducts = useMemo(() => {
    if (visibleCategory === "all") {
      return ALL_PRODUCTS
    }
    return ALL_PRODUCTS.filter((product) => product.category === visibleCategory)
  }, [visibleCategory])

  const findCenteredIndex = useCallback(() => {
    const el = scrollRef.current
    if (!el) return 0
    const containerCenter = el.scrollLeft + el.clientWidth / 2
    const children = el.children
    let closest = 0
    let minDist = Infinity
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement
      const childCenter = child.offsetLeft + child.offsetWidth / 2
      const dist = Math.abs(containerCenter - childCenter)
      if (dist < minDist) {
        minDist = dist
        closest = i
      }
    }
    return closest
  }, [])

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const nextState = {
      canScrollLeft: el.scrollLeft > 10,
      canScrollRight: el.scrollLeft < el.scrollWidth - el.clientWidth - 10,
      centeredIndex: findCenteredIndex(),
    }

    setScrollState((previousState) => (
      previousState.canScrollLeft === nextState.canScrollLeft &&
      previousState.canScrollRight === nextState.canScrollRight &&
      previousState.centeredIndex === nextState.centeredIndex
        ? previousState
        : nextState
    ))
  }, [findCenteredIndex])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let rafId: number
    const throttledUpdate = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        updateScrollButtons()
        rafId = 0
      })
    }

    el.addEventListener("scroll", throttledUpdate, { passive: true })
    updateScrollButtons()
    return () => {
      el.removeEventListener("scroll", throttledUpdate)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [updateScrollButtons, filteredProducts])

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const children = el.children
    const currentCenter = findCenteredIndex()
    const targetIndex = direction === "left"
      ? Math.max(0, currentCenter - 1)
      : Math.min(children.length - 1, currentCenter + 1)
    const targetChild = children[targetIndex] as HTMLElement
    if (targetChild) {
      const targetScroll = targetChild.offsetLeft - el.clientWidth / 2 + targetChild.offsetWidth / 2
      el.scrollTo({ left: targetScroll, behavior: "smooth" })
    }
  }, [findCenteredIndex])

  return (
    <div className={`w-full bg-transparent py-8 relative transition-opacity duration-300 ${isChanging ? 'opacity-0' : 'opacity-100'}`}>
      {/* Scroll arrow - Left */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-14 md:h-14 bg-[#0a0a0a]/90 border border-[#ff6b00]/40 flex items-center justify-center hover:bg-[#ff6b00]/20 transition-all cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#ff6b00]" />
        </button>
      )}

      {/* Scroll arrow - Right */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-14 md:h-14 bg-[#0a0a0a]/90 border border-[#ff6b00]/40 flex items-center justify-center hover:bg-[#ff6b00]/20 transition-all cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#ff6b00]" />
        </button>
      )}

      {/* Fade edges to indicate scrollable content */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
      )}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
      )}

      <div ref={scrollRef} className="product-scroll-container flex gap-3 md:gap-6 overflow-x-auto pb-8 md:pb-32 px-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              isCentered={index === centeredIndex}
            />
          ))
        ) : (
          <div className="w-full py-20 text-center">
            <p className="text-gray-500">No products found for this category.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .product-scroll-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }
        .product-scroll-container::-webkit-scrollbar {
          display: none;
        }
        .product-snap-item {
          scroll-snap-align: center;
        }
        @media (min-width: 768px) {
          .product-scroll-container {
            scroll-snap-type: x proximity;
          }
        }
      `}</style>
    </div>
  )
})
