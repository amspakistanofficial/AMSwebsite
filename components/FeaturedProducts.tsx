import { ProductsGrid } from "@/components/products/ProductsGrid"
import {
  getAllProducts,
  getProductCategories,
  type ProductDetail,
} from "@/lib/product-catalog"

interface FeaturedProductsProps {
  products?: ProductDetail[]
}

export function FeaturedProducts({ products = getAllProducts() }: FeaturedProductsProps) {
  const categories = getProductCategories()

  return (
    <section id="featured-products" className="py-24 px-8 bg-[#080808] border-t border-[#1a1a1a]">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase">
            FEATURED <span className="text-[#ff6b00]">PRODUCTS</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto italic font-medium px-4">
            Browse AMS hardware by category and open any product for full details
          </p>
        </div>

        <ProductsGrid products={products} categories={categories} />
      </div>
    </section>
  )
}
