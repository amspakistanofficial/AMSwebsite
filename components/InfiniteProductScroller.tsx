"use client"

import React, { useEffect, useState, useRef, useCallback, memo } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ALL_PRODUCTS, Product } from "@/lib/products"

interface InfiniteProductScrollerProps {
  selectedCategory: string
}

export const InfiniteProductScroller = memo(function InfiniteProductScroller({ selectedCategory }: InfiniteProductScrollerProps) {
  const [filteredProducts, setFilteredProducts] = useState(ALL_PRODUCTS)
  const [isChanging, setIsChanging] = useState(false)
  const [specs, setSpecs] = useState<Record<string, string>>({})
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [centeredIndex, setCenteredIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsChanging(true)
    const timer = setTimeout(() => {
      if (selectedCategory === "all") {
        setFilteredProducts(ALL_PRODUCTS)
      } else {
        setFilteredProducts(ALL_PRODUCTS.filter(p => p.category === selectedCategory))
      }
      setIsChanging(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [selectedCategory])

  // Fetch specs dynamically from .txt files
  useEffect(() => {
    const fetchSpecs = async () => {
      const newSpecs: Record<string, string> = {}
      const promises = ALL_PRODUCTS.map(async (product) => {
        if (product.specFile) {
          try {
            const res = await fetch(product.specFile)
            if (res.ok) {
              const text = await res.text()
              newSpecs[product.id] = text.trim()
            }
          } catch {
            // Fallback to description if fetch fails
          }
        }
      })
      await Promise.all(promises)
      setSpecs(newSpecs)
    }
    fetchSpecs()
  }, [])

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
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
    setCenteredIndex(findCenteredIndex())
  }, [findCenteredIndex])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", updateScrollButtons, { passive: true })
    updateScrollButtons()
    return () => el.removeEventListener("scroll", updateScrollButtons)
  }, [updateScrollButtons, filteredProducts])

  const scroll = (direction: "left" | "right") => {
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
  }

  const getSpec = (product: Product) => {
    return specs[product.id] || product.description || "Premium component selected by AMS."
  }

  const formatSpec = (spec: string) => {
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

  const formatMobileSpec = (product: Product, spec: string) => {
    const lines = spec.split("\n").filter(Boolean)
    return (
      <>
        <span className="text-gray-400 text-sm font-medium tracking-wide">{lines.join(" | ")}</span>
      </>
    )
  }

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
          filteredProducts.map((product, index) => {
            const isCentered = index === centeredIndex
            return (
              <div
                key={product.id}
                className={`product-snap-item flex-shrink-0 w-[240px] md:w-[350px] bg-transparent p-3 md:p-6 transition-all duration-300 group relative ${isCentered ? 'md:scale-110 md:z-10' : 'md:scale-90 md:opacity-70'}`}
              >
                {/* Purple Glow Effect on hover */}
                <div className="absolute inset-0 bg-[#8a2be2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="w-full relative overflow-visible flex flex-col items-center justify-center">
                  {/* Image container */}
                  <div className="relative w-full h-[220px] md:h-[350px] flex items-center justify-center">
                    {/* Glow behind image on hover - no blur on mobile for perf */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 h-48 md:h-64 bg-[#8a2be2]/15 rounded-full md:blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none hidden md:block" />

                    <Image
                      src={product.image}
                      alt={product.name}
                      width={350}
                      height={350}
                      priority={false}
                      loading="lazy"
                      className="object-contain group-hover:scale-105 transition-transform duration-500 relative z-10 will-change-transform"
                      style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
                    />

                    {/* Desktop: Popout Info Panel on hover */}
                    <div className="hidden md:block absolute -top-6 left-1/2 -translate-x-1/2 -translate-y-full w-[105%] bg-[#0a0a0a] border border-primary/40 p-6 opacity-0 scale-95 translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-50 shadow-2xl">
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0a0a0a] border-r border-b border-primary/40 rotate-45" />
                      <div className="relative">
                        <div className="flex items-center gap-4 mb-5">
                          <div className="w-2 h-7 bg-primary" />
                          <h4 className="text-primary text-sm font-black uppercase tracking-[0.3em]">{product.name}</h4>
                        </div>
                        <div className="leading-relaxed">
                          {formatSpec(getSpec(product))}
                        </div>
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
                      {formatSpec(getSpec(product))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
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
