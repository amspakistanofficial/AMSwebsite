"use client"

import { ALL_PRODUCTS } from "@/lib/products"
import { useEffect, useState } from "react"

interface InfiniteProductScrollerProps {
  selectedCategory: string
}

export function InfiniteProductScroller({ selectedCategory }: InfiniteProductScrollerProps) {
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
              className="flex-shrink-0 w-[420px] h-[520px] bg-[#111111]/40 border border-[#1a1a1a] p-8 hover:border-primary/50 transition-all duration-500 group snap-center relative"
            >
              {/* Purple Glow Effect */}
              <div className="absolute inset-0 bg-[#8a2be2]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[100px] pointer-events-none" />

              <div className="w-full h-full relative overflow-visible flex flex-col items-center justify-center">
                {/* Glow behind image */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#8a2be2]/20 rounded-full blur-[90px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <img
                  src={product.image}
                  alt={product.name}
                  className="max-w-[320px] max-h-[320px] object-contain filter drop-shadow-[0_0_30px_rgba(138,43,226,0.25)] group-hover:scale-110 group-hover:drop-shadow-[0_0_50px_rgba(138,43,226,0.6)] transition-all duration-700 relative z-10"
                />

                <div className="mt-10 text-center z-10">
                  <span className="text-white text-xl font-black uppercase tracking-tighter group-hover:text-primary transition-colors duration-300">{product.name}</span>
                </div>

                {/* Popout Info Panel */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 -translate-y-full w-[110%] bg-[#0a0a0a]/98 backdrop-blur-3xl border border-primary/50 p-8 opacity-0 scale-95 translate-y-4 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-500 pointer-events-none z-50 shadow-[0_40px_80px_rgba(0,0,0,0.95)]">
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0a0a0a] border-r border-b border-primary/50 rotate-45" />
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
}
