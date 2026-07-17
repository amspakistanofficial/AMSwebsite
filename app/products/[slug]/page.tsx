import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductGallery } from "@/components/ProductGallery"
import { WhatsAppOrderButton } from "@/components/WhatsAppOrderButton"
import { ProductCard } from "@/components/products/ProductCard"
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/product-catalog"

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getAllProducts().map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return {
      title: "Product Not Found | AMS Pakistan",
    }
  }

  return {
    title: `${product.name} | AMS Pakistan`,
    description: product.description,
    openGraph: {
      title: `${product.name} | AMS Pakistan`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(product)

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-28 pb-20 px-6 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <section className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <ProductGallery images={product.images} productName={product.name} />

          <div className="lg:sticky lg:top-28">
            <p className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-4">
              {product.category}
            </p>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6">
              {product.name}
            </h1>
            <div className="mb-5 inline-flex items-center border border-primary/40 bg-primary/10 px-4 py-2 text-primary text-xs font-black uppercase tracking-[0.25em]">
              Brand: {product.brand}
            </div>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed font-medium mb-8">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <WhatsAppOrderButton
                productName={product.name}
                category={product.category}
              />
              <Button
                asChild
                size="lg"
                variant="outline"
              className="rounded-none border-primary/50 bg-transparent text-primary hover:bg-primary hover:text-black font-black uppercase tracking-tighter"
            >
                <Link href="/products">
                  Browse Products
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {product.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 bg-[#111111] border border-[#1a1a1a] rounded-lg p-4"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-gray-300 text-sm font-medium leading-relaxed">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 grid lg:grid-cols-[0.8fr_1.2fr] gap-8">
          <div>
            <p className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-3">
              Technical Details
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">
              Specifications
            </h2>
          </div>

          <div className="bg-[#111111] border border-[#1a1a1a] rounded-lg overflow-hidden">
            {product.specifications.map((specification) => (
              <div
                key={specification.label}
                className="grid md:grid-cols-[220px_1fr] gap-2 border-b border-[#1a1a1a] last:border-b-0 p-5"
              >
                <dt className="text-gray-500 text-sm font-bold uppercase tracking-wider">
                  {specification.label}
                </dt>
                <dd className="text-white font-medium">
                  {specification.value}
                </dd>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <p className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-3">
                More from AMS
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">
                Related Products
              </h2>
            </div>
            <Button
              asChild
              variant="outline"
              className="rounded-none border-primary/50 bg-transparent text-primary hover:bg-primary hover:text-black font-bold uppercase tracking-tighter"
            >
              <Link href="/products">View All Products</Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
