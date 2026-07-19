"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { CategoryFilter } from "@/components/products/CategoryFilter"
import { ProductCard } from "@/components/products/ProductCard"
import type { ProductDetail } from "@/lib/product-catalog"

interface ProductsGridProps {
  products: ProductDetail[]
  categories: Array<{
    id: string
    name: string
  }>
  searchQuery?: string
}

const SELECTED_CATEGORY_KEY = "ams-products-selected-category"

export function ProductsGrid({
  products,
  categories,
  searchQuery = "",
}: ProductsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState(() => {
    if (typeof window === "undefined") {
      return "all"
    }

    return window.sessionStorage.getItem(SELECTED_CATEGORY_KEY) ?? "all"
  })

  useEffect(() => {
    const categoryExists = selectedCategory === "all" || categories.some((category) => category.id === selectedCategory)

    if (!categoryExists) {
      setSelectedCategory("all")
      window.sessionStorage.setItem(SELECTED_CATEGORY_KEY, "all")
    }
  }, [categories, selectedCategory])

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category)
    window.sessionStorage.setItem(SELECTED_CATEGORY_KEY, category)
  }, [])

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase()

    return products.filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesSearch = !normalizedSearch || [
        product.name,
        product.category,
        product.description,
        product.brand,
      ].some((value) => value.toLowerCase().includes(normalizedSearch))

      return matchesCategory && matchesSearch
    })
  }, [products, searchQuery, selectedCategory])

  return (
    <div className="space-y-10">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className="transition-opacity duration-300">
        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-[#111111] border border-[#1a1a1a] rounded-lg">
            <p className="text-gray-500">No products found for this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
