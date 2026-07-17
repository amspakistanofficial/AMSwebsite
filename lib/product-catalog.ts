import { ALL_PRODUCTS, type Product } from "@/lib/products"

export interface ProductGalleryImage {
  src: string
  alt: string
}

export interface ProductSpecification {
  label: string
  value: string
}

export interface ProductDetail {
  id: string
  slug: string
  name: string
  brand: string
  image: string
  category: string
  description: string
  images: ProductGalleryImage[]
  features: string[]
  specifications: ProductSpecification[]
}

const CATEGORY_FEATURES: Record<string, string[]> = {
  Cases: [
    "Designed for clean AMS gaming builds",
    "Airflow-focused chassis layout",
    "Tempered-glass showcase styling",
    "Compatible with modern component upgrades",
  ],
  Cooling: [
    "Built for stable thermal performance",
    "RGB styling for gaming setups",
    "Reliable daily-use cooling hardware",
    "Selected for balanced noise and airflow",
  ],
  Fans: [
    "ARGB lighting for coordinated builds",
    "Optimized for case airflow",
    "Multi-fan setup ready",
    "Selected for clean visual impact",
  ],
  Monitors: [
    "High-refresh gaming display experience",
    "Crisp full-HD visual clarity",
    "IPS panel for stronger viewing angles",
    "Built for fast-paced gaming setups",
  ],
}

const CATEGORY_SPECIFICATIONS: Record<string, ProductSpecification[]> = {
  Cases: [
    { label: "Build Type", value: "Gaming PC chassis" },
    { label: "Recommended Use", value: "Custom PC builds and upgrades" },
    { label: "Selection", value: "AMS premium case lineup" },
  ],
  Cooling: [
    { label: "Cooling Type", value: "CPU air cooling" },
    { label: "Recommended Use", value: "Gaming and workstation processors" },
    { label: "Selection", value: "AMS thermal performance lineup" },
  ],
  Fans: [
    { label: "Cooling Type", value: "Case airflow fan kit" },
    { label: "Lighting", value: "ARGB" },
    { label: "Selection", value: "AMS airflow accessory lineup" },
  ],
  Monitors: [
    { label: "Display Type", value: "Gaming monitor" },
    { label: "Recommended Use", value: "Competitive and immersive gaming" },
    { label: "Selection", value: "AMS display lineup" },
  ],
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function getProductSlug(product: Product) {
  return `${slugify(product.name)}-${product.id}`
}

function getCategory(product: Product) {
  return product.category || "Components"
}

function getDescription(product: Product) {
  return product.description || `Premium ${getCategory(product)} component selected by AMS.`
}

function getHighlights(description: string) {
  return description
    .split(/,|\n/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 4)
}

function buildFeatures(product: Product) {
  const category = getCategory(product)
  const categoryFeatures = CATEGORY_FEATURES[category] || [
    "Selected by AMS for premium PC builds",
    "Compatible with enthusiast gaming setups",
    "Built for dependable everyday performance",
    "Ready for future-focused upgrade paths",
  ]

  return [...getHighlights(getDescription(product)), ...categoryFeatures].slice(0, 6)
}

function buildSpecifications(product: Product): ProductSpecification[] {
  const category = getCategory(product)
  const description = getDescription(product)

  return [
    { label: "Model", value: product.name },
    { label: "Brand", value: "AMS" },
    { label: "Category", value: category },
    { label: "Product ID", value: product.id },
    ...(CATEGORY_SPECIFICATIONS[category] || [
      { label: "Recommended Use", value: "Premium PC hardware builds" },
      { label: "Selection", value: "AMS curated component lineup" },
    ]),
    { label: "Highlights", value: description },
  ]
}

function buildProductDetail(product: Product): ProductDetail {
  const description = getDescription(product)

  return {
    id: product.id,
    slug: getProductSlug(product),
    name: product.name,
    brand: "AMS",
    image: product.image,
    category: getCategory(product),
    description,
    images: [
      {
        src: product.image,
        alt: product.name,
      },
    ],
    features: buildFeatures(product),
    specifications: buildSpecifications(product),
  }
}

export const PRODUCT_CATALOG: ProductDetail[] = ALL_PRODUCTS.map(buildProductDetail)

export function getAllProducts() {
  return PRODUCT_CATALOG
}

export function getProductBySlug(slug: string) {
  return PRODUCT_CATALOG.find((product) => product.slug === slug)
    || PRODUCT_CATALOG.find((product) => product.slug.startsWith(`${slug}-`))
}

export function getProductsByIds(ids: string[]) {
  return ids
    .map((id) => PRODUCT_CATALOG.find((product) => product.id === id))
    .filter((product): product is ProductDetail => Boolean(product))
}

export function getProductCategories() {
  return [
    { id: "all", name: "All" },
    ...Array.from(new Set(PRODUCT_CATALOG.map((product) => product.category))).map((category) => ({
      id: category,
      name: category,
    })),
  ]
}

export function getRelatedProducts(product: ProductDetail, limit = 4) {
  const sameCategoryProducts = PRODUCT_CATALOG.filter(
    (candidate) => candidate.category === product.category && candidate.id !== product.id,
  )
  const fallbackProducts = PRODUCT_CATALOG.filter(
    (candidate) => candidate.category !== product.category && candidate.id !== product.id,
  )

  return [...sameCategoryProducts, ...fallbackProducts].slice(0, limit)
}
