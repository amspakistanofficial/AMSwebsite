import type { Metadata } from "next"
import { ProductsGrid } from "@/components/products/ProductsGrid"
import { getAllProducts, getProductCategories } from "@/lib/product-catalog"

export const metadata: Metadata = {
  title: "Products | AMS Pakistan",
  description: "Browse AMS Pakistan premium PC cases, cooling, fans, monitors, and gaming hardware.",
}

export default function ProductsPage() {
  const products = getAllProducts()
  const categories = getProductCategories()

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-8 pb-20 px-6 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <section className="mb-12 text-center">
          <p className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-4">
            AMS Catalog
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6">
            Products
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto italic font-medium">
            Filter the AMS product catalog by category and open any item for specifications, gallery, and WhatsApp ordering.
          </p>
        </section>

        <ProductsGrid products={products} categories={categories} />
      </div>
    </main>
  )
}
