"use client"

import React, { useEffect, useState, memo } from "react"
import Image from "next/image"
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
              className="flex-shrink-0 w-[420px] h-[420px] bg-transparent p-8 transition-all duration-300 group snap-center relative"
            >
              {/* Purple Glow Effect on hover */}
              <div className="absolute inset-0 bg-[#8a2be2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="w-full h-full relative overflow-visible flex items-center justify-center">
                {/* Glow behind image on hover */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#8a2be2]/15 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  priority={false}
                  loading="eager"
                  className="object-contain group-hover:scale-105 transition-transform duration-500 relative z-10"
                  style={{ width: 'auto', height: 'auto', maxWidth: '300px', maxHeight: '300px' }}
                />

                {/* Popout Info Panel on hover */}
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
