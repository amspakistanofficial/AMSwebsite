import { getAllProducts, type ProductDetail } from "@/lib/product-catalog"

export type FeaturedProduct = ProductDetail

function getFeaturedProductsByCategory(products: ProductDetail[]) {
  const productsByCategory = new Map<string, ProductDetail[]>()

  products.forEach((product) => {
    const categoryProducts = productsByCategory.get(product.category) || []

    if (categoryProducts.length < 2) {
      categoryProducts.push(product)
      productsByCategory.set(product.category, categoryProducts)
    }
  })

  return Array.from(productsByCategory.values()).flat()
}

export const FEATURED_PRODUCTS: FeaturedProduct[] = getFeaturedProductsByCategory(getAllProducts())
