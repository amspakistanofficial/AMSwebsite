"use client"

import React, { useEffect, useState, memo } from "react"
import { ALL_PRODUCTS } from "@/lib/products"

interface InfiniteProductScrollerProps {
  selectedCategory: string
}

export const InfiniteProductScroller = memo(function InfiniteProductScroller({ selectedCategory }: InfiniteProductScrollerProps) {
  const [filteredProducts, setFilteredProducts] = useState(ALL_PRODUCTS)
  const [isChanging, setIsChanging] = useState(false)

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

  return (
    <div className={`w-full bg-transparent py-16 relative transition-opacity duration-300 ${isChanging ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex gap-12 overflow-x-auto pb-32 scrollbar-hide px-8 snap-x">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[420px] h-[520px] bg-transparent p-8 transition-all duration-300 group snap-center relative"
            >
              {/* Purple Glow Effect - Simplified */}
              <div className="absolute inset-0 bg-[#8a2be2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="w-full h-full relative overflow-visible flex flex-col items-center justify-center">
                {/* Glow behind image - Simplified blur */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#8a2be2]/15 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="max-w-[300px] max-h-[300px] object-contain filter group-hover:scale-105 transition-transform duration-500 relative z-10"
                />

                <div className="mt-10 text-center z-10">
                  <span className="text-white text-xl font-black uppercase tracking-tighter group-hover:text-primary transition-colors duration-300">{product.name}</span>
                </div>

                {/* Popout Info Panel - Simplified blur and removed backdrop-blur */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 -translate-y-full w-[105%] bg-[#0a0a0a] border border-primary/40 p-6 opacity-0 scale-95 translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-50 shadow-2xl">
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0a0a0a] border-r border-b border-primary/40 rotate-45" />
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-2 h-7 bg-primary" />
                      <h4 className="text-primary text-sm font-black uppercase tracking-[0.3em]">Specifications</h4>
                    </div>
                    <p className="text-white text-base leading-relaxed font-black italic tracking-wide">
                      {product.description || "Premium high-quality component selected by AMS enthusiasts for maximum performance."}
                    </p>
                    <div className="mt-8 pt-5 border-t border-white/10 flex justify-between items-center">
                      <span className="text-xs text-gray-500 uppercase font-bold tracking-[0.2em]">Category</span>
                      <span className="text-sm text-[#8a2be2] font-black uppercase tracking-tighter">{product.category}</span>
                    </div>
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
