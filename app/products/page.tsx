import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
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
    <main className="min-h-screen bg-[#0a0a0a] pt-28 pb-20 px-6 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <Button
          asChild
          variant="ghost"
          className="mb-8 text-gray-400 hover:text-primary hover:bg-primary/10"
        >
          <Link href="/">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>

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
