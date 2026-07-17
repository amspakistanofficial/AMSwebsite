"use client"

interface CategoryFilterProps {
  categories: Array<{
    id: string
    name: string
  }>
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 px-4">
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 md:px-8 py-2 md:py-3 font-bold uppercase tracking-tighter transition-all duration-300 border-2 ${selectedCategory === category.id
            ? "bg-[#ff6b00] border-[#ff6b00] text-white shadow-[0_0_20px_rgba(255,107,0,0.3)] scale-110"
            : "bg-transparent border-[#2a2a2a] text-gray-500 hover:border-[#ff6b00] hover:text-[#ff6b00]"
            }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}
