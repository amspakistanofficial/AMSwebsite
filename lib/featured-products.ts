export interface FeaturedProduct {
  id: string
  name: string
  category: string
  description: string
  image: string
}

export const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: "cases-5",
    name: "HALO",
    category: "Cases",
    description: "Compact M-ATX case with dual glass panels and three ARGB fans.",
    image: "/products/cases/5.png",
  },
  {
    id: "cases-9",
    name: "BATMAN WHITE",
    category: "Cases",
    description: "Full ATX showcase case with vertical GPU mounting and ARGB airflow.",
    image: "/products/cases/9.png",
  },
  {
    id: "cooling-1",
    name: "A400",
    category: "Cooling",
    description: "Four-pipe RGB air cooler built for dependable gaming performance.",
    image: "/products/cooling/1.png",
  },
  {
    id: "monitors-1",
    name: "PIXEL STORM X",
    category: "Monitors",
    description: "24-inch FHD IPS gaming monitor with 165Hz refresh rate and RGB back.",
    image: "/products/monitors/1.png",
  },
]
