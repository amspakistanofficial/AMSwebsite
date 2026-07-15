import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FEATURED_PRODUCTS, type FeaturedProduct } from "@/lib/featured-products"

interface FeaturedProductsProps {
  products?: FeaturedProduct[]
}

export function FeaturedProducts({ products = FEATURED_PRODUCTS }: FeaturedProductsProps) {
  return (
    <section className="py-24 px-8 bg-[#080808] border-t border-[#1a1a1a]">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase">
            FEATURED <span className="text-[#ff6b00]">PRODUCTS</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto italic font-medium px-4">
            Selected AMS hardware picks for premium gaming and workstation builds
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.id}
              className="group bg-[#111111] border border-[#1a1a1a] rounded-lg overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-primary/40 hover:shadow-[0_20px_45px_rgba(255,107,0,0.12)]"
            >
              <div className="relative h-56 md:h-64 bg-[#0a0a0a] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 opacity-70" />
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-8 transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <p className="text-primary text-xs font-black uppercase tracking-[0.25em] mb-3">
                  {product.category}
                </p>
                <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tighter">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-medium min-h-16 mb-6">
                  {product.description}
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-none border-primary/50 bg-transparent text-primary hover:bg-primary hover:text-black font-bold uppercase tracking-tighter"
                >
                  <Link href={`/products/${product.slug}`}>
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
