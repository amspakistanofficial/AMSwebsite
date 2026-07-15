import { getProductsByIds, type ProductDetail } from "@/lib/product-catalog"

export type FeaturedProduct = ProductDetail

export const FEATURED_PRODUCT_IDS = ["cases-5", "cases-9", "cooling-1", "monitors-1"]

export const FEATURED_PRODUCTS: FeaturedProduct[] = getProductsByIds(FEATURED_PRODUCT_IDS)
