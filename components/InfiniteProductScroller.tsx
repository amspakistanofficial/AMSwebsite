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

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }, [])

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
    const scrollAmount = el.clientWidth * 0.7
    el.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" })
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

  return (
    <div className={`w-full bg-transparent py-8 md:py-16 relative transition-opacity duration-300 ${isChanging ? 'opacity-0' : 'opacity-100'}`}>
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

      <div ref={scrollRef} className="flex gap-6 md:gap-12 overflow-x-auto pb-8 md:pb-32 scrollbar-hide px-8 scroll-smooth">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[260px] md:w-[420px] bg-transparent p-4 md:p-8 transition-all duration-300 group relative"
            >
              {/* Purple Glow Effect on hover */}
              <div className="absolute inset-0 bg-[#8a2be2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="w-full relative overflow-visible flex flex-col items-center justify-center">
                {/* Image container */}
                <div className="relative w-full h-[260px] md:h-[420px] flex items-center justify-center">
                  {/* Glow behind image on hover */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 h-48 md:h-64 bg-[#8a2be2]/15 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    priority={false}
                    loading="eager"
                    className="object-contain group-hover:scale-105 transition-transform duration-500 relative z-10"
                    style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
                  />

                  {/* Desktop: Popout Info Panel on hover */}
                  <div className="hidden md:block absolute -top-6 left-1/2 -translate-x-1/2 -translate-y-full w-[105%] bg-[#0a0a0a] border border-primary/40 p-6 opacity-0 scale-95 translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-50 shadow-2xl">
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0a0a0a] border-r border-b border-primary/40 rotate-45" />
                    <div className="relative">
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-2 h-7 bg-primary" />
                        <h4 className="text-primary text-sm font-black uppercase tracking-[0.3em]">Specifications</h4>
                      </div>
                      <div className="leading-relaxed">
                        {formatSpec(getSpec(product))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile: Specs always visible below image */}
                <div className="md:hidden mt-4 w-full bg-[#111111] border border-primary/30 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-1.5 h-5 bg-primary" />
                    <h4 className="text-primary text-xs font-black uppercase tracking-[0.2em]">Specifications</h4>
                  </div>
                  <div className="leading-relaxed">
                    {formatSpec(getSpec(product))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full py-20 text-center">
            <p className="text-gray-500">No products found for this category.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
})
