import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { ProductDetail } from "@/lib/product-catalog"

interface ProductCardProps {
  product: ProductDetail
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-[#111111] border border-[#1a1a1a] rounded-lg overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-primary/40 hover:shadow-[0_20px_45px_rgba(255,107,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
    >
      <div className="relative h-56 md:h-64 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 opacity-70" />
        <Image
          src={product.image}
          alt={product.name}
          fill
          loading="lazy"
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
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
        <p className="text-gray-400 text-sm leading-relaxed font-medium min-h-16 mb-6 line-clamp-3">
          {product.description}
        </p>
        <span className="inline-flex w-full items-center justify-center gap-2 rounded-none border border-primary/50 bg-transparent px-4 py-2 text-sm font-bold uppercase tracking-tighter text-primary transition-colors group-hover:bg-primary group-hover:text-black">
          View Details
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  )
}
