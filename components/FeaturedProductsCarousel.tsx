import { ProductCard } from "@/components/products/ProductCard"
import type { ProductDetail } from "@/lib/product-catalog"

interface FeaturedProductsCarouselProps {
  products: ProductDetail[]
}

export function FeaturedProductsCarousel({ products }: FeaturedProductsCarouselProps) {
  const carouselProducts = [...products, ...products]

  return (
    <div className="featured-carousel overflow-hidden py-3">
      <div className="featured-carousel-track flex w-max gap-6">
        {carouselProducts.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
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

        .featured-carousel-track {
          animation: featured-scroll 52s linear infinite;
          transform: translate3d(0, 0, 0);
          will-change: transform;
        }

        .featured-carousel:hover .featured-carousel-track {
          animation-play-state: paused;
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

        @keyframes featured-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(calc(-50% - 12px), 0, 0);
          }
        }
      `}</style>
    </div>
  )
}
