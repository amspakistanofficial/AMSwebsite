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

const PRODUCT_DETAIL_OVERRIDES: Record<string, Partial<Pick<ProductDetail, "features" | "specifications">>> = {
  "cases-15": {
    features: [
      "Supports up to 7 fans",
      "Double-side glass",
    ],
    specifications: [
      { label: "Model", value: "AMS Aero Case" },
      { label: "Brand", value: "AMS" },
      { label: "Category", value: "Cases" },
      { label: "Type", value: "mATX Case" },
      { label: "Fan Support", value: "Supports up to 7 fans" },
      { label: "Glass", value: "Double-side glass" },
    ],
  },
  "cases-16": {
    features: [
      "Double Side Glass",
      "Supports up to 7 Fans",
      "3 ARGB Fans Included",
    ],
    specifications: [
      { label: "Model", value: "AMS Prism" },
      { label: "Brand", value: "AMS" },
      { label: "Category", value: "Cases" },
      { label: "Type", value: "mATX Case" },
      { label: "Glass", value: "Double Side Glass" },
      { label: "Fan Support", value: "Supports up to 7 Fans" },
      { label: "Included Fans", value: "3 ARGB Fans Included" },
    ],
  },
  "cooling-1": {
    features: [
      "4 Pipe Cooler",
      "32 CFM",
      "High Performance",
    ],
    specifications: [
      { label: "Model", value: "AMS A-400" },
      { label: "Brand", value: "AMS" },
      { label: "Category", value: "Cooling" },
      { label: "Cooler", value: "4 Pipe Cooler" },
      { label: "Airflow", value: "32 CFM" },
      { label: "Performance", value: "High Performance" },
    ],
  },
  "cooling-3": {
    features: [
      "4 Pipe Air Cooler",
      "72 CFM",
      "High Performance",
    ],
    specifications: [
      { label: "Model", value: "SAMA A-40L" },
      { label: "Brand", value: "SAMA" },
      { label: "Category", value: "Cooling" },
      { label: "Cooler", value: "4 Pipe Air Cooler" },
      { label: "Airflow", value: "72 CFM" },
      { label: "Performance", value: "High Performance" },
    ],
  },
  "cables-1": {
    features: [
      "RGB Cable",
      "ARGB Sync",
      "16.8 Million Color Beads",
      "24-Pin and 8-Pin",
    ],
    specifications: [
      { label: "Model", value: "AMS CyberGlow" },
      { label: "Brand", value: "AMS" },
      { label: "Category", value: "Cables" },
      { label: "Cable Type", value: "RGB Cable" },
      { label: "Sync", value: "ARGB Sync" },
      { label: "Lighting", value: "16.8 Million Color Beads" },
      { label: "Connectors", value: "24-Pin and 8-Pin" },
    ],
  },
  "monitors-1": {
    features: [
      "24 Inch Monitor",
      "165Hz",
      "1ms",
      "100% sRGB",
      "FreeSync",
      "G-Sync",
      "1K",
      "IPS Panel",
    ],
    specifications: [
      { label: "Model", value: "AMS Pixle Storm X" },
      { label: "Brand", value: "AMS" },
      { label: "Category", value: "Monitors" },
      { label: "Size", value: "24 Inch Monitor" },
      { label: "Refresh Rate", value: "165Hz" },
      { label: "Response Time", value: "1ms" },
      { label: "Color", value: "100% sRGB" },
      { label: "Sync", value: "FreeSync" },
      { label: "Compatibility", value: "G-Sync" },
      { label: "Resolution", value: "1K" },
      { label: "Panel", value: "IPS Panel" },
    ],
  },
  "gaming-chairs-1": {
    features: [
      "Gaming Chair",
      "Supports up to 100kg",
      "Recline Angle",
      "Gas Lift",
    ],
    specifications: [
      { label: "Model", value: "AMS Black Hawk" },
      { label: "Brand", value: "AMS" },
      { label: "Category", value: "Gaming Chairs" },
      { label: "Type", value: "Gaming Chair" },
      { label: "Weight Support", value: "Supports up to 100kg" },
      { label: "Recline", value: "Recline Angle" },
      { label: "Lift", value: "Gas Lift" },
    ],
  },
  "thermal-paste-1": {
    features: [
      "Thermal Paste",
      "4 Gram Paste",
      "18 W/mK",
      "Easy Application",
      "Excellent Thermal Conductivity",
    ],
    specifications: [
      { label: "Model", value: "AMS TX-90" },
      { label: "Brand", value: "AMS" },
      { label: "Category", value: "Thermal Paste" },
      { label: "Type", value: "Thermal Paste" },
      { label: "Weight", value: "4 Gram Paste" },
      { label: "Conductivity", value: "18 W/mK" },
      { label: "Application", value: "Easy Application" },
      { label: "Performance", value: "Excellent Thermal Conductivity" },
    ],
  },
  "monitor-arms-1": {
    features: [
      "Single Mount Monitor Arm",
      "Supports up to 10kg",
      "Supports up to 32 Inch",
    ],
    specifications: [
      { label: "Model", value: "AMS Titan X" },
      { label: "Brand", value: "AMS" },
      { label: "Category", value: "Monitor Arms" },
      { label: "Mount Type", value: "Single Mount Monitor Arm" },
      { label: "Weight Support", value: "Supports up to 10kg" },
      { label: "Screen Support", value: "Supports up to 32 Inch" },
    ],
  },
  "monitor-arms-2": {
    features: [
      "Dual Mount Monitor Arm",
      "10kg Per Mount",
      "Supports up to 32 Inch",
      "Universal VESA Compatible",
    ],
    specifications: [
      { label: "Model", value: "AMS Titan X Pro" },
      { label: "Brand", value: "AMS" },
      { label: "Category", value: "Monitor Arms" },
      { label: "Mount Type", value: "Dual Mount Monitor Arm" },
      { label: "Weight Support", value: "10kg Per Mount" },
      { label: "Screen Support", value: "Supports up to 32 Inch" },
      { label: "Compatibility", value: "Universal VESA Compatible" },
    ],
  },
  "wifi-network-accessories-1": {
    features: [
      "2.4GHz",
      "150Mbps",
      "Long Range",
      "Plug and Play",
    ],
    specifications: [
      { label: "Model", value: "WiFi Dongle" },
      { label: "Brand", value: "AMS" },
      { label: "Category", value: "WiFi / Network Accessories" },
      { label: "Frequency", value: "2.4GHz" },
      { label: "Speed", value: "150Mbps" },
      { label: "Range", value: "Long Range" },
      { label: "Setup", value: "Plug and Play" },
    ],
  },
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
  const override = PRODUCT_DETAIL_OVERRIDES[product.id]

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
    features: override?.features || buildFeatures(product),
    specifications: override?.specifications || buildSpecifications(product),
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
