import { ProductCard } from "@/components/products/ProductCard"
import type { ProductDetail } from "@/lib/product-catalog"

interface FeaturedProductsCarouselProps {
  products: ProductDetail[]
}

export function FeaturedProductsCarousel({ products }: FeaturedProductsCarouselProps) {
  return (
    <div className="featured-carousel overflow-x-auto py-3">
      <div className="featured-carousel-track flex w-max gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="featured-carousel-item shrink-0"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <style jsx>{`
        .featured-carousel {
          mask-image: linear-gradient(to right, transparent, black 7%, black 93%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 7%, black 93%, transparent);
        }

        .featured-carousel-item {
          width: min(84vw, 320px);
        }

        @media (min-width: 640px) {
          .featured-carousel-item {
            width: calc((100vw - 96px) / 2.35);
          }
        }

        @media (min-width: 768px) {
          .featured-carousel-item {
            width: calc((100vw - 120px) / 3);
          }
        }

        @media (min-width: 1280px) {
          .featured-carousel-item {
            width: 270px;
          }
        }

        @media (min-width: 1536px) {
          .featured-carousel-item {
            width: 300px;
          }
        }

      `}</style>
    </div>
  )
}
