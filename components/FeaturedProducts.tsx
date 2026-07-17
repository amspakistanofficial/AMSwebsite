import { FeaturedProductsCarousel } from "@/components/FeaturedProductsCarousel"
import { FEATURED_PRODUCTS, type FeaturedProduct } from "@/lib/featured-products"

interface FeaturedProductsProps {
  products?: FeaturedProduct[]
}

export function FeaturedProducts({ products = FEATURED_PRODUCTS }: FeaturedProductsProps) {
  return (
    <section id="featured-products" className="py-24 px-8 bg-[#080808] border-t border-[#1a1a1a]">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase">
            FEATURED <span className="text-[#ff6b00]">PRODUCTS</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto italic font-medium px-4">
            A curated showcase from every AMS hardware category
          </p>
        </div>

        <FeaturedProductsCarousel products={products} />
      </div>
    </section>
  )
}
